import { useState } from 'react'
import type { DayPlan, DayProgress } from '../../types'
import { ExerciseRow } from './ExerciseRow'

type Props = {
  day: DayPlan
  progress: DayProgress
  onCheck: (itemId: string) => void
  onComplete: () => void
  onBack: () => void
}

const phaseColors: Record<number, string> = {
  1: 'text-blue-400',
  2: 'text-violet-400',
  3: 'text-amber-400',
}

export function ActiveSession({ day, progress, onCheck, onComplete, onBack }: Props) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [warmupExpanded, setWarmupExpanded] = useState(true)

  const warmupItems = day.exercises.filter(e => e.isWarmup)
  const workItems = day.exercises.filter(e => !e.isWarmup)
  const checkedCount = progress.checkedItems.length
  const totalCount = day.exercises.length
  const allDone = checkedCount === totalCount
  const warmupDone = warmupItems.every(e => progress.checkedItems.includes(e.id))

  const handleComplete = () => {
    if (!allDone) { setShowConfirm(true); return }
    onComplete()
  }

  const phaseColor = phaseColors[day.phase] ?? 'text-accent'

  return (
    <div className="flex flex-col h-full bg-bg" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border flex-shrink-0">
        <button onClick={onBack} className="text-subtle p-1 -ml-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-text">Day {day.day}</span>
            {day.type === 'milestone' && (
              <span className="text-xs bg-warning/15 text-warning px-2 py-0.5 rounded-full font-medium">Milestone</span>
            )}
          </div>
          <p className={`text-xs font-medium ${phaseColor}`}>{day.phaseLabel}</p>
        </div>
        <span className="text-sm text-subtle tabular-nums">{checkedCount}/{totalCount}</span>
      </div>

      {/* Milestone banner */}
      {day.type === 'milestone' && day.milestoneText && (
        <div className="mx-4 mt-4 p-3 bg-warning/10 border border-warning/20 rounded-xl flex-shrink-0">
          <p className="text-sm text-warning leading-snug">{day.milestoneText}</p>
        </div>
      )}

      {/* Scrollable exercise list */}
      <div className="flex-1 overflow-y-auto pb-32">

        {/* Wrist Warm-Up Section */}
        {warmupItems.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setWarmupExpanded(e => !e)}
              className="w-full flex items-center justify-between px-5 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-subtle">Wrist Warm-Up</span>
                {warmupDone && (
                  <span className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </div>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`text-subtle transition-transform ${warmupExpanded ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {warmupExpanded && (
              <div className="bg-surface mx-4 rounded-xl overflow-hidden border border-border mt-1">
                {warmupItems.map(item => (
                  <ExerciseRow
                    key={item.id}
                    item={item}
                    checked={progress.checkedItems.includes(item.id)}
                    onCheck={() => onCheck(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main exercises */}
        {workItems.length > 0 && (
          <div className="mt-4">
            <p className="px-5 py-2 text-xs font-semibold uppercase tracking-widest text-subtle">Workout</p>
            <div className="bg-surface mx-4 rounded-xl overflow-hidden border border-border">
              {workItems.map(item => (
                <ExerciseRow
                  key={item.id}
                  item={item}
                  checked={progress.checkedItems.includes(item.id)}
                  onCheck={() => onCheck(item.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="px-4 mt-6">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-bg/95 backdrop-blur border-t border-border"
           style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}>
        <button
          onClick={handleComplete}
          className={`w-full py-4 rounded-2xl text-base font-semibold transition-all ${
            allDone
              ? 'bg-success text-white'
              : 'bg-accent text-white'
          }`}
        >
          {allDone ? 'Complete Day ' + day.day + ' ✓' : `Complete Day ${day.day}`}
        </button>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-end z-50" onClick={() => setShowConfirm(false)}>
          <div className="bg-surface w-full rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-text mb-2">Mark day complete?</h3>
            <p className="text-subtle text-sm mb-6">
              {totalCount - checkedCount} exercise{totalCount - checkedCount !== 1 ? 's' : ''} unchecked. You can still mark the day done.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3.5 rounded-xl border border-border text-text font-medium">
                Go back
              </button>
              <button
                onClick={() => { setShowConfirm(false); onComplete() }}
                className="flex-1 py-3.5 rounded-xl bg-accent text-white font-medium"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
