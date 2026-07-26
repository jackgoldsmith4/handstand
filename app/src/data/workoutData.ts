import type { DayPlan, ExerciseItem, Phase } from '../types'

// ─── The program is built from twelve exercises, reused throughout. ──────────
// Numbers step up once per phase (see 100_day_movement_plan.md) — nothing
// rotates in for variety's sake, and nothing needs more than three progression
// steps.

const PHASE_LABELS: Record<Phase, string> = {
  1: 'Open & Activate',
  2: 'Build Strength Through Range',
  3: 'Integrate & Flow',
}

function phaseOf(day: number): Phase {
  if (day <= 33) return 1
  if (day <= 67) return 2
  return 3
}

// Indexed by phase - 1
const STRETCH_HOLD = [30, 45, 60]
const FLEX_HOLD = [40, 55, 75]
const HANG_HOLD = [20, 35, 50]
const PUSHUP = [{ sets: 3, reps: 12 }, { sets: 3, reps: 16 }, { sets: 3, reps: 20 }]
const PULLUP = [{ sets: 3, reps: 5 }, { sets: 4, reps: 6 }, { sets: 5, reps: 8 }]
const CROW_HOLD = [15, 20, 25]
const PISTOL_DETAIL = [
  'Bodyweight squat instead — 3 × 15',
  'Assisted pistol squat instead — 3 × 5 each leg, hold a support for balance',
  '3 × 5 each leg, best effort',
]
const BRIDGE_DETAIL = [
  'Glute bridge instead — 3 × 15',
  'Single-leg glute bridge instead — 3 × 8 each leg',
  '3 × best hold (10–15s)',
]

const e = (day: number, idx: number, name: string, detail: string, opts: Partial<ExerciseItem> = {}): ExerciseItem => ({
  id: `d${day}-${idx}`,
  name,
  detail,
  isWarmup: false,
  isGoal: false,
  ...opts,
})

// ─── The three daily pillars — present on every training and rest day ────────

const pecStretch = (day: number, idx: number, ph: Phase) =>
  e(day, idx, 'Doorway pec stretch', `${STRETCH_HOLD[ph - 1]}s each side`, { timerSeconds: STRETCH_HOLD[ph - 1] })

const hipSwitch = (day: number, idx: number) =>
  e(day, idx, '90/90 hip switch', '8 controlled switches each direction, no hands')

const forwardFold = (day: number, idx: number, ph: Phase) =>
  e(day, idx, 'Standing forward fold', `${STRETCH_HOLD[ph - 1]}s, let the head hang heavy`, { timerSeconds: STRETCH_HOLD[ph - 1] })

const squatHold = (day: number, idx: number, ph: Phase) =>
  e(day, idx, 'Deep squat hold', `hold ${STRETCH_HOLD[ph - 1]}s, heels flat`, { timerSeconds: STRETCH_HOLD[ph - 1] })

// ─── Rotating focus exercises ─────────────────────────────────────────────────

const pushUps = (day: number, idx: number, ph: Phase) => {
  const { sets, reps } = PUSHUP[ph - 1]
  return e(day, idx, 'Push-ups', `${sets} × ${reps}`, { sets })
}

const pullUps = (day: number, idx: number, ph: Phase) => {
  const { sets, reps } = PULLUP[ph - 1]
  return e(day, idx, 'Pull-ups', `${sets} × ${reps}`, { sets })
}

const deadHang = (day: number, idx: number, ph: Phase) => {
  const s = HANG_HOLD[ph - 1]
  return e(day, idx, 'Dead hang', `3 × ${s}s hang, shoulder blades relaxed then pulled down`, { sets: 3, timerSeconds: s })
}

const pistolSquat = (day: number, idx: number, ph: Phase) =>
  e(day, idx, 'Pistol squat', PISTOL_DETAIL[ph - 1], { sets: 3 })

const bridgePose = (day: number, idx: number, ph: Phase) =>
  e(day, idx, 'Bridge pose (wheel)', BRIDGE_DETAIL[ph - 1], { sets: 3 })

const crowPose = (day: number, idx: number, ph: Phase) => {
  const s = CROW_HOLD[ph - 1]
  const extra = ph === 3 ? ' — try side crow once this feels easy' : ''
  return e(day, idx, 'Crow pose', `3 × ${s}s hold${extra}`, { sets: 3, timerSeconds: s })
}

const straddle = (day: number, idx: number, ph: Phase) => {
  const s = FLEX_HOLD[ph - 1]
  return e(day, idx, 'Straddle stretch', `${s}s, hinge from the hips with a flat back`, { timerSeconds: s })
}

const standingSplit = (day: number, idx: number, ph: Phase) => {
  const s = FLEX_HOLD[ph - 1]
  return e(day, idx, 'Standing split', `${s}s each leg, hands on floor or blocks for support`, { timerSeconds: s })
}

// ─── Rest-day recovery — same three pillars, always gentle ───────────────────

export const restRecovery = (day: number): ExerciseItem[] => [
  e(day, 1, 'Doorway pec stretch', '30s each side, easy stretch', { timerSeconds: 30 }),
  e(day, 2, '90/90 hip switch', '6 slow, controlled switches each direction'),
  e(day, 3, 'Standing forward fold', '30s, no forcing it', { timerSeconds: 30 }),
  e(day, 4, 'Deep squat hold', 'hold 30s, just breathe in the bottom position', { timerSeconds: 30 }),
]

// ─── Weekly rotation (7-day cycle) ────────────────────────────────────────────

function trainingExercises(day: number, ph: Phase, weekPos: number): ExerciseItem[] {
  switch (weekPos) {
    case 1: // Push
      return [pecStretch(day, 1, ph), hipSwitch(day, 2), forwardFold(day, 3, ph), pushUps(day, 4, ph)]
    case 2: // Pull + hang time
      return [pecStretch(day, 1, ph), hipSwitch(day, 2), forwardFold(day, 3, ph), pullUps(day, 4, ph), deadHang(day, 5, ph)]
    case 3: // Legs + backbend
      return [pecStretch(day, 1, ph), hipSwitch(day, 2), forwardFold(day, 3, ph), pistolSquat(day, 4, ph), bridgePose(day, 5, ph)]
    case 4: // Skill
      return [pecStretch(day, 1, ph), hipSwitch(day, 2), forwardFold(day, 3, ph), crowPose(day, 4, ph)]
    case 5: // Full-body strength
      return [pecStretch(day, 1, ph), hipSwitch(day, 2), forwardFold(day, 3, ph), pushUps(day, 4, ph), pullUps(day, 5, ph)]
    default: // 6 — Deep flexibility
      return [pecStretch(day, 1, ph), hipSwitch(day, 2), squatHold(day, 3, ph), straddle(day, 4, ph), standingSplit(day, 5, ph)]
  }
}

// ─── Milestone / test days ────────────────────────────────────────────────────

type MilestoneDef = { title: string; text: string; exercises: (day: number, ph: Phase) => ExerciseItem[] }

const MILESTONES: Record<number, MilestoneDef> = {
  15: {
    title: 'Foundation Check',
    text: 'Day 15 — first checkpoint. No pass/fail: note your deep squat hold time, dead hang time, and max reps on push-ups and pull-ups. You’ll retest at Day 33.',
    exercises: (day, ph) => [
      pecStretch(day, 1, ph),
      forwardFold(day, 2, ph),
      squatHold(day, 3, ph),
      deadHang(day, 4, ph),
      pullUps(day, 5, ph),
      pushUps(day, 6, ph),
    ],
  },
  33: {
    title: 'Phase 1 Complete',
    text: 'Phase 1 complete. Retest everything from Day 15 — the targets below are what Phase 2 will ask of you.',
    exercises: (day) => [
      pecStretch(day, 1, 1),
      forwardFold(day, 2, 1),
      e(day, 3, 'Deep squat hold', 'hold as long as possible', { timerSeconds: 30, isGoal: true, goalText: 'Target for Phase 2: 45s' }),
      e(day, 4, 'Dead hang', 'max hang', { timerSeconds: 20, isGoal: true, goalText: 'Target for Phase 2: 3 × 35s' }),
      e(day, 5, 'Pull-ups', 'max reps', { isGoal: true, goalText: 'Target for Phase 2: 4 × 6' }),
      e(day, 6, 'Push-ups', 'max reps', { isGoal: true, goalText: 'Target for Phase 2: 3 × 16' }),
    ],
  },
  50: {
    title: 'Midpoint Check',
    text: 'Halfway. Pull strength and single-leg squat control are catching up to the mobility you built in Phase 1.',
    exercises: (day, ph) => [
      pecStretch(day, 1, ph),
      hipSwitch(day, 2),
      pullUps(day, 3, ph),
      e(day, 4, 'Pistol squat', 'assisted, each leg — note how much support you still need', { sets: 3 }),
      crowPose(day, 5, ph),
    ],
  },
  67: {
    title: 'Phase 2 Complete',
    text: 'Phase 2 complete. Strength through full range is online — Phase 3 is about putting it all together.',
    exercises: (day) => [
      pecStretch(day, 1, 2),
      forwardFold(day, 2, 2),
      e(day, 3, 'Pull-ups', 'max reps', { isGoal: true, goalText: 'Target for Phase 3: 5 × 8' }),
      e(day, 4, 'Pistol squat', 'first real attempt — full range or as low as controlled', { sets: 3 }),
      e(day, 5, 'Crow pose', '3 × best hold', { sets: 3, isGoal: true, goalText: 'Target for Phase 3: 3 × 25s+' }),
      e(day, 6, 'Bridge pose (wheel)', 'first attempt, wall-assisted if needed', { sets: 3 }),
    ],
  },
  85: {
    title: 'Late Check',
    text: 'Final stretch. Everything from here is about deepening what already works.',
    exercises: (day, ph) => [
      pecStretch(day, 1, ph),
      forwardFold(day, 2, ph),
      pullUps(day, 3, ph),
      e(day, 4, 'Pistol squat', '3 × best effort each leg', { sets: 3 }),
      crowPose(day, 5, ph),
      standingSplit(day, 6, ph),
    ],
  },
  100: {
    title: 'Capstone: 100 Days of Movement',
    text: '100 days of daily shoulder, hip, and leg work. Test everything — deep squat, dead hang, pull-ups, push-ups, pistol squat, crow pose, wheel pose, and your forward fold. Whatever the numbers say, you move better than Day 1.',
    exercises: (day, ph) => [
      squatHold(day, 1, ph),
      deadHang(day, 2, ph),
      pullUps(day, 3, ph),
      pushUps(day, 4, ph),
      pistolSquat(day, 5, ph),
      crowPose(day, 6, ph),
      bridgePose(day, 7, ph),
      forwardFold(day, 8, ph),
    ],
  },
}

// ─── Assemble all 100 days ────────────────────────────────────────────────────

function buildDay(day: number): DayPlan {
  const ph = phaseOf(day)
  const phaseLabel = PHASE_LABELS[ph]
  const milestone = MILESTONES[day]

  if (milestone) {
    return {
      day, type: 'milestone', phase: ph, phaseLabel,
      milestoneText: milestone.text,
      exercises: milestone.exercises(day, ph),
    }
  }

  const weekPos = ((day - 1) % 7) + 1
  if (weekPos === 7) {
    return { day, type: 'rest', phase: ph, phaseLabel, exercises: [] }
  }

  return { day, type: 'training', phase: ph, phaseLabel, exercises: trainingExercises(day, ph, weekPos) }
}

export const WORKOUT_DATA: DayPlan[] = Array.from({ length: 100 }, (_, i) => buildDay(i + 1))
