import { Info } from 'lucide-react'
import Button from '../ui/Button.jsx'

function ResourceDisclaimer() {
  return (
    <div className="disclaimer">
      <p className="disclaimer__text">
        <Info aria-hidden="true" strokeWidth={1.75} />
        Raksham links to official sources. We are not affiliated with any government body.
      </p>
      {/* The full directory is not built yet; this is an in-page placeholder. */}
      <Button href="#official-resources" variant="outline" arrow>Browse full directory</Button>
    </div>
  )
}

export default ResourceDisclaimer
