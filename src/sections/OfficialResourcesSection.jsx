import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import ResourceFilters from '../components/common/ResourceFilters.jsx'
import ResourceCard from '../components/common/ResourceCard.jsx'
import ResourceEmptyState from '../components/common/ResourceEmptyState.jsx'
import ResourceDisclaimer from '../components/common/ResourceDisclaimer.jsx'
import { emptyFilters, filterResources, resources } from '../data/resources.js'

function OfficialResourcesSection() {
  const { t } = useTranslation()
  const [draft, setDraft] = useState(emptyFilters)
  const [applied, setApplied] = useState(emptyFilters)

  const results = filterResources(resources, applied)

  const clearFilters = () => {
    setDraft(emptyFilters)
    setApplied(emptyFilters)
  }

  return (
    <section className="resources" id="official-resources" aria-labelledby="resources-title">
      <div className="wrap">
        <div className="resources__panel">
          <SectionEyebrow>{t('resources.eyebrow')}</SectionEyebrow>
          <h2 className="resources__title" id="resources-title">{t('resources.title')}</h2>
          <p className="resources__sub">{t('resources.sub')}</p>

          <ResourceFilters
            values={draft}
            onChange={(change) => setDraft((current) => ({ ...current, ...change }))}
            onSearch={() => setApplied(draft)}
          />

          {results.length > 0 ? (
            <>
              <ul className="resources__grid">
                {results.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </ul>
              <ResourceDisclaimer />
            </>
          ) : (
            <ResourceEmptyState onClear={clearFilters} />
          )}
        </div>
      </div>
    </section>
  )
}

export default OfficialResourcesSection
 