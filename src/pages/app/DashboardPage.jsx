import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, FileText, Info, Landmark, ShieldCheck, User } from 'lucide-react'
import LanguageSwitch from '../../components/app/LanguageSwitch.jsx'
import QuickExitButton from '../../components/app/QuickExitButton.jsx'
import EmergencyBanner from '../../components/app/EmergencyBanner.jsx'
import AssistantCard from '../../components/app/AssistantCard.jsx'
import FeatureCard from '../../components/app/FeatureCard.jsx'
import { mockUser } from '../../data/app.js'

function DashboardPage() {
  const { t } = useTranslation()

  return (
    <main className="dash">
      <header className="dash-header">
        <div>
          <h1 className="dash-header__title">{t('app.header.welcome', { name: mockUser.name })}</h1>
          <p className="dash-header__sub">{t('app.header.sub')}</p>
        </div>
        <div className="dash-header__tools">
          <LanguageSwitch />
          <QuickExitButton className="app-quick-exit--desktop" />
        </div>
      </header>

      <EmergencyBanner />
      <AssistantCard />

      <div className="dash-cards">
        <FeatureCard
          icon={FileText}
          title={t('app.cards.guidance.title')}
          description={t('app.cards.guidance.description')}
          cta={t('app.cards.guidance.cta')}
          to="/app/problem-areas"
        />
        <FeatureCard
          icon={Landmark}
          badge={{ label: t('app.cards.official.badge'), tone: 'solid' }}
          title={t('app.cards.official.title')}
          description={t('app.cards.official.description')}
          cta={t('app.cards.official.cta')}
          to="/app/resources"
        />
        <FeatureCard
          icon={User}
          badge={{ label: t('app.cards.advocate.badge'), tone: 'outline' }}
          title={t('app.cards.advocate.title')}
          description={t('app.cards.advocate.description')}
          note={t('app.cards.advocate.note')}
          cta={t('app.cards.advocate.cta')}
          to="/app/advocates"
        />
      </div>

      <div className="dash-lower">
        <section className="dash-continue" aria-labelledby="continue-title">
          <h2 id="continue-title">{t('app.continue.title')}</h2>
          <div className="dash-continue__body">
            <span className="dash-continue__art" aria-hidden="true">
              <span className="dash-continue__ring">
                <FileText strokeWidth={1.4} />
              </span>
            </span>
            <div>
              <h3>{t('app.continue.emptyTitle')}</h3>
              <p>{t('app.continue.emptyBody')}</p>
              <Link className="dash-continue__cta" to="/app/problem-areas">
                {t('app.continue.cta')}
                <ArrowRight aria-hidden="true" strokeWidth={2.25} />
              </Link>
            </div>
          </div>
        </section>

        <section className="dash-control" aria-labelledby="control-title">
          <span className="dash-control__icon" aria-hidden="true">
            <ShieldCheck strokeWidth={1.5} />
          </span>
          <div>
            <h2 id="control-title">{t('app.control.title')}</h2>
            <p>{t('app.control.body')}</p>
            <Link className="dash-control__cta" to="/app/privacy">
              {t('app.control.cta')}
              <ArrowRight aria-hidden="true" strokeWidth={2} />
            </Link>
          </div>
        </section>
      </div>

      <footer className="dash-footer">
        <p>
          <Info aria-hidden="true" strokeWidth={1.6} />
          {t('app.footer.disclaimer')}
        </p>
        {/* Opens the existing feedback form on the public site. */}
        <Link to="/#footer-feedback">
          {t('app.footer.report')}
          <ArrowRight aria-hidden="true" strokeWidth={2} />
        </Link>
      </footer>
    </main>
  )
}

export default DashboardPage
