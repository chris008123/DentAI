import apiClient, { USE_MOCKS } from './apiClient'
import { mockDelay } from './mockHelpers'

const MOCK_RECENT_DIAGNOSES = [
  { id: 'sess_r1', patientId: 'pat_4', patientName: 'Yaw Darko', date: '2026-07-10', status: 'Completed' },
  { id: 'sess_r2', patientId: 'pat_7', patientName: 'Adjoa Frimpong', date: '2026-07-05', status: 'Completed' },
  { id: 'sess_r3', patientId: 'pat_2', patientName: 'Kwame Owusu', date: '2026-07-02', status: 'Processing' },
  { id: 'sess_r4', patientId: 'pat_5', patientName: 'Abena Asante', date: '2026-06-30', status: 'Completed' },
  { id: 'sess_r5', patientId: 'pat_1', patientName: 'Ama Boateng', date: '2026-06-18', status: 'Completed' },
]

const MOCK_STATS = {
  totalPatients: 8,
  diagnosesCompleted: 23,
  reportsGenerated: 6,
  systemStatus: 'operational',
}

export const dashboardApi = {
  async getStats() {
    if (USE_MOCKS) {
      return mockDelay(MOCK_STATS, 300)
    }
    const { data } = await apiClient.get('/dashboard/stats')
    return data
  },

  async getRecentDiagnoses({ page = 1, pageSize = 5 } = {}) {
    if (USE_MOCKS) {
      const pageCount = Math.max(1, Math.ceil(MOCK_RECENT_DIAGNOSES.length / pageSize))
      const start = (page - 1) * pageSize
      return mockDelay(
        {
          items: MOCK_RECENT_DIAGNOSES.slice(start, start + pageSize),
          page,
          pageCount,
        },
        300
      )
    }
    const { data } = await apiClient.get('/dashboard/recent-diagnoses', { params: { page, pageSize } })
    return data
  },
}
