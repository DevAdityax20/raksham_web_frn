import { BookOpen, Lock, ShieldCheck } from 'lucide-react'

// Text lives in the locale files under `auth.benefits.<id>`.
export const authBenefits = [
  { id: 'plain', icon: BookOpen },
  { id: 'verified', icon: ShieldCheck },
  { id: 'control', icon: Lock },
]

// Neutral public page for Quick exit. Client code cannot reliably erase history.
export const QUICK_EXIT_URL = import.meta.env.VITE_QUICK_EXIT_URL || 'https://www.google.com'
