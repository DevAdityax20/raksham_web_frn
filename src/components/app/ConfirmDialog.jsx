import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import Modal from './Modal.jsx'

// Confirmation before anything is deleted. Cancel is the first control, so it is the default.
function ConfirmDialog({ title, body, confirmLabel, onConfirm, onCancel }) {
  const { t } = useTranslation()
  return (
    <Modal title={title} onClose={onCancel}>
      <h2 className="modal__title">{title}</h2>
      <p className="modal__note">
        <Info aria-hidden="true" strokeWidth={1.6} />
        {body}
      </p>
      <div className="modal__actions">
        <button type="button" className="adv-btn" onClick={onCancel}>{t('app.library.cancel')}</button>
        <button type="button" className="adv-btn adv-btn--danger" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
