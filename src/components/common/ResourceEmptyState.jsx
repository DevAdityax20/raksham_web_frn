import { FileSearch } from 'lucide-react'
import Button from '../ui/Button.jsx'

function ResourceEmptyState({ onClear }) {
  return (
    <div className="empty" role="status">
      <span className="empty__icon" aria-hidden="true">
        <FileSearch strokeWidth={1.5} />
      </span>
      <div className="empty__text">
        <h3>No matches yet.</h3>
        <p>Try another city or category.</p>
      </div>
      <Button onClick={onClear}>Clear filters</Button>
    </div>
  )
}

export default ResourceEmptyState
