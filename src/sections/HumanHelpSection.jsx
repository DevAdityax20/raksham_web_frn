import { Check, Info } from 'lucide-react'
import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import Button from '../components/ui/Button.jsx'
import HumanHelpIllustration from '../components/common/HumanHelpIllustration.jsx'
import { humanHelpPoints } from '../data/content.js'

function HumanHelpSection() {
  return (
    <section className="human" id="human-help" aria-labelledby="human-title">
      <div className="wrap">
        <div className="human__panel">
          <div className="human__grid">
            <div className="human__content">
              <div className="human__meta">
                <SectionEyebrow className="eyebrow--spaced">Human help</SectionEyebrow>
                <span className="human__preview">Preview</span>
                <span className="human__status">Availability varies and is being confirmed.</span>
              </div>
              <h2 className="human__title" id="human-title">
                Sometimes you need
                <br />
                <em>a person</em>, not just guidance.
              </h2>
              <p className="human__lead">
                When your situation needs a qualified advocate, Raksham can help you find a verified one by
                practice area and language. Credentials and fees are shown upfront, with no pressure.
              </p>
              <ul className="human__points">
                {humanHelpPoints.map((point) => (
                  <li key={point}>
                    <span className="human__check" aria-hidden="true">
                      <Check strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              {/* Advocate discovery is not built yet; this is a placeholder anchor. */}
              <Button href="#human-help" variant="outline" arrow>Learn more</Button>
            </div>
            <HumanHelpIllustration />
          </div>
          <p className="human__disclaimer">
            <Info aria-hidden="true" strokeWidth={1.75} />
            Advocates are independent professionals. Raksham is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HumanHelpSection
