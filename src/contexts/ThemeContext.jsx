import { createContext, useMemo } from 'react'

export const ThemeContext = createContext(null)

// v1 ships one theme (dark, per the design brief). The context exists so a
// future light/dark toggle in Settings doesn't require touching every
// consumer — only this provider.
export function ThemeProvider({ children }) {
  const value = useMemo(() => ({ theme: 'dark' }), [])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
