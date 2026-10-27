import { trustIndicators } from '../../data/content.js'

// tone: 'dark' (on black hero) | 'light' (on light sections)
function TrustIndicators({ tone = 'dark', className = '' }) {
  return (
    <ul className={`trust trust--${tone} ${className}`.trim()}>
      {trustIndicators.map(({ icon: Icon, label }) => (
        <li className="trust__item" key={label}>
          <Icon className="trust__icon" aria-hidden="true" strokeWidth={1.5} />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  )
}

export default TrustIndicators
