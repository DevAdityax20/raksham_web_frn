import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button.jsx'

function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <main className="not-found">
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.body')}</p>
      <Button to="/" arrow>{t('notFound.back')}</Button>
    </main>
  )
}

export default NotFoundPage
