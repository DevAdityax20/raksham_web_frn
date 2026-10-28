import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'

function FooterBottomBar() {
  const { t } = useTranslation()
  return (
    <div className="footer-bar">
      <a className="footer-bar__emergency" href="tel:112">
        <span className="footer-bar__icon" aria-hidden="true">
          <Phone fill="currentColor" strokeWidth={1.5} />
        </span>
        <span>
          {t('footer.emergencyPrefix')} <strong>{t('footer.emergencyNumber')}</strong>
        </span>
      </a>
      <p className="footer-bar__legal">
        {t('footer.legal1')}
        <br />
        {t('footer.legal2')}
      </p>
      <p className="footer-bar__copy">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
    </div>
  )
}

export default FooterBottomBar
