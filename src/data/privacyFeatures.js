import { Bell, FileText, Lock, Trash2 } from 'lucide-react'

// Text lives in the locale files under `privacy.rows.<id>`, `privacy.canDo` and `privacy.cannotDo`.
export const privacyFeatures = [
  { id: 'needed', icon: Lock },
  { id: 'review', icon: FileText },
  { id: 'exit', icon: Bell },
  { id: 'data', icon: Trash2 },
]
