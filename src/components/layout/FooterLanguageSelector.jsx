import { useTranslation } from 'react-i18next'
import { languages } from '../../i18n/index.js'
import { useLanguage } from '../../i18n/useLanguage.js'

function FooterLanguageSelector() {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()

  return (
    <div className="lang" role="group" aria-label={t('language.group')}>
      {languages.map(({ code, label, lang }) => (
        <button
          key={code}
          type="button"
          lang={lang}
          className={`lang__option${language === code ? ' is-active' : ''}`}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default FooterLanguageSelector
