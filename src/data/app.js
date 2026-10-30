import {
  ClipboardCheck,
  CircleHelp,
  Contact,
  FileQuestion,
  FileText,
  House,
  Landmark,
  LayoutGrid,
  MessageCircle,
  Monitor,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

// Sachi's avatar, hosted on Cloudinary.
export const SACHI_AVATAR_URL = 'https://res.cloudinary.com/dmloakbty/image/upload/v1793351573/Sachi-Ai_mruvru.png'

// Placeholder identity until real authentication exists.
export const mockUser = { name: 'Naman', initials: 'NS' }

// Sidebar entries, in display order. Labels live in the locale files under `app.nav.<labelKey>`.
export const appNav = [
  { id: 'home', to: '/app/home', icon: House },
  { id: 'askSachi', to: '/app/ask-sachi', icon: MessageCircle },
  { id: 'problemAreas', to: '/app/problem-areas', icon: LayoutGrid },
  { id: 'resources', to: '/app/resources', icon: FileText },
  { id: 'advocates', to: '/app/advocates', icon: UserRound, badge: true },
  { id: 'checklist', to: '/app/checklist', icon: ClipboardCheck },
  { id: 'drafts', to: '/app/drafts', icon: FileText },
  { id: 'privacy', to: '/app/privacy', icon: ShieldCheck },
  { id: 'help', to: '/app/help', icon: CircleHelp },
]

// Problem areas offered to the citizen. Labels live under `app.areas.<id>`.
export const problemAreas = ['domestic', 'bribery', 'cyber', 'police', 'general']

// Display order and icons of the cards on the Problem areas page.
export const problemAreaCards = [
  { id: 'domestic', icon: House },
  { id: 'bribery', icon: Landmark },
  { id: 'police', icon: Contact },
  { id: 'cyber', icon: Monitor },
  { id: 'general', icon: FileQuestion },
]

// The three shown as quick pills on the dashboard.
export const quickAreas = ['domestic', 'bribery', 'cyber']
