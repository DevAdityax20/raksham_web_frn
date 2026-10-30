import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

// Shown when nothing is saved yet, or when the filters match nothing.
// `filtered` offers Clear filters; otherwise it points to Ask Sachi.
function LibraryEmpty({ icon: Icon, title, body, filtered, onClear }) {
  const { t } = useTranslation()
  return (
    <div className="lib-empty">
      <span aria-hidden="true"><Icon strokeWidth={1.4} /></span>
      <h2>{title}</h2>
      <p>{body}</p>
      {filtered ? (
        <button type="button" className="adv-btn" onClick={onClear}>{t('app.library.clear')}</button>
      ) : (
        <Link className="dash-continue__cta" to="/app/ask-sachi">
          {t('app.library.startChat')}
          <ArrowRight aria-hidden="true" strokeWidth={2.25} />
        </Link>
      )}
    </div>
  )
}

export default LibraryEmpty
