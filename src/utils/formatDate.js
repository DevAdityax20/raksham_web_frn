// "12 Oct 2026" style date for an ISO date string, in the active interface language.
export function formatDate(iso, language) {
  const locale = language === 'hi' ? 'hi-IN' : 'en-GB'
  return new Date(`${iso}T00:00:00`).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })
}

export function today() {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}
