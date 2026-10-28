import { useTranslation } from 'react-i18next'

function PrivacyFeatureRow({ id, icon: Icon }) {
  const { t } = useTranslation()
  return (
    <li className="privacy-row">
      <span className="privacy-row__icon" aria-hidden="true">
        <Icon strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="privacy-row__title">{t(`privacy.rows.${id}.title`)}</h3>
        <p className="privacy-row__desc">{t(`privacy.rows.${id}.description`)}</p>
      </div>
    </li>
  )
}

export default PrivacyFeatureRow
