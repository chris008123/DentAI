import { useEffect, useRef, useState } from 'react'

/**
 * Polls `fn` every `intervalMs` until `stopWhen(result)` returns true.
 * Returns the latest result, loading/error state, and stops automatically
 * on unmount so a completed Processing page never leaks a timer.
 */
export function usePolling(fn, { intervalMs = 800, stopWhen = () => false, enabled = true } = {}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const timerRef = useRef(null)
  const stoppedRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    stoppedRef.current = false

    const tick = async () => {
      if (stoppedRef.current) return
      try {
        const result = await fn()
        if (stoppedRef.current) return
        setData(result)
        if (stopWhen(result)) {
          stoppedRef.current = true
          return
        }
        timerRef.current = setTimeout(tick, intervalMs)
      } catch (err) {
        if (!stoppedRef.current) setError(err)
      }
    }

    tick()

    return () => {
      stoppedRef.current = true
      clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  return { data, error }
}
