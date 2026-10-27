import { ArrowRight } from 'lucide-react'

// variant: 'primary' (yellow) | 'outline' (inherits text color for its border)
function Button({ href, variant = 'primary', arrow = false, size = 'md', className = '', children }) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')
  return (
    <a className={classes} href={href}>
      {children}
      {arrow && <ArrowRight className="btn__arrow" aria-hidden="true" strokeWidth={2.25} />}
    </a>
  )
}

export default Button
