// `href: null` marks a destination that has no page yet; it renders as a disabled link.
export const footerColumns = [
  {
    title: 'Get help',
    links: [
      { label: 'Domestic abuse and family harassment', href: '#get-help' },
      { label: 'Bribery and government services', href: '#get-help' },
      { label: 'Police encounters and citizen rights', href: '#get-help' },
      { label: 'Cybercrime and blackmail', href: '#get-help' },
      { label: 'General legal help', href: '#get-help' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Resource directory', href: '#official-resources' },
      { label: 'Privacy and safety', href: '#privacy-safety' },
      { label: 'Report an issue', href: '#footer-feedback' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#why-raksham' },
      { label: 'Contact', href: null },
      { label: 'Privacy policy', href: null },
      { label: 'Terms', href: null },
    ],
  },
]

export const languages = [
  { code: 'en', label: 'English', lang: 'en' },
  { code: 'hi', label: 'हिन्दी', lang: 'hi' },
]

export const feedbackTypes = [
  { value: 'helpful', label: 'Helpful' },
  { value: 'not-sure', label: 'Not sure' },
  { value: 'needs-fixing', label: 'Needs fixing' },
]

export const FEEDBACK_MAX_LENGTH = 500
