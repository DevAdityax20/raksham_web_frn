import { useState } from 'react'
import { languages } from '../../data/footer.js'

// Selection state only. Site-wide translation is not implemented; connect
// `language` to a localization layer here when one exists.
function FooterLanguageSelector() {
  const [language, setLanguage] = useState('en')

  return (
    <div className="lang" role="group" aria-label="Language">
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
