import { useState, useEffect, useRef } from 'react'
import type { ExerciseItem } from '../../types'
import { DEMO_VIDEOS } from '../../data/demoVideos'
import { EXERCISE_DESCRIPTIONS } from '../../data/exerciseDescriptions'

type Props = {
  item: ExerciseItem
  index: number
  total: number
  isLast: boolean
  onDone: () => void
  onSkip: () => void
  onBack: () => void
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  if (m > 0) return `${m}:${sec.toString().padStart(2, '0')}`
  return `${sec}s`
}

export function ExerciseCard({ item, index, total, isLast, onDone, onSkip, onBack }: Props) {
  const hasTimer = !!item.timerSeconds
  const [timerState, setTimerState] = useState<'idle' | 'running' | 'done'>('idle')
  const [remaining, setRemaining] = useState(item.timerSeconds ?? 0)
  const [currentSet, setCurrentSet] = useState(1)
  const [showVideo, setShowVideo] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSets = item.sets && item.timerSeconds ? item.sets : 1
  const videoId = DEMO_VIDEOS[item.name]
  const description = EXERCISE_DESCRIPTIONS[item.name]

  // Reset state when exercise changes
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimerState('idle')
    setRemaining(item.timerSeconds ?? 0)
    setCurrentSet(1)
    setShowVideo(false)
  }, [item.id, item.timerSeconds])

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const startTimer = () => {
    if (timerState === 'running') return
    setTimerState('running')
    setRemaining(item.timerSeconds!)
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          if (currentSet < totalSets) {
            setCurrentSet(s => s + 1)
            setTimerState('idle')
          } else {
            setTimerState('done')
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimerState('idle')
    setRemaining(item.timerSeconds!)
  }

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimerState('idle')
    setCurrentSet(1)
    setRemaining(item.timerSeconds!)
  }

  const sectionLabel = item.isWarmup ? 'Warm-Up' : 'Workout'

  return (
    <div className="flex flex-col h-full bg-bg" style={{ paddingTop: 'env(safe-area-inset-top)' }}>

      {/* Top bar — back + progress */}
      <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0">
        <button onClick={onBack} className="text-subtle p-1 -ml-1 flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Progress dots */}
        <div className="flex-1 flex items-center gap-1 overflow-hidden">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                i < index ? 'bg-success' : i === index ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>

        <span className="text-xs text-subtle flex-shrink-0 tabular-nums">{index + 1} / {total}</span>
      </div>

      {/* Scrollable card content */}
      <div className="flex-1 overflow-y-auto px-5 pb-36">

        {/* Section label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-subtle mb-3">
          {sectionLabel}
        </p>

        {/* Exercise name */}
        <h2 className="text-3xl font-bold text-text tracking-tight leading-tight mb-2">
          {item.name}
        </h2>

        {/* Detail */}
        <p className="text-xl text-subtle mb-4">{item.detail}</p>

        {/* How-to description */}
        {description && (
          <p className="text-base text-subtle leading-relaxed mb-5 border-l-2 border-border pl-4">
            {description}
          </p>
        )}

        {/* Goal callout */}
        {item.isGoal && item.goalText && (
          <div className="bg-warning/10 border border-warning/20 rounded-xl px-4 py-3 mb-5">
            <p className="text-warning text-sm font-medium">{item.goalText}</p>
          </div>
        )}

        {/* Timer */}
        {hasTimer && (
          <div className="bg-surface border border-border rounded-2xl px-5 py-5 mb-5">
            {timerState === 'idle' && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text font-medium">
                    {formatTime(item.timerSeconds!)} hold
                    {totalSets > 1 && <span className="text-subtle font-normal"> · Set {currentSet} of {totalSets}</span>}
                  </p>
                  <p className="text-subtle text-sm mt-0.5">Tap to start timer</p>
                </div>
                <button
                  onClick={startTimer}
                  className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </button>
              </div>
            )}

            {timerState === 'running' && (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-5xl font-mono font-bold text-accent tabular-nums">
                    {formatTime(remaining)}
                  </div>
                  {totalSets > 1 && (
                    <p className="text-subtle text-sm mt-1">Set {currentSet} of {totalSets}</p>
                  )}
                </div>
                <button
                  onClick={stopTimer}
                  className="w-12 h-12 rounded-full bg-border flex items-center justify-center flex-shrink-0"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text">
                    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                  </svg>
                </button>
              </div>
            )}

            {timerState === 'done' && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-success font-semibold text-lg">
                    {currentSet >= totalSets ? 'All sets done!' : `Set ${currentSet - 1} done`}
                  </p>
                  <p className="text-subtle text-sm mt-0.5">Tap to reset</p>
                </div>
                <button
                  onClick={resetTimer}
                  className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Demo video */}
        {videoId && (
          <div className="mb-5">
            {!showVideo ? (
              <button
                onClick={() => setShowVideo(true)}
                className="w-full flex items-center justify-center gap-2 border border-border rounded-2xl py-4 text-subtle text-sm font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
                </svg>
                Watch Demo
              </button>
            ) : (
              <div className="rounded-2xl overflow-hidden bg-black">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`Demo: ${item.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <button
                  onClick={() => setShowVideo(false)}
                  className="w-full py-3 text-subtle text-sm"
                >
                  Hide video
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-4 bg-bg/95 backdrop-blur border-t border-border"
           style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}>
        <button
          onClick={onDone}
          className="w-full py-4 rounded-2xl bg-accent text-white text-base font-semibold mb-2"
        >
          {isLast ? 'Complete Day ✓' : 'Done → Next'}
        </button>
        <button
          onClick={onSkip}
          className="w-full py-2 text-subtle text-sm"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
