import { useTranslation } from 'react-i18next'
import { CalendarDays, Wallet } from 'lucide-react'
import AdvocateSummary from './AdvocateSummary.jsx'

function AdvocateCard({ advocate, onView, onRequest }) {
  const { t } = useTranslation()
  const titleId = `advocate-${advocate.id}-name`

  return (
    <article className="adv-card" aria-labelledby={titleId}>
      <AdvocateSummary advocate={advocate} titleId={titleId} />

      <div className="adv-card__side">
        <p>
          <Wallet aria-hidden="true" strokeWidth={1.5} />
          <span>
            <strong>{t('app.advocatesPage.card.fee')}</strong> {t('app.advocatesPage.card.feeValue')}
          </span>
        </p>
        <p>
          <CalendarDays aria-hidden="true" strokeWidth={1.5} />
          <span>
            <strong>{t('app.advocatesPage.card.availability')}</strong> {t('app.advocatesPage.card.availabilityValue')}
          </span>
        </p>
        <div className="adv-card__actions">
          <button type="button" className="adv-btn" onClick={() => onView(advocate)}>
            {t('app.advocatesPage.card.view')}
          </button>
          <div>
            <button type="button" className="adv-btn" onClick={() => onRequest(advocate)}>
              {t('app.advocatesPage.card.request')}
            </button>
            <small>{t('app.advocatesPage.card.simulated')}</small>
          </div>
        </div>
      </div>
    </article>
  )
}

export default AdvocateCard
