import { useTranslation } from 'react-i18next'
import { CircleAlert } from 'lucide-react'

export function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p className="auth-error" id={id}>
      <CircleAlert aria-hidden="true" fill="currentColor" stroke="#fff" strokeWidth={2} />
      {children}
    </p>
  )
}

// Label + control + optional hint/error. The caller renders the control with the same `id`
// and wires `aria-describedby` to `${id}-hint` / `${id}-error`. `error` is already translated.
function AuthField({ id, label, optional = false, hint, error, children }) {
  const { t } = useTranslation()
  return (
    <div className="auth-field">
      <label className="auth-field__label" htmlFor={id}>
        {label}
        {optional && <span className="auth-field__optional"> {t('auth.common.optional')}</span>}
      </label>
      {children}
      <FieldError id={`${id}-error`}>{error}</FieldError>
      {hint && !error && (
        <p className="auth-field__hint" id={`${id}-hint`}>{hint}</p>
      )}
    </div>
  )
}

export default AuthField
