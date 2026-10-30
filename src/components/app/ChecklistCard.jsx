import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CalendarDays, ListChecks } from 'lucide-react'
import RowMenu from './RowMenu.jsx'
import ProgressBar from './ProgressBar.jsx'
import { progressOf } from '../../services/checklistService.js'
import { checklistTitle } from '../../utils/sampleText.js'
import { formatDate } from '../../utils/formatDate.js'

function ChecklistCard({ list, onAction }) {
  const { t, i18n } = useTranslation()
  const title = checklistTitle(list, t)
  const { done, total, percent, status } = progressOf(list)
  const titleId = `checklist-${list.id}-title`

  return (
    <article className="lib-card" aria-labelledby={titleId}>
      <div className="lib-card__main">
        <span className="lib-card__icon" aria-hidden="true"><ListChecks strokeWidth={1.5} /></span>
        <div className="lib-card__text">
          <h3 id={titleId}>
            <span>{title}</span>
            <span className={`lib-badge lib-badge--${status}`}>{t(`app.library.progressOptions.${status}`)}</span>
          </h3>
          <p className="lib-card__area">{t(`app.areas.${list.areaId}`)}</p>
          <div className="lib-card__progress">
            <ProgressBar percent={percent} label={t('app.checklist.progressOf', { title })} />
            <span>{t('app.checklist.tasksDone', { done, total })}</span>
          </div>
        </div>
      </div>

      <ul className="lib-card__meta">
        <li>
          <CalendarDays aria-hidden="true" strokeWidth={1.5} />
          {t('app.drafts.updated', { date: formatDate(list.updatedAt, i18n.language) })}
        </li>
        <li>
          <ListChecks aria-hidden="true" strokeWidth={1.5} />
          {t('app.checklist.percentComplete', { percent })}
        </li>
      </ul>

      <div className="lib-card__actions">
        <Link className="lib-open" to={`/app/checklist/${list.id}`}>
          {t('app.checklist.open')}
          <span className="sr-only">: {title}</span>
        </Link>
        <RowMenu
          label={t('app.checklist.actionsFor', { title })}
          items={[
            { id: 'reset', label: t('app.checklist.reset') },
            { id: 'delete', label: t('app.library.delete'), danger: true },
          ]}
          onSelect={(action) => onAction(action, list)}
        />
      </div>
    </article>
  )
}

export default ChecklistCard
