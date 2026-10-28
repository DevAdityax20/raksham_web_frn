import { useTranslation } from 'react-i18next'
import { languages } from './index.js'

// Single source of truth for the active language (i18next); no duplicated component state.
export function useLanguage() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? 'en'
  const other = languages.find(({ code }) => code !== language)

  return {
    language,
    otherLanguage: other,
    setLanguage: (code) => i18n.changeLanguage(code),
    toggleLanguage: () => i18n.changeLanguage(other.code),
  }
}
