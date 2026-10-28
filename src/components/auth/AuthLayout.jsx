import { useTranslation } from 'react-i18next'
import AuthBrandPanel from './AuthBrandPanel.jsx'
import AuthHeaderControls from './AuthHeaderControls.jsx'
import AuthTabs from './AuthTabs.jsx'

// Shared split-screen shell for the sign-in and create-account routes.
function AuthLayout({ active, children }) {
  const { t } = useTranslation()
  return (
    <div className="auth">
      <AuthBrandPanel />
      <AuthHeaderControls />
      <main className="auth-main">
        <div className="auth-card">
          <AuthTabs active={active} />
          {children}
        </div>
        <p className="auth-footnote">{t('auth.brand.disclaimer')}</p>
      </main>
    </div>
  )
}

export default AuthLayout
