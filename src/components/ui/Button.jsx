import { ArrowRight } from 'lucide-react'

// variant: 'primary' (yellow) | 'outline' (inherits text color for its border)
// Renders a link when `href` is given, otherwise a <button> (use `type`/`onClick`).
function Button({ href, variant = 'primary', arrow = false, size = 'md', className = '', type = 'button', onClick, children }) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="btn__arrow" aria-hidden="true" strokeWidth={2.25} />}
    </>
  )

  if (href) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {content}
    </button>
  )
}

export default Button
