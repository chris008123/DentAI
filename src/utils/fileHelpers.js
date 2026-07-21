import { CBCT_ACCEPTED_EXTENSIONS, CBCT_MAX_SIZE_MB } from '@/constants/upload'

export function getFileExtension(filename) {
  const lower = filename.toLowerCase()
  const match = CBCT_ACCEPTED_EXTENSIONS.find((ext) => lower.endsWith(ext))
  if (match) return match
  const parts = lower.split('.')
  return parts.length > 1 ? `.${parts.at(-1)}` : ''
}

export function validateCbctFile(file) {
  const ext = getFileExtension(file.name)
  if (!CBCT_ACCEPTED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported file type. Accepted formats: ${CBCT_ACCEPTED_EXTENSIONS.join(', ')}`,
    }
  }
  const sizeMb = file.size / (1024 * 1024)
  if (sizeMb > CBCT_MAX_SIZE_MB) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${CBCT_MAX_SIZE_MB}MB.`,
    }
  }
  return { valid: true, error: null }
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
