import { useState } from 'react'
import type { DayPlan, DayProgress } from '../../types'
import { ExerciseCard } from './ExerciseCard'
import { useWakeLock } from '../../hooks/useWakeLock'

type Props = {
  day: DayPlan
  progress: DayProgress
  onCheck: (itemId: string) => void
  onComplete: () => void
  onBack: () => void
}

export function ActiveSession({ day, progress, onCheck, onComplete, onBack }: Props) {
  useWakeLock(true)
  const exercises = day.exercises
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Resume at first unchecked exercise
    const firstUnchecked = exercises.findIndex(e => !progress.checkedItems.includes(e.id))
    return firstUnchecked === -1 ? 0 : firstUnchecked
  })

  if (exercises.length === 0) {
    // Rest day — shouldn't normally land here, but handle gracefully
    return (
      <div className="flex flex-col h-full bg-bg items-center justify-center px-6 text-center"
           style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <p className="text-4xl mb-4">😮‍💨</p>
        <h2 className="text-2xl font-bold text-text mb-2">Rest Day</h2>
        <p className="text-subtle mb-8">Active recovery only. Come back tomorrow.</p>
        <button onClick={onComplete} className="w-full max-w-xs py-4 bg-accent text-white rounded-2xl font-semibold">
          Mark Complete
        </button>
      </div>
    )
  }

  const currentItem = exercises[currentIndex]
  const isLast = currentIndex === exercises.length - 1

  const handleDone = () => {
    onCheck(currentItem.id)
    if (isLast) {
      onComplete()
    } else {
      setCurrentIndex(i => i + 1)
    }
  }

  const handleSkip = () => {
    if (isLast) {
      onComplete()
    } else {
      setCurrentIndex(i => i + 1)
    }
  }

  const handleBack = () => {
    if (currentIndex === 0) {
      onBack()
    } else {
      setCurrentIndex(i => i - 1)
    }
  }

  return (
    <ExerciseCard
      item={currentItem}
      index={currentIndex}
      total={exercises.length}
      isLast={isLast}
      onDone={handleDone}
      onSkip={handleSkip}
      onBack={handleBack}
    />
  )
}
