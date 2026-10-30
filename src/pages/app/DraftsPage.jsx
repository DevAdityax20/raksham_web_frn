import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppPageHeader from '../../components/app/AppPageHeader.jsx'
import EmergencyBanner from '../../components/app/EmergencyBanner.jsx'
import PrivacyNotice from '../../components/app/PrivacyNotice.jsx'
import LibraryFilters from '../../components/app/LibraryFilters.jsx'
import LibraryEmpty from '../../components/app/LibraryEmpty.jsx'
import LibraryFooter from '../../components/app/LibraryFooter.jsx'
import DraftCard from '../../components/app/DraftCard.jsx'
import ConfirmDialog from '../../components/app/ConfirmDialog.jsx'
import RenameDialog from '../../components/app/RenameDialog.jsx'
import { FileText } from 'lucide-react'
import { deleteDraft, exportDraft, listDrafts, updateDraft } from '../../services/draftService.js'
import { draftText } from '../../utils/sampleText.js'

const sorts = ['updated', 'oldest', 'title']
const noFilters = { query: '', area: 'all', sort: 'updated' }

function DraftsPage() {
  const { t } = useTranslation()
  const [drafts, setDrafts] = useState(listDrafts)
  const [filters, setFilters] = useState(noFilters)
  // { type: 'rename' | 'delete', draft }
  const [dialog, setDialog] = useState(null)
  const closeDialog = useCallback(() => setDialog(null), [])

  const visible = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    const matches = drafts.filter((draft) => {
      if (filters.area !== 'all' && draft.areaId !== filters.area) return false
      if (!query) return true
      const { title, area } = draftText(draft, t)
      return `${title} ${area}`.toLowerCase().includes(query)
    })
    const byTitle = (a, b) => draftText(a, t).title.localeCompare(draftText(b, t).title)
    const order = {
      updated: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
      oldest: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
      title: byTitle,
    }
    return matches.sort(order[filters.sort])
  }, [drafts, filters, t])

  const isFiltered = filters.query !== '' || filters.area !== 'all'

  const handleAction = (action, draft) => {
    if (action === 'export') {
      const { title, area, body } = draftText(draft, t)
      exportDraft({ title, areaLabel: area, body })
    } else {
      setDialog({ type: action, draft })
    }
  }

  return (
    <main className="dash lib-page">
      <AppPageHeader title={t('app.drafts.title')} subtitle={t('app.drafts.sub')} />
      <EmergencyBanner inline />
      <PrivacyNotice title={t('app.drafts.privacyTitle')} body={t('app.drafts.privacyBody')} />

      <LibraryFilters
        idPrefix="drafts"
        searchPlaceholder={t('app.drafts.search')}
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(noFilters)}
        sorts={sorts}
      />

      <p className="lib-count">
        <span aria-live="polite">{t('app.drafts.showing', { count: visible.length })}</span>
        <span className="lib-sample">{t('app.library.sampleData')}</span>
      </p>

      <div className="lib-list">
        {visible.map((draft) => (
          <DraftCard key={draft.id} draft={draft} onAction={handleAction} />
        ))}
        {visible.length === 0 && (
          <LibraryEmpty
            icon={FileText}
            title={t('app.drafts.emptyTitle')}
            body={t('app.drafts.emptyBody')}
            filtered={isFiltered}
            onClear={() => setFilters(noFilters)}
          />
        )}
      </div>

      <LibraryFooter />

      {dialog?.type === 'rename' && (
        <RenameDialog
          currentTitle={draftText(dialog.draft, t).title}
          onCancel={closeDialog}
          onSave={(title) => {
            setDrafts(updateDraft(dialog.draft.id, { title }))
            closeDialog()
          }}
        />
      )}
      {dialog?.type === 'delete' && (
        <ConfirmDialog
          title={t('app.drafts.deleteTitle')}
          body={t('app.drafts.deleteBody', { title: draftText(dialog.draft, t).title })}
          confirmLabel={t('app.library.delete')}
          onCancel={closeDialog}
          onConfirm={() => {
            setDrafts(deleteDraft(dialog.draft.id))
            closeDialog()
          }}
        />
      )}
    </main>
  )
}

export default DraftsPage
