import { useState } from 'react'
import type { DayPlan, DayProgress } from '../../types'
import { ExerciseCard } from './ExerciseCard'
import { useWakeLock } from '../../hooks/useWakeLock'
import { restRecovery } from '../../data/workoutData'

type Props = {
  day: DayPlan
  progress: DayProgress
  onCheck: (itemId: string) => void
  onComplete: () => void
  onBack: () => void
}

export function ActiveSession({ day, progress, onCheck, onComplete, onBack }: Props) {
  useWakeLock(true)
  const exercises = day.type === 'rest' ? restRecovery(day.day) : day.exercises
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Resume at first unchecked exercise
    const firstUnchecked = exercises.findIndex(e => !progress.checkedItems.includes(e.id))
    return firstUnchecked === -1 ? 0 : firstUnchecked
  })

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
