import { useTranslation } from 'react-i18next'
import FooterLanguageSelector from './FooterLanguageSelector.jsx'
import logo from '../../assets/images/logo.png'

function FooterBrand() {
  const { t } = useTranslation()
  return (
    <div className="footer-brand">
      <a className="footer-brand__logo" href="#home" aria-label={t('footer.brand.logoAria')}>
        <img src={logo} alt="" width="46" height="46" />
        <span>Raksham</span>
      </a>
      <p className="footer-brand__desc">{t('footer.brand.description')}</p>
      <FooterLanguageSelector />
    </div>
  )
}

export default FooterBrand
