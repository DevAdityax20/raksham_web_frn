import { ArrowRight, Info } from 'lucide-react'
import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import PrivacyFeatureRow from '../components/common/PrivacyFeatureRow.jsx'
import CapabilityList from '../components/common/CapabilityList.jsx'
import { canDo, cannotDo, privacyFeatures } from '../data/privacyFeatures.js'

function PrivacySafetySection() {
  return (
    <section className="privacy" id="privacy-safety" aria-labelledby="privacy-title">
      <div className="wrap privacy__grid">
        <div className="privacy__main">
          <SectionEyebrow>Privacy and safety</SectionEyebrow>
          <h2 className="privacy__title" id="privacy-title">
            You stay in control
            <br />
            of your information.
          </h2>
          <p className="privacy__sub">We’re designed to be safe, transparent and respectful of your privacy.</p>

          <ul className="privacy__rows">
            {privacyFeatures.map((feature) => (
              <PrivacyFeatureRow key={feature.title} {...feature} />
            ))}
          </ul>

          {/* No privacy policy page exists yet; this is an inert placeholder anchor. */}
          <a className="privacy__link" href="#privacy-safety">
            <span className="privacy__link-text">Read our privacy policy</span>
            <ArrowRight aria-hidden="true" strokeWidth={2} />
          </a>
        </div>

        <aside className="expect" aria-labelledby="expect-title">
          <SectionEyebrow className="eyebrow--on-dark">What Raksham can and cannot do</SectionEyebrow>
          <h3 className="expect__title" id="expect-title">Know what to expect.</h3>
          <CapabilityList tone="can" heading="Raksham can:" items={canDo} />
          <hr className="expect__rule" />
          <CapabilityList tone="cannot" heading="Raksham cannot:" items={cannotDo} />
          <hr className="expect__rule" />
          <p className="expect__note">
            <Info aria-hidden="true" strokeWidth={1.75} />
            Raksham provides general legal information, not legal advice.
          </p>
        </aside>
      </div>
    </section>
  )
}

export default PrivacySafetySection
