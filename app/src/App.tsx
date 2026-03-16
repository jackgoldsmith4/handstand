import { useState } from 'react'
import type { View } from './types'
import { useAppState } from './hooks/useAppState'
import { WORKOUT_DATA } from './data/workoutData'
import { Dashboard } from './components/dashboard/Dashboard'
import { SuccessScreen } from './components/dashboard/SuccessScreen'
import { ActiveSession } from './components/session/ActiveSession'
import { ProgressCalendar } from './components/calendar/ProgressCalendar'
import { BottomNav } from './components/shared/BottomNav'
import { SettingsSheet } from './components/shared/SettingsSheet'

export default function App() {
  const [view, setView] = useState<View>('dashboard')
  const [sessionDay, setSessionDay] = useState<number | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const {
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
  } = useAppState()

  const hasStarted = !!state.startDate

  const activePlan = sessionDay
    ? (WORKOUT_DATA.find(d => d.day === sessionDay) ?? currentDayPlan)
    : currentDayPlan
  const activeProgress = sessionDay ? getDayProgress(sessionDay) : currentDayProgress
  const activeDay = sessionDay ?? currentDay

  const handleBeginSession = () => {
    if (!hasStarted) return
    setSessionDay(currentDay)
    setView('session')
  }

  const handleOpenDayFromCalendar = (day: number) => {
    setSessionDay(day)
    setView('session')
  }

  const handleCompleteDay = () => {
    completeDay(activeDay)
    setView('dashboard')
    setShowSuccess(true)
    setSessionDay(null)
  }

  const handleSuccessContinue = () => {
    setShowSuccess(false)
    setView('dashboard')
  }

  const handleBackFromSession = () => {
    setView('dashboard')
    setSessionDay(null)
  }

  const handleReset = () => {
    resetProgress()
    setShowSettings(false)
    setView('dashboard')
  }

  if (showSuccess) {
    return <SuccessScreen day={currentDayPlan} onContinue={handleSuccessContinue} />
  }

  if (view === 'session') {
    return (
      <ActiveSession
        day={activePlan}
        progress={activeProgress}
        onCheck={(itemId) => checkItem(activeDay, itemId)}
        onComplete={handleCompleteDay}
        onBack={handleBackFromSession}
      />
    )
  }

  return (
    <div className="flex flex-col h-full bg-bg">
      {hasStarted && (
        <button
          onClick={() => setShowSettings(true)}
          className="fixed right-5 z-40 text-subtle"
          style={{ top: 'calc(env(safe-area-inset-top) + 16px)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </button>
      )}

      <div key={view} className="flex-1 overflow-y-auto">
        {view === 'dashboard' && (
          <Dashboard
            currentDay={currentDay}
            currentDayPlan={currentDayPlan}
            currentDayProgress={currentDayProgress}
            completedDays={completedDays}
            hasStarted={hasStarted}
            onStart={startChallenge}
            onBeginSession={handleBeginSession}
          />
        )}
        {view === 'calendar' && (
          <ProgressCalendar
            currentDay={currentDay}
            progress={state.progress}
            onSelectDay={handleOpenDayFromCalendar}
          />
        )}
      </div>

      {hasStarted && (
        <BottomNav current={view} onChange={setView} />
      )}

      {showSettings && (
        <SettingsSheet
          onExport={exportProgress}
          onImport={importProgress}
          onReset={handleReset}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
