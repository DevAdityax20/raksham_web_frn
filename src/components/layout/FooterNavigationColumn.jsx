import { useTranslation } from 'react-i18next'

function FooterNavigationColumn({ id, links }) {
  const { t } = useTranslation()
  const headingId = `footer-${id}`
  return (
    <nav className="footer-col" aria-labelledby={headingId}>
      <h2 className="footer-col__title" id={headingId}>{t(`footer.columns.${id}.title`)}</h2>
      <ul className="footer-col__list">
        {links.map(({ id: linkId, href }) => {
          const label = t(`footer.columns.${id}.links.${linkId}`)
          return (
            <li key={linkId}>
              {href ? (
                <a className="footer-col__link" href={href}>{label}</a>
              ) : (
                <span className="footer-col__link is-disabled" aria-disabled="true" title={t('footer.comingSoon')}>
                  {label}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default FooterNavigationColumn
