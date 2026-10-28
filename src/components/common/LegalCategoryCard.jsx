import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

function LegalCategoryCard({ id, icon: Icon, href, featured = false }) {
  const { t } = useTranslation()
  return (
    <li className={`category${featured ? ' category--featured' : ''}`}>
      <a className="category__link" href={href}>
        <span className="category__icon" aria-hidden="true">
          <Icon strokeWidth={1.75} />
        </span>
        <h3 className="category__title">{t(`categories.items.${id}.title`)}</h3>
        <p className="category__desc">{t(`categories.items.${id}.description`)}</p>
        <span className="category__cta">
          <span className="category__cta-text">{t('categories.cta')}</span>
          <ArrowRight aria-hidden="true" strokeWidth={2} />
        </span>
      </a>
    </li>
  )
}

export default LegalCategoryCard
