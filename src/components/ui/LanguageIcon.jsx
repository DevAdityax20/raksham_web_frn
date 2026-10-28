// "A / अ" translate glyph: Latin A (top-left), Devanagari अ (bottom-right), corner brackets.
function LanguageIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.5 12.5 7 3.5l3.5 9M4.9 9.5h4.2" />
      <path d="M14 3.5h3.5a2 2 0 0 1 2 2V8" />
      <path d="M4 15v3a2 2 0 0 0 2 2h3" />
      <path d="M12.5 13.5H20M17.5 13.5v7.2M17.5 17.2c-.6.7-1.4 1-2.1.8-1.3-.4-1.6-2.1-.5-2.8.8-.5 1.8-.2 2.6.5M14.2 20.2l1.6-1.2" />
    </svg>
  )
}

export default LanguageIcon
