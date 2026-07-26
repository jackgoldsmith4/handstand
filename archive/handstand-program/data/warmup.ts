import type { ExerciseItem } from '../types'

export const WRIST_WARMUP: ExerciseItem[] = [
  // ── Shoulder warm-up ──
  { id: 'wu-1', name: 'Arm circles', detail: '10 small → large each direction', isWarmup: true, isGoal: false },
  { id: 'wu-2', name: 'Overhead reach stretch', detail: '30 sec each arm', isWarmup: true, isGoal: false, timerSeconds: 30 },
  // ── Wrist warm-up ──
  { id: 'wu-3', name: 'Wrist circles', detail: '10 each direction', isWarmup: true, isGoal: false },
  { id: 'wu-4', name: 'Prayer stretch', detail: '30 sec', isWarmup: true, isGoal: false, timerSeconds: 30 },
  { id: 'wu-5', name: 'Reverse prayer stretch', detail: '30 sec', isWarmup: true, isGoal: false, timerSeconds: 30 },
  { id: 'wu-6', name: 'Quadruped wrist rocks', detail: '10 forward + 10 side-to-side', isWarmup: true, isGoal: false },
  { id: 'wu-7', name: 'Fingers-back stretch', detail: '10 reps + 10 sec hold', isWarmup: true, isGoal: false, timerSeconds: 10 },
  { id: 'wu-8', name: 'Wrist flexion stretch', detail: '10 reps + 10 sec hold', isWarmup: true, isGoal: false, timerSeconds: 10 },
  { id: 'wu-10', name: 'Fingertip push-ups', detail: '2 × 5', isWarmup: true, isGoal: false, sets: 2 },
]
