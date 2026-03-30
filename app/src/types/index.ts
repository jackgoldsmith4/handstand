export type ExerciseItem = {
  id: string
  name: string
  detail: string
  isWarmup: boolean
  isGoal: boolean
  goalText?: string
  timerSeconds?: number  // duration per set (if time-based)
  sets?: number          // number of sets
}

export type DayType = 'training' | 'rest' | 'milestone'

export type Phase = 1 | 2 | 3

export type DayPlan = {
  day: number
  type: DayType
  phase: Phase
  phaseLabel: string
  milestoneText?: string
  exercises: ExerciseItem[]
}

export type DayProgress = {
  day: number
  completedAt: string | null  // ISO date string
  checkedItems: string[]      // exercise item ids
}

export type AppState = {
  startDate: string | null    // ISO date string for Day 1
  progress: DayProgress[]
  dayOffset: number           // manual day adjustment (positive = ahead, negative = behind)
}

export type View = 'dashboard' | 'session' | 'calendar'
