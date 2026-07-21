import { useCallback, useEffect, useState } from 'react'

// Desktop: collapsed (icon-only) vs expanded. Mobile: closed vs open drawer.
// Kept as one hook since both are "is the sidebar visible" in spirit, but the
// two states are independent so resizing doesn't fight the user's choice.
export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    if (!isMobileOpen) return
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isMobileOpen])

  const toggleCollapsed = useCallback(() => setIsCollapsed((v) => !v), [])
  const toggleMobile = useCallback(() => setIsMobileOpen((v) => !v), [])
  const closeMobile = useCallback(() => setIsMobileOpen(false), [])

  return { isCollapsed, toggleCollapsed, isMobileOpen, toggleMobile, closeMobile }
}
