import type { DayPlan, ExerciseItem } from '../types'
import { WRIST_WARMUP } from './warmup'

// Helper to build a unique exercise id
const e = (day: number, idx: number, name: string, detail: string, opts: Partial<ExerciseItem> = {}): ExerciseItem => ({
  id: `d${day}-${idx}`,
  name,
  detail,
  isWarmup: false,
  isGoal: false,
  ...opts,
})

const wu = (day: number): ExerciseItem[] =>
  WRIST_WARMUP.map(w => ({ ...w, id: `d${day}-${w.id}` }))

// Recovery exercises shown on rest days
const REST_RECOVERY_BASE: Omit<ExerciseItem, 'id'>[] = [
  { name: 'Wrist circles', detail: '30 sec each direction', isWarmup: false, isGoal: false, timerSeconds: 30 },
  { name: 'Prayer stretch', detail: '30 sec', isWarmup: false, isGoal: false, timerSeconds: 30 },
  { name: 'Reverse prayer stretch', detail: '30 sec', isWarmup: false, isGoal: false, timerSeconds: 30 },
  { name: 'Overhead reach stretch', detail: '30 sec each arm', isWarmup: false, isGoal: false, timerSeconds: 30 },
  { name: 'Puppy pose', detail: '60 sec', isWarmup: false, isGoal: false, timerSeconds: 60 },
  { name: 'Shoulder dislocates (towel)', detail: '10 slow reps', isWarmup: false, isGoal: false },
]

export const restRecovery = (day: number): ExerciseItem[] =>
  REST_RECOVERY_BASE.map((ex, i) => ({ ...ex, id: `d${day}-rec-${i}` }))

// ─── PHASE 1: Days 1–33 ───────────────────────────────────────────────────────

const phase1Label = 'Foundation & Conditioning'

// ─── PHASE 2: Days 34–67 ─────────────────────────────────────────────────────

const phase2Label = 'Wall Refinement & Kick-Ups'

// ─── PHASE 3: Days 68–100 ────────────────────────────────────────────────────

const phase3Label = 'Freestanding Development'

export const WORKOUT_DATA: DayPlan[] = [
  // ── Day 1 ──
  {
    day: 1, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(1),
      e(1,1,'Quadruped rocking','3 × 10', { sets: 3 }),
      e(1,2,'Hollow body hold','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(1,3,'Scapular push-ups','3 × 10', { sets: 3 }),
      e(1,4,'Frog stand','5 attempts, hold as long as possible', { sets: 5 }),
      e(1,5,'Dead bug','3 × 8 each side', { sets: 3 }),
      e(1,6,'Glute bridge','3 × 10', { sets: 3 }),
      e(1,7,'Puppy pose','60 sec', { timerSeconds: 60 }),
      e(1,8,'Standing forward fold','60 sec', { timerSeconds: 60 }),
    ],
  },
  // ── Day 2 ──
  {
    day: 2, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(2),
      e(2,1,'Pike push-ups','3 × 5', { sets: 3 }),
      e(2,2,'Hollow body hold','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(2,3,'Quadruped rocking','3 × 10', { sets: 3 }),
      e(2,4,'Bird dog','3 × 8 each side', { sets: 3 }),
      e(2,5,'Side plank','2 × 20 sec each side', { sets: 2, timerSeconds: 20 }),
      e(2,6,'Wall slides','2 × 10', { sets: 2 }),
      e(2,7,'Frog stand','3 × max hold', { sets: 3 }),
      e(2,8,'High lunge stretch','30 sec each side', { timerSeconds: 30 }),
    ],
  },
  // ── Day 3 — REST ──
  { day: 3, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 4 ──
  {
    day: 4, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(4),
      e(4,1,'Quadruped rocking','3 × 10', { sets: 3 }),
      e(4,2,'Hollow body hold','3 × 25 sec', { sets: 3, timerSeconds: 25 }),
      e(4,3,'Frog stand','3 × max hold', { sets: 3 }),
      e(4,4,'Scapular push-ups','3 × 10', { sets: 3 }),
      e(4,5,'Pike push-ups','3 × 5', { sets: 3 }),
      e(4,6,'Dead bug','3 × 10 each side', { sets: 3 }),
      e(4,7,'Glute bridge','3 × 10', { sets: 3 }),
      e(4,8,'Shoulder shrugs (all fours)','3 × 10', { sets: 3 }),
      e(4,9,'Puppy pose','60 sec', { timerSeconds: 60 }),
    ],
  },
  // ── Day 5 ──
  {
    day: 5, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(5),
      e(5,1,'Hollow body hold','3 × 25 sec', { sets: 3, timerSeconds: 25 }),
      e(5,2,'Frog stand','3 × max hold', { sets: 3 }),
      e(5,3,'Pike push-ups','3 × 6', { sets: 3 }),
      e(5,4,'Bird dog','3 × 8 each side', { sets: 3 }),
      e(5,5,'Wall slides','2 × 10', { sets: 2 }),
      e(5,6,'Thread the needle','10 each side', { sets: 2 }),
      e(5,7,'Overhead wall stretch','60 sec', { timerSeconds: 60 }),
      e(5,8,'Standing forward fold','60 sec', { timerSeconds: 60 }),
    ],
  },
  // ── Day 6 ──
  {
    day: 6, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(6),
      e(6,1,'Quadruped rocking','3 × 10', { sets: 3 }),
      e(6,2,'Hollow body hold','3 × 30 sec', { sets: 3, timerSeconds: 30 }),
      e(6,3,'Frog stand','5 × max hold', { sets: 5 }),
      e(6,4,'Scapular push-ups','3 × 10', { sets: 3 }),
      e(6,5,'Pike push-ups','3 × 6', { sets: 3 }),
      e(6,6,'Side plank','3 × 20 sec each side', { sets: 3, timerSeconds: 20 }),
      e(6,7,'Diamond push-ups','2 × 5', { sets: 2 }),
      e(6,8,'Puppy pose','60 sec', { timerSeconds: 60 }),
      e(6,9,'Wall slides','2 × 10', { sets: 2 }),
      e(6,10,'Doorway shoulder stretch','30 sec each side', { timerSeconds: 30 }),
    ],
  },
  // ── Day 7 — REST ──
  { day: 7, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 8 ──
  {
    day: 8, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(8),
      e(8,1,'Hollow body hold','3 × 30 sec', { sets: 3, timerSeconds: 30 }),
      e(8,2,'Hollow body rocks','3 × 10', { sets: 3 }),
      e(8,3,'Frog stand','5 × max hold (target: 5 sec)', { sets: 5 }),
      e(8,4,'Shoulder shrugs in plank','3 × 10', { sets: 3 }),
      e(8,5,'Pike push-ups','4 × 6', { sets: 4 }),
      e(8,6,'Dead bug','3 × 10 each side', { sets: 3 }),
      e(8,7,'Glute bridge','3 × 12', { sets: 3 }),
      e(8,8,'Elevated pike push-ups','3 × 5 — feet on low step or stair', { sets: 3 }),
      e(8,9,'Wall walks','3 × 3 reps', { sets: 3 }),
    ],
  },
  // ── Day 9 ──
  {
    day: 9, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(9),
      e(9,1,'Wall walks','3 × 4 reps', { sets: 3 }),
      e(9,2,'Hollow body hold','3 × 30 sec', { sets: 3, timerSeconds: 30 }),
      e(9,3,'Frog stand','5 × max hold', { sets: 5 }),
      e(9,4,'Bird dog','3 × 8 each side', { sets: 3 }),
      e(9,5,'L-sit tuck hold','3 × 10 sec', { sets: 3, timerSeconds: 10 }),
      e(9,6,'Scapular push-ups','3 × 10', { sets: 3 }),
      e(9,7,'Pike push-ups','4 × 7', { sets: 4 }),
      e(9,8,'Puppy pose','60 sec', { timerSeconds: 60 }),
      e(9,9,'High lunge stretch','30 sec each side', { timerSeconds: 30 }),
    ],
  },
  // ── Day 10 — REST ──
  { day: 10, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 11 ──
  {
    day: 11, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(11),
      e(11,1,'Wall walks','3 × 4-5 reps', { sets: 3 }),
      e(11,2,'Headstand','3 × 10 sec', { sets: 3, timerSeconds: 10 }),
      e(11,3,'Hollow body hold','3 × 35 sec', { sets: 3, timerSeconds: 35 }),
      e(11,4,'Frog stand','5 × max hold (target: 8 sec)', { sets: 5 }),
      e(11,5,'Dead bug','3 × 12 each side', { sets: 3 }),
      e(11,6,'Side plank','3 × 25 sec each side', { sets: 3, timerSeconds: 25 }),
      e(11,7,'L-sit tuck hold','3 × 12 sec', { sets: 3, timerSeconds: 12 }),
      e(11,8,'Pike push-ups','4 × 7', { sets: 4 }),
      e(11,9,'Shoulder shrugs in downward dog','3 × 10', { sets: 3 }),
    ],
  },
  // ── Day 12 ──
  {
    day: 12, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(12),
      e(12,1,'Wall walks','4 × 4-5 reps', { sets: 4 }),
      e(12,2,'Headstand','3 × 15 sec', { sets: 3, timerSeconds: 15 }),
      e(12,3,'Hollow body hold','3 × 35 sec', { sets: 3, timerSeconds: 35 }),
      e(12,4,'Frog stand','5 × max hold', { sets: 5 }),
      e(12,5,'Active pike compression','3 × 10 — seated, lift straight legs off floor', { sets: 3 }),
      e(12,6,'Elevated pike push-ups','3 × 6', { sets: 3 }),
      e(12,7,'Pike push-ups','4 × 8', { sets: 4 }),
      e(12,8,'Standing forward fold','60 sec', { timerSeconds: 60 }),
      e(12,9,'Pigeon pose','45 sec each side', { timerSeconds: 45 }),
      e(12,10,'Overhead wall stretch','60 sec', { timerSeconds: 60 }),
    ],
  },
  // ── Day 13 — REST ──
  { day: 13, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 14 — MILESTONE ──
  {
    day: 14, type: 'milestone', phase: 1, phaseLabel: phase1Label,
    milestoneText: 'Can you hold a frog stand for 10 seconds? Hollow body for 30 seconds? L-sit tuck for 10 seconds? If yes, proceed to Day 15. If not, repeat Days 8–14.',
    exercises: [
      ...wu(14),
      e(14,1,'Frog stand','3 × max hold', { sets: 3, isGoal: true, goalText: 'Goal: 10 seconds' }),
      e(14,2,'Hollow body hold','3 × max hold', { sets: 3, timerSeconds: 30, isGoal: true, goalText: 'Goal: 30 seconds' }),
      e(14,3,'L-sit tuck hold','3 × max hold', { sets: 3, timerSeconds: 10, isGoal: true, goalText: 'Goal: 10 seconds' }),
      e(14,4,'Wall walks','4 × 5 reps', { sets: 4 }),
      e(14,5,'Headstand','3 × 15 sec', { sets: 3, timerSeconds: 15 }),
      e(14,6,'Pike push-ups','4 × 8', { sets: 4 }),
      e(14,7,'Full shoulder mobility circuit','Puppy pose (60s), wall slides (2×10), doorway stretch (30s)', { timerSeconds: 60 }),
    ],
  },
  // ── Day 15 ──
  {
    day: 15, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(15),
      e(15,1,'Chest-to-wall handstand','5 attempts — face wall, hands 15–20 cm away, kick up', { sets: 5, isGoal: true, goalText: 'First attempts — just get feet on wall' }),
      e(15,2,'Hollow body hold','3 × 35 sec', { sets: 3, timerSeconds: 35 }),
      e(15,3,'Dead bug','3 × 12 each side', { sets: 3 }),
      e(15,4,'L-sit tuck hold','3 × 15 sec', { sets: 3, timerSeconds: 15 }),
      e(15,5,'Wall walks','4 × 5 reps', { sets: 4 }),
      e(15,6,'Headstand','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(15,7,'Pike push-ups','4 × 8', { sets: 4 }),
      e(15,8,'Scapular push-ups','3 × 10', { sets: 3 }),
    ],
  },
  // ── Day 16 ──
  {
    day: 16, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(16),
      e(16,1,'Chest-to-wall handstand','5 × max hold', { sets: 5 }),
      e(16,2,'Hollow body hold','3 × 40 sec', { sets: 3, timerSeconds: 40 }),
      e(16,3,'Side plank','3 × 30 sec each side', { sets: 3, timerSeconds: 30 }),
      e(16,4,'Diamond push-ups','3 × 6', { sets: 3 }),
      e(16,5,'Wall walks','4 × 5 reps', { sets: 4 }),
      e(16,6,'Headstand','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(16,7,'Pike push-ups','4 × 8', { sets: 4 }),
      e(16,8,'Puppy pose','60 sec', { timerSeconds: 60 }),
      e(16,9,'Standing forward fold','60 sec', { timerSeconds: 60 }),
      e(16,10,'High lunge stretch','30 sec each side', { timerSeconds: 30 }),
    ],
  },
  // ── Day 17 — REST ──
  { day: 17, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 18 ──
  {
    day: 18, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(18),
      e(18,1,'Chest-to-wall handstand','5 × max hold', { sets: 5 }),
      e(18,2,'Shoulder shrugs in handstand','2 × 10', { sets: 2 }),
      e(18,3,'Hollow body hold','3 × 40 sec', { sets: 3, timerSeconds: 40 }),
      e(18,4,'Active pike compression','3 × 10', { sets: 3 }),
      e(18,5,'L-sit tuck hold','3 × 15 sec', { sets: 3, timerSeconds: 15 }),
      e(18,6,'Elevated pike push-ups','3 × 6', { sets: 3 }),
      e(18,7,'Wall walks','3 × 5 reps', { sets: 3 }),
      e(18,8,'Headstand','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(18,9,'Pike push-ups','4 × 9', { sets: 4 }),
    ],
  },
  // ── Day 19 ──
  {
    day: 19, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(19),
      e(19,1,'Chest-to-wall handstand','5 × max hold', { sets: 5 }),
      e(19,2,'Hollow body hold','3 × 45 sec', { sets: 3, timerSeconds: 45 }),
      e(19,3,'Dead bug','3 × 12 each side', { sets: 3 }),
      e(19,4,'Bird dog','3 × 10 each side', { sets: 3 }),
      e(19,5,'Pike push-ups','4 × 9', { sets: 4 }),
      e(19,6,'Dead hang','3 × 30 sec', { sets: 3, timerSeconds: 30 }),
      e(19,7,'Puppy pose','60 sec', { timerSeconds: 60 }),
      e(19,8,'Overhead wall stretch','60 sec', { timerSeconds: 60 }),
    ],
  },
  // ── Day 20 ──
  {
    day: 20, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(20),
      e(20,1,'Chest-to-wall handstand','5 × max hold', { sets: 5 }),
      e(20,2,'Shoulder shrugs in handstand','3 × 10', { sets: 3 }),
      e(20,3,'Hollow body hold','3 × 45 sec', { sets: 3, timerSeconds: 45 }),
      e(20,4,'Side plank','3 × 35 sec each side', { sets: 3, timerSeconds: 35 }),
      e(20,5,'Wall walks','4 × 5 reps', { sets: 4 }),
      e(20,6,'Pike push-ups','4 × 10', { sets: 4 }),
      e(20,7,'Full flexibility routine','Forward fold, pigeon, overhead stretch — 10 min', { timerSeconds: 60 }),
    ],
  },
  // ── Day 21 — REST ──
  { day: 21, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 22 ──
  {
    day: 22, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(22),
      e(22,1,'Chest-to-wall handstand','5 × max hold (target: 15 sec)', { sets: 5, timerSeconds: 15 }),
      e(22,2,'Shoulder shrugs in handstand','3 × 10', { sets: 3 }),
      e(22,3,'Hollow body hold','3 × 45 sec', { sets: 3, timerSeconds: 45 }),
      e(22,4,'Hollow body rocks','3 × 10', { sets: 3 }),
      e(22,5,'Active pike compression','3 × 12', { sets: 3 }),
      e(22,6,'L-sit tuck hold','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(22,7,'Diamond push-ups','3 × 7', { sets: 3 }),
      e(22,8,'Pike push-ups','4 × 10', { sets: 4 }),
      e(22,9,'Scapular push-ups','3 × 10', { sets: 3 }),
    ],
  },
  // ── Day 23 ──
  {
    day: 23, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(23),
      e(23,1,'Chest-to-wall handstand','5 × max hold', { sets: 5 }),
      e(23,2,'Hollow body hold','3 × 50 sec', { sets: 3, timerSeconds: 50 }),
      e(23,3,'Elevated pike push-ups','3 × 8 — feet on chair height', { sets: 3 }),
      e(23,4,'Pike push-ups','4 × 10', { sets: 4 }),
      e(23,5,'Wall slides','3 × 10', { sets: 3 }),
      e(23,6,'Pigeon pose','60 sec each side', { timerSeconds: 60 }),
      e(23,7,'Standing forward fold','60 sec', { timerSeconds: 60 }),
      e(23,8,'Doorway shoulder stretch','30 sec', { timerSeconds: 30 }),
    ],
  },
  // ── Day 24 — REST ──
  { day: 24, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 25 ──
  {
    day: 25, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(25),
      e(25,1,'Chest-to-wall handstand','5 × max hold (target: 20 sec)', { sets: 5, timerSeconds: 20 }),
      e(25,2,'Shoulder shrugs in handstand','3 × 10', { sets: 3 }),
      e(25,3,'Hollow body hold','3 × 50 sec', { sets: 3, timerSeconds: 50 }),
      e(25,4,'Bird dog','3 × 10 each side', { sets: 3 }),
      e(25,5,'L-sit tuck hold','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(25,6,'Active pike compression','3 × 12', { sets: 3 }),
      e(25,7,'Wall walks','4 × 5 reps', { sets: 4 }),
      e(25,8,'Pike push-ups','4 × 10', { sets: 4 }),
      e(25,9,'Dead hang + scapular pulls','3 × 10', { sets: 3 }),
    ],
  },
  // ── Day 26 ──
  {
    day: 26, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(26),
      e(26,1,'Chest-to-wall handstand','5 × max hold', { sets: 5 }),
      e(26,2,'Hollow body hold','3 × 55 sec', { sets: 3, timerSeconds: 55 }),
      e(26,3,'Hollow body rocks','3 × 10', { sets: 3 }),
      e(26,4,'Side plank','3 × 35 sec each side', { sets: 3, timerSeconds: 35 }),
      e(26,5,'Diamond push-ups','3 × 8', { sets: 3 }),
      e(26,6,'Pike push-ups','4 × 10', { sets: 4 }),
      e(26,7,'Shoulder dislocates (towel)','2 × 10', { sets: 2 }),
      e(26,8,'Wall slides','2 × 10', { sets: 2 }),
      e(26,9,'Puppy pose','60 sec', { timerSeconds: 60 }),
    ],
  },
  // ── Day 27 — REST ──
  { day: 27, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 28 — MILESTONE ──
  {
    day: 28, type: 'milestone', phase: 1, phaseLabel: phase1Label,
    milestoneText: 'Can you hold a 20-second chest-to-wall handstand? Hollow body for 60 seconds? L-sit tuck for 20 seconds? Great work — keep pushing.',
    exercises: [
      ...wu(28),
      e(28,1,'Chest-to-wall handstand','5 × max hold', { sets: 5, isGoal: true, goalText: 'Goal: 20 second hold' }),
      e(28,2,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60, isGoal: true, goalText: 'Goal: 60 seconds' }),
      e(28,3,'L-sit tuck hold','3 × max hold', { sets: 3, timerSeconds: 20, isGoal: true, goalText: 'Goal: 20 seconds' }),
      e(28,4,'Wall walks','4 × 5 reps', { sets: 4 }),
      e(28,5,'Pike push-ups','4 × 10', { sets: 4 }),
      e(28,6,'Full flexibility routine','Forward fold, pigeon, overhead stretch — 10 min'),
    ],
  },
  // ── Day 29 ──
  {
    day: 29, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(29),
      e(29,1,'Chest-to-wall handstand','5 × max hold', { sets: 5 }),
      e(29,2,'Shoulder shrugs in handstand','3 × 10', { sets: 3 }),
      e(29,3,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(29,4,'Dead bug','3 × 15 each side', { sets: 3 }),
      e(29,5,'Elevated pike push-ups','3 × 8', { sets: 3 }),
      e(29,6,'Pike push-ups','4 × 10', { sets: 4 }),
      e(29,7,'Headstand','3 × 30 sec', { sets: 3, timerSeconds: 30 }),
    ],
  },
  // ── Day 30 ──
  {
    day: 30, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(30),
      e(30,1,'Chest-to-wall handstand','5 × max hold', { sets: 5 }),
      e(30,2,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(30,3,'Bird dog','3 × 10 each side', { sets: 3 }),
      e(30,4,'Side plank','3 × 40 sec each side', { sets: 3, timerSeconds: 40 }),
      e(30,5,'Pike push-ups','4 × 10', { sets: 4 }),
      e(30,6,'Scapular push-ups','3 × 10', { sets: 3 }),
      e(30,7,'Full flexibility routine','15 min — pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 31 ──
  {
    day: 31, type: 'training', phase: 1, phaseLabel: phase1Label,
    exercises: [
      ...wu(31),
      e(31,1,'Chest-to-wall handstand','5 × max hold (target: 45 sec)', { sets: 5, timerSeconds: 45 }),
      e(31,2,'Shoulder shrugs in handstand','3 × 10', { sets: 3 }),
      e(31,3,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(31,4,'Hollow body rocks','3 × 10', { sets: 3 }),
      e(31,5,'L-sit tuck hold','3 × 25 sec', { sets: 3, timerSeconds: 25 }),
      e(31,6,'Active pike compression','3 × 15', { sets: 3 }),
      e(31,7,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 32 — REST ──
  { day: 32, type: 'rest', phase: 1, phaseLabel: phase1Label, exercises: [] },
  // ── Day 33 — PHASE 1 MILESTONE ──
  {
    day: 33, type: 'milestone', phase: 1, phaseLabel: phase1Label,
    milestoneText: 'PHASE 1 COMPLETE! 60-second chest-to-wall handstand with straight arms and flat back. This is the foundation for everything. If not there yet, spend a few extra days before moving on.',
    exercises: [
      ...wu(33),
      e(33,1,'Chest-to-wall handstand','Attempt a 60 sec continuous hold', { timerSeconds: 60, isGoal: true, goalText: 'Goal: 60 second unbroken hold' }),
      e(33,2,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(33,3,'L-sit tuck hold','3 × max hold', { sets: 3, timerSeconds: 25, isGoal: true, goalText: 'Goal: 25 seconds' }),
      e(33,4,'Pike push-ups','4 × 10', { sets: 4 }),
      e(33,5,'Full shoulder mobility circuit','Dislocates, wall slides, puppy pose — 10 min'),
      e(33,6,'Full flexibility routine','Pigeon, forward fold, overhead stretch — 10 min'),
    ],
  },

  // ─── PHASE 2 ───────────────────────────────────────────────────────────────

  // ── Day 34 ──
  {
    day: 34, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(34),
      e(34,1,'Pirouette bail','5 bails each side — kick to wall, overbalance, cartwheel out', { sets: 5, isGoal: true, goalText: 'Learn this NOW — it removes fear of falling' }),
      e(34,2,'Wall-facing handstand','5 attempts — belly toward wall, forces straight body', { sets: 5, isGoal: true, goalText: 'New: belly to wall forces real alignment' }),
      e(34,3,'Chest-to-wall handstand','3 × 60 sec (or 5 × max)', { sets: 3, timerSeconds: 60 }),
      e(34,4,'HSPU negatives','3 × 3 — kick to wall, lower head to floor over 5 sec, step down', { sets: 3 }),
      e(34,5,'Shoulder shrugs in handstand','3 × 10', { sets: 3 }),
      e(34,6,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(34,7,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 35 ──
  {
    day: 35, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(35),
      e(35,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(35,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(35,3,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(35,4,'Fingertip pressure drill','3 × 10 shifts — in handstand, shift weight forward to fingertips, hold 3 sec, shift back', { sets: 3, timerSeconds: 3 }),
      e(35,5,'L-sit tuck hold','3 × 25 sec', { sets: 3, timerSeconds: 25 }),
      e(35,6,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(35,7,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 36 — REST ──
  { day: 36, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },
  // ── Day 37 ──
  {
    day: 37, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(37),
      e(37,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(37,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(37,3,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(37,4,'HSPU negatives','3 × 3', { sets: 3 }),
      e(37,5,'Fingertip pressure drill','3 × 10 shifts', { sets: 3 }),
      e(37,6,'Shoulder shrugs in handstand','3 × 10', { sets: 3 }),
      e(37,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(37,8,'Full flexibility routine','Pigeon, overhead stretch, puppy pose'),
    ],
  },
  // ── Day 38 ──
  {
    day: 38, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(38),
      e(38,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(38,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(38,3,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(38,4,'Fingertip pressure drill','3 × 10 shifts', { sets: 3 }),
      e(38,5,'Shoulder taps','3 × 4 per side — in handstand, lift one hand, tap opposite shoulder', { sets: 3 }),
      e(38,6,'L-sit tuck hold','3 × 25 sec', { sets: 3, timerSeconds: 25 }),
      e(38,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(38,8,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 39 ──
  {
    day: 39, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(39),
      e(39,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(39,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(39,3,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(39,4,'HSPU negatives','3 × 4', { sets: 3 }),
      e(39,5,'Fingertip pressure drill','3 × 10 shifts', { sets: 3 }),
      e(39,6,'Shoulder taps','3 × 5 per side', { sets: 3 }),
      e(39,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 40 — REST ──
  { day: 40, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },
  // ── Day 41 ──
  {
    day: 41, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(41),
      e(41,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(41,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(41,3,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(41,4,'Fingertip pressure drill','3 × 10 shifts', { sets: 3 }),
      e(41,5,'Shoulder taps','3 × 6 per side', { sets: 3 }),
      e(41,6,'Active pike compression','3 × 15', { sets: 3 }),
      e(41,7,'Kick-up practice','15 attempts — lunge stance, controlled kick, aim to touch wall', { sets: 15, isGoal: true, goalText: 'Controlled drive — do NOT kick hard' }),
      e(41,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 42 ──
  {
    day: 42, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(42),
      e(42,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(42,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(42,3,'HSPU negatives','3 × 4', { sets: 3 }),
      e(42,4,'Kick-up practice','15-20 attempts', { sets: 15 }),
      e(42,5,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(42,6,'Shoulder taps','3 × 6 per side', { sets: 3 }),
      e(42,7,'Fingertip pressure drill','3 × 10 shifts', { sets: 3 }),
      e(42,8,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 43 — REST ──
  { day: 43, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },
  // ── Day 44 ──
  {
    day: 44, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(44),
      e(44,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(44,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(44,3,'Kick-up practice','15-20 attempts', { sets: 15 }),
      e(44,4,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(44,5,'Fingertip pressure drill','3 × 10 shifts', { sets: 3 }),
      e(44,6,'Shoulder taps','3 × 7 per side', { sets: 3 }),
      e(44,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(44,8,'Full flexibility routine','Pigeon, forward fold, high lunge'),
    ],
  },
  // ── Day 45 ──
  {
    day: 45, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(45),
      e(45,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(45,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(45,3,'HSPU negatives','3 × 5 — 5 sec descent', { sets: 3 }),
      e(45,4,'Kick-up practice','20 attempts', { sets: 20 }),
      e(45,5,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(45,6,'Shoulder taps','3 × 7 per side', { sets: 3 }),
      e(45,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(45,8,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 46 ──
  {
    day: 46, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(46),
      e(46,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(46,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(46,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(46,4,'Chest-to-wall handstand','3 × max hold', { sets: 3 }),
      e(46,5,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(46,6,'L-sit tuck hold','3 × 30 sec', { sets: 3, timerSeconds: 30 }),
      e(46,7,'One-foot peel','3 × 5 each side — in handstand, peel one foot off wall, hold 5 sec', { sets: 3, timerSeconds: 5 }),
      e(46,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 47 — REST ──
  { day: 47, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },
  // ── Day 48 ──
  {
    day: 48, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(48),
      e(48,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(48,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(48,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(48,4,'Kick-up practice','20 attempts', { sets: 20 }),
      e(48,5,'One-foot peel','3 × 5 each side, 5 sec holds', { sets: 3, timerSeconds: 5 }),
      e(48,6,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(48,7,'Chest-to-wall handstand','2 × max hold', { sets: 2 }),
      e(48,8,'Pike push-ups','4 × 10', { sets: 4 }),
      e(48,9,'Full flexibility routine','Pigeon, forward fold, high lunge'),
    ],
  },
  // ── Day 49 ──
  {
    day: 49, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(49),
      e(49,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(49,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(49,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(49,4,'One-foot peel','3 × 5 each side, 5 sec holds', { sets: 3, timerSeconds: 5 }),
      e(49,5,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(49,6,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(49,7,'Headstand','3 × 30 sec', { sets: 3, timerSeconds: 30 }),
    ],
  },
  // ── Day 50 ──
  {
    day: 50, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(50),
      e(50,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(50,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(50,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(50,4,'One-foot peel','3 × 5 each side', { sets: 3, timerSeconds: 5 }),
      e(50,5,'L-sit tuck hold','3 × 30 sec', { sets: 3, timerSeconds: 30 }),
      e(50,6,'Tuck handstand','5 attempts — kick up, pull knees to chest, hold', { sets: 5, timerSeconds: 3, isGoal: true, goalText: 'Target: 1-3 second holds using fingertip adjustments' }),
      e(50,7,'Chest-to-wall handstand','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(50,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 51 — REST ──
  { day: 51, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },
  // ── Day 52 ──
  {
    day: 52, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(52),
      e(52,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(52,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(52,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(52,4,'Kick-up practice','20 attempts', { sets: 20 }),
      e(52,5,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(52,6,'One-foot peel','3 × 5 each side', { sets: 3, timerSeconds: 5 }),
      e(52,7,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(52,8,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 53 ──
  {
    day: 53, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(53),
      e(53,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(53,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(53,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(53,4,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(53,5,'Fingertip pressure drill','5 min continuous', { timerSeconds: 300 }),
      e(53,6,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(53,7,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 54 — REST ──
  { day: 54, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },
  // ── Day 55 ──
  {
    day: 55, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(55),
      e(55,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(55,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(55,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(55,4,'Kick-up practice','20 attempts', { sets: 20 }),
      e(55,5,'Tuck handstand','5 × max hold', { sets: 5, timerSeconds: 3, isGoal: true, goalText: 'Target: 3 seconds' }),
      e(55,6,'One-foot peel','3 × 5 each side', { sets: 3, timerSeconds: 5 }),
      e(55,7,'L-sit','3 × 5 sec — both legs straight', { sets: 3, timerSeconds: 5 }),
      e(55,8,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(55,9,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 56 ──
  {
    day: 56, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(56),
      e(56,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(56,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(56,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(56,4,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(56,5,'Chest-to-wall handstand','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(56,6,'Pike push-ups','4 × 10', { sets: 4 }),
      e(56,7,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 57 ──
  {
    day: 57, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(57),
      e(57,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(57,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(57,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(57,4,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(57,5,'One-foot peel','5 × 5 sec each side', { sets: 5, timerSeconds: 5 }),
      e(57,6,'L-sit','3 × 8 sec', { sets: 3, timerSeconds: 8 }),
      e(57,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 58 — REST ──
  { day: 58, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },
  // ── Day 59 ──
  {
    day: 59, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(59),
      e(59,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(59,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(59,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(59,4,'Kick-up practice','20 attempts', { sets: 20 }),
      e(59,5,'Tuck handstand','5 × max hold (target: 5 sec)', { sets: 5, timerSeconds: 5 }),
      e(59,6,'Single-leg extensions','3 × 3 each side — from tuck handstand, extend one leg up', { sets: 3 }),
      e(59,7,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(59,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 60 — MILESTONE ──
  {
    day: 60, type: 'milestone', phase: 2, phaseLabel: phase2Label,
    milestoneText: 'Halfway there! More than half your kick-ups should be reaching vertical. 5-second tuck holds are the goal. If not there yet, spend a few more days before Phase 3.',
    exercises: [
      ...wu(60),
      e(60,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(60,2,'Wall-facing handstand','5 × max hold', { sets: 5, isGoal: true, goalText: 'Goal: straight body, no banana arch' }),
      e(60,3,'Kick-up practice','20 attempts', { sets: 20, isGoal: true, goalText: 'Goal: 50%+ reaching vertical with wall catch' }),
      e(60,4,'Tuck handstand','5 × max hold', { sets: 5, timerSeconds: 5, isGoal: true, goalText: 'Goal: 5 seconds' }),
      e(60,5,'Single-leg extensions','3 × 3 each side', { sets: 3 }),
      e(60,6,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(60,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 61 ──
  {
    day: 61, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(61),
      e(61,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(61,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(61,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(61,4,'Kick-up practice','20 attempts', { sets: 20 }),
      e(61,5,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(61,6,'Single-leg extensions','3 × 5 each side', { sets: 3 }),
      e(61,7,'Chest-to-wall handstand','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(61,8,'Full flexibility routine','Pigeon, overhead stretch, puppy pose'),
    ],
  },
  // ── Day 62 ──
  {
    day: 62, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(62),
      e(62,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(62,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(62,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(62,4,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(62,5,'Single-leg extensions','3 × 5 each side', { sets: 3 }),
      e(62,6,'L-sit','3 × 10 sec', { sets: 3, timerSeconds: 10 }),
      e(62,7,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(62,8,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 63 — REST ──
  { day: 63, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },
  // ── Day 64 ──
  {
    day: 64, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(64),
      e(64,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(64,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(64,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(64,4,'Kick-up practice','20 attempts', { sets: 20 }),
      e(64,5,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(64,6,'Single-leg extensions','3 × 5 each side', { sets: 3 }),
      e(64,7,'Wall floats','5 tries — from chest-to-wall, peel BOTH feet off wall', { sets: 5, isGoal: true, goalText: 'First freestanding floats — any time counts' }),
      e(64,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 65 ──
  {
    day: 65, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(65),
      e(65,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(65,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(65,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(65,4,'Wall floats','5-8 attempts', { sets: 6 }),
      e(65,5,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(65,6,'Shoulder taps','3 × 8 per side', { sets: 3 }),
      e(65,7,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 66 ──
  {
    day: 66, type: 'training', phase: 2, phaseLabel: phase2Label,
    exercises: [
      ...wu(66),
      e(66,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(66,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(66,3,'Kick-up practice','20 attempts', { sets: 20 }),
      e(66,4,'Wall floats','5-8 attempts', { sets: 6 }),
      e(66,5,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(66,6,'Single-leg extensions','3 × 5 each side', { sets: 3 }),
      e(66,7,'L-sit','3 × 10 sec', { sets: 3, timerSeconds: 10 }),
      e(66,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 67 — REST ──
  { day: 67, type: 'rest', phase: 2, phaseLabel: phase2Label, exercises: [] },

  // ─── PHASE 3 ───────────────────────────────────────────────────────────────

  // ── Day 68 ──
  {
    day: 68, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(68),
      e(68,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(68,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(68,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(68,4,'Chest-to-wall with shoulder taps','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(68,5,'Wall floats','10 attempts', { sets: 10 }),
      e(68,6,'Freestanding kick-ups','20 attempts — try to float without wall', { sets: 20 }),
      e(68,7,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(68,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 69 ──
  {
    day: 69, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(69),
      e(69,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(69,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(69,3,'Chest-to-wall handstand','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(69,4,'Wall floats','10 attempts', { sets: 10 }),
      e(69,5,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(69,6,'L-sit','3 × 12 sec', { sets: 3, timerSeconds: 12 }),
      e(69,7,'Straddle handstand','5 attempts — kick up, spread legs wide in V-shape', { sets: 5, isGoal: true, goalText: 'Easier to balance than straight — good stepping stone' }),
      e(69,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 70 ──
  {
    day: 70, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(70),
      e(70,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(70,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(70,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(70,4,'Wall floats','10 attempts', { sets: 10 }),
      e(70,5,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(70,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(70,7,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(70,8,'Pike push-ups','4 × 10', { sets: 4 }),
      e(70,9,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 71 — REST ──
  { day: 71, type: 'rest', phase: 3, phaseLabel: phase3Label, exercises: [] },
  // ── Day 72 ──
  {
    day: 72, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(72),
      e(72,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(72,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(72,3,'Chest-to-wall with fingertip shifts','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(72,4,'Wall floats','10 attempts', { sets: 10 }),
      e(72,5,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(72,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(72,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 73 ──
  {
    day: 73, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(73),
      e(73,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(73,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(73,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(73,4,'Wall floats','10 attempts', { sets: 10 }),
      e(73,5,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(73,6,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(73,7,'Single-leg extensions','3 × 5 each side', { sets: 3 }),
      e(73,8,'Tuck-to-straight extension','3 × 3 — from tuck, slowly extend both legs straight', { sets: 3 }),
      e(73,9,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 74 ──
  {
    day: 74, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(74),
      e(74,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(74,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(74,3,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(74,4,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(74,5,'Tuck-to-straight extension','3 × 3', { sets: 3 }),
      e(74,6,'L-sit','3 × 15 sec', { sets: 3, timerSeconds: 15 }),
      e(74,7,'Chest-to-wall handstand','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(74,8,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 75 — MILESTONE ──
  {
    day: 75, type: 'milestone', phase: 3, phaseLabel: phase3Label,
    milestoneText: 'Can you float off the wall for 1–2 seconds? Wall-facing handstand forcing a straight body? That\'s your brain beginning to wire the balance reflex. Every second counts now.',
    exercises: [
      ...wu(75),
      e(75,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(75,2,'Wall-facing handstand','5 × max hold', { sets: 5, isGoal: true, goalText: 'Goal: straight body, no arch — check yourself vs the wall' }),
      e(75,3,'Wall floats','10 attempts', { sets: 10, isGoal: true, goalText: 'Goal: 1-2 second freestanding float' }),
      e(75,4,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(75,5,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(75,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(75,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 76 — REST ──
  { day: 76, type: 'rest', phase: 3, phaseLabel: phase3Label, exercises: [] },
  // ── Day 77 ──
  {
    day: 77, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(77),
      e(77,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(77,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(77,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(77,4,'Wall floats','10 attempts', { sets: 10 }),
      e(77,5,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(77,6,'Tuck-to-straight extension','3 × 3', { sets: 3 }),
      e(77,7,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(77,8,'Max hold attempts','3 dedicated attempts — full rest between each', { sets: 3 }),
      e(77,9,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 78 ──
  {
    day: 78, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(78),
      e(78,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(78,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(78,3,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(78,4,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(78,5,'Max hold attempts','3 dedicated attempts', { sets: 3 }),
      e(78,6,'L-sit','3 × 15 sec', { sets: 3, timerSeconds: 15 }),
      e(78,7,'Tuck-to-straight extension','3 × 3', { sets: 3 }),
      e(78,8,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 79 ──
  {
    day: 79, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(79),
      e(79,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(79,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(79,3,'Wall floats','10 attempts', { sets: 10 }),
      e(79,4,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(79,5,'Max hold attempts','3 dedicated attempts', { sets: 3 }),
      e(79,6,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(79,7,'Pike push-ups','4 × 10', { sets: 4 }),
      e(79,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 80 — REST ──
  { day: 80, type: 'rest', phase: 3, phaseLabel: phase3Label, exercises: [] },
  // ── Day 81 ──
  {
    day: 81, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(81),
      e(81,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(81,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(81,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(81,4,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(81,5,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(81,6,'Tuck-to-straight extension','3 × 5', { sets: 3 }),
      e(81,7,'Max hold attempts','3 dedicated attempts', { sets: 3 }),
      e(81,8,'Chest-to-wall with shoulder taps','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(81,9,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 82 ──
  {
    day: 82, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(82),
      e(82,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(82,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(82,3,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(82,4,'Max hold attempts','3 dedicated attempts', { sets: 3 }),
      e(82,5,'L-sit','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(82,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(82,7,'Tuck-to-straight extension','3 × 5', { sets: 3 }),
      e(82,8,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 83 ──
  {
    day: 83, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(83),
      e(83,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(83,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(83,3,'Wall floats','10 attempts', { sets: 10 }),
      e(83,4,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(83,5,'Max hold attempts','3 dedicated attempts', { sets: 3 }),
      e(83,6,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(83,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 84 — REST ──
  { day: 84, type: 'rest', phase: 3, phaseLabel: phase3Label, exercises: [] },
  // ── Day 85 — MILESTONE ──
  {
    day: 85, type: 'milestone', phase: 3, phaseLabel: phase3Label,
    milestoneText: 'Target: a 3–5 second straight-body freestanding handstand. You\'re in the final stretch.',
    exercises: [
      ...wu(85),
      e(85,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(85,2,'Wall-facing handstand','5 × max hold', { sets: 5, isGoal: true, goalText: 'Benchmark: is your alignment visibly straighter vs Week 1?' }),
      e(85,3,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(85,4,'Max hold attempts','5 dedicated attempts', { sets: 5, isGoal: true, goalText: 'Goal: 3-5 second straight-body hold' }),
      e(85,5,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(85,6,'Tuck-to-straight extension','3 × 5', { sets: 3 }),
      e(85,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 86 ──
  {
    day: 86, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(86),
      e(86,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(86,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(86,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(86,4,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(86,5,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(86,6,'Chest-to-wall with fingertip shifts','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(86,7,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 87 ──
  {
    day: 87, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(87),
      e(87,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(87,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(87,3,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(87,4,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(87,5,'L-sit','3 × 20 sec', { sets: 3, timerSeconds: 20 }),
      e(87,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(87,7,'Tuck-to-straight extension','3 × 5', { sets: 3 }),
      e(87,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 88 — REST ──
  { day: 88, type: 'rest', phase: 3, phaseLabel: phase3Label, exercises: [] },
  // ── Day 89 ──
  {
    day: 89, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(89),
      e(89,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(89,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(89,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(89,4,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(89,5,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(89,6,'Tuck handstand','5 × max hold', { sets: 5 }),
      e(89,7,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(89,8,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 90 — MILESTONE ──
  {
    day: 90, type: 'milestone', phase: 3, phaseLabel: phase3Label,
    milestoneText: '10 days left. Can you hold a freestanding handstand for 3–5 seconds? The final push starts now.',
    exercises: [
      ...wu(90),
      e(90,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(90,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(90,3,'Freestanding kick-ups','20 attempts', { sets: 20 }),
      e(90,4,'Max hold attempts','5 dedicated attempts', { sets: 5, isGoal: true, goalText: 'Goal: 3-5 second freestanding handstand' }),
      e(90,5,'L-sit','3 × max hold', { sets: 3, timerSeconds: 20, isGoal: true, goalText: 'Benchmark: how long can you hold?' }),
      e(90,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(90,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(90,8,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 91 ──
  {
    day: 91, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(91),
      e(91,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(91,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(91,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(91,4,'Freestanding kick-ups','25 attempts', { sets: 25 }),
      e(91,5,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(91,6,'Tuck-to-straight extension','3 × 5', { sets: 3 }),
      e(91,7,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(91,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 92 ──
  {
    day: 92, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(92),
      e(92,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(92,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(92,3,'Freestanding kick-ups','25 attempts', { sets: 25 }),
      e(92,4,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(92,5,'L-sit','3 × max hold', { sets: 3, timerSeconds: 20 }),
      e(92,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(92,7,'Pike push-ups','4 × 10', { sets: 4 }),
      e(92,8,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 93 — REST ──
  { day: 93, type: 'rest', phase: 3, phaseLabel: phase3Label, exercises: [] },
  // ── Day 94 ──
  {
    day: 94, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(94),
      e(94,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(94,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(94,3,'Freestanding kick-ups','25 attempts', { sets: 25 }),
      e(94,4,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(94,5,'Chest-to-wall with shoulder taps','2 × 60 sec', { sets: 2, timerSeconds: 60 }),
      e(94,6,'Tuck-to-straight extension','3 × 5', { sets: 3 }),
      e(94,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 95 ──
  {
    day: 95, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(95),
      e(95,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(95,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(95,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(95,4,'Freestanding kick-ups','25 attempts', { sets: 25 }),
      e(95,5,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(95,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(95,7,'Single-leg extensions','5 × 5 each side', { sets: 5 }),
      e(95,8,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 96 ──
  {
    day: 96, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(96),
      e(96,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(96,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(96,3,'Freestanding kick-ups','25 attempts', { sets: 25 }),
      e(96,4,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(96,5,'L-sit','3 × max hold', { sets: 3, timerSeconds: 20 }),
      e(96,6,'Tuck-to-straight extension','3 × 5', { sets: 3 }),
      e(96,7,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(96,8,'Pike push-ups','4 × 10', { sets: 4 }),
    ],
  },
  // ── Day 97 — REST ──
  { day: 97, type: 'rest', phase: 3, phaseLabel: phase3Label, exercises: [] },
  // ── Day 98 ──
  {
    day: 98, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(98),
      e(98,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(98,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(98,3,'HSPU negatives','3 × 5', { sets: 3 }),
      e(98,4,'Freestanding kick-ups','25 attempts', { sets: 25 }),
      e(98,5,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(98,6,'Straddle handstand','5 × max hold', { sets: 5 }),
      e(98,7,'Tuck-to-straight extension','5 × 5', { sets: 5 }),
      e(98,8,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
    ],
  },
  // ── Day 99 ──
  {
    day: 99, type: 'training', phase: 3, phaseLabel: phase3Label,
    exercises: [
      ...wu(99),
      e(99,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(99,2,'Wall-facing handstand','5 × max hold', { sets: 5 }),
      e(99,3,'Freestanding kick-ups','25 attempts', { sets: 25 }),
      e(99,4,'Max hold attempts','5 dedicated attempts', { sets: 5 }),
      e(99,5,'Full shoulder mobility circuit','Dislocates, wall slides, puppy pose — 10 min', { timerSeconds: 60 }),
      e(99,6,'Hollow body hold','3 × 60 sec', { sets: 3, timerSeconds: 60 }),
      e(99,7,'Full flexibility routine','Pigeon, forward fold, overhead stretch'),
    ],
  },
  // ── Day 100 — FINAL TEST ──
  {
    day: 100, type: 'milestone', phase: 3, phaseLabel: phase3Label,
    milestoneText: 'Day 100. This is it. Record yourself if you can. Give your 10 best attempts. You\'ve earned this.',
    exercises: [
      ...wu(100),
      e(100,1,'Pirouette bail','10 bails', { sets: 10 }),
      e(100,2,'Freestanding kick-ups','20 warm-up attempts', { sets: 20 }),
      e(100,3,'Max hold attempts','10 dedicated attempts — rest 3-5 min between each', { sets: 10, isGoal: true, goalText: 'Goal: 5-10 second freestanding straight-body handstand' }),
    ],
  },
]
