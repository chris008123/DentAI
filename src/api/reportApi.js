import apiClient, { USE_MOCKS } from './apiClient'
import { mockDelay } from './mockHelpers'

const MOCK_REPORTS = [
  { id: 'rep_1', patientName: 'Ama Boateng', type: 'Diagnosis Report', date: '2026-06-18', status: 'generated' },
  { id: 'rep_2', patientName: 'Kwame Owusu', type: 'Treatment Plan', date: '2026-07-02', status: 'generated' },
  { id: 'rep_3', patientName: 'Efua Mensah', type: 'Diagnosis Report', date: '2026-05-29', status: 'draft' },
  { id: 'rep_4', patientName: 'Yaw Darko', type: 'Treatment Plan', date: '2026-07-10', status: 'generated' },
  { id: 'rep_5', patientName: 'Abena Asante', type: 'Diagnosis Report', date: '2026-06-30', status: 'archived' },
  { id: 'rep_6', patientName: 'Kofi Appiah', type: 'Diagnosis Report', date: '2026-04-15', status: 'generated' },
]

function applyListParams(reports, { search = '', page = 1, pageSize = 5 } = {}) {
  let filtered = reports
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((r) => r.patientName.toLowerCase().includes(q))
  }
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const start = (page - 1) * pageSize
  return {
    items: filtered.slice(start, start + pageSize),
    page,
    pageCount,
    total: filtered.length,
  }
}

export const reportApi = {
  async list(params) {
    if (USE_MOCKS) {
      return mockDelay(applyListParams(MOCK_REPORTS, params), 350)
    }
    const { data } = await apiClient.get('/reports', { params })
    return data
  },

  async get(id) {
    if (USE_MOCKS) {
      const report = MOCK_REPORTS.find((r) => r.id === id)
      if (!report) {
        const err = new Error('Report not found')
        err.code = 'NOT_FOUND'
        throw err
      }
      return mockDelay(
        {
          ...report,
          summary:
            'Summary content for this report renders here once the backend report payload shape is finalized.',
        },
        300
      )
    }
    const { data } = await apiClient.get(`/reports/${id}`)
    return data
  },
}
