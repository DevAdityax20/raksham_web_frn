import { useTranslation } from 'react-i18next'
import { trustIndicators } from '../../data/content.js'

// tone: 'dark' (on black hero) | 'light' (on light sections)
function TrustIndicators({ tone = 'dark', className = '' }) {
  const { t } = useTranslation()
  return (
    <ul className={`trust trust--${tone} ${className}`.trim()}>
      {trustIndicators.map(({ id, icon: Icon }) => (
        <li className="trust__item" key={id}>
          <Icon className="trust__icon" aria-hidden="true" strokeWidth={1.5} />
          <span>{t(`trust.${id}`)}</span>
        </li>
      ))}
    </ul>
  )
}

export default TrustIndicators
