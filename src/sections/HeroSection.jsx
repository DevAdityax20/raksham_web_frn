import { Shield } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import TrustIndicators from '../components/common/TrustIndicators.jsx'
import HeroIllustration from '../components/common/HeroIllustration.jsx'
import EmergencyHelplines from '../components/common/EmergencyHelplines.jsx'

function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__inner wrap">
        <div className="hero__content">
          <p className="hero__badge">
            <Shield aria-hidden="true" fill="currentColor" strokeWidth={1.5} />
            Your legal support companion
          </p>
          <h1 className="hero__title" id="hero-title">
            <span>Know your rights.</span>
            <span>
              Know your <em>next step.</em>
            </span>
          </h1>
          <p className="hero__lead">
            Raksham provides clear, step-by-step guidance for common legal issues in India, with verified
            resources and support options. No legal jargon, just clear answers.
          </p>
          <div className="hero__actions">
            <Button to="/auth/sign-in" arrow size="lg">Get Started</Button>
            <Button href="#how-it-works" variant="outline" size="lg">How it works</Button>
          </div>
          <TrustIndicators tone="dark" className="hero__trust" />
        </div>
        <HeroIllustration />
      </div>
      <div className="wrap hero__helplines">
        <EmergencyHelplines />
      </div>
    </section>
  )
}

export default HeroSection
