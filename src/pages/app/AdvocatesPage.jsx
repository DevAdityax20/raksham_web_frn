import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Info } from 'lucide-react'
import LanguageSwitch from '../../components/app/LanguageSwitch.jsx'
import QuickExitButton from '../../components/app/QuickExitButton.jsx'
import AdvocateFilters from '../../components/app/AdvocateFilters.jsx'
import AdvocateCard from '../../components/app/AdvocateCard.jsx'
import AdvocateProfileModal from '../../components/app/AdvocateProfileModal.jsx'
import ConsultationPreviewModal from '../../components/app/ConsultationPreviewModal.jsx'
import { filterAdvocates, noFilters, sampleAdvocates } from '../../data/sampleAdvocates.js'

function AdvocatesPage() {
  const { t } = useTranslation()
  const [filters, setFilters] = useState(noFilters)
  // One dialog at a time: { type: 'profile' | 'request', advocate }
  const [dialog, setDialog] = useState(null)

  const advocates = useMemo(() => filterAdvocates(sampleAdvocates, filters), [filters])
  const closeDialog = useCallback(() => setDialog(null), [])

  return (
    <main className="dash adv-page">
      <header className="dash-header">
        <div>
          <div className="adv-title">
            <h1 className="dash-header__title dash-header__title--page">{t('app.advocatesPage.title')}</h1>
            <span className="adv-preview-pill">{t('app.advocatesPage.preview')}</span>
          </div>
          <p className="page-sub">{t('app.advocatesPage.sub')}</p>
        </div>
        <div className="dash-header__tools">
          <LanguageSwitch />
          <QuickExitButton className="app-quick-exit--desktop" />
        </div>
      </header>

      <p className="adv-notice" role="note">
        <Info aria-hidden="true" strokeWidth={1.5} />
        <span>
          <strong>{t('app.advocatesPage.noticeLead')}</strong> {t('app.advocatesPage.notice')}
        </span>
      </p>

      <p className="adv-help-link">
        {t('app.advocatesPage.notSure')}{' '}
        <Link to="/#human-help">{t('app.advocatesPage.seeWhen')}</Link>
        <ArrowRight aria-hidden="true" strokeWidth={2} />
      </p>

      <AdvocateFilters filters={filters} onChange={setFilters} onClear={() => setFilters(noFilters)} />
      <p className="adv-order">{t('app.advocatesPage.order')}</p>

      <div className="adv-list" aria-live="polite">
        {advocates.length === 0 && <p className="adv-empty">{t('app.advocatesPage.empty')}</p>}
        {advocates.map((advocate) => (
          <AdvocateCard
            key={advocate.id}
            advocate={advocate}
            onView={(selected) => setDialog({ type: 'profile', advocate: selected })}
            onRequest={(selected) => setDialog({ type: 'request', advocate: selected })}
          />
        ))}
      </div>

      <footer className="adv-disclaimer">
        <p>{t('app.advocatesPage.disclaimer')}</p>
      </footer>

      {dialog?.type === 'profile' && (
        <AdvocateProfileModal
          advocate={dialog.advocate}
          onClose={closeDialog}
          onRequest={(selected) => setDialog({ type: 'request', advocate: selected })}
        />
      )}
      {dialog?.type === 'request' && <ConsultationPreviewModal advocate={dialog.advocate} onClose={closeDialog} />}
    </main>
  )
}

export default AdvocatesPage
