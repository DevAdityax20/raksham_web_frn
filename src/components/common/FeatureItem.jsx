function FeatureItem({ icon: Icon, lead, title, description }) {
  return (
    <li className="feature">
      <span className="feature__icon" aria-hidden="true">
        <Icon strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="feature__title">
          <strong>{lead}</strong>
          <span>{title}</span>
        </h3>
        <p className="feature__desc">{description}</p>
      </div>
    </li>
  )
}

export default FeatureItem
