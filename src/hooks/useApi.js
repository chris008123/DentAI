import { useCallback, useEffect, useState } from 'react'

// Generic { data, loading, error, refetch } wrapper around any service call.
// `fn` should be a stable callback (e.g. wrapped in useCallback by the
// caller) that returns a promise.
export function useApi(fn, { immediate = true } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const run = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)
      try {
        const result = await fn(...args)
        setData(result)
        return result
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fn]
  )

  useEffect(() => {
    if (immediate) {
      run().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error, refetch: run }
}
