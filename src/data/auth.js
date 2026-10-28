import { BookOpen, Lock, ShieldCheck } from 'lucide-react'

export const authBenefits = [
  { icon: BookOpen, title: 'Plain-language guidance', description: 'Understand your rights in simple terms.' },
  { icon: ShieldCheck, title: 'Verified official resources', description: 'Access trusted government and support organizations.' },
  { icon: Lock, title: 'You control what you share', description: 'Share only what’s needed, on your terms.' },
]

// Neutral public page for Quick exit. Client code cannot reliably erase history.
export const QUICK_EXIT_URL = import.meta.env.VITE_QUICK_EXIT_URL || 'https://www.google.com'
