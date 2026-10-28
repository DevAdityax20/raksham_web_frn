import { useTranslation } from 'react-i18next'
import SectionEyebrow from '../common/SectionEyebrow.jsx'
import Button from '../ui/Button.jsx'
import FooterFeedbackForm from './FooterFeedbackForm.jsx'
import FooterBrand from './FooterBrand.jsx'
import FooterNavigationColumn from './FooterNavigationColumn.jsx'
import FooterBottomBar from './FooterBottomBar.jsx'
import { footerColumns } from '../../data/footer.js'

function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="footer" id="site-footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__cta">
            <SectionEyebrow className="eyebrow--on-dark">{t('footer.eyebrow')}</SectionEyebrow>
            <h2 className="footer__title">
              <span>{t('tagline.line1')}</span>
              <span>
                {t('tagline.line2Prefix')} <em>{t('tagline.highlight')}</em>
              </span>
            </h2>
            <p className="footer__lead">{t('footer.lead')}</p>
            <div className="footer__actions">
              <Button to="/auth/sign-in" arrow size="xl">{t('nav.getStarted')}</Button>
              <Button href="#how-it-works" variant="outline" size="xl">{t('hero.howItWorks')}</Button>
            </div>
          </div>
          <FooterFeedbackForm />
        </div>

        <hr className="footer__rule" />

        <div className="footer__nav">
          <FooterBrand />
          {footerColumns.map((column) => (
            <FooterNavigationColumn key={column.id} {...column} />
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
