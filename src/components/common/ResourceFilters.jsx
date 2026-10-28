import { ChevronDown } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { resourceCategories, resourceCities, resourceTypes } from '../../data/resources.js'

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
  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch()
  }

  return (
    <form className="filters" onSubmit={handleSubmit} aria-label="Filter official resources">
      <FilterSelect
        id="filter-category"
        label="Category"
        placeholder="Select a category"
        options={resourceCategories}
        value={values.category}
        onChange={(value) => onChange({ category: value })}
      />
      <FilterSelect
        id="filter-city"
        label="City"
        placeholder="Select your city"
        options={resourceCities}
        value={values.city}
        onChange={(value) => onChange({ city: value })}
      />
      <FilterSelect
        id="filter-type"
        label="Type"
        placeholder="Select type"
        options={resourceTypes}
        value={values.type}
        onChange={(value) => onChange({ type: value })}
      />
      <Button type="submit" arrow className="filters__submit">Search</Button>
    </form>
  )
}

export default ResourceFilters
