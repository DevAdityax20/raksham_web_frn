import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, PhoneCall } from 'lucide-react'

// `inline` keeps both links on the left, separated by a divider (Problem areas / Advocates pages).
function EmergencyBanner({ inline = false }) {
  const { t } = useTranslation()
  return (
    <div className={`dash-emergency${inline ? ' dash-emergency--inline' : ''}`}>
      <a className="dash-emergency__call" href="tel:112">
        <PhoneCall aria-hidden="true" strokeWidth={1.6} />
        <span>
          {t('app.emergency.prefix')} <strong>{t('app.emergency.number')}</strong>
        </span>
      </a>
      {/* The public site's helplines panel lists the other national numbers. */}
      <Link className="dash-emergency__more" to="/#helplines">
        {t('app.emergency.more')}
        <ArrowRight aria-hidden="true" strokeWidth={2} />
      </Link>
    </div>
  )
}

export default EmergencyBanner
