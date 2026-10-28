import { Phone } from 'lucide-react'

function FooterBottomBar() {
  return (
    <div className="footer-bar">
      <a className="footer-bar__emergency" href="tel:112">
        <span className="footer-bar__icon" aria-hidden="true">
          <Phone fill="currentColor" strokeWidth={1.5} />
        </span>
        <span>
          In immediate danger? Call <strong>112.</strong>
        </span>
      </a>
      <p className="footer-bar__legal">
        Raksham provides general legal information, not legal advice.
        <br />
        Raksham is not affiliated with any government body.
      </p>
      <p className="footer-bar__copy">© {new Date().getFullYear()} Raksham. All rights reserved.</p>
    </div>
  )
}

export default FooterBottomBar
