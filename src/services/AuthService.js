import { authApi } from '@/api/authApi'
import { storage } from '@/utils/storage'
import { supabase } from '@/lib/supabaseClient'
import { USE_MOCKS } from '@/api/apiClient'

function normalizeError(error) {
  if (error.code === 'INVALID_CREDENTIALS') {
    return { message: 'Incorrect email or password.', code: error.code }
  }
  // Supabase errors carry a plain `.message` (e.g. "Invalid login credentials").
  return {
    message: error.message || error.response?.data?.message || 'Something went wrong. Please try again.',
    code: error.code ?? error.response?.status ?? 'UNKNOWN',
  }
}

export const AuthService = {
  async login(credentials) {
    try {
      const { token, user } = await authApi.login(credentials)
      storage.set('token', token)
      storage.set('user', user)
      return { user }
    } catch (error) {
      throw normalizeError(error)
    }
  },

  async register(payload) {
    try {
      const { token, user } = await authApi.register(payload)
      storage.set('token', token)
      storage.set('user', user)
      return { user }
    } catch (error) {
      throw normalizeError(error)
    }
  },

  async forgotPassword(email) {
    try {
      return await authApi.forgotPassword(email)
    } catch (error) {
      throw normalizeError(error)
    }
  },

  // Re-validates against Supabase (or the mock) rather than trusting the
  // cached user — used on app load so a revoked/expired session doesn't
  // silently keep someone "logged in" against stale localStorage.
  async getCurrentUser() {
    try {
      const user = await authApi.me()
      storage.set('user', user)
      return user
    } catch (error) {
      storage.remove('user')
      storage.remove('token')
      throw normalizeError(error)
    }
  },

  async logout() {
    try {
      await authApi.logout()
    } finally {
      storage.remove('token')
      storage.remove('user')
    }
  },

  getStoredUser() {
    return storage.get('user')
  },

  getStoredToken() {
    return storage.get('token')
  },

  // Keeps AuthContext in sync with Supabase session changes (token refresh,
  // sign-out from another tab, etc). No-op under mocks. Returns an
  // unsubscribe function.
  onAuthStateChange(callback) {
    if (USE_MOCKS) return () => {}
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session)
    })
    return () => subscription.unsubscribe()
  },
}
