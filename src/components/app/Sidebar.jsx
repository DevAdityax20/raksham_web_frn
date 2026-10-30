import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogOut, X } from 'lucide-react'
import logo from '../../assets/images/logo.png'
import { appNav, mockUser } from '../../data/app.js'
import { endSession } from '../../services/session.js'

// Shared by every /app page. `rail` shows icons only (used by Ask Sachi and tablet widths);
// below 769px the sidebar becomes a drawer controlled by `open`.
function Sidebar({ rail, open, onClose }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const signOut = () => {
    onClose()
    // Clears the temporary test session and returns to the public site.
    endSession()
    navigate('/')
  }

  return (
    <aside className={`side${rail ? ' side--rail' : ''}${open ? ' is-open' : ''}`} aria-label={t('app.nav.label')}>
      <div className="side__brand">
        <img className="side__logo" src={logo} alt="" width="38" height="38" />
        <span className="side__wordmark">Raksham</span>
        <button type="button" className="side__close" aria-label={t('app.nav.closeMenu')} onClick={onClose}>
          <X aria-hidden="true" />
        </button>
      </div>

      <nav className="side__nav">
        <ul>
          {appNav.map(({ id, to, icon: Icon, badge }) => (
            <li key={id}>
              <NavLink
                to={to}
                className={({ isActive }) => `side__item${isActive ? ' is-active' : ''}`}
                title={t(`app.nav.${id}`)}
                onClick={onClose}
              >
                <Icon className="side__icon" aria-hidden="true" strokeWidth={1.6} />
                <span className="side__label">{t(`app.nav.${id}`)}</span>
                {badge && <span className="side__badge">{t('app.nav.preview')}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="side__foot">
        <NavLink to="/app/privacy" className="side__profile" title={t('app.nav.viewProfile')} onClick={onClose}>
          <span className="side__avatar" aria-hidden="true">{mockUser.initials}</span>
          <span className="side__who">
            <strong>{mockUser.name}</strong>
            <small>{t('app.nav.viewProfile')}</small>
          </span>
        </NavLink>
        <button type="button" className="side__item side__signout" title={t('app.nav.signOut')} onClick={signOut}>
          <LogOut className="side__icon" aria-hidden="true" strokeWidth={1.6} />
          <span className="side__label">{t('app.nav.signOut')}</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
