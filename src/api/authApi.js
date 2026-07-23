import { USE_MOCKS } from './apiClient'
import { mockDelay } from './mockHelpers'
import { supabase } from '@/lib/supabaseClient'

// Maps a Supabase auth user (+ optional profiles row) into the shape the
// rest of the app expects: { id, name, email, role, clinicName }.
// Adjust the `profiles` table/column names below if yours differ.
async function toAppUser(authUser) {
  if (!authUser) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .single()

  return {
    id: authUser.id,
    name: profile?.name ?? authUser.user_metadata?.name ?? authUser.email,
    email: authUser.email,
    role: profile?.role ?? 'dentist',
    clinicName: profile?.clinic_name ?? null,
  }
}

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

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const user = await toAppUser(data.user)
    return { token: data.session?.access_token ?? null, user }
  },

  async register({ name, email, password }) {
    if (USE_MOCKS) {
      return mockDelay({
        token: 'mock-jwt-token',
        user: { id: 'usr_new', name, email, role: 'dentist' },
      })
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) throw error

    // If email confirmation is enabled in your Supabase project, `session`
    // will be null here until the user confirms — the caller should handle
    // a null token by prompting them to check their email.
    const user = await toAppUser(data.user)
    return { token: data.session?.access_token ?? null, user }
  },

  async forgotPassword(email) {
    if (USE_MOCKS) {
      return mockDelay({ success: true })
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return { success: true }
  },

  async me() {
    if (USE_MOCKS) {
      return mockDelay({ id: 'usr_1', name: 'Dr. Demo', email: 'demo@dentai.app', role: 'dentist' })
    }
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser()
    if (error || !authUser) {
      const err = error ?? new Error('Not authenticated')
      err.code = err.code ?? 'NOT_AUTHENTICATED'
      throw err
    }
    return toAppUser(authUser)
  },

  async logout() {
    if (USE_MOCKS) return mockDelay({ success: true }, 100)
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  },
}
