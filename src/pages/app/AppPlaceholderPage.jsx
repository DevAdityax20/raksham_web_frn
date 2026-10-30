import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Construction, Info } from 'lucide-react'
import LanguageSwitch from '../../components/app/LanguageSwitch.jsx'
import QuickExitButton from '../../components/app/QuickExitButton.jsx'
import { appNav } from '../../data/app.js'

// Honest stand-in for /app sections that are not built yet (nothing is saved or sent).
function AppPlaceholderPage() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const entry = appNav.find((item) => item.to === pathname)
  const section = entry ? t(`app.nav.${entry.id}`) : ''

  return (
    <main className="dash">
      <header className="dash-header">
        <h1 className="dash-header__title">{section}</h1>
        <div className="dash-header__tools">
          <LanguageSwitch />
          <QuickExitButton className="app-quick-exit--desktop" />
        </div>
      </header>

      <section className="soon">
        <Construction aria-hidden="true" strokeWidth={1.4} />
        <h2>{t('app.placeholder.title', { section })}</h2>
        <p>
          <Info aria-hidden="true" strokeWidth={1.6} />
          {t('app.placeholder.body')}
        </p>
        <Link className="dash-start" to="/app/home">{t('app.placeholder.back')}</Link>
      </section>
    </main>
  )
}

export default AppPlaceholderPage
