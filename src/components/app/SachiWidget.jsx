import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ExternalLink, PhoneCall, RotateCcw, X } from 'lucide-react'
import SachiAvatar from './SachiAvatar.jsx'
import ChatMessage from './ChatMessage.jsx'
import ChatComposer from './ChatComposer.jsx'
import { useSachiChat } from '../../hooks/useSachiChat.js'

const emptyChat = { description: '', area: null, guest: true }

// Floating Sachi launcher for the public pages. The conversation stays mounted, so closing
// and reopening the panel keeps it. Guidance is not connected yet (see sachiService).
function SachiWidget() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const chat = useSachiChat(emptyChat)
  const { state, question } = chat
  const endRef = useRef(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: 'end' })
  }, [open, state.messages.length])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="sachi-widget">
      <section className="sachi-widget__panel" role="dialog" aria-label={t('app.widget.title')} hidden={!open}>
        <header className="sachi-widget__head">
          <SachiAvatar />
          <div className="sachi-widget__who">
            <strong>{t('app.widget.title')}</strong>
            <span>{t('app.widget.sub')}</span>
          </div>
          <button
            type="button"
            className="sachi-widget__icon-btn"
            aria-label={t('app.widget.startOver')}
            title={t('app.widget.startOver')}
            onClick={() => chat.reset(emptyChat)}
          >
            <RotateCcw aria-hidden="true" />
          </button>
          <button
            type="button"
            className="sachi-widget__icon-btn"
            aria-label={t('app.widget.close')}
            onClick={() => setOpen(false)}
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="sachi-widget__links">
          <a href="tel:112">
            <PhoneCall aria-hidden="true" strokeWidth={1.8} />
            {t('app.widget.call')}
          </a>
          <Link to="/app/ask-sachi">
            {t('app.widget.openFull')}
            <ExternalLink aria-hidden="true" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="sachi-widget__scroll">
          <div className="sachi-widget__thread" aria-live="polite">
            {state.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                active={message.kind === 'question' && question?.id === message.qid}
                answers={state.answers}
                onAnswer={chat.answer}
                onSkip={chat.skip}
                onRetry={chat.retry}
              />
            ))}
            <div ref={endRef} />
          </div>
        </div>

        <ChatComposer onSend={chat.sendText} disabled={chat.thinking} />
      </section>

      <button
        type="button"
        className="sachi-widget__launcher"
        aria-label={t('app.widget.open')}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sachi-widget__label">{t('app.widget.launcher')}</span>
        <span className="sachi-widget__bubble">{open ? <X aria-hidden="true" /> : <SachiAvatar />}</span>
      </button>
    </div>
  )
}

export default SachiWidget
