import SectionEyebrow from '../common/SectionEyebrow.jsx'
import Button from '../ui/Button.jsx'
import FooterFeedbackForm from './FooterFeedbackForm.jsx'
import FooterBrand from './FooterBrand.jsx'
import FooterNavigationColumn from './FooterNavigationColumn.jsx'
import FooterBottomBar from './FooterBottomBar.jsx'
import { footerColumns } from '../../data/footer.js'

function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__cta">
            <SectionEyebrow className="eyebrow--on-dark">Ready when you are</SectionEyebrow>
            <h2 className="footer__title">
              <span>Know your rights.</span>
              <span>
                Know your <em>next step.</em>
              </span>
            </h2>
            <p className="footer__lead">Free to use. Information, not legal advice.</p>
            <div className="footer__actions">
              <Button href="#get-help" arrow size="xl">Get Started</Button>
              <Button href="#how-it-works" variant="outline" size="xl">How it works</Button>
            </div>
          </div>
          <FooterFeedbackForm />
        </div>

        <hr className="footer__rule" />

        <div className="footer__nav">
          <FooterBrand />
          {footerColumns.map((column) => (
            <FooterNavigationColumn key={column.title} {...column} />
          ))}
        </div>

        <hr className="footer__rule" />
        <FooterBottomBar />
      </div>

      <div className="footer__mark" aria-hidden="true">Raksham</div>
    </footer>
  )
}

export default Footer
