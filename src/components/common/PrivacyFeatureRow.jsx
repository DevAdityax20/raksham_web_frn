function PrivacyFeatureRow({ icon: Icon, title, description }) {
  return (
    <li className="privacy-row">
      <span className="privacy-row__icon" aria-hidden="true">
        <Icon strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="privacy-row__title">{title}</h3>
        <p className="privacy-row__desc">{description}</p>
      </div>
    </li>
  )
}

export default PrivacyFeatureRow
