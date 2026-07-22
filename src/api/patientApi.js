import apiClient, { USE_MOCKS } from './apiClient'
import { mockDelay } from './mockHelpers'

const MOCK_PATIENTS = [
  { id: 'pat_1', name: 'Ama Boateng', age: 34, sex: 'female', phone: '+233 24 111 2222', lastVisit: '2026-06-18', diagnosesCount: 3 },
  { id: 'pat_2', name: 'Kwame Owusu', age: 51, sex: 'male', phone: '+233 20 333 4444', lastVisit: '2026-07-02', diagnosesCount: 1 },
  { id: 'pat_3', name: 'Efua Mensah', age: 27, sex: 'female', phone: '+233 27 555 6666', lastVisit: '2026-05-29', diagnosesCount: 5 },
  { id: 'pat_4', name: 'Yaw Darko', age: 42, sex: 'male', phone: '+233 55 777 8888', lastVisit: '2026-07-10', diagnosesCount: 2 },
  { id: 'pat_5', name: 'Abena Asante', age: 19, sex: 'female', phone: '+233 26 999 0000', lastVisit: '2026-06-30', diagnosesCount: 1 },
  { id: 'pat_6', name: 'Kofi Appiah', age: 63, sex: 'male', phone: '+233 24 121 3131', lastVisit: '2026-04-15', diagnosesCount: 4 },
  { id: 'pat_7', name: 'Adjoa Frimpong', age: 8, sex: 'female', phone: '+233 20 141 5151', lastVisit: '2026-07-05', diagnosesCount: 1 },
  { id: 'pat_8', name: 'Kwabena Antwi', age: 71, sex: 'male', phone: '+233 27 161 7171', lastVisit: '2026-03-22', diagnosesCount: 6 },
]

function applyListParams(patients, { search = '', sort, page = 1, pageSize = 5 } = {}) {
  let filtered = patients
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q))
  }
  if (sort?.key) {
    filtered = [...filtered].sort((a, b) => {
      const dir = sort.direction === 'desc' ? -1 : 1
      if (a[sort.key] < b[sort.key]) return -1 * dir
      if (a[sort.key] > b[sort.key]) return 1 * dir
      return 0
    })
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

export const patientApi = {
  async list(params) {
    if (USE_MOCKS) {
      return mockDelay(applyListParams(MOCK_PATIENTS, params), 350)
    }
    const { data } = await apiClient.get('/patients', { params })
    return data
  },

  async get(id) {
    if (USE_MOCKS) {
      const patient = MOCK_PATIENTS.find((p) => p.id === id)
      if (!patient) {
        const err = new Error('Patient not found')
        err.code = 'NOT_FOUND'
        throw err
      }
      return mockDelay(patient, 300)
    }
    const { data } = await apiClient.get(`/patients/${id}`)
    return data
  },

  async create(payload) {
    if (USE_MOCKS) {
      const newPatient = { id: `pat_${Date.now()}`, diagnosesCount: 0, lastVisit: null, ...payload }
      MOCK_PATIENTS.unshift(newPatient)
      return mockDelay(newPatient, 350)
    }
    const { data } = await apiClient.post('/patients', payload)
    return data
  },

  async update(id, payload) {
    if (USE_MOCKS) {
      const index = MOCK_PATIENTS.findIndex((p) => p.id === id)
      if (index === -1) {
        const err = new Error('Patient not found')
        err.code = 'NOT_FOUND'
        throw err
      }
      MOCK_PATIENTS[index] = { ...MOCK_PATIENTS[index], ...payload }
      return mockDelay(MOCK_PATIENTS[index], 350)
    }
    const { data } = await apiClient.put(`/patients/${id}`, payload)
    return data
  },

  async remove(id) {
    if (USE_MOCKS) {
      const index = MOCK_PATIENTS.findIndex((p) => p.id === id)
      if (index !== -1) MOCK_PATIENTS.splice(index, 1)
      return mockDelay({ success: true }, 300)
    }
    const { data } = await apiClient.delete(`/patients/${id}`)
    return data
  },
}
