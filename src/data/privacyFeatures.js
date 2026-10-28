import { Bell, FileText, Lock, Trash2 } from 'lucide-react'

export const privacyFeatures = [
  { icon: Lock, title: 'We ask only what’s needed', description: 'No unnecessary personal details.' },
  { icon: FileText, title: 'Nothing is filed or shared without your review', description: 'You confirm every step.' },
  { icon: Bell, title: 'Quick exit and safe notifications', description: 'Sensitive content is never shown in notifications by default.' },
  { icon: Trash2, title: 'Access and delete your data', description: 'You can view, export, or delete your saved information.' },
]

export const canDo = [
  'Explain your rights in plain language.',
  'Show source-backed next steps.',
  'Point you to official resources.',
  'Help you prepare a factual summary.',
]

export const cannotDo = [
  'Replace a lawyer, police, or emergency services.',
  'Guarantee a legal outcome.',
  'File anything on your behalf without your confirmation.',
]
