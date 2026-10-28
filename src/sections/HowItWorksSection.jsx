import { useTranslation } from 'react-i18next'
import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import TrustIndicators from '../components/common/TrustIndicators.jsx'
import Button from '../components/ui/Button.jsx'
import { steps } from '../data/content.js'

function HowItWorksSection() {
  const { t } = useTranslation()
  return (
    <section className="how" id="how-it-works" aria-labelledby="how-title">
      <div className="wrap">
        <SectionEyebrow>{t('how.eyebrow')}</SectionEyebrow>
        <h2 className="how__title" id="how-title">
          {t('how.titlePrefix')} <mark>{t('how.titleHighlight')}</mark>
        </h2>
        <p className="how__sub">{t('how.sub')}</p>

        <ol className="how__steps">
          {steps.map(({ id, number, emphasis }) => (
            <li className={`step${emphasis ? ' step--emphasis' : ''}`} key={id}>
              <span className="step__number" aria-hidden="true">{number}</span>
              <h3 className="step__title">{t(`how.steps.${id}.title`)}</h3>
              <p className="step__desc">{t(`how.steps.${id}.description`)}</p>
            </li>
          ))}
        </ol>

        <div className="how__actions">
          <Button to="/auth/sign-in" arrow size="lg">{t('nav.getStarted')}</Button>
          <Button href="#get-help" variant="outline" size="lg">{t('how.exploreCategories')}</Button>
        </div>
        <TrustIndicators tone="light" className="how__trust" />
      </div>
    </section>
  )
}

export default HowItWorksSection
