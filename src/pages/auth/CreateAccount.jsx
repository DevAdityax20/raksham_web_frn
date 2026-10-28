import { useRef, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField, { FieldError } from '../../components/auth/AuthField.jsx'
import PasswordInput from '../../components/auth/PasswordInput.jsx'
import PasswordStrength from '../../components/auth/PasswordStrength.jsx'
import SafetyOptions from '../../components/auth/SafetyOptions.jsx'
import PlaceholderLink from '../../components/auth/PlaceholderLink.jsx'
import Button from '../../components/ui/Button.jsx'
import { createAccount } from '../../services/authService.js'
import { MIN_PASSWORD_LENGTH, validateIdentifier } from '../../utils/authValidation.js'

function CreateAccount() {
  const [name, setName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [hideSensitive, setHideSensitive] = useState(true)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const identifierRef = useRef(null)
  const passwordRef = useRef(null)
  const termsRef = useRef(null)

  const isReady =
    !validateIdentifier(identifier) && password.length >= MIN_PASSWORD_LENGTH && acceptTerms && acceptPrivacy

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {
      identifier: validateIdentifier(identifier),
      password: password.length >= MIN_PASSWORD_LENGTH ? '' : 'Password is too weak. Use at least 8 characters.',
      terms: acceptTerms && acceptPrivacy ? '' : 'Please accept both to continue.',
    }
    setErrors(nextErrors)
    setStatus(null)
    if (nextErrors.identifier) return identifierRef.current?.focus()
    if (nextErrors.password) return passwordRef.current?.focus()
    if (nextErrors.terms) return termsRef.current?.focus()

    setLoading(true)
    // The password and settings are sent to the service only; never stored on the client.
    const result = await createAccount({
      name: name.trim(),
      identifier: identifier.trim(),
      password,
      hideSensitiveNotifications: hideSensitive,
    })
    setLoading(false)
    if (!result.ok) {
      setPassword('')
      setStatus({ text: 'Account creation is not connected yet, so no account was created. Nothing was sent.' })
    }
  }

  return (
    <AuthLayout active="create-account">
      <h1 className="auth-title">Create your account</h1>
      <p className="auth-sub">We only ask for what we need.</p>

      <form className="auth-form auth-form--tight" onSubmit={handleSubmit} noValidate>
        <AuthField id="signup-name" label="Full name" optional hint="You can use a nickname.">
          <input
            id="signup-name"
            className="auth-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name or nickname"
            autoComplete="name"
            aria-describedby="signup-name-hint"
          />
        </AuthField>

        <AuthField id="signup-identifier" label="Email or mobile number" error={errors.identifier}>
          <input
            id="signup-identifier"
            ref={identifierRef}
            className={`auth-input${errors.identifier ? ' has-error' : ''}`}
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="Enter your email or mobile number"
            autoComplete="username"
            aria-invalid={errors.identifier ? true : undefined}
            aria-describedby={errors.identifier ? 'signup-identifier-error' : undefined}
          />
        </AuthField>

        <AuthField id="signup-password" label="Password" error={errors.password}>
          <PasswordInput
            id="signup-password"
            inputRef={passwordRef}
            value={password}
            onChange={setPassword}
            placeholder="Create a password"
            autoComplete="new-password"
            invalid={Boolean(errors.password)}
            describedBy={errors.password ? 'signup-password-error' : undefined}
          />
        </AuthField>
        <PasswordStrength password={password} invalid={Boolean(errors.password)} />

        <SafetyOptions hideSensitive={hideSensitive} onHideSensitiveChange={setHideSensitive} />

        <div className="auth-checks">
          <label className="auth-check">
            <input
              ref={termsRef}
              type="checkbox"
              checked={acceptTerms}
              onChange={(event) => setAcceptTerms(event.target.checked)}
              aria-describedby={errors.terms ? 'signup-terms-error' : undefined}
              aria-invalid={errors.terms && !acceptTerms ? true : undefined}
            />
            <span>I agree to the <PlaceholderLink>Terms of Use</PlaceholderLink></span>
          </label>
          <label className="auth-check">
            <input
              type="checkbox"
              checked={acceptPrivacy}
              onChange={(event) => setAcceptPrivacy(event.target.checked)}
              aria-describedby={errors.terms ? 'signup-terms-error' : undefined}
              aria-invalid={errors.terms && !acceptPrivacy ? true : undefined}
            />
            <span>I have read the <PlaceholderLink>Privacy Policy</PlaceholderLink></span>
          </label>
          <FieldError id="signup-terms-error">{errors.terms}</FieldError>
        </div>

        <p className="auth-legal">
          Raksham provides general legal information, not legal advice.
          <br />
          We can’t guarantee absolute anonymity.
        </p>

        <Button
          type="submit"
          className={`auth-submit${isReady ? '' : ' is-inactive'}`}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="auth-spinner" aria-hidden="true" strokeWidth={2} />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>

        <p className={`auth-status${status ? ' is-visible' : ''}`} role="status">{status?.text}</p>

        <p className="auth-advocate">
          <span>
            Are you an advocate? <PlaceholderLink>Apply for verification</PlaceholderLink>
          </span>
          {/* Design placeholder: no verification workflow exists, so this reflects no real status. */}
          <span className="auth-pill">Pending approval</span>
        </p>
      </form>
    </AuthLayout>
  )
}

export default CreateAccount
