// Single-role app for v1 (all authenticated users are "dentist"). Kept as a
// function rather than a hardcoded `true` so a real role check can slot in
// later without touching ProtectedRoute.
export function canAccess(user) {
  return Boolean(user)
}
