import { reportApi } from '@/api/reportApi'

function normalizeError(error) {
  return {
    message:
      error.code === 'NOT_FOUND'
        ? 'This report could not be found.'
        : error.response?.data?.message || 'Something went wrong. Please try again.',
    code: error.code ?? error.response?.status ?? 'UNKNOWN',
  }
}

export const ReportService = {
  async list(params) {
    try {
      return await reportApi.list(params)
    } catch (error) {
      throw normalizeError(error)
    }
  },
  async get(id) {
    try {
      return await reportApi.get(id)
    } catch (error) {
      throw normalizeError(error)
    }
  },
}
