import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

// The whole card is clickable through the stretched "Start" link; the chosen area travels to Ask Sachi in route state.
function ProblemAreaCard({ id, icon: Icon }) {
  const { t } = useTranslation()
  return (
    <article className="area-card">
      <div className="area-card__top">
        <span className="area-card__icon" aria-hidden="true">
          <Icon strokeWidth={1.5} />
        </span>
        <div>
          <h2 className="area-card__title">{t(`app.areas.${id}`)}</h2>
          <p className="area-card__desc">{t(`app.areasPage.descriptions.${id}`)}</p>
        </div>
      </div>
      <Link className="area-card__cta" to="/app/ask-sachi" state={{ area: id }}>
        <span>{t('app.areasPage.start')}</span>
        <ArrowRight aria-hidden="true" strokeWidth={2} />
        <span className="sr-only">{t(`app.areas.${id}`)}</span>
      </Link>
    </article>
  )
}

export default ProblemAreaCard
