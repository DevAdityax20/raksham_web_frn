import { useState } from 'react'
import { ChevronDown, ShieldCheck } from 'lucide-react'

// Preference UI only: the setting is not yet connected to any notification system.
function SafetyOptions({ hideSensitive, onHideSensitiveChange }) {
  const [open, setOpen] = useState(() => window.matchMedia('(min-width: 769px)').matches)

  return (
    <div className="safety">
      <button
        type="button"
        className="safety__header"
        aria-expanded={open}
        aria-controls="safety-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <ShieldCheck aria-hidden="true" strokeWidth={1.75} />
        <span>Safety options</span>
        <ChevronDown className="safety__chevron" aria-hidden="true" strokeWidth={2} />
      </button>

      <div className="safety__panel" id="safety-panel" hidden={!open}>
        <button
          type="button"
          role="switch"
          aria-checked={hideSensitive}
          aria-labelledby="safety-switch-label"
          className="switch"
          onClick={() => onHideSensitiveChange(!hideSensitive)}
        >
          <span className="switch__thumb" />
        </button>
        <div>
          <p className="safety__label" id="safety-switch-label">Hide sensitive content in notifications</p>
          <p className="safety__hint">Helpful on shared devices.</p>
        </div>
      </div>
    </div>
  )
}

export default SafetyOptions
