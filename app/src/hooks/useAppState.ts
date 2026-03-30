import { useState, useCallback } from 'react'
import type { AppState, DayProgress } from '../types'
import { WORKOUT_DATA } from '../data/workoutData'

const STORAGE_KEY = 'handstand_app_state'

const defaultState: AppState = {
  startDate: null,
  progress: [],
  dayOffset: 0,
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as AppState
    // backfill dayOffset for states saved before this field existed
    return { dayOffset: 0, ...parsed }
  } catch {
    return defaultState
  }
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function localDateString(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getCurrentTrainingDay(startDate: string | null, dayOffset = 0): number {
  if (!startDate) return 1
  // Append T00:00:00 so the string is parsed as LOCAL midnight, not UTC midnight
  const start = new Date(startDate + 'T00:00:00')
  start.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(diff + 1 + dayOffset, 1), 100)
}

export function useAppState() {
  const [state, setState] = useState<AppState>(loadState)

  const update = useCallback((updater: (prev: AppState) => AppState) => {
    setState(prev => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }, [])

  const startChallenge = useCallback(() => {
    update(() => ({
      startDate: localDateString(),
      progress: [],
      dayOffset: 0,
    }))
  }, [update])

  const getDayProgress = useCallback((day: number): DayProgress => {
    return state.progress.find(p => p.day === day) ?? {
      day,
      completedAt: null,
      checkedItems: [],
    }
  }, [state.progress])

  const checkItem = useCallback((day: number, itemId: string) => {
    update(prev => {
      const existing = prev.progress.find(p => p.day === day)
      if (existing) {
        const alreadyChecked = existing.checkedItems.includes(itemId)
        return {
          ...prev,
          progress: prev.progress.map(p =>
            p.day === day
              ? { ...p, checkedItems: alreadyChecked ? p.checkedItems.filter(id => id !== itemId) : [...p.checkedItems, itemId] }
              : p
          ),
        }
      }
      return {
        ...prev,
        progress: [...prev.progress, { day, completedAt: null, checkedItems: [itemId] }],
      }
    })
  }, [update])

  const completeDay = useCallback((day: number) => {
    update(prev => {
      const existing = prev.progress.find(p => p.day === day)
      const allIds = WORKOUT_DATA.find(d => d.day === day)?.exercises.map(e => e.id) ?? []
      if (existing) {
        return {
          ...prev,
          progress: prev.progress.map(p =>
            p.day === day
              ? { ...p, completedAt: new Date().toISOString(), checkedItems: allIds }
              : p
          ),
        }
      }
      return {
        ...prev,
        progress: [...prev.progress, { day, completedAt: new Date().toISOString(), checkedItems: allIds }],
      }
    })
  }, [update])

  const exportProgress = useCallback((): string => {
    return btoa(JSON.stringify(state))
  }, [state])

  const importProgress = useCallback((encoded: string): boolean => {
    try {
      const parsed = JSON.parse(atob(encoded)) as AppState
      if (typeof parsed.startDate === 'string' || parsed.startDate === null) {
        update(() => parsed)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [update])

  const resetProgress = useCallback(() => {
    update(() => defaultState)
  }, [update])

  const setCurrentDay = useCallback((day: number) => {
    update(prev => {
      const calendarDay = getCurrentTrainingDay(prev.startDate, 0)
      return { ...prev, dayOffset: day - calendarDay }
    })
  }, [update])

  const currentDay = getCurrentTrainingDay(state.startDate, state.dayOffset ?? 0)
  const currentDayPlan = WORKOUT_DATA.find(d => d.day === currentDay) ?? WORKOUT_DATA[0]
  const currentDayProgress = getDayProgress(currentDay)
  const completedDays = state.progress.filter(p => p.completedAt !== null).length

  return {
    state,
    currentDay,
    currentDayPlan,
    currentDayProgress,
    completedDays,
    startChallenge,
    getDayProgress,
    checkItem,
    completeDay,
    exportProgress,
    importProgress,
    resetProgress,
    setCurrentDay,
  }
}
