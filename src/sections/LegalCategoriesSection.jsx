import { Phone } from 'lucide-react'
import SectionEyebrow from '../components/common/SectionEyebrow.jsx'
import LegalCategoryCard from '../components/common/LegalCategoryCard.jsx'
import Button from '../components/ui/Button.jsx'
import { legalCategories } from '../data/legalCategories.js'

function LegalCategoriesSection() {
  return (
    <section className="categories" id="get-help" aria-labelledby="categories-title">
      <div className="wrap">
        <SectionEyebrow>Get help</SectionEyebrow>
        <h2 className="categories__title" id="categories-title">What do you need help with?</h2>
        <p className="categories__sub">Choose a category to get clear, step-by-step guidance in simple language.</p>

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
            <h3>Not sure where to start?</h3>
            <p>We’ll guide you to the right category.</p>
          </div>
          {/* The guided questionnaire is not built yet; this points at the categories above. */}
          <Button href="#get-help" arrow>Answer a few questions</Button>
        </div>
      </div>
    </section>
  )
}

export default LegalCategoriesSection
