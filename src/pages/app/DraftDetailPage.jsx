import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Check, Download } from 'lucide-react'
import AppPageHeader from '../../components/app/AppPageHeader.jsx'
import EmergencyBanner from '../../components/app/EmergencyBanner.jsx'
import LibraryFooter from '../../components/app/LibraryFooter.jsx'
import { exportDraft, listDrafts, updateDraft } from '../../services/draftService.js'
import { draftText } from '../../utils/sampleText.js'
import { formatDate } from '../../utils/formatDate.js'

// The draft text is edited here and kept for this browser tab only (see draftService).
function DraftEditor({ draft }) {
  const { t, i18n } = useTranslation()
  const text = draftText(draft, t)
  const [body, setBody] = useState(text.body)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateDraft(draft.id, { body })
    setSaved(true)
  }

  return (
    <>
      <AppPageHeader title={text.title} subtitle={`${text.area} · ${t('app.drafts.updated', { date: formatDate(draft.updatedAt, i18n.language) })}`} />
      <Link className="detail-back" to="/app/drafts">
        <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
        {t('app.drafts.back')}
      </Link>

      <section className="detail-card">
        <label htmlFor="draft-body">{t('app.drafts.bodyLabel')}</label>
        <textarea
          id="draft-body"
          value={body}
          onChange={(event) => {
            setBody(event.target.value)
            setSaved(false)
          }}
        />
        <p className="detail-card__note">{t('app.drafts.notShared')}. {t('app.library.localOnly')}</p>
        <div className="modal__actions">
          <button type="button" className="adv-btn" onClick={() => exportDraft({ title: text.title, areaLabel: text.area, body })}>
            <Download aria-hidden="true" strokeWidth={1.75} />
            {t('app.library.export')}
          </button>
          <button type="button" className="adv-btn adv-btn--solid" onClick={save}>
            {saved ? <Check aria-hidden="true" strokeWidth={2.25} /> : null}
            {saved ? t('app.library.saved') : t('app.library.save')}
          </button>
        </div>
      </section>
    </>
  )
}

function DraftDetailPage() {
  const { t } = useTranslation()
  const { draftId } = useParams()
  const draft = listDrafts().find((item) => item.id === draftId)

  return (
    <main className="dash lib-page">
      {draft ? (
        <DraftEditor key={draft.id} draft={draft} />
      ) : (
        <>
          <AppPageHeader title={t('app.drafts.title')} />
          <section className="lib-empty">
            <h2>{t('app.drafts.missingTitle')}</h2>
            <p>{t('app.drafts.missingBody')}</p>
            <Link className="dash-continue__cta" to="/app/drafts">{t('app.drafts.back')}</Link>
          </section>
        </>
      )}
      <EmergencyBanner inline />
      <LibraryFooter />
    </main>
  )
}

export default DraftDetailPage
