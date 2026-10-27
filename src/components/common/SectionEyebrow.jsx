function SectionEyebrow({ children, lineFirst = true, className = '' }) {
  return (
    <p className={`eyebrow ${className}`.trim()}>
      {lineFirst && <span className="eyebrow__line" aria-hidden="true" />}
      {children}
    </p>
  )
}

export default SectionEyebrow
