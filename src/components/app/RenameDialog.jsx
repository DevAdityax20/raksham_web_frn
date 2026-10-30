import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from './Modal.jsx'

function RenameDialog({ currentTitle, onSave, onCancel }) {
  const { t } = useTranslation()
  const [title, setTitle] = useState(currentTitle)
  const trimmed = title.trim()

  return (
    <Modal title={t('app.library.renameTitle')} onClose={onCancel}>
      <h2 className="modal__title">{t('app.library.renameTitle')}</h2>
      <form
        className="modal__form"
        onSubmit={(event) => {
          event.preventDefault()
          if (trimmed) onSave(trimmed)
        }}
      >
        <label htmlFor="rename-input">{t('app.library.renameLabel')}</label>
        <input
          id="rename-input"
          className="modal__input"
          value={title}
          maxLength={120}
          autoFocus
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className="modal__actions">
          <button type="button" className="adv-btn" onClick={onCancel}>{t('app.library.cancel')}</button>
          <button type="submit" className="adv-btn adv-btn--solid" disabled={!trimmed}>{t('app.library.save')}</button>
        </div>
      </form>
    </Modal>
  )
}

export default RenameDialog
