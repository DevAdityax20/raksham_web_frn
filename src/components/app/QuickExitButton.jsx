import { useTranslation } from 'react-i18next'
import { LogOut } from 'lucide-react'
import { QUICK_EXIT_URL } from '../../data/auth.js'

// replace() keeps the page out of the Back-button trail; it cannot clear browser history.
function QuickExitButton({ className = '' }) {
  const { t } = useTranslation()
  return (
    <button
      type="button"
      className={`app-quick-exit ${className}`.trim()}
      onClick={() => window.location.replace(QUICK_EXIT_URL)}
    >
      <LogOut aria-hidden="true" strokeWidth={1.75} />
      <span className="app-quick-exit__label">{t('app.header.quickExit')}</span>
    </button>
  )
}

export default QuickExitButton
