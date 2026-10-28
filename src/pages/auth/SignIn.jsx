import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Info, LoaderCircle } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import AuthField from '../../components/auth/AuthField.jsx'
import PasswordInput from '../../components/auth/PasswordInput.jsx'
import GoogleIcon from '../../components/auth/GoogleIcon.jsx'
import Button from '../../components/ui/Button.jsx'
import { signIn, signInWithGoogle } from '../../services/authService.js'
import { validateIdentifier } from '../../utils/authValidation.js'

function SignIn() {
  const { t } = useTranslation()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  // Errors and status hold translation keys so they re-translate when the language changes.
  const [errors, setErrors] = useState({})
  const [statusKey, setStatusKey] = useState(null)
  const [loading, setLoading] = useState(false)
  const identifierRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {
      identifier: validateIdentifier(identifier),
      password: password ? '' : 'auth.errors.passwordRequired',
    }
    setErrors(nextErrors)
    setStatusKey(null)
    if (nextErrors.identifier) return identifierRef.current?.focus()
    if (nextErrors.password) return passwordRef.current?.focus()

    setLoading(true)
    const result = await signIn({ identifier: identifier.trim(), password })
    setLoading(false)
    if (!result.ok) {
      setPassword('')
      setStatusKey('auth.signIn.notConnected')
    }
  }

  const handleGoogle = async () => {
    const result = await signInWithGoogle()
    if (!result.ok) setStatusKey('auth.signIn.googleUnavailable')
  }

  return (
    <AuthLayout active="sign-in">
      <h1 className="auth-title">{t('auth.signIn.title')}</h1>
      <p className="auth-sub">{t('auth.signIn.sub')}</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="signin-identifier"
          label={t('auth.common.identifierLabel')}
          error={errors.identifier && t(errors.identifier)}
        >
          <input
            id="signin-identifier"
            ref={identifierRef}
            className={`auth-input${errors.identifier ? ' has-error' : ''}`}
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder={t('auth.common.identifierPlaceholder')}
            autoComplete="username"
            aria-invalid={errors.identifier ? true : undefined}
            aria-describedby={errors.identifier ? 'signin-identifier-error' : undefined}
          />
        </AuthField>

        <AuthField
          id="signin-password"
          label={t('auth.common.passwordLabel')}
          error={errors.password && t(errors.password)}
        >
          <PasswordInput
            id="signin-password"
            inputRef={passwordRef}
            value={password}
            onChange={setPassword}
            placeholder={t('auth.signIn.passwordPlaceholder')}
            autoComplete="current-password"
            invalid={Boolean(errors.password)}
            describedBy={errors.password ? 'signin-password-error' : undefined}
          />
        </AuthField>

        <div className="auth-form__aside">
          {/* No recovery workflow exists yet, so this reports that honestly. */}
          <button type="button" className="auth-link" onClick={() => setStatusKey('auth.signIn.forgotUnavailable')}>
            {t('auth.signIn.forgot')}
          </button>
        </div>

        <Button type="submit" className="auth-submit" disabled={loading} aria-busy={loading}>
          {loading ? (
            <>
              <LoaderCircle className="auth-spinner" aria-hidden="true" strokeWidth={2} />
              {t('auth.signIn.submitting')}
            </>
          ) : (
            t('auth.signIn.submit')
          )}
        </Button>

        <p className={`auth-status${statusKey ? ' is-visible' : ''}`} role="status">
          {statusKey ? t(statusKey) : null}
        </p>

        <div className="auth-or" aria-hidden="true"><span>{t('auth.signIn.or')}</span></div>

        <button type="button" className="auth-google" onClick={handleGoogle}>
          <GoogleIcon />
          <span>
            {t('auth.signIn.google')} <span className="auth-google__optional">{t('auth.signIn.googleOptional')}</span>
          </span>
        </button>

        <Link className="auth-link auth-anon-link" to="/">{t('auth.signIn.anonymous')}</Link>

        <p className="auth-note">
          <Info aria-hidden="true" fill="currentColor" stroke="#fff" strokeWidth={2} />
          {t('auth.signIn.note')}
        </p>
      </form>
    </AuthLayout>
  )
}

export default SignIn
