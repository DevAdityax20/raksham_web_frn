import { useTranslation } from 'react-i18next'
import { CalendarDays, Info, Wallet } from 'lucide-react'
import Modal from './Modal.jsx'
import AdvocateSummary from './AdvocateSummary.jsx'

// Sample profile only; keeps the SAMPLE and Preview indicators visible.
function AdvocateProfileModal({ advocate, onClose, onRequest }) {
  const { t } = useTranslation()
  const name = t('app.advocatesPage.card.name', { number: advocate.id })

  return (
    <Modal title={name} onClose={onClose}>
      <span className="adv-preview-pill">{t('app.advocatesPage.preview')}</span>
      <AdvocateSummary advocate={advocate} titleId="advocate-profile-name" />

      <div className="modal__facts">
        <p>
          <Wallet aria-hidden="true" strokeWidth={1.5} />
          <span>
            <strong>{t('app.advocatesPage.card.fee')}</strong> {t('app.advocatesPage.card.feeValue')}
          </span>
        </p>
        <p>
          <CalendarDays aria-hidden="true" strokeWidth={1.5} />
          <span>
            <strong>{t('app.advocatesPage.card.availability')}</strong> {t('app.advocatesPage.card.availabilityValue')}
          </span>
        </p>
      </div>

      <p className="modal__note">
        <Info aria-hidden="true" strokeWidth={1.6} />
        {t('app.advocatesPage.profile.note')}
      </p>

      <div className="modal__actions">
        <button type="button" className="adv-btn" onClick={onClose}>{t('app.advocatesPage.profile.close')}</button>
        <button type="button" className="adv-btn adv-btn--solid" onClick={() => onRequest(advocate)}>
          {t('app.advocatesPage.card.request')}
        </button>
      </div>
    </Modal>
  )
}

export default AdvocateProfileModal
