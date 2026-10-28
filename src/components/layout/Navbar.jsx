import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { navLinks } from '../../data/content.js'
import logo from '../../assets/images/logo.png'

function getActiveId() {
  const hash = window.location.hash.slice(1)
  return navLinks.some((link) => link.id === hash) ? hash : 'home'
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(getActiveId)

  useEffect(() => {
    const onHashChange = () => setActiveId(getActiveId())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="navbar">
      <div className="navbar__inner wrap">
        <a className="navbar__brand" href="#home" onClick={() => setOpen(false)}>
          <img className="navbar__logo" src={logo} alt="" width="42" height="42" />
          <span>Raksham</span>
        </a>

        <nav className={`navbar__nav${open ? ' is-open' : ''}`} id="primary-nav" aria-label="Primary">
          <ul className="navbar__list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className={`navbar__link${activeId === link.id ? ' is-active' : ''}`}
                  href={link.href}
                  aria-current={activeId === link.id ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button className="navbar__cta navbar__cta--menu" to="/auth/sign-in" arrow size="sm">
            Get Started
          </Button>
        </nav>

        <Button className="navbar__cta navbar__cta--bar" to="/auth/sign-in" arrow size="sm">
          Get Started
        </Button>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
