import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import FeatureItem from '../components/common/FeatureItem.jsx'
import { features } from '../data/content.js'

function WhyRakshamSection() {
  return (
    <section className="why" id="why-raksham" aria-labelledby="why-title">
      <div className="wrap">
        <SectionEyebrow lineFirst={false}>Why Raksham</SectionEyebrow>
        <h2 className="why__title" id="why-title">
          Legal help shouldn’t be confusing.
          <br />
          We make it simple.
        </h2>
        <span className="why__rule" aria-hidden="true" />
        <ul className="why__grid">
          {features.map((feature) => (
            <FeatureItem key={feature.lead} {...feature} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WhyRakshamSection
