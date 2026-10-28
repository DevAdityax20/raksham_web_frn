// A link-looking element for destinations that do not exist yet (terms, privacy policy, ...).
function PlaceholderLink({ children }) {
  return (
    <span className="auth-link is-placeholder" aria-disabled="true" title="Coming soon">
      {children}
    </span>
  )
}

export default PlaceholderLink
