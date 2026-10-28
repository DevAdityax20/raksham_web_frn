import { passwordStrength, strengthLabels } from '../../utils/authValidation.js'

// Three-segment meter. Heuristic feedback only; not a security audit.
function PasswordStrength({ password, invalid }) {
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
        At least 8 characters.{score > 0 && <span className="sr-only"> Strength: {strengthLabels[score]}.</span>}
      </p>
    </div>
  )
}

export default PasswordStrength
