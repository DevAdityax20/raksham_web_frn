import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Info } from 'lucide-react'
import LanguageSwitch from '../../components/app/LanguageSwitch.jsx'
import QuickExitButton from '../../components/app/QuickExitButton.jsx'
import EmergencyBanner from '../../components/app/EmergencyBanner.jsx'
import ProblemAreaCard from '../../components/app/ProblemAreaCard.jsx'
import ShieldMark from '../../components/app/ShieldMark.jsx'
import { problemAreaCards } from '../../data/app.js'

function ProblemAreasPage() {
  const { t } = useTranslation()

  return (
    <main className="dash">
      <header className="dash-header">
        <h1 className="dash-header__title dash-header__title--page">{t('app.areasPage.title')}</h1>
        <div className="dash-header__tools">
          <LanguageSwitch />
          <QuickExitButton className="app-quick-exit--desktop" />
        </div>
      </header>

      <EmergencyBanner inline />

      <section className="areas-intro" aria-labelledby="areas-heading">
        <h2 id="areas-heading">{t('app.areasPage.heading')}</h2>
        <p className="areas-intro__sub">{t('app.areasPage.sub')}</p>
        <p className="areas-intro__info">
          <Info aria-hidden="true" strokeWidth={1.5} />
          {t('app.areasPage.info')}
        </p>
      </section>

      <div className="area-grid">
        {problemAreaCards.map((card) => (
          <ProblemAreaCard key={card.id} {...card} />
        ))}

        <article className="area-card area-card--dark">
          <div className="area-card__top">
            <span className="area-card__icon" aria-hidden="true">
              <ShieldMark />
            </span>
            <div>
              <h2 className="area-card__title">{t('app.areasPage.unsure.title')}</h2>
              <p className="area-card__desc">{t('app.areasPage.unsure.body')}</p>
            </div>
          </div>
          <Link className="area-card__button" to="/app/ask-sachi">
            {t('app.areasPage.unsure.cta')}
            <ArrowRight aria-hidden="true" strokeWidth={2} />
          </Link>
        </article>
      </div>

      <footer className="dash-footer dash-footer--rule">
        <p>{t('app.footer.disclaimer')}</p>
        {/* Opens the existing feedback form on the public site. */}
        <Link to="/#footer-feedback">
          {t('app.footer.report')}
          <ArrowRight aria-hidden="true" strokeWidth={2} />
        </Link>
      </footer>
    </main>
  )
}

export default ProblemAreasPage
