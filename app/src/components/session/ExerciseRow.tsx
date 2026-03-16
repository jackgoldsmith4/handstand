import { useState, useEffect, useRef } from 'react'
import type { ExerciseItem } from '../../types'
import { DEMO_VIDEOS } from '../../data/demoVideos'

type Props = {
  item: ExerciseItem
  checked: boolean
  onCheck: () => void
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  if (m > 0) return `${m}:${sec.toString().padStart(2, '0')}`
  return `${sec}s`
}

export function ExerciseRow({ item, checked, onCheck }: Props) {
  const hasTimer = !!item.timerSeconds
  const [timerState, setTimerState] = useState<'idle' | 'running' | 'done'>('idle')
  const [remaining, setRemaining] = useState(item.timerSeconds ?? 0)
  const [currentSet, setCurrentSet] = useState(1)
  const [showVideo, setShowVideo] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSets = item.sets && item.timerSeconds ? item.sets : 1
  const videoId = DEMO_VIDEOS[item.name]

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
            setTimeout(onCheck, 400)
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

  return (
    <div className={`border-b border-border last:border-0 transition-opacity ${checked ? 'opacity-40' : 'opacity-100'}`}>
      <div className="flex items-start gap-4 px-5 py-4">
        {/* Checkbox */}
        <button
          onClick={onCheck}
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            checked ? 'bg-success border-success' : 'border-muted'
          }`}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name row + demo button */}
          <div className="flex items-start justify-between gap-2">
            <p className={`text-base font-medium leading-snug ${checked ? 'line-through text-subtle' : 'text-text'}`}>
              {item.name}
            </p>
            {videoId && (
              <button
                onClick={() => setShowVideo(v => !v)}
                className={`flex-shrink-0 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg transition-colors ${
                  showVideo
                    ? 'bg-accent text-white'
                    : 'bg-accent/10 text-accent'
                }`}
              >
                {showVideo ? (
                  <>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Hide
                  </>
                ) : (
                  <>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Demo
                  </>
                )}
              </button>
            )}
          </div>

          <p className="text-sm text-subtle mt-0.5">{item.detail}</p>
          {item.isGoal && item.goalText && (
            <p className="text-xs text-warning mt-1 font-medium">{item.goalText}</p>
          )}

          {/* Inline YouTube embed */}
          {showVideo && videoId && (
            <div className="mt-3 rounded-xl overflow-hidden bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={`Demo: ${item.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {/* Timer UI */}
          {hasTimer && !checked && (
            <div className="mt-3">
              {timerState === 'idle' && (
                <button
                  onClick={startTimer}
                  className="flex items-center gap-2 bg-accent/10 text-accent text-sm px-3 py-1.5 rounded-lg font-medium"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Start {formatTime(item.timerSeconds!)}
                  {totalSets > 1 && ` · Set ${currentSet}/${totalSets}`}
                </button>
              )}
              {timerState === 'running' && (
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-mono font-bold text-accent tabular-nums w-16">
                    {formatTime(remaining)}
                  </div>
                  {totalSets > 1 && (
                    <span className="text-xs text-subtle">Set {currentSet}/{totalSets}</span>
                  )}
                  <button onClick={stopTimer} className="text-subtle text-xs px-2 py-1 rounded border border-border">
                    Stop
                  </button>
                </div>
              )}
              {timerState === 'done' && (
                <div className="flex items-center gap-3">
                  <span className="text-success text-sm font-medium">Done!</span>
                  <button onClick={resetTimer} className="text-subtle text-xs px-2 py-1 rounded border border-border">
                    Reset
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
