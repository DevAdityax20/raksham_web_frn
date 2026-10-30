import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import logo from '../../assets/images/logo.png'
import QuickExitButton from './QuickExitButton.jsx'
import { useMediaQuery } from '../../hooks/useMediaQuery.js'

// Shared shell for every /app page: one sidebar, one mobile top bar, the page in <Outlet />.
function AppLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Ask Sachi uses the compact icon rail, as in the design reference; tablets use it everywhere.
  // Phones get a drawer with full labels instead.
  const isPhone = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1100px)')
  const rail = !isPhone && (isTablet || pathname.startsWith('/app/ask-sachi'))
  const closeDrawer = () => setDrawerOpen(false)

  useEffect(() => {
    if (!drawerOpen) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setDrawerOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  return (
    <div className="app-shell" data-rail={rail}>
      <Sidebar rail={rail} open={drawerOpen} onClose={closeDrawer} />
      {drawerOpen && <div className="app-shell__overlay" aria-hidden="true" onClick={closeDrawer} />}

      <div className="app-shell__main">
        <div className="app-topbar">
          <button
            type="button"
            className="app-topbar__menu"
            aria-label={t('app.nav.openMenu')}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>
          <Link to="/app/home" className="app-topbar__brand">
            <img className="app-topbar__logo" src={logo} alt="" width="30" height="30" />
            <span>Raksham</span>
          </Link>
          <QuickExitButton className="app-quick-exit--compact" />
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
