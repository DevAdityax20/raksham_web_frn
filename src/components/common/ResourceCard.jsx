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
  const { badge, title, operator, description, categoryLabel, contact, lastReviewed, isSample } = resource
  const isOfficial = badge.toLowerCase() === 'official'

  return (
    <li className="resource">
      <div className="resource__top">
        <span className={`resource__badge ${isOfficial ? 'resource__badge--solid' : 'resource__badge--outline'}`}>
          {badge}
        </span>
        {isSample && <span className="resource__sample">Sample data</span>}
      </div>
      <h3 className="resource__title">{title}</h3>
      <p className="resource__operator">{operator}</p>
      <p className="resource__desc">{description}</p>

      <ul className="resource__meta">
        <MetaRow icon={FileSearch} label="Category">{categoryLabel}</MetaRow>
        <MetaRow icon={Phone} label="Contact"><span className="resource__muted">{contact}</span></MetaRow>
        <MetaRow icon={ShieldCheck}><span className="resource__muted">Last reviewed: {lastReviewed}</span></MetaRow>
      </ul>

      {/* Detail pages do not exist yet; this is an inert placeholder. */}
      <a className="resource__cta" href="#official-resources" aria-label={`View details for ${title}`}>
        <span className="resource__cta-text">View details</span>
        <ArrowRight aria-hidden="true" strokeWidth={2} />
      </a>
    </li>
  )
}

export default ResourceCard
