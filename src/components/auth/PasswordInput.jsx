import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff } from 'lucide-react'

function PasswordInput({ id, value, onChange, placeholder, autoComplete, invalid, describedBy, inputRef }) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  return (
    <div className="auth-password">
      <input
        id={id}
        ref={inputRef}
        className={`auth-input${invalid ? ' has-error' : ''}`}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
      />
      <button
        type="button"
        className="auth-password__toggle"
        aria-label={visible ? t('auth.password.hide') : t('auth.password.show')}
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOff aria-hidden="true" strokeWidth={1.75} /> : <Eye aria-hidden="true" strokeWidth={1.75} />}
      </button>
    </div>
  )
}

export default PasswordInput
