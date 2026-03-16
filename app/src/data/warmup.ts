import type { ExerciseItem } from '../types'

export const WRIST_WARMUP: ExerciseItem[] = [
  { id: 'wu-1', name: 'Wrist circles', detail: '10 each direction', isWarmup: true, isGoal: false },
  { id: 'wu-2', name: 'Kneeling wrist extension rocks', detail: '10 reps + 10 sec hold', isWarmup: true, isGoal: false, timerSeconds: 10, sets: 1 },
  { id: 'wu-3', name: 'Prayer stretch', detail: '30 sec', isWarmup: true, isGoal: false, timerSeconds: 30, sets: 1 },
  { id: 'wu-4', name: 'Reverse prayer stretch', detail: '30 sec', isWarmup: true, isGoal: false, timerSeconds: 30, sets: 1 },
  { id: 'wu-5', name: 'Quadruped forward rocks', detail: '10 forward + 10 side-to-side', isWarmup: true, isGoal: false },
  { id: 'wu-6', name: 'Fingers-back stretch', detail: '10 reps + 10 sec hold', isWarmup: true, isGoal: false, timerSeconds: 10, sets: 1 },
  { id: 'wu-7', name: 'Wrist flexion stretch', detail: '10 reps + 10 sec hold', isWarmup: true, isGoal: false, timerSeconds: 10, sets: 1 },
  { id: 'wu-8', name: 'Knuckle roll-offs', detail: '10 reps', isWarmup: true, isGoal: false },
  { id: 'wu-9', name: 'Fingertip push-ups', detail: '3 × 5', isWarmup: true, isGoal: false, sets: 3 },
]
