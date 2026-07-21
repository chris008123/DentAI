import { createContext, useCallback, useMemo, useState } from 'react'
import { AuthService } from '@/services/AuthService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => AuthService.getStoredUser())
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (credentials) => {
    setIsLoading(true)
    try {
      const { user: loggedInUser } = await AuthService.login(credentials)
      setUser(loggedInUser)
      return loggedInUser
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (payload) => {
    setIsLoading(true)
    try {
      const { user: newUser } = await AuthService.register(payload)
      setUser(newUser)
      return newUser
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    AuthService.logout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
