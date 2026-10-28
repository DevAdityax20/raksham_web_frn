import FooterLanguageSelector from './FooterLanguageSelector.jsx'
import logo from '../../assets/images/logo.png'

function FooterBrand() {
  return (
    <div className="footer-brand">
      <a className="footer-brand__logo" href="#home" aria-label="Raksham, back to top">
        <img src={logo} alt="" width="46" height="46" />
        <span>Raksham</span>
      </a>
      <p className="footer-brand__desc">AI-guided legal information and navigation for people in India.</p>
      <FooterLanguageSelector />
    </div>
  )
}

export default FooterBrand
