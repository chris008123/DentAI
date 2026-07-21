const NAMESPACE = 'dentai'

const key = (k) => `${NAMESPACE}:${k}`

export const storage = {
  get(k) {
    try {
      const raw = localStorage.getItem(key(k))
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },
  set(k, value) {
    try {
      localStorage.setItem(key(k), JSON.stringify(value))
    } catch {
      // storage unavailable (private mode, quota) — fail silently, non-critical
    }
  },
  remove(k) {
    localStorage.removeItem(key(k))
  },
}
