import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import Modal from './Modal.jsx'

// Explains the simulated request. Nothing is sent, stored or "confirmed".
function ConsultationPreviewModal({ advocate, onClose }) {
  const { t } = useTranslation()
  const name = t('app.advocatesPage.card.name', { number: advocate.id })

  return (
    <Modal title={t('app.advocatesPage.request.title')} onClose={onClose}>
      <span className="adv-preview-pill">{t('app.advocatesPage.card.simulated')}</span>
      <h2 className="modal__title">{t('app.advocatesPage.request.title')}</h2>
      <p className="modal__text">{t('app.advocatesPage.request.body', { name })}</p>
      <p className="modal__note">
        <Info aria-hidden="true" strokeWidth={1.6} />
        {t('app.advocatesPage.request.note')}
      </p>
      <div className="modal__actions">
        <button type="button" className="adv-btn adv-btn--solid" onClick={onClose}>
          {t('app.advocatesPage.request.close')}
        </button>
      </div>
    </Modal>
  )
}

export default ConsultationPreviewModal
