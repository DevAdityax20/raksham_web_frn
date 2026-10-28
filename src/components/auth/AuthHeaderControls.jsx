import { useState } from 'react'
import { ScanLine } from 'lucide-react'
import { QUICK_EXIT_URL } from '../../data/auth.js'
import { languages } from '../../data/footer.js'

// Selection state only. Translation is not implemented; connect `language`
// to a localization layer here when one exists.
function AuthHeaderControls() {
  const [language, setLanguage] = useState('en')

  // replace() keeps the page out of the Back-button trail; it cannot clear browser history.
  const quickExit = () => window.location.replace(QUICK_EXIT_URL)

  return (
    <div className="auth-controls">
      <button type="button" className="auth-controls__exit" onClick={quickExit}>
        <ScanLine aria-hidden="true" strokeWidth={1.75} />
        Quick exit
      </button>
      <div className="auth-controls__lang" role="group" aria-label="Language">
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
