import { Outlet } from 'react-router-dom'
import { Stethoscope } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
            <Stethoscope className="h-5.5 w-5.5 text-accent" />
          </div>
          <span className="font-display text-lg font-semibold text-text">DentAI</span>
        </div>
        <div className="rounded-card border border-border bg-surface p-6 shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
