import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import LegalCategoryCard from '../components/common/LegalCategoryCard.jsx'
import Button from '../components/ui/Button.jsx'
import { legalCategories } from '../data/legalCategories.js'

function LegalCategoriesSection() {
  const { t } = useTranslation()
  return (
    <section className="categories" id="get-help" aria-labelledby="categories-title">
      <div className="wrap">
        <SectionEyebrow>{t('categories.eyebrow')}</SectionEyebrow>
        <h2 className="categories__title" id="categories-title">{t('categories.title')}</h2>
        <p className="categories__sub">{t('categories.sub')}</p>

        <ul className="categories__grid">
          {legalCategories.map((category) => (
            <LegalCategoryCard key={category.id} {...category} />
          ))}
        </ul>

        <div className="assist">
          <span className="assist__icon" aria-hidden="true">
            <Phone fill="currentColor" strokeWidth={1.5} />
          </span>
          <div className="assist__text">
            <h3>{t('categories.assistTitle')}</h3>
            <p>{t('categories.assistBody')}</p>
          </div>
          {/* The guided questionnaire is not built yet; this points at the categories above. */}
          <Button href="#get-help" arrow>{t('categories.assistButton')}</Button>
        </div>
      </div>
    </section>
  )
}

export default LegalCategoriesSection
