import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Construction, Info } from 'lucide-react'
import LanguageSwitch from '../../components/app/LanguageSwitch.jsx'
import QuickExitButton from '../../components/app/QuickExitButton.jsx'
import { appNav, problemAreas } from '../../data/app.js'

// Honest stand-in for /app sections that are not built yet (nothing is saved or sent).
function AppPlaceholderPage() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const entry = appNav.find((item) => item.to === pathname)
  const section = entry ? t(`app.nav.${entry.id}`) : ''
  const isAreas = pathname === '/app/problem-areas'

  return (
    <main className="dash">
      <header className="dash-header">
        <div>
          <h1 className="dash-header__title">{isAreas ? t('app.areasPage.title') : section}</h1>
          {isAreas && <p className="dash-header__sub">{t('app.areasPage.sub')}</p>}
        </div>
        <div className="dash-header__tools">
          <LanguageSwitch />
          <QuickExitButton className="app-quick-exit--desktop" />
        </div>
      </header>

      {isAreas ? (
        <ul className="areas-list">
          {problemAreas.map((area) => (
            <li key={area}>
              <Link to="/app/ask-sachi" state={{ area }} className="areas-list__item">
                <span>{t(`app.areas.${area}`)}</span>
                <ArrowRight aria-hidden="true" strokeWidth={2} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <section className="soon">
          <Construction aria-hidden="true" strokeWidth={1.4} />
          <h2>{t('app.placeholder.title', { section })}</h2>
          <p>
            <Info aria-hidden="true" strokeWidth={1.6} />
            {t('app.placeholder.body')}
          </p>
          <Link className="dash-start" to="/app/home">{t('app.placeholder.back')}</Link>
        </section>
      )}
    </main>
  )
}

export default AppPlaceholderPage
