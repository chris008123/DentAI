import apiClient, { USE_MOCKS } from './apiClient'
import { mockDelay } from './mockHelpers'

let MOCK_PROFILE = {
  name: 'Dr. Demo',
  email: 'demo@dentai.app',
  clinicName: 'DentAI Clinic',
  role: 'Dentist',
}

let MOCK_NOTIFICATIONS = {
  emailAlerts: true,
  smsAlerts: false,
  weeklySummary: true,
}

const MOCK_SYSTEM_INFO = {
  version: '1.0.0',
  environment: 'Mock / Development',
  lastUpdated: '2026-07-01',
}

export const settingsApi = {
  async getProfile() {
    if (USE_MOCKS) return mockDelay(MOCK_PROFILE, 300)
    const { data } = await apiClient.get('/settings/profile')
    return data
  },

  async updateProfile(payload) {
    if (USE_MOCKS) {
      MOCK_PROFILE = { ...MOCK_PROFILE, ...payload }
      return mockDelay(MOCK_PROFILE, 400)
    }
    const { data } = await apiClient.put('/settings/profile', payload)
    return data
  },

  async updatePassword(payload) {
    if (USE_MOCKS) {
      if (payload.currentPassword !== 'password') {
        const err = new Error('Current password is incorrect')
        err.code = 'INVALID_PASSWORD'
        throw err
      }
      return mockDelay({ success: true }, 400)
    }
    const { data } = await apiClient.put('/settings/password', payload)
    return data
  },

  async getNotificationPreferences() {
    if (USE_MOCKS) return mockDelay(MOCK_NOTIFICATIONS, 250)
    const { data } = await apiClient.get('/settings/notifications')
    return data
  },

  async updateNotificationPreferences(payload) {
    if (USE_MOCKS) {
      MOCK_NOTIFICATIONS = { ...MOCK_NOTIFICATIONS, ...payload }
      return mockDelay(MOCK_NOTIFICATIONS, 300)
    }
    const { data } = await apiClient.put('/settings/notifications', payload)
    return data
  },

  async getSystemInfo() {
    if (USE_MOCKS) return mockDelay(MOCK_SYSTEM_INFO, 200)
    const { data } = await apiClient.get('/settings/system-info')
    return data
  },
}
