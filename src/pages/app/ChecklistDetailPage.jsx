import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import AppPageHeader from '../../components/app/AppPageHeader.jsx'
import EmergencyBanner from '../../components/app/EmergencyBanner.jsx'
import LibraryFooter from '../../components/app/LibraryFooter.jsx'
import ChecklistItem from '../../components/app/ChecklistItem.jsx'
import ProgressBar from '../../components/app/ProgressBar.jsx'
import { listChecklists, progressOf, setItemNote, toggleItem } from '../../services/checklistService.js'
import { checklistTitle } from '../../utils/sampleText.js'

function ChecklistDetailPage() {
  const { t } = useTranslation()
  const { checklistId } = useParams()
  const [lists, setLists] = useState(listChecklists)
  const list = lists.find((item) => item.id === checklistId)

  if (!list) {
    return (
      <main className="dash lib-page">
        <AppPageHeader title={t('app.checklist.title')} />
        <section className="lib-empty">
          <h2>{t('app.checklist.missingTitle')}</h2>
          <p>{t('app.checklist.missingBody')}</p>
          <Link className="dash-continue__cta" to="/app/checklist">{t('app.checklist.back')}</Link>
        </section>
        <EmergencyBanner inline />
        <LibraryFooter />
      </main>
    )
  }

  const title = checklistTitle(list, t)
  const { done, total, percent } = progressOf(list)

  return (
    <main className="dash lib-page">
      <AppPageHeader title={title} subtitle={t(`app.areas.${list.areaId}`)} />
      <Link className="detail-back" to="/app/checklist">
        <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
        {t('app.checklist.back')}
      </Link>

      <section className="detail-card">
        <div className="detail-progress">
          <p aria-live="polite">
            <strong>{t('app.checklist.tasksDone', { done, total })}</strong> · {t('app.checklist.percentComplete', { percent })}
          </p>
          <ProgressBar percent={percent} label={t('app.checklist.progressOf', { title })} />
        </div>
        <ul className="check-list">
          {list.items.map((item) => (
            <ChecklistItem
              key={item.n}
              list={list}
              item={item}
              onToggle={(n) => setLists(toggleItem(list.id, n))}
              onNote={(n, note) => setLists(setItemNote(list.id, n, note))}
            />
          ))}
        </ul>
        <p className="detail-card__note">{t('app.checklist.localOnly')}</p>
      </section>

      <EmergencyBanner inline />
      <LibraryFooter />
    </main>
  )
}

export default ChecklistDetailPage
