import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// variant: 'primary' (yellow) | 'outline' (inherits text color for its border)
// Renders a router <Link> for `to`, an <a> for `href`, otherwise a <button> (use `type`/`onClick`).
function Button({ to, href, variant = 'primary', arrow = false, size = 'md', className = '', type = 'button', onClick, children, ...rest }) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="btn__arrow" aria-hidden="true" strokeWidth={2.25} />}
    </>
  )

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}

export default Button
