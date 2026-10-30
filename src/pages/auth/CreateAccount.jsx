import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [hideSensitive, setHideSensitive] = useState(true)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  // Errors and status hold translation keys so they re-translate when the language changes.
  const [errors, setErrors] = useState({})
  const [statusKey, setStatusKey] = useState(null)
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
      password: password.length >= MIN_PASSWORD_LENGTH ? '' : 'auth.errors.passwordWeak',
      terms: acceptTerms && acceptPrivacy ? '' : 'auth.errors.terms',
    }
    setErrors(nextErrors)
    setStatusKey(null)
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
      setStatusKey('auth.createAccount.notConnected')
    }
  }

  return (
    <AuthLayout active="create-account">
      <h1 className="auth-title">{t('auth.createAccount.title')}</h1>
      <p className="auth-sub">{t('auth.createAccount.sub')}</p>

      <form className="auth-form auth-form--tight" onSubmit={handleSubmit} noValidate>
        <AuthField id="signup-name" label={t('auth.createAccount.nameLabel')} optional hint={t('auth.createAccount.nameHint')}>
          <input
            id="signup-name"
            className="auth-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('auth.createAccount.namePlaceholder')}
            autoComplete="name"
            aria-describedby="signup-name-hint"
          />
        </AuthField>

        <AuthField
          id="signup-identifier"
          label={t('auth.common.identifierLabel')}
          error={errors.identifier && t(errors.identifier)}
        >
          <input
            id="signup-identifier"
            ref={identifierRef}
            className={`auth-input${errors.identifier ? ' has-error' : ''}`}
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder={t('auth.common.identifierPlaceholder')}
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-invalid={errors.identifier ? true : undefined}
            aria-describedby={errors.identifier ? 'signup-identifier-error' : undefined}
          />
        </AuthField>

        <AuthField
          id="signup-password"
          label={t('auth.common.passwordLabel')}
          error={errors.password && t(errors.password)}
        >
          <PasswordInput
            id="signup-password"
            inputRef={passwordRef}
            value={password}
            onChange={setPassword}
            placeholder={t('auth.createAccount.passwordPlaceholder')}
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
            <span>
              {t('auth.createAccount.termsPrefix')} <PlaceholderLink>{t('auth.createAccount.termsLink')}</PlaceholderLink>
              {t('auth.createAccount.termsSuffix') && ` ${t('auth.createAccount.termsSuffix')}`}
            </span>
          </label>
          <label className="auth-check">
            <input
              type="checkbox"
              checked={acceptPrivacy}
              onChange={(event) => setAcceptPrivacy(event.target.checked)}
              aria-describedby={errors.terms ? 'signup-terms-error' : undefined}
              aria-invalid={errors.terms && !acceptPrivacy ? true : undefined}
            />
            <span>
              {t('auth.createAccount.privacyPrefix')} <PlaceholderLink>{t('auth.createAccount.privacyLink')}</PlaceholderLink>
              {t('auth.createAccount.privacySuffix') && ` ${t('auth.createAccount.privacySuffix')}`}
            </span>
          </label>
          <FieldError id="signup-terms-error">{errors.terms && t(errors.terms)}</FieldError>
        </div>

        <p className="auth-legal">
          {t('auth.createAccount.legal1')}
          <br />
          {t('auth.createAccount.legal2')}
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
              {t('auth.createAccount.submitting')}
            </>
          ) : (
            t('auth.createAccount.submit')
          )}
        </Button>

        <p className={`auth-status${statusKey ? ' is-visible' : ''}`} role="status">
          {statusKey ? t(statusKey) : null}
        </p>

        <p className="auth-advocate">
          <span>
            {t('auth.createAccount.advocatePrefix')} <PlaceholderLink>{t('auth.createAccount.advocateLink')}</PlaceholderLink>
          </span>
          {/* Design placeholder: no verification workflow exists, so this reflects no real status. */}
          <span className="auth-pill">{t('auth.createAccount.pending')}</span>
        </p>
      </form>
    </AuthLayout>
  )
}

export default CreateAccount
