import { useTranslation } from 'react-i18next'
import { FileSearch } from 'lucide-react'
import Button from '../ui/Button.jsx'

function ResourceEmptyState({ onClear }) {
  const { t } = useTranslation()
  return (
    <div className="empty" role="status">
      <span className="empty__icon" aria-hidden="true">
        <FileSearch strokeWidth={1.5} />
      </span>
      <div className="empty__text">
        <h3>{t('resources.empty.title')}</h3>
        <p>{t('resources.empty.body')}</p>
      </div>
      <Button onClick={onClear}>{t('resources.empty.clear')}</Button>
    </div>
  )
}

export default ResourceEmptyState
