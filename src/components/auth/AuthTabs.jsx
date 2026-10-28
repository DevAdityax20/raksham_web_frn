import { Link } from 'react-router-dom'

const tabs = [
  { id: 'sign-in', label: 'Sign in', to: '/auth/sign-in' },
  { id: 'create-account', label: 'Create account', to: '/auth/create-account' },
]

// Each tab is a real link; the active one reflects the current route.
function AuthTabs({ active }) {
  return (
    <nav className="auth-tabs" aria-label="Account">
      {tabs.map(({ id, label, to }) => (
        <Link
          key={id}
          to={to}
          className={`auth-tabs__tab${active === id ? ' is-active' : ''}`}
          aria-current={active === id ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default AuthTabs
