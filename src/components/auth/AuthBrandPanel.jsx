import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authBenefits } from '../../data/auth.js'
import logo from '../../assets/images/logo.png'

function AuthBrandPanel() {
  const { t } = useTranslation()
  return (
    <aside className="auth-brand">
      <Link className="auth-brand__logo" to="/" aria-label={t('auth.brand.homeAria')}>
        <img src={logo} alt="" width="56" height="56" />
        <span>Raksham</span>
      </Link>

      <div className="auth-brand__body">
        <h2 className="auth-brand__title">
          <span>{t('tagline.line1')}</span>
          <span>
            {t('tagline.line2Prefix')} <em>{t('tagline.highlight')}</em>
          </span>
        </h2>
        <p className="auth-brand__lead">
          {t('auth.brand.lead1')}
          <br />
          {t('auth.brand.lead2')}
        </p>

        <ul className="auth-benefits">
          {authBenefits.map(({ id, icon: Icon }) => (
            <li className="auth-benefit" key={id}>
              <Icon aria-hidden="true" strokeWidth={1.75} />
              <div>
                <h3>{t(`auth.benefits.${id}.title`)}</h3>
                <p>{t(`auth.benefits.${id}.description`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative orbit with dots (tall viewports only) and the bottom shield mark */}
      <svg className="auth-brand__orbit" viewBox="0 0 200 520" aria-hidden="true" focusable="false">
        <path
          d="M0 0C50 40 85 80 82 108C105 150 125 200 120 255C118 320 126 360 117 409L112 520"
          fill="none"
          stroke="#ffc400"
          strokeWidth="2"
          opacity="0.85"
        />
        <g fill="#ffc400">
          <circle cx="82" cy="108" r="18" />
          <circle cx="120" cy="255" r="18" />
          <circle cx="117" cy="409" r="18" />
        </g>
      </svg>
      <div className="auth-brand__foot">
        <svg className="auth-brand__shield" viewBox="0 0 110 136" aria-hidden="true" focusable="false">
          <path d="M55 0 110 18V58Q110 110 55 136 0 110 0 58V18Z" fill="#ffc400" />
          <path d="M27 40Q55 56 83 40L55 84Z" fill="#080808" />
        </svg>

        <p className="auth-brand__disclaimer">{t('auth.brand.disclaimer')}</p>
      </div>
    </aside>
  )
}

export default AuthBrandPanel
