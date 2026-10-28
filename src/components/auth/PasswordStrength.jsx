import { useTranslation } from 'react-i18next'
import { passwordStrength } from '../../utils/authValidation.js'

// Three-segment meter. Heuristic feedback only; not a security audit.
function PasswordStrength({ password, invalid }) {
  const { t } = useTranslation()
  const score = passwordStrength(password)
  const tone = score === 1 && (invalid || password) ? 'weak' : 'ok'

  return (
    <div className="strength">
      <div className="strength__bars" aria-hidden="true">
        {[1, 2, 3].map((segment) => (
          <span
            key={segment}
            className={`strength__bar${segment <= score ? ` is-filled is-${tone}` : ''}`}
          />
        ))}
      </div>
      <p className="strength__text" aria-live="polite">
        {t('auth.password.hint')}
        {score > 0 && (
          <span className="sr-only"> {t('auth.password.strength', { label: t(`auth.password.labels.${score}`) })}</span>
        )}
      </p>
    </div>
  )
}

export default PasswordStrength
