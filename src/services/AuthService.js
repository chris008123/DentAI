import { authApi } from '@/api/authApi'
import { storage } from '@/utils/storage'

function normalizeError(error) {
  if (error.code === 'INVALID_CREDENTIALS') {
    return { message: 'Incorrect email or password.', code: error.code }
  }
  return {
    message: error.response?.data?.message || 'Something went wrong. Please try again.',
    code: error.response?.status ?? 'UNKNOWN',
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

  logout() {
    storage.remove('token')
    storage.remove('user')
  },

  getStoredUser() {
    return storage.get('user')
  },

  getStoredToken() {
    return storage.get('token')
  },
}
