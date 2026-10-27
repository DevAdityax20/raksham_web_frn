import { ArrowRight } from 'lucide-react'

function LegalCategoryCard({ title, description, icon: Icon, href, featured = false }) {
  return (
    <li className={`category${featured ? ' category--featured' : ''}`}>
      <a className="category__link" href={href}>
        <span className="category__icon" aria-hidden="true">
          <Icon strokeWidth={1.75} />
        </span>
        <h3 className="category__title">{title}</h3>
        <p className="category__desc">{description}</p>
        <span className="category__cta">
          <span className="category__cta-text">Get guidance</span>
          <ArrowRight aria-hidden="true" strokeWidth={2} />
        </span>
      </a>
    </li>
  )
}

export default LegalCategoryCard
