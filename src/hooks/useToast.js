import { useContext } from 'react'
import { NotificationContext } from '@/contexts/NotificationContext'

export function useToast() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useToast must be used within NotificationProvider')
  const { notify } = ctx
  return {
    success: (msg, opts) => notify('success', msg, opts),
    error: (msg, opts) => notify('error', msg, opts),
    warning: (msg, opts) => notify('warning', msg, opts),
    info: (msg, opts) => notify('info', msg, opts),
  }
}
