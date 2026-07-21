import { treatmentApi } from '@/api/treatmentApi'

function normalizeError(error) {
  return {
    message: error.response?.data?.message || 'Something went wrong generating the treatment plan.',
    code: error.response?.status ?? 'UNKNOWN',
  }
}

export const TreatmentService = {
  async generate(sessionId) {
    try {
      return await treatmentApi.generate(sessionId)
    } catch (error) {
      throw normalizeError(error)
    }
  },
}
