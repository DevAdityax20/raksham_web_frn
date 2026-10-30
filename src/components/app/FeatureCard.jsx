import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// badge: { label, tone: 'solid' | 'outline' } (optional)
function FeatureCard({ icon: Icon, badge, title, description, note, cta, to }) {
  return (
    <article className="dash-card">
      <div className="dash-card__top">
        <span className="dash-card__icon" aria-hidden="true">
          <Icon strokeWidth={1.5} />
        </span>
        {badge && <span className={`dash-badge dash-badge--${badge.tone}`}>{badge.label}</span>}
      </div>
      <h3 className="dash-card__title">{title}</h3>
      <p className="dash-card__desc">{description}</p>
      {note && <p className="dash-card__note">{note}</p>}
      <Link className="dash-card__cta" to={to}>
        {cta}
        <ArrowRight aria-hidden="true" strokeWidth={2} />
      </Link>
    </article>
  )
}

export default FeatureCard
