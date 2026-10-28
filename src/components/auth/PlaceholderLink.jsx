import { useTranslation } from 'react-i18next'

// A link-looking element for destinations that do not exist yet (terms, privacy policy, ...).
function PlaceholderLink({ children }) {
  const { t } = useTranslation()
  return (
    <span className="auth-link is-placeholder" aria-disabled="true" title={t('footer.comingSoon')}>
      {children}
    </span>
  )
}

export default PlaceholderLink
