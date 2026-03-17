import { useEffect, useRef } from 'react'

export function useWakeLock(active: boolean) {
  const lockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return

    let released = false

    const acquire = async () => {
      try {
        lockRef.current = await navigator.wakeLock.request('screen')
      } catch {
        // Wake lock denied (e.g. low battery) — fail silently
      }
    }

    // Re-acquire after tab becomes visible again (OS releases it automatically on hide)
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !released) acquire()
    }

    acquire()
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      released = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      lockRef.current?.release()
      lockRef.current = null
    }
  }, [active])
}
