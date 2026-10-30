// Sample profiles for the Advocates preview. None of these are real people.
// Real listings will come from the backend once advocate approval exists.
export const sampleAdvocates = [
  { id: 1, initials: 'AS', areas: ['cyber', 'general'], languages: ['en', 'hi'], modes: ['video', 'phone'] },
  { id: 2, initials: 'PS', areas: ['domestic', 'general'], languages: ['en', 'hi'], modes: ['video', 'phone'] },
  { id: 3, initials: 'RK', areas: ['police', 'general'], languages: ['en', 'hi'], modes: ['video', 'phone'] },
]

export const advocateAreaFilters = ['domestic', 'bribery', 'police', 'cyber', 'general']
export const advocateLanguageFilters = ['en', 'hi', 'both']
export const advocateModeFilters = ['video', 'phone']

export const noFilters = { area: 'all', language: 'all', mode: 'all' }

export function filterAdvocates(advocates, { area, language, mode }) {
  return advocates.filter((advocate) => {
    if (area !== 'all' && !advocate.areas.includes(area)) return false
    if (language === 'both' ? advocate.languages.length < 2 : language !== 'all' && !advocate.languages.includes(language)) {
      return false
    }
    if (mode !== 'all' && !advocate.modes.includes(mode)) return false
    return true
  })
}
