import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import FilterSelect from './FilterSelect.jsx'
import { problemAreas } from '../../data/app.js'

// Search + problem area + (optional progress) + sort + clear, shared by My drafts and My checklist.
// `filters` is { query, area, sort, progress? }; `sorts` and `progressOptions` are option id lists.
function LibraryFilters({ idPrefix, searchPlaceholder, filters, onChange, onClear, sorts, progressOptions }) {
  const { t } = useTranslation()
  const set = (key) => (value) => onChange({ ...filters, [key]: value })

  return (
    <section className="lib-filters" aria-label={t('app.library.filters')}>
      <div className="lib-search">
        <label className="sr-only" htmlFor={`${idPrefix}-search`}>{searchPlaceholder}</label>
        <Search aria-hidden="true" strokeWidth={1.75} />
        <input
          id={`${idPrefix}-search`}
          type="search"
          value={filters.query}
          placeholder={searchPlaceholder}
          autoComplete="off"
          onChange={(event) => set('query')(event.target.value)}
        />
      </div>

      <FilterSelect id={`${idPrefix}-area`} label={t('app.library.area')} value={filters.area} onChange={set('area')}>
        <option value="all">{t('app.advocatesPage.filters.allAreas')}</option>
        {problemAreas.map((area) => (
          <option key={area} value={area}>{t(`app.areas.${area}`)}</option>
        ))}
      </FilterSelect>

      {progressOptions && (
        <FilterSelect id={`${idPrefix}-progress`} label={t('app.library.progress')} value={filters.progress} onChange={set('progress')}>
          <option value="all">{t('app.library.progressOptions.all')}</option>
          {progressOptions.map((option) => (
            <option key={option} value={option}>{t(`app.library.progressOptions.${option}`)}</option>
          ))}
        </FilterSelect>
      )}

      <FilterSelect id={`${idPrefix}-sort`} label={t('app.library.sort')} value={filters.sort} onChange={set('sort')}>
        {sorts.map((sort) => (
          <option key={sort} value={sort}>{t(`app.library.sorts.${sort}`)}</option>
        ))}
      </FilterSelect>

      <button type="button" className="adv-clear" onClick={onClear}>
        {t('app.library.clear')}
      </button>
    </section>
  )
}

export default LibraryFilters
