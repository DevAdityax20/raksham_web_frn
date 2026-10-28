import { useTranslation } from 'react-i18next'
import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import FeatureItem from '../components/common/FeatureItem.jsx'
import { features } from '../data/content.js'

function WhyRakshamSection() {
  const { t } = useTranslation()
  return (
    <section className="why" id="why-raksham" aria-labelledby="why-title">
      <div className="wrap">
        <SectionEyebrow lineFirst={false}>{t('why.eyebrow')}</SectionEyebrow>
        <h2 className="why__title" id="why-title">
          {t('why.line1')}
          <br />
          {t('why.line2')}
        </h2>
        <span className="why__rule" aria-hidden="true" />
        <ul className="why__grid">
          {features.map((feature) => (
            <FeatureItem key={feature.id} {...feature} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WhyRakshamSection
