import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import {
  advocateAreaFilters,
  advocateLanguageFilters,
  advocateModeFilters,
} from '../../data/sampleAdvocates.js'

function FilterSelect({ id, label, value, onChange, children }) {
  return (
    <div className="adv-filter">
      <label htmlFor={id}>{label}</label>
      <div className="adv-filter__select">
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
          {children}
        </select>
        <ChevronDown aria-hidden="true" strokeWidth={2} />
      </div>
    </div>
  )
}

function AdvocateFilters({ filters, onChange, onClear }) {
  const { t } = useTranslation()
  const set = (key) => (value) => onChange({ ...filters, [key]: value })

  return (
    <section className="adv-filters" aria-label={t('app.advocatesPage.filters.label')}>
      <FilterSelect id="adv-area" label={t('app.advocatesPage.filters.area')} value={filters.area} onChange={set('area')}>
        <option value="all">{t('app.advocatesPage.filters.allAreas')}</option>
        {advocateAreaFilters.map((area) => (
          <option key={area} value={area}>{t(`app.advocatesPage.areas.${area}`)}</option>
        ))}
      </FilterSelect>

      <FilterSelect id="adv-language" label={t('app.advocatesPage.filters.language')} value={filters.language} onChange={set('language')}>
        <option value="all">{t('app.advocatesPage.filters.allLanguages')}</option>
        {advocateLanguageFilters.map((language) => (
          <option key={language} value={language}>
            {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : t('app.advocatesPage.filters.both')}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect id="adv-mode" label={t('app.advocatesPage.filters.mode')} value={filters.mode} onChange={set('mode')}>
        <option value="all">{t('app.advocatesPage.filters.allModes')}</option>
        {advocateModeFilters.map((mode) => (
          <option key={mode} value={mode}>{t(`app.advocatesPage.filters.${mode}`)}</option>
        ))}
      </FilterSelect>

      <button type="button" className="adv-clear" onClick={onClear}>
        {t('app.advocatesPage.filters.clear')}
      </button>
    </section>
  )
}

export default AdvocateFilters
