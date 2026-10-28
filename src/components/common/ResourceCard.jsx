import { useTranslation } from 'react-i18next'
import { ArrowRight, FileSearch, Phone, ShieldCheck } from 'lucide-react'

function MetaRow({ icon: Icon, label, children }) {
  return (
    <li className="resource__meta-row">
      <Icon aria-hidden="true" strokeWidth={1.5} />
      <div>
        {label && <span className="resource__meta-label">{label}</span>}
        <span className="resource__meta-value">{children}</span>
      </div>
    </li>
  )
}

function ResourceCard({ resource }) {
  const { t, i18n } = useTranslation()
  const { id, badge, categoryId, lastReviewed, isSample } = resource
  const title = t(`resources.records.${id}.title`)
  const date = new Intl.DateTimeFormat(i18n.language === 'hi' ? 'hi-IN' : 'en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(lastReviewed))

  return (
    <li className="resource">
      <div className="resource__top">
        <span className={`resource__badge ${badge === 'official' ? 'resource__badge--solid' : 'resource__badge--outline'}`}>
          {t(`resources.badges.${badge}`)}
        </span>
        {isSample && <span className="resource__sample">{t('resources.sample')}</span>}
      </div>
      <h3 className="resource__title">{title}</h3>
      <p className="resource__operator">{t(`resources.records.${id}.operator`)}</p>
      <p className="resource__desc">{t(`resources.records.${id}.description`)}</p>

      <ul className="resource__meta">
        <MetaRow icon={FileSearch} label={t('resources.card.category')}>{t(`resources.categoryLabels.${categoryId}`)}</MetaRow>
        <MetaRow icon={Phone} label={t('resources.card.contact')}>
          <span className="resource__muted">{t('resources.card.contactValue')}</span>
        </MetaRow>
        <MetaRow icon={ShieldCheck}>
          <span className="resource__muted">{t('resources.card.lastReviewed', { date })}</span>
        </MetaRow>
      </ul>

      {/* Detail pages do not exist yet; this is an inert placeholder. */}
      <a className="resource__cta" href="#official-resources" aria-label={t('resources.card.viewDetailsAria', { title })}>
        <span className="resource__cta-text">{t('resources.card.viewDetails')}</span>
        <ArrowRight aria-hidden="true" strokeWidth={2} />
      </a>
    </li>
  )
}

export default ResourceCard
