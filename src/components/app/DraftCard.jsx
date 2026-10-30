import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CalendarDays, FileText } from 'lucide-react'
import RowMenu from './RowMenu.jsx'
import { draftText } from '../../utils/sampleText.js'
import { formatDate } from '../../utils/formatDate.js'

function DraftCard({ draft, onAction }) {
  const { t, i18n } = useTranslation()
  const { title, summary, area } = draftText(draft, t)
  const titleId = `draft-${draft.id}-title`

  return (
    <article className="lib-card" aria-labelledby={titleId}>
      <div className="lib-card__main">
        <span className="lib-card__icon" aria-hidden="true"><FileText strokeWidth={1.5} /></span>
        <div className="lib-card__text">
          <h3 id={titleId}>
            <span>{title}</span>
            <span className="lib-badge">{t('app.drafts.badge')}</span>
          </h3>
          <p className="lib-card__area">{area}</p>
          <p className="lib-card__summary">{summary}</p>
        </div>
      </div>

      <ul className="lib-card__meta">
        <li>
          <CalendarDays aria-hidden="true" strokeWidth={1.5} />
          {t('app.drafts.updated', { date: formatDate(draft.updatedAt, i18n.language) })}
        </li>
        <li>
          <FileText aria-hidden="true" strokeWidth={1.5} />
          {t('app.drafts.notShared')}
        </li>
      </ul>

      <div className="lib-card__actions">
        <Link className="lib-open" to={`/app/drafts/${draft.id}`}>
          {t('app.library.open')}
          <span className="sr-only">: {title}</span>
        </Link>
        <RowMenu
          label={t('app.drafts.actionsFor', { title })}
          items={[
            { id: 'rename', label: t('app.library.rename') },
            { id: 'export', label: t('app.library.export') },
            { id: 'delete', label: t('app.library.delete'), danger: true },
          ]}
          onSelect={(action) => onAction(action, draft)}
        />
      </div>
    </article>
  )
}

export default DraftCard
