import { useTranslation } from 'react-i18next'

function FeatureItem({ id, icon: Icon }) {
  const { t } = useTranslation()
  return (
    <li className="feature">
      <span className="feature__icon" aria-hidden="true">
        <Icon strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="feature__title">
          <strong>{t(`why.features.${id}.lead`)}</strong>
          <span>{t(`why.features.${id}.title`)}</span>
        </h3>
        <p className="feature__desc">{t(`why.features.${id}.description`)}</p>
      </div>
    </li>
  )
}

export default FeatureItem
