import { createContext, useCallback, useMemo, useState } from 'react'

export const NotificationContext = createContext(null)

let idCounter = 0

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (type, message, { duration = 4000 } = {}) => {
      const id = ++idCounter
      setToasts((prev) => [...prev, { id, type, message }])
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration)
      }
      return id
    },
    [dismiss]
  )

  const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
