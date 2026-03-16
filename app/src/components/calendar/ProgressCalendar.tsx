import { useState } from 'react'
import type { DayProgress } from '../../types'
import { WORKOUT_DATA } from '../../data/workoutData'

type Props = {
  currentDay: number
  progress: DayProgress[]
  onSelectDay: (day: number) => void
}

export function ProgressCalendar({ currentDay, progress, onSelectDay }: Props) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const getStatus = (day: number): 'completed' | 'current' | 'rest' | 'milestone' | 'future' => {
    const plan = WORKOUT_DATA.find(d => d.day === day)
    const prog = progress.find(p => p.day === day)
    if (prog?.completedAt) return 'completed'
    if (day === currentDay) return 'current'
    if (plan?.type === 'rest') return 'rest'
    if (plan?.type === 'milestone') return 'milestone'
    return 'future'
  }

  const tileStyle = (day: number) => {
    const status = getStatus(day)
    const base = 'relative flex items-center justify-center rounded-xl text-xs font-medium transition-all aspect-square'
    switch (status) {
      case 'completed': return `${base} bg-success/20 text-success`
      case 'current':   return `${base} bg-accent text-white ring-2 ring-accent ring-offset-1 ring-offset-bg`
      case 'rest':      return `${base} bg-border/50 text-muted`
      case 'milestone': return `${base} bg-surface border-2 border-warning/50 text-warning`
      case 'future':    return `${base} bg-surface text-muted`
    }
  }

  const selectedPlan = selectedDay ? WORKOUT_DATA.find(d => d.day === selectedDay) : null
  const selectedProg = selectedDay ? progress.find(p => p.day === selectedDay) : null

  return (
    <div className="flex flex-col bg-bg pb-24"
         style={{ paddingTop: 'env(safe-area-inset-top)' }}>

      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-text">Progress</h1>
        <p className="text-subtle text-sm mt-1">
          {progress.filter(p => p.completedAt).length} / 100 days complete
        </p>
      </div>

      {/* Legend */}
      <div className="px-5 mb-4 flex items-center gap-4 flex-wrap">
        {[
          { color: 'bg-success/20 text-success', label: 'Done' },
          { color: 'bg-accent text-white', label: 'Today' },
          { color: 'bg-surface border-2 border-warning/50 text-warning', label: 'Milestone' },
          { color: 'bg-border/50 text-muted', label: 'Rest' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded ${l.color} text-[8px] flex items-center justify-center font-bold`}>1</div>
            <span className="text-xs text-subtle">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="px-5">
        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: 100 }, (_, i) => i + 1).map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day === selectedDay ? null : day)}
              className={tileStyle(day)}
            >
              {day}
              {WORKOUT_DATA.find(d => d.day === day)?.type === 'milestone' && getStatus(day) !== 'completed' && getStatus(day) !== 'current' && (
                <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-warning" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Day detail sheet */}
      {selectedDay && selectedPlan && (
        <div className="mx-5 mt-5 bg-surface rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-text">Day {selectedDay}</span>
              <span className="text-subtle text-xs ml-2">{selectedPlan.phaseLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              {selectedProg?.completedAt && (
                <span className="text-xs text-success font-medium">Complete ✓</span>
              )}
              {selectedDay >= currentDay && selectedPlan.type !== 'rest' && (
                <button
                  onClick={() => onSelectDay(selectedDay)}
                  className="text-xs text-accent font-medium px-3 py-1.5 rounded-lg bg-accent/10"
                >
                  Open
                </button>
              )}
              <button onClick={() => setSelectedDay(null)} className="text-subtle text-xs p-1">✕</button>
            </div>
          </div>
          {selectedPlan.type === 'rest' ? (
            <div className="px-4 py-4">
              <p className="text-subtle text-sm">Rest Day — active recovery only.</p>
            </div>
          ) : (
            <div className="px-4 py-3 divide-y divide-border/50">
              {selectedPlan.exercises.filter(e => !e.isWarmup).slice(0, 5).map(ex => (
                <div key={ex.id} className="py-2">
                  <p className="text-sm text-text">{ex.name}</p>
                  <p className="text-xs text-subtle">{ex.detail}</p>
                </div>
              ))}
              {selectedPlan.exercises.filter(e => !e.isWarmup).length > 5 && (
                <p className="py-2 text-xs text-subtle">+{selectedPlan.exercises.filter(e => !e.isWarmup).length - 5} more</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
