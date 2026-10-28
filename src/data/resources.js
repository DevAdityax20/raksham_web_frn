import { legalCategories } from './legalCategories.js'

// SAMPLE DATA ONLY. These records are placeholders for the design and must be
// replaced with verified data before launch. They carry no real contact details,
// addresses, URLs, or geographic coverage (`city: null` means "not specified").
// Visible text lives in the locale files under `resources.*`.
export const resourceCategoryIds = legalCategories.map(({ id }) => id)

// Filter options only; they make no claim about where resources exist.
export const resourceCityIds = ['delhi', 'mumbai', 'bengaluru', 'chennai', 'kolkata', 'hyderabad']

export const resourceTypeIds = [
  'government-authority',
  'legal-aid-service',
  'support-organization',
  'official-portal',
]

export const resources = [
  {
    id: 'sample-state-legal-services',
    badge: 'official',
    categoryId: 'general-legal-help',
    typeId: 'legal-aid-service',
    city: null,
    lastReviewed: '2025-01-12',
    isSample: true,
  },
  {
    id: 'sample-women-support-center',
    badge: 'support-organization',
    categoryId: 'womens-safety',
    typeId: 'support-organization',
    city: null,
    lastReviewed: '2025-02-05',
    isSample: true,
  },
  {
    id: 'sample-cyber-crime-portal',
    badge: 'official',
    categoryId: 'cyber-crime',
    typeId: 'official-portal',
    city: null,
    lastReviewed: '2025-01-18',
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
