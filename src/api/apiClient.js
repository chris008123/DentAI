import axios from 'axios'
import { storage } from '@/utils/storage'
import { ROUTES } from '@/constants/routes'

export const USE_MOCKS = String(import.meta.env.VITE_USE_MOCKS ?? 'true') === 'true'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
  const token = storage.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.remove('token')
      storage.remove('user')
      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.assign(ROUTES.LOGIN)
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
