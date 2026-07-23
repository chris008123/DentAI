import axios from 'axios'
import { ROUTES } from '@/constants/routes'
import { supabase } from '@/lib/supabaseClient'

export const USE_MOCKS = String(import.meta.env.VITE_USE_MOCKS ?? 'true') === 'true'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
})

// Other resource APIs (patients, diagnoses, etc.) still call the FastAPI
// backend directly — they authenticate with the same Supabase-issued JWT so
// the backend can verify it, rather than a separately managed token.
apiClient.interceptors.request.use(async (config) => {
  if (!USE_MOCKS) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut()
      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.assign(ROUTES.LOGIN)
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
