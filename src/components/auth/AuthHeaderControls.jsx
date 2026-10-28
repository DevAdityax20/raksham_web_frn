import { useTranslation } from 'react-i18next'
import { ScanLine } from 'lucide-react'
import { QUICK_EXIT_URL } from '../../data/auth.js'
import { languages } from '../../i18n/index.js'
import { useLanguage } from '../../i18n/useLanguage.js'

function AuthHeaderControls() {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()

  // replace() keeps the page out of the Back-button trail; it cannot clear browser history.
  const quickExit = () => window.location.replace(QUICK_EXIT_URL)

  return (
    <div className="auth-controls">
      <button type="button" className="auth-controls__exit" onClick={quickExit}>
        <ScanLine aria-hidden="true" strokeWidth={1.75} />
        {t('auth.quickExit')}
      </button>
      <div className="auth-controls__lang" role="group" aria-label={t('language.group')}>
        {languages.map(({ code, label, lang }) => (
          <button
            key={code}
            type="button"
            lang={lang}
            className={language === code ? 'is-active' : undefined}
            aria-pressed={language === code}
            onClick={() => setLanguage(code)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AuthHeaderControls
