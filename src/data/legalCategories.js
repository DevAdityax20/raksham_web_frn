import { Building2, FileText, House, Monitor, ShoppingBag, User } from 'lucide-react'

// Line breaks in descriptions follow the design reference (rendered via white-space: pre-line).
// `href` points at the in-page placeholder until category guidance pages exist.
export const legalCategories = [
  {
    id: 'womens-safety',
    title: "Women's Safety & Rights",
    description: 'Harassment, domestic violence\nand more.',
    icon: User,
    featured: true,
  },
  {
    id: 'cyber-crime',
    title: 'Cyber Crime',
    description: 'Online fraud, hacking,\nand scams.',
    icon: Monitor,
  },
  {
    id: 'consumer-rights',
    title: 'Consumer Rights',
    description: 'Defective products, refunds,\nand complaints.',
    icon: ShoppingBag,
  },
  {
    id: 'property-housing',
    title: 'Property & Housing',
    description: 'Disputes, rentals,\nand tenancy.',
    icon: House,
  },
  {
    id: 'government-services',
    title: 'Government Services',
    description: 'Bribery, service issues,\nand RTI.',
    icon: Building2,
  },
  {
    id: 'general-legal-help',
    title: 'General Legal Help',
    description: 'Basic guidance\nand common queries.',
    icon: FileText,
  },
].map((category) => ({ ...category, href: '#get-help' }))
