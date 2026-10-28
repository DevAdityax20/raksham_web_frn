const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Accepts an email address or a mobile number (10-13 digits, optional +, spaces or dashes).
export function validateIdentifier(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'Please enter your email or mobile number.'
  if (EMAIL_PATTERN.test(trimmed)) return ''
  const looksLikePhone = /^\+?[\d\s-]+$/.test(trimmed)
  const digits = trimmed.replace(/\D/g, '')
  if (looksLikePhone && digits.length >= 10 && digits.length <= 13) return ''
  return 'Enter a valid email address or mobile number.'
}

export const MIN_PASSWORD_LENGTH = 8

// Simple, transparent heuristic for the on-screen meter. It is feedback only,
// not a security audit. Returns 0 (empty) to 3 (strong).
export function passwordStrength(password) {
  if (!password) return 0
  if (password.length < MIN_PASSWORD_LENGTH) return 1
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((pattern) => pattern.test(password)).length
  if (password.length >= 12 && classes >= 3) return 3
  if (classes >= 2) return 2
  return 1
}

export const strengthLabels = ['', 'Weak', 'Good', 'Strong']
