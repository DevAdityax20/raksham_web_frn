import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Info } from 'lucide-react'

function PrivacyNotice({ title, body }) {
  const { t } = useTranslation()
  return (
    <section className="lib-notice">
      <Info aria-hidden="true" strokeWidth={1.5} />
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <Link to="/app/privacy">
        {t('app.library.learnData')}
        <ArrowRight aria-hidden="true" strokeWidth={2} />
      </Link>
    </section>
  )
}

export default PrivacyNotice
