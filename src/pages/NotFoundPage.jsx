import Button from '../components/ui/Button.jsx'

function NotFoundPage() {
  return (
    <main className="not-found">
      <h1>Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Button to="/" arrow>Back to home</Button>
    </main>
  )
}

export default NotFoundPage
