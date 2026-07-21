// Simulates realistic network latency for mock responses, so loading states
// and skeletons are actually exercised during development instead of
// resolving instantly.
export function mockDelay(data, ms = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}
