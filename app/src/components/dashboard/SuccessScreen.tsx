import type { DayPlan } from '../../types'

type Props = {
  day: DayPlan
  onContinue: () => void
}

export function SuccessScreen({ day, onContinue }: Props) {
  const isFinal = day.day === 100
  const isMilestone = day.type === 'milestone'

  return (
    <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center px-6 text-center z-50"
         style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="text-6xl mb-6 animate-bounce">
        {isFinal ? '🏆' : isMilestone ? '⭐' : '✅'}
      </div>

      {isFinal ? (
        <>
          <h2 className="text-3xl font-bold text-text mb-3 tracking-tight">Day 100.</h2>
          <p className="text-subtle text-base mb-2">You did it.</p>
          <p className="text-subtle text-sm max-w-xs">100 days of training. Whatever you achieved today, you earned it.</p>
        </>
      ) : isMilestone ? (
        <>
          <h2 className="text-3xl font-bold text-text mb-3 tracking-tight">Milestone Reached</h2>
          <p className="text-subtle text-sm max-w-xs leading-relaxed mb-2">{day.milestoneText}</p>
          <p className="text-subtle text-sm">Day {day.day + 1} tomorrow.</p>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-text mb-3 tracking-tight">Day {day.day} done.</h2>
          <p className="text-subtle text-base">{100 - day.day} days to go.</p>
        </>
      )}

      <button
        onClick={onContinue}
        className="mt-10 w-full max-w-xs py-4 bg-accent text-white rounded-2xl text-base font-semibold"
      >
        {isFinal ? 'View Progress' : 'Back to Home'}
      </button>
    </div>
  )
}
