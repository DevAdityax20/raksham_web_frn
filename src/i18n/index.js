import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import hi from './locales/hi.json'
import appEn from './locales/app.en.json'
import appHi from './locales/app.hi.json'

export const STORAGE_KEY = 'raksham.language'

// Endonyms are shown as-is in every language, so they are not translated.
export const languages = [
  { code: 'en', label: 'English', lang: 'en' },
  { code: 'hi', label: 'हिन्दी', lang: 'hi' },
]

const supported = languages.map(({ code }) => code)

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return supported.includes(stored) ? stored : 'en'
  } catch {
    return 'en'
  }
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: { ...en, app: appEn } },
      hi: { translation: { ...hi, app: appHi } },
    },
    lng: readStoredLanguage(),
    fallbackLng: 'en',
    supportedLngs: supported,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

  // Keep <html lang> and the persisted choice in sync with the active language.
  i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng
    try {
      window.localStorage.setItem(STORAGE_KEY, lng)
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit only.
    }
  })
  document.documentElement.lang = i18n.language
}

export default i18n
