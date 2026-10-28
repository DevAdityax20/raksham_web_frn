// `href: null` marks a destination that has no page yet; it renders as a disabled link.
// Text lives in the locale files under `footer.columns.<id>`.
export const footerColumns = [
  {
    id: 'getHelp',
    links: [
      { id: 'domestic', href: '#get-help' },
      { id: 'bribery', href: '#get-help' },
      { id: 'police', href: '#get-help' },
      { id: 'cyber', href: '#get-help' },
      { id: 'general', href: '#get-help' },
    ],
  },
  {
    id: 'explore',
    links: [
      { id: 'how', href: '#how-it-works' },
      { id: 'directory', href: '#official-resources' },
      { id: 'privacy', href: '#privacy-safety' },
      { id: 'report', href: '#footer-feedback' },
    ],
  },
  {
    id: 'company',
    links: [
      { id: 'about', href: '#why-raksham' },
      { id: 'contact', href: null },
      { id: 'policy', href: null },
      { id: 'terms', href: null },
    ],
  },
]

export const feedbackTypes = ['helpful', 'not-sure', 'needs-fixing']

export const FEEDBACK_MAX_LENGTH = 500
