import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const tabs = [
  { id: 'sign-in', labelKey: 'auth.tabs.signIn', to: '/auth/sign-in' },
  { id: 'create-account', labelKey: 'auth.tabs.createAccount', to: '/auth/create-account' },
]

// Each tab is a real link; the active one reflects the current route.
function AuthTabs({ active }) {
  const { t } = useTranslation()
  return (
    <nav className="auth-tabs" aria-label={t('auth.tabs.aria')}>
      {tabs.map(({ id, labelKey, to }) => (
        <Link
          key={id}
          to={to}
          className={`auth-tabs__tab${active === id ? ' is-active' : ''}`}
          aria-current={active === id ? 'page' : undefined}
        >
          {t(labelKey)}
        </Link>
      ))}
    </nav>
  )
}

export default AuthTabs
