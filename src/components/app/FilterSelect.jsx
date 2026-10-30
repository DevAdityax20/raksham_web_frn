import { ChevronDown } from 'lucide-react'

// Labelled native <select> with the Raksham chevron (keyboard and screen-reader friendly by default).
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

export default FilterSelect
