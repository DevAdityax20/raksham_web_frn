function FooterNavigationColumn({ title, links }) {
  const headingId = `footer-${title.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <nav className="footer-col" aria-labelledby={headingId}>
      <h2 className="footer-col__title" id={headingId}>{title}</h2>
      <ul className="footer-col__list">
        {links.map(({ label, href }) => (
          <li key={label}>
            {href ? (
              <a className="footer-col__link" href={href}>{label}</a>
            ) : (
              <span className="footer-col__link is-disabled" aria-disabled="true" title="Coming soon">
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FooterNavigationColumn
