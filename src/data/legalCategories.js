import { Building2, FileText, House, Monitor, ShoppingBag, User } from 'lucide-react'

// Titles and descriptions live in the locale files under `categories.items.<id>`.
// `href` points at the in-page placeholder until category guidance pages exist.
export const legalCategories = [
  { id: 'womens-safety', icon: User, featured: true },
  { id: 'cyber-crime', icon: Monitor },
  { id: 'consumer-rights', icon: ShoppingBag },
  { id: 'property-housing', icon: House },
  { id: 'government-services', icon: Building2 },
  { id: 'general-legal-help', icon: FileText },
].map((category) => ({ ...category, href: '#get-help' }))
