import { useTranslation } from 'react-i18next'
import { ArrowRight, Info } from 'lucide-react'
import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import PrivacyFeatureRow from '../components/common/PrivacyFeatureRow.jsx'
import CapabilityList from '../components/common/CapabilityList.jsx'
import { privacyFeatures } from '../data/privacyFeatures.js'

function PrivacySafetySection() {
  const { t } = useTranslation()
  return (
    <section className="privacy" id="privacy-safety" aria-labelledby="privacy-title">
      <div className="wrap privacy__grid">
        <div className="privacy__main">
          <SectionEyebrow>{t('privacy.eyebrow')}</SectionEyebrow>
          <h2 className="privacy__title" id="privacy-title">
            {t('privacy.titleLine1')}
            <br />
            {t('privacy.titleLine2')}
          </h2>
          <p className="privacy__sub">{t('privacy.sub')}</p>

          <ul className="privacy__rows">
            {privacyFeatures.map((feature) => (
              <PrivacyFeatureRow key={feature.id} {...feature} />
            ))}
          </ul>

          {/* No privacy policy page exists yet; this is an inert placeholder anchor. */}
          <a className="privacy__link" href="#privacy-safety">
            <span className="privacy__link-text">{t('privacy.policyLink')}</span>
            <ArrowRight aria-hidden="true" strokeWidth={2} />
          </a>
        </div>

        <aside className="expect" aria-labelledby="expect-title">
          <SectionEyebrow className="eyebrow--on-dark">{t('privacy.expectEyebrow')}</SectionEyebrow>
          <h3 className="expect__title" id="expect-title">{t('privacy.expectTitle')}</h3>
          <CapabilityList tone="can" heading={t('privacy.canHeading')} items={t('privacy.canDo', { returnObjects: true })} />
          <hr className="expect__rule" />
          <CapabilityList tone="cannot" heading={t('privacy.cannotHeading')} items={t('privacy.cannotDo', { returnObjects: true })} />
          <hr className="expect__rule" />
          <p className="expect__note">
            <Info aria-hidden="true" strokeWidth={1.75} />
            {t('privacy.note')}
          </p>
        </aside>
      </div>
    </section>
  )
}

export default PrivacySafetySection
