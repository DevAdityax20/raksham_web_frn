import { useTranslation } from 'react-i18next'
import { CircleCheck, Phone, Video } from 'lucide-react'

const languageNames = { en: 'English', hi: 'हिन्दी' }
const modeIcons = { video: Video, phone: Phone }

// Identity, badges, problem areas and meta of one sample advocate (shared by the list card and the profile dialog).
function AdvocateSummary({ advocate, titleId }) {
  const { t } = useTranslation()
  const name = t('app.advocatesPage.card.name', { number: advocate.id })

  return (
    <div className="adv-summary">
      <span className="adv-summary__avatar" aria-hidden="true">{advocate.initials}</span>
      <div className="adv-summary__body">
        <div className="adv-summary__name">
          <h3 id={titleId}>{name}</h3>
          <span className="adv-tag-sample">{t('app.advocatesPage.card.sample')}</span>
        </div>
        <p className="adv-summary__verified">
          <span className="adv-verified">
            <CircleCheck aria-hidden="true" strokeWidth={2.25} />
            {t('app.advocatesPage.card.verified')}
          </span>
          <span>{t('app.advocatesPage.card.credentials')}</span>
        </p>
        <ul className="adv-summary__areas">
          {advocate.areas.map((area) => (
            <li key={area}>{t(`app.advocatesPage.areas.${area}`)}</li>
          ))}
        </ul>
        <div className="adv-summary__meta">
          <p>
            <span>{t('app.advocatesPage.card.jurisdiction')}</span> {t('app.advocatesPage.card.jurisdictionValue')}
            <i aria-hidden="true">|</i>
            <span>{t('app.advocatesPage.card.languages')}</span> {advocate.languages.map((code) => languageNames[code]).join(', ')}
          </p>
          <ul className="adv-summary__modes">
            {advocate.modes.map((mode) => {
              const Icon = modeIcons[mode]
              return (
                <li key={mode}>
                  <Icon aria-hidden="true" strokeWidth={1.6} />
                  {t(`app.advocatesPage.filters.${mode}`)}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdvocateSummary
