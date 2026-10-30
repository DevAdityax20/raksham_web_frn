import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Check, FileText, MoreHorizontal, PhoneCall } from 'lucide-react'
import LanguageSwitch from './LanguageSwitch.jsx'
import QuickExitButton from './QuickExitButton.jsx'
import { problemAreas } from '../../data/app.js'

// Closes a popup menu on outside click or Escape.
function usePopup() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const onDown = (event) => ref.current && !ref.current.contains(event.target) && setOpen(false)
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  return [open, setOpen, ref]
}

function ChatHeader({ area, onChangeArea, onStartOver }) {
  const { t } = useTranslation()
  const [areaOpen, setAreaOpen, areaRef] = usePopup()
  const [moreOpen, setMoreOpen, moreRef] = usePopup()

  return (
    <header className="chat-header">
      <Link to="/app/home" className="chat-header__back">
        <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
        <span>{t('app.chat.back')}</span>
      </Link>

      <div className="chat-header__area" ref={areaRef}>
        <FileText aria-hidden="true" strokeWidth={1.6} />
        <span className="chat-header__area-name">{area ? t(`app.areas.${area}`) : t('app.chat.changeArea')}</span>
        <button
          type="button"
          className="chat-header__change"
          aria-expanded={areaOpen}
          aria-haspopup="listbox"
          onClick={() => setAreaOpen((value) => !value)}
        >
          {t('app.chat.change')}
        </button>
        {areaOpen && (
          <ul className="chat-menu" role="listbox" aria-label={t('app.chat.changeArea')}>
            {problemAreas.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={area === id}
                  onClick={() => {
                    onChangeArea(id)
                    setAreaOpen(false)
                  }}
                >
                  <span>{t(`app.areas.${id}`)}</span>
                  {area === id && <Check aria-hidden="true" strokeWidth={2} />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="chat-header__tools">
        <a className="chat-call" href="tel:112">
          <PhoneCall aria-hidden="true" strokeWidth={1.6} />
          <span>
            {t('app.emergency.short')} <strong>{t('app.emergency.shortNumber')}</strong>
          </span>
        </a>
        <LanguageSwitch />
        <QuickExitButton className="app-quick-exit--desktop" />
        <div className="chat-header__more" ref={moreRef}>
          <button
            type="button"
            className="chat-header__more-btn"
            aria-label={t('app.chat.more')}
            aria-expanded={moreOpen}
            aria-haspopup="menu"
            onClick={() => setMoreOpen((value) => !value)}
          >
            <MoreHorizontal aria-hidden="true" />
          </button>
          {moreOpen && (
            <ul className="chat-menu chat-menu--right" role="menu">
              <li>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onStartOver()
                    setMoreOpen(false)
                  }}
                >
                  {t('app.chat.startOver')}
                </button>
              </li>
              <li>
                <Link to="/app/home" role="menuitem">{t('app.chat.back')}</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}

export default ChatHeader
