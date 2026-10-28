import AuthBrandPanel from './AuthBrandPanel.jsx'
import AuthHeaderControls from './AuthHeaderControls.jsx'
import AuthTabs from './AuthTabs.jsx'

// Shared split-screen shell for the sign-in and create-account routes.
function AuthLayout({ active, children }) {
  return (
    <div className="auth">
      <AuthBrandPanel />
      <AuthHeaderControls />
      <main className="auth-main">
        <div className="auth-card">
          <AuthTabs active={active} />
          {children}
        </div>
        <p className="auth-footnote">General legal information, not legal advice.</p>
      </main>
    </div>
  )
}

export default AuthLayout
