import type { DayPlan, DayProgress } from '../../types'
import { WORKOUT_DATA } from '../../data/workoutData'

type Props = {
  currentDay: number
  currentDayPlan: DayPlan
  currentDayProgress: DayProgress
  completedDays: number
  hasStarted: boolean
  onStart: () => void
  onBeginSession: () => void
}

const nextMilestone = (currentDay: number) => {
  const milestones = WORKOUT_DATA.filter(d => d.type === 'milestone' && d.day > currentDay)
  return milestones[0] ?? null
}

const phaseLabels: Record<number, string> = {
  1: 'Foundation',
  2: 'Wall & Kick-Ups',
  3: 'Freestanding',
}

export function Dashboard({ currentDay, currentDayPlan, currentDayProgress, completedDays, hasStarted, onStart, onBeginSession }: Props) {
  const isCompleted = !!currentDayProgress.completedAt
  const isRest = currentDayPlan.type === 'rest'
  const isMilestone = currentDayPlan.type === 'milestone'
  const checkedCount = currentDayProgress.checkedItems.length
  const totalCount = currentDayPlan.exercises.length
  const milestone = nextMilestone(currentDay)
  const daysToMilestone = milestone ? milestone.day - currentDay : null

  if (!hasStarted) {
    return (
      <div className="flex flex-col h-full bg-bg justify-center items-center px-6 text-center"
           style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="text-6xl mb-6">🤸</div>
        <h1 className="text-3xl font-bold text-text mb-3 tracking-tight">Handstand</h1>
        <p className="text-subtle text-base mb-2 max-w-xs">100 days. Bodyweight only. One goal.</p>
        <p className="text-subtle text-sm mb-10 max-w-xs">Start today and the app will track your daily training through Day 100.</p>
        <button
          onClick={onStart}
          className="w-full max-w-xs py-4 bg-accent text-white rounded-2xl text-base font-semibold"
        >
          Begin Day 1
        </button>
      </div>
    )
  }

  const previewExercises = currentDayPlan.exercises.filter(e => !e.isWarmup).slice(0, 3)

  return (
    <div className="flex flex-col bg-bg pb-24"
         style={{ paddingTop: 'env(safe-area-inset-top)' }}>

      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-subtle text-sm mb-1">Phase {currentDayPlan.phase} · {phaseLabels[currentDayPlan.phase]}</p>
        <h1 className="text-4xl font-bold tracking-tight text-text">Day {currentDay}</h1>
        <p className="text-subtle text-sm mt-1">{completedDays} of 100 days complete</p>
      </div>

      {/* Progress bar */}
      <div className="px-5 mb-6">
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(completedDays / 100) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-muted">Day 1</span>
          <span className="text-xs text-muted">Day 100</span>
        </div>
      </div>

      {/* Milestone callout */}
      {daysToMilestone !== null && daysToMilestone <= 7 && daysToMilestone > 0 && (
        <div className="mx-5 mb-5 px-4 py-3 bg-warning/10 border border-warning/20 rounded-xl">
          <p className="text-warning text-sm font-medium">
            Milestone in {daysToMilestone} day{daysToMilestone !== 1 ? 's' : ''} — Day {milestone!.day}
          </p>
        </div>
      )}
      {isMilestone && (
        <div className="mx-5 mb-5 px-4 py-3 bg-warning/10 border border-warning/20 rounded-xl">
          <p className="text-warning text-sm font-medium">Today is a Milestone Day</p>
          {currentDayPlan.milestoneText && (
            <p className="text-warning/70 text-xs mt-1 leading-snug">{currentDayPlan.milestoneText}</p>
          )}
        </div>
      )}

      {/* Today's card */}
      <div className="mx-5 bg-surface rounded-2xl border border-border overflow-hidden mb-5">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-subtle">Today's Workout</span>
            {isCompleted && (
              <span className="text-xs text-success font-medium">Complete ✓</span>
            )}
            {!isCompleted && totalCount > 0 && checkedCount > 0 && (
              <span className="text-xs text-accent font-medium">{checkedCount}/{totalCount} done</span>
            )}
          </div>
        </div>

        {isRest ? (
          <div className="px-4 py-6 text-center">
            <p className="text-2xl mb-2">😮‍💨</p>
            <p className="text-text font-medium">Rest Day</p>
            <p className="text-subtle text-sm mt-1">Wrist + shoulder recovery stretches (~5 min). No intensity.</p>
          </div>
        ) : (
          <div className="px-4 py-3">
            {previewExercises.map(ex => (
              <div key={ex.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-muted flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-text font-medium leading-snug">{ex.name}</p>
                  <p className="text-xs text-subtle">{ex.detail}</p>
                </div>
              </div>
            ))}
            {currentDayPlan.exercises.filter(e => !e.isWarmup).length > 3 && (
              <p className="text-xs text-subtle pt-2">
                +{currentDayPlan.exercises.filter(e => !e.isWarmup).length - 3} more exercises
              </p>
            )}
          </div>
        )}
      </div>

      {/* CTA Button */}
      {isRest ? (
        <div className="mx-5">
          <button
            onClick={onBeginSession}
            className={`w-full py-4 rounded-2xl text-base font-semibold transition-all ${
              isCompleted ? 'bg-success/20 text-success' : 'bg-surface border border-border text-text'
            }`}
            disabled={isCompleted}
          >
            {isCompleted ? 'Rest Day Complete ✓' : 'Begin Recovery Stretches'}
          </button>
        </div>
      ) : (
        <div className="mx-5">
          <button
            onClick={onBeginSession}
            className={`w-full py-4 rounded-2xl text-base font-semibold transition-all ${
              isCompleted
                ? 'bg-success/20 text-success'
                : checkedCount > 0
                ? 'bg-accent text-white'
                : 'bg-accent text-white'
            }`}
          >
            {isCompleted
              ? `Day ${currentDay} Complete ✓`
              : checkedCount > 0
              ? `Resume Day ${currentDay}`
              : `Start Day ${currentDay}`}
          </button>
        </div>
      )}

      {/* Phase info */}
      <div className="mx-5 mt-5 bg-surface rounded-2xl border border-border px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-subtle mb-3">Your Plan</p>
        {[
          { phase: 1, label: 'Foundation & Conditioning', days: '1–33', desc: 'Wrist mobility, hollow body, chest-to-wall holds' },
          { phase: 2, label: 'Wall Refinement & Kick-Ups', days: '34–67', desc: 'Fingertip drills, shoulder taps, tuck handstand' },
          { phase: 3, label: 'Freestanding', days: '68–100', desc: 'Wall floats, max hold attempts, 5–10 sec goal' },
        ].map(p => (
          <div key={p.phase} className={`flex gap-3 py-2.5 border-b border-border/50 last:border-0 ${currentDayPlan.phase === p.phase ? '' : 'opacity-40'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
              currentDayPlan.phase > p.phase ? 'bg-success/20 text-success' :
              currentDayPlan.phase === p.phase ? 'bg-accent/20 text-accent' : 'bg-border text-subtle'
            }`}>
              {currentDayPlan.phase > p.phase ? '✓' : p.phase}
            </div>
            <div>
              <p className="text-sm text-text font-medium leading-snug">{p.label}</p>
              <p className="text-xs text-subtle">Days {p.days} · {p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
