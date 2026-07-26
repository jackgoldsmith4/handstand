# Movement App

React + TypeScript + Vite PWA for a 100-day bodyweight mobility & strength program.

## Tech Stack
- React 19, TypeScript, Tailwind CSS 3, Vite
- State: custom `useAppState` hook + `localStorage` (key: `movement_app_state`)
- No external state management library

## Key Files
- `app/src/hooks/useAppState.ts` — all state logic, day calculation
- `app/src/types/index.ts` — core types (`AppState`, `DayPlan`, etc.)
- `app/src/components/shared/SettingsSheet.tsx` — settings modal
- `app/src/App.tsx` — root component, wires everything together
- `app/src/data/workoutData.ts` — generates the 100-day plan from a small set of reusable exercises (see `100_day_movement_plan.md` at the repo root for the design)

## Day Calculation
`getCurrentTrainingDay(startDate, dayOffset)` in `useAppState.ts`:
- Computes `(today - startDate) + 1 + dayOffset`, clamped to [1, 100]
- Uses local midnight (appends `T00:00:00` before parsing)
- `dayOffset` is stored in `AppState.dayOffset` and persists in localStorage
- `setCurrentDay(day)` sets offset so the calendar-based day maps to `day`

## AppState Shape
```ts
{
  startDate: string | null   // YYYY-MM-DD, Day 1
  progress: DayProgress[]
  dayOffset: number          // manual day shift; default 0
}
```

## Settings
- Backup / Restore via base64-encoded JSON
- Reset All Progress
- **Current Day** — +/− buttons and number input to shift the current day

## Archived Program
A previous 100-day handstand program lives at `/archive/handstand-program/` (plan doc + data files), parked but not deleted. It is not wired into the app.
