import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Accessible dialog: Escape and backdrop close it, Tab stays inside, focus returns to the opener, page scroll is locked.
function Modal({ title, onClose, children }) {
  const { t } = useTranslation()
  const dialogRef = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    const dialog = dialogRef.current
    const focusables = () => dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    // A field marked autoFocus keeps the focus; otherwise start on the first control.
    if (!dialog.contains(document.activeElement)) focusables()[0]?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      opener?.focus?.()
    }
  }, [onClose])

  return (
    <div className="modal" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal__box" role="dialog" aria-modal="true" aria-label={title} ref={dialogRef}>
        <button type="button" className="modal__close" aria-label={t('app.modal.close')} onClick={onClose}>
          <X aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
