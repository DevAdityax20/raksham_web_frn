import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import { helplines } from '../../data/helplines.js'

function EmergencyHelplines() {
  const { t } = useTranslation()
  return (
    <section className="helplines" id="helplines" aria-labelledby="helplines-title">
      <div className="helplines__intro">
        <span className="helplines__icon" aria-hidden="true">
          <Phone fill="currentColor" strokeWidth={1.5} />
        </span>
        <div>
          <h2 className="helplines__title" id="helplines-title">{t('helplines.title')}</h2>
          <p className="helplines__sub">{t('helplines.sub')}</p>
        </div>
      </div>
      <ul className="helplines__list">
        {helplines.map((number) => {
          const name = t(`helplines.items.${number}.name`)
          return (
            <li className="helplines__item" key={number}>
              <a className="helplines__link" href={`tel:${number}`} aria-label={t('helplines.callAria', { number, name })}>
                <span className="helplines__number">{number}</span>
                <span className="helplines__name">{name}</span>
                <span className="helplines__desc">{t(`helplines.items.${number}.description`)}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default EmergencyHelplines
