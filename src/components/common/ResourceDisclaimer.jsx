import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import Button from '../ui/Button.jsx'

function ResourceDisclaimer() {
  const { t } = useTranslation()
  return (
    <div className="disclaimer">
      <p className="disclaimer__text">
        <Info aria-hidden="true" strokeWidth={1.75} />
        {t('resources.disclaimer')}
      </p>
      {/* The full directory is not built yet; this is an in-page placeholder. */}
      <Button href="#official-resources" variant="outline" arrow>{t('resources.browse')}</Button>
    </div>
  )
}

export default ResourceDisclaimer
