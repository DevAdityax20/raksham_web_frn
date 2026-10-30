import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ListChecks } from 'lucide-react'
import AppPageHeader from '../../components/app/AppPageHeader.jsx'
import EmergencyBanner from '../../components/app/EmergencyBanner.jsx'
import PrivacyNotice from '../../components/app/PrivacyNotice.jsx'
import LibraryFilters from '../../components/app/LibraryFilters.jsx'
import LibraryEmpty from '../../components/app/LibraryEmpty.jsx'
import LibraryFooter from '../../components/app/LibraryFooter.jsx'
import ChecklistCard from '../../components/app/ChecklistCard.jsx'
import ConfirmDialog from '../../components/app/ConfirmDialog.jsx'
import { deleteChecklist, listChecklists, progressOf, resetChecklist } from '../../services/checklistService.js'
import { checklistTitle } from '../../utils/sampleText.js'

const sorts = ['updated', 'created', 'progress']
const progressOptions = ['notStarted', 'inProgress', 'completed']
const noFilters = { query: '', area: 'all', progress: 'all', sort: 'updated' }

function ChecklistPage() {
  const { t } = useTranslation()
  const [lists, setLists] = useState(listChecklists)
  const [filters, setFilters] = useState(noFilters)
  // { type: 'reset' | 'delete', list }
  const [dialog, setDialog] = useState(null)
  const closeDialog = useCallback(() => setDialog(null), [])

  const visible = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    const matches = lists.filter((list) => {
      if (filters.area !== 'all' && list.areaId !== filters.area) return false
      if (filters.progress !== 'all' && progressOf(list).status !== filters.progress) return false
      if (!query) return true
      const text = [checklistTitle(list, t), t(`app.areas.${list.areaId}`)]
      list.items.forEach((item) => text.push(t(`app.sample.checklists.${list.id}.items.${item.n}.text`)))
      return text.join(' ').toLowerCase().includes(query)
    })
    const order = {
      updated: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
      created: (a, b) => b.createdAt.localeCompare(a.createdAt),
      progress: (a, b) => progressOf(b).percent - progressOf(a).percent,
    }
    return matches.sort(order[filters.sort])
  }, [lists, filters, t])

  const totals = visible.reduce(
    (sum, list) => {
      const { done, total } = progressOf(list)
      return { total: sum.total + total, done: sum.done + done }
    },
    { total: 0, done: 0 },
  )

  const isFiltered = filters.query !== '' || filters.area !== 'all' || filters.progress !== 'all'

  return (
    <main className="dash lib-page">
      <AppPageHeader title={t('app.checklist.title')} subtitle={t('app.checklist.sub')} />
      <EmergencyBanner inline />
      <PrivacyNotice title={t('app.checklist.privacyTitle')} body={t('app.checklist.privacyBody')} />

      <LibraryFilters
        idPrefix="checklist"
        searchPlaceholder={t('app.checklist.search')}
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(noFilters)}
        sorts={sorts}
        progressOptions={progressOptions}
      />

      <dl className="lib-stats">
        <div><dt>{t('app.checklist.totalTasks')}</dt><dd>{totals.total}</dd></div>
        <div><dt>{t('app.checklist.completedTasks')}</dt><dd>{totals.done}</dd></div>
        <div><dt>{t('app.checklist.remainingTasks')}</dt><dd>{totals.total - totals.done}</dd></div>
      </dl>

      <p className="lib-count">
        <span aria-live="polite">{t('app.checklist.showing', { count: visible.length })}</span>
        <span className="lib-sample">{t('app.library.sampleData')}</span>
      </p>

      <div className="lib-list">
        {visible.map((list) => (
          <ChecklistCard key={list.id} list={list} onAction={(type) => setDialog({ type, list })} />
        ))}
        {visible.length === 0 && (
          <LibraryEmpty
            icon={ListChecks}
            title={t('app.checklist.emptyTitle')}
            body={t('app.checklist.emptyBody')}
            filtered={isFiltered}
            onClear={() => setFilters(noFilters)}
          />
        )}
      </div>

      <LibraryFooter />

      {dialog?.type === 'reset' && (
        <ConfirmDialog
          title={t('app.checklist.resetTitle')}
          body={t('app.checklist.resetBody', { title: checklistTitle(dialog.list, t) })}
          confirmLabel={t('app.checklist.reset')}
          onCancel={closeDialog}
          onConfirm={() => {
            setLists(resetChecklist(dialog.list.id))
            closeDialog()
          }}
        />
      )}
      {dialog?.type === 'delete' && (
        <ConfirmDialog
          title={t('app.checklist.deleteTitle')}
          body={t('app.checklist.deleteBody', { title: checklistTitle(dialog.list, t) })}
          confirmLabel={t('app.library.delete')}
          onCancel={closeDialog}
          onConfirm={() => {
            setLists(deleteChecklist(dialog.list.id))
            closeDialog()
          }}
        />
      )}
    </main>
  )
}

export default ChecklistPage
