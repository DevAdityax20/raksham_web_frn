import {
  ClipboardCheck,
  CircleHelp,
  FileText,
  House,
  Landmark,
  MessageCircleMore,
  Settings,
  User,
} from 'lucide-react'

// Sachi's avatar, hosted on Cloudinary.
export const SACHI_AVATAR_URL = 'https://res.cloudinary.com/dmloakbty/image/upload/v1793351573/Sachi-Ai_mruvru.png'

// Placeholder identity until real authentication exists.
export const mockUser = { name: 'Naman', initials: 'NS' }

// Sidebar entries, in display order. Labels live in the locale files under `app.nav.<labelKey>`.
export const appNav = [
  { id: 'home', to: '/app/home', icon: House },
  { id: 'askSachi', to: '/app/ask-sachi', icon: MessageCircleMore },
  { id: 'problemAreas', to: '/app/problem-areas', icon: FileText },
  { id: 'resources', to: '/app/resources', icon: Landmark },
  { id: 'advocates', to: '/app/advocates', icon: User, badge: true },
  { id: 'checklist', to: '/app/checklist', icon: ClipboardCheck },
  { id: 'drafts', to: '/app/drafts', icon: FileText },
  { id: 'privacy', to: '/app/privacy', icon: Settings },
  { id: 'help', to: '/app/help', icon: CircleHelp },
]

// Problem areas offered to the citizen. Labels live under `app.areas.<id>`.
export const problemAreas = ['domestic', 'bribery', 'cyber', 'police', 'general']

// The three shown as quick pills on the dashboard.
export const quickAreas = ['domestic', 'bribery', 'cyber']
