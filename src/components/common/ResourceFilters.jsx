import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { resourceCategoryIds, resourceCityIds, resourceTypeIds } from '../../data/resources.js'

function FilterSelect({ id, label, placeholder, options, value, onChange }) {
  return (
    <div className="filters__field">
      <label className="filters__label" htmlFor={id}>{label}</label>
      <div className="filters__control">
        <select id={id} className="filters__select" value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDown className="filters__chevron" aria-hidden="true" strokeWidth={2} />
      </div>
    </div>
  )
}

function ResourceFilters({ values, onChange, onSearch }) {
  const { t } = useTranslation()
  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch()
  }

  const categoryOptions = resourceCategoryIds.map((id) => ({ value: id, label: t(`categories.items.${id}.title`) }))
  const cityOptions = resourceCityIds.map((id) => ({ value: id, label: t(`resources.cities.${id}`) }))
  const typeOptions = resourceTypeIds.map((id) => ({ value: id, label: t(`resources.types.${id}`) }))

  return (
    <form className="filters" onSubmit={handleSubmit} aria-label={t('resources.filters.aria')}>
      <FilterSelect
        id="filter-category"
        label={t('resources.filters.category')}
        placeholder={t('resources.filters.categoryPlaceholder')}
        options={categoryOptions}
        value={values.category}
        onChange={(value) => onChange({ category: value })}
      />
      <FilterSelect
        id="filter-city"
        label={t('resources.filters.city')}
        placeholder={t('resources.filters.cityPlaceholder')}
        options={cityOptions}
        value={values.city}
        onChange={(value) => onChange({ city: value })}
      />
      <FilterSelect
        id="filter-type"
        label={t('resources.filters.type')}
        placeholder={t('resources.filters.typePlaceholder')}
        options={typeOptions}
        value={values.type}
        onChange={(value) => onChange({ type: value })}
      />
      <Button type="submit" arrow className="filters__submit">{t('resources.filters.search')}</Button>
    </form>
  )
}

export default ResourceFilters
