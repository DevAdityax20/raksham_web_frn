import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import TrustIndicators from '../components/common/TrustIndicators.jsx'
import Button from '../components/ui/Button.jsx'
import { steps } from '../data/content.js'

function HowItWorksSection() {
  return (
    <section className="how" id="how-it-works" aria-labelledby="how-title">
      <div className="wrap">
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="how__title" id="how-title">
          Clear guidance in <mark>4 simple steps.</mark>
        </h2>
        <p className="how__sub">No legal jargon. Just a clear path from your problem to your next step.</p>

        <ol className="how__steps">
          {steps.map(({ number, title, description, emphasis }) => (
            <li className={`step${emphasis ? ' step--emphasis' : ''}`} key={number}>
              <span className="step__number" aria-hidden="true">{number}</span>
              <h3 className="step__title">{title}</h3>
              <p className="step__desc">{description}</p>
            </li>
          ))}
        </ol>

        <div className="how__actions">
          <Button to="/auth/sign-in" arrow size="lg">Get Started</Button>
          <Button href="#get-help" variant="outline" size="lg">Explore categories</Button>
        </div>
        <TrustIndicators tone="light" className="how__trust" />
      </div>
    </section>
  )
}

export default HowItWorksSection
