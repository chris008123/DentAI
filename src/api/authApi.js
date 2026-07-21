import apiClient, { USE_MOCKS } from './apiClient'
import { mockDelay } from './mockHelpers'

export const authApi = {
  async login({ email, password }) {
    if (USE_MOCKS) {
      if (!email || !password) {
        const err = new Error('Invalid credentials')
        err.code = 'INVALID_CREDENTIALS'
        throw err
      }
      return mockDelay({
        token: 'mock-jwt-token',
        user: {
          id: 'usr_1',
          name: email.split('@')[0],
          email,
          role: 'dentist',
        },
      })
    }
    const { data } = await apiClient.post('/auth/login', { email, password })
    return data
  },

  async register(payload) {
    if (USE_MOCKS) {
      return mockDelay({
        token: 'mock-jwt-token',
        user: { id: 'usr_new', name: payload.name, email: payload.email, role: 'dentist' },
      })
    }
    const { data } = await apiClient.post('/auth/register', payload)
    return data
  },

  async forgotPassword(email) {
    if (USE_MOCKS) {
      return mockDelay({ success: true })
    }
    const { data } = await apiClient.post('/auth/forgot-password', { email })
    return data
  },

  async me() {
    if (USE_MOCKS) {
      return mockDelay({ id: 'usr_1', name: 'Dr. Demo', email: 'demo@dentai.app', role: 'dentist' })
    }
    const { data } = await apiClient.get('/auth/me')
    return data
  },
}
