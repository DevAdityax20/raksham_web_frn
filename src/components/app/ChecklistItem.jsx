import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { itemText } from '../../utils/sampleText.js'

function ChecklistItem({ list, item, onToggle, onNote }) {
  const { t } = useTranslation()
  const id = useId()
  const { text, description } = itemText(list, item, t)
  const [noteOpen, setNoteOpen] = useState(Boolean(item.note))

  return (
    <li className={`check-item${item.done ? ' is-done' : ''}`}>
      <input id={`${id}-box`} type="checkbox" checked={item.done} onChange={() => onToggle(item.n)} />
      <div className="check-item__body">
        <label htmlFor={`${id}-box`}>{text}</label>
        <p>{description}</p>
        {noteOpen ? (
          <div className="check-item__note">
            <label htmlFor={`${id}-note`}>{t('app.checklist.noteLabel')}</label>
            <textarea
              id={`${id}-note`}
              value={item.note ?? ''}
              maxLength={500}
              placeholder={t('app.checklist.notePlaceholder')}
              onChange={(event) => onNote(item.n, event.target.value)}
            />
          </div>
        ) : (
          <button type="button" className="check-item__add" onClick={() => setNoteOpen(true)}>
            {t('app.checklist.addNote')}
          </button>
        )}
      </div>
    </li>
  )
}

export default ChecklistItem
