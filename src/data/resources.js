import { legalCategories } from './legalCategories.js'

// SAMPLE DATA ONLY. These records are placeholders for the design and must be
// replaced with verified data before launch. They carry no real contact details,
// addresses, URLs, or geographic coverage (`city: null` means "not specified").
export const resourceCategories = legalCategories.map(({ id, title }) => ({ value: id, label: title }))

// Filter options only; they make no claim about where resources exist.
export const resourceCities = [
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'bengaluru', label: 'Bengaluru' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'hyderabad', label: 'Hyderabad' },
]

export const resourceTypes = [
  { value: 'government-authority', label: 'Government authority' },
  { value: 'legal-aid-service', label: 'Legal aid service' },
  { value: 'support-organization', label: 'Support organization' },
  { value: 'official-portal', label: 'Official portal' },
]

export const resources = [
  {
    id: 'sample-state-legal-services',
    badge: 'Official',
    title: 'Sample: State Legal Services Authority',
    operator: 'Run by State Government',
    description: 'Provides free legal aid and support for eligible individuals.',
    categoryId: 'general-legal-help',
    categoryLabel: 'General legal help',
    typeId: 'legal-aid-service',
    city: null,
    contact: 'Verified contact shown here',
    lastReviewed: '12 Jan 2025',
    isSample: true,
  },
  {
    id: 'sample-women-support-center',
    badge: 'Support organization',
    title: 'Sample: Women Support Center',
    operator: 'Run by Non-profit Organization',
    description: 'Support services for women facing harassment, domestic violence and more.',
    categoryId: 'womens-safety',
    categoryLabel: "Women's safety & rights",
    typeId: 'support-organization',
    city: null,
    contact: 'Verified contact shown here',
    lastReviewed: '05 Feb 2025',
    isSample: true,
  },
  {
    id: 'sample-cyber-crime-portal',
    badge: 'Official',
    title: 'Sample: Cyber Crime Portal',
    operator: 'Run by Government Authority',
    description: 'Report online fraud, cyber crime and internet-related offences.',
    categoryId: 'cyber-crime',
    categoryLabel: 'Cyber crime',
    typeId: 'official-portal',
    city: null,
    contact: 'Verified contact shown here',
    lastReviewed: '18 Jan 2025',
    isSample: true,
  },
]

export const emptyFilters = { category: '', city: '', type: '' }

// An empty filter value matches everything. A selected city only matches
// records that explicitly list that city.
export function filterResources(items, { category, city, type }) {
  return items.filter(
    (item) =>
      (!category || item.categoryId === category) &&
      (!city || item.city === city) &&
      (!type || item.typeId === type),
  )
}
