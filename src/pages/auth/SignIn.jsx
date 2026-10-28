import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Info, LoaderCircle } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField from '../../components/auth/AuthField.jsx'
import PasswordInput from '../../components/auth/PasswordInput.jsx'
import GoogleIcon from '../../components/auth/GoogleIcon.jsx'
import Button from '../../components/ui/Button.jsx'
import { signIn, signInWithGoogle } from '../../services/authService.js'
import { validateIdentifier } from '../../utils/authValidation.js'

function SignIn() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // { tone: 'info', text }
  const [loading, setLoading] = useState(false)
  const identifierRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {
      identifier: validateIdentifier(identifier),
      password: password ? '' : 'Please enter your password.',
    }
    setErrors(nextErrors)
    setStatus(null)
    if (nextErrors.identifier) return identifierRef.current?.focus()
    if (nextErrors.password) return passwordRef.current?.focus()

    setLoading(true)
    const result = await signIn({ identifier: identifier.trim(), password })
    setLoading(false)
    if (!result.ok) {
      setPassword('')
      setStatus({ text: 'Sign-in is not connected yet, so you were not signed in. Nothing was sent.' })
    }
  }

  const handleGoogle = async () => {
    const result = await signInWithGoogle()
    if (!result.ok) setStatus({ text: 'Google sign-in is not set up yet.' })
  }

  return (
    <AuthLayout active="sign-in">
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-sub">Sign in to continue your guidance.</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthField id="signin-identifier" label="Email or mobile number" error={errors.identifier}>
          <input
            id="signin-identifier"
            ref={identifierRef}
            className={`auth-input${errors.identifier ? ' has-error' : ''}`}
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="Enter your email or mobile number"
            autoComplete="username"
            aria-invalid={errors.identifier ? true : undefined}
            aria-describedby={errors.identifier ? 'signin-identifier-error' : undefined}
          />
        </AuthField>

        <AuthField id="signin-password" label="Password" error={errors.password}>
          <PasswordInput
            id="signin-password"
            inputRef={passwordRef}
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            autoComplete="current-password"
            invalid={Boolean(errors.password)}
            describedBy={errors.password ? 'signin-password-error' : undefined}
          />
        </AuthField>

        <div className="auth-form__aside">
          {/* No recovery workflow exists yet, so this reports that honestly. */}
          <button
            type="button"
            className="auth-link"
            onClick={() => setStatus({ text: 'Password recovery is not available yet.' })}
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" className="auth-submit" disabled={loading} aria-busy={loading}>
          {loading ? (
            <>
              <LoaderCircle className="auth-spinner" aria-hidden="true" strokeWidth={2} />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>

        <p className={`auth-status${status ? ' is-visible' : ''}`} role="status">{status?.text}</p>

        <div className="auth-or" aria-hidden="true"><span>or</span></div>

        <button type="button" className="auth-google" onClick={handleGoogle}>
          <GoogleIcon />
          <span>
            Continue with Google <span className="auth-google__optional">(Optional)</span>
          </span>
        </button>

        <Link className="auth-link auth-anon-link" to="/">Continue without an account</Link>

        <p className="auth-note">
          <Info aria-hidden="true" fill="currentColor" stroke="#fff" strokeWidth={2} />
          Limited features. Scope of anonymous access to be confirmed.
        </p>
      </form>
    </AuthLayout>
  )
}

export default SignIn
