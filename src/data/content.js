import { BookOpen, FileText, ShieldCheck, Users } from 'lucide-react'

// Display text lives in src/i18n/locales; entries here carry ids, icons and destinations only.
export const navLinks = [
  { id: 'home', href: '#home' },
  { id: 'how-it-works', href: '#how-it-works' },
  { id: 'official-resources', href: '#official-resources' },
  // Placeholder: no dedicated About page exists yet.
  { id: 'about', href: '#why-raksham' },
]

export const trustIndicators = [
  { id: 'free', icon: ShieldCheck },
  { id: 'verified', icon: FileText },
  { id: 'info', icon: Users },
]

export const guidanceCards = [
  { id: 'rights', icon: 'document' },
  { id: 'guidance', icon: 'compass' },
  { id: 'resources', icon: 'people' },
]

export const features = [
  { id: 'categories', icon: BookOpen },
  { id: 'guidance', icon: FileText },
  { id: 'resources', icon: ShieldCheck },
  { id: 'access', icon: Users },
]

export const steps = [
  { id: 'choose', number: '01' },
  { id: 'answer', number: '02' },
  { id: 'guidance', number: '03' },
  { id: 'support', number: '04', emphasis: true },
]

export const humanHelpPoints = ['credentials', 'fees', 'choice']
