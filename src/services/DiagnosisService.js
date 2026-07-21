import { diagnosisApi } from '@/api/diagnosisApi'

function normalizeError(error) {
  return {
    message:
      error.code === 'NOT_FOUND'
        ? 'This diagnosis session could not be found.'
        : error.response?.data?.message || 'Something went wrong. Please try again.',
    code: error.code ?? error.response?.status ?? 'UNKNOWN',
  }
}

export const DiagnosisService = {
  async submit(payload) {
    try {
      return await diagnosisApi.submit(payload)
    } catch (error) {
      throw normalizeError(error)
    }
  },

  async getStatus(sessionId) {
    try {
      return await diagnosisApi.getStatus(sessionId)
    } catch (error) {
      throw normalizeError(error)
    }
  },

  async getResult(sessionId) {
    try {
      return await diagnosisApi.getResult(sessionId)
    } catch (error) {
      throw normalizeError(error)
    }
  },
}
