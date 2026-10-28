import { useRef, useState } from 'react'
import { ArrowRight, CircleAlert, CircleHelp, Lock, ThumbsUp } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { FEEDBACK_MAX_LENGTH, feedbackTypes } from '../../data/footer.js'
import { submitFeedback } from '../../services/feedbackService.js'

const typeIcons = { helpful: ThumbsUp, 'not-sure': CircleHelp, 'needs-fixing': CircleAlert }

function FooterFeedbackForm() {
  const [type, setType] = useState('helpful')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null) // null | { tone: 'error' | 'info', text }
  const textareaRef = useRef(null)
  const cardRef = useRef(null)
  const [tilting, setTilting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!message.trim()) {
      setStatus({ tone: 'error', text: 'Please tell us what to improve before sending.' })
      textareaRef.current?.focus()
      return
    }
    const result = await submitFeedback({ type, message: message.trim() })
    if (!result.ok) {
      setStatus({
        tone: 'info',
        text: 'The feedback service is not connected yet, so your message was not sent. It is still here if you want to copy it.',
      })
    }
  }

  // "Report an incorrect answer" has no separate workflow yet: it preselects
  // "Needs fixing" and moves the user to the message box.
  const startIncorrectReport = () => {
    setType('needs-fixing')
    textareaRef.current?.focus()
  }

  // Pointer-driven tilt (mouse only; CSS disables it for reduced motion / touch).
  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const style = cardRef.current.style
    style.setProperty('--ry', `${((x - 0.5) * 10).toFixed(2)}deg`)
    style.setProperty('--rx', `${((0.5 - y) * 8).toFixed(2)}deg`)
    style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    setTilting(true)
  }

  const resetTilt = () => {
    const style = cardRef.current?.style
    if (style) ['--rx', '--ry', '--mx', '--my'].forEach((name) => style.removeProperty(name))
    setTilting(false)
  }

  return (
    <div className="feedback-3d" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
    <form
      ref={cardRef}
      className={`feedback${tilting ? ' is-tilting' : ''}`}
      id="footer-feedback"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="feedback-title"
    >
      <h2 className="feedback__title" id="feedback-title">Help us get it right</h2>
      <p className="feedback__sub">
        Spot something unclear or incorrect? Tell us.
        <br />
        We review every report.
      </p>

      <div className="feedback__types" role="group" aria-label="Feedback type">
        {feedbackTypes.map(({ value, label }) => {
          const Icon = typeIcons[value]
          const selected = type === value
          return (
            <button
              key={value}
              type="button"
              className={`feedback__type${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => setType(value)}
            >
              <Icon aria-hidden="true" strokeWidth={1.75} />
              {label}
            </button>
          )
        })}
      </div>

      <div className="feedback__field">
        <label className="sr-only" htmlFor="feedback-message">What should we improve?</label>
        <textarea
          id="feedback-message"
          ref={textareaRef}
          className="feedback__textarea"
          placeholder="What should we improve?"
          maxLength={FEEDBACK_MAX_LENGTH}
          value={message}
          aria-describedby="feedback-privacy feedback-status"
          onChange={(event) => {
            setMessage(event.target.value)
            if (status?.tone === 'error') setStatus(null)
          }}
        />
        <span className="feedback__count" aria-live="off">{message.length}/{FEEDBACK_MAX_LENGTH}</span>
      </div>

      <p className="feedback__privacy" id="feedback-privacy">
        <Lock aria-hidden="true" strokeWidth={1.5} />
        Please don’t include personal or sensitive details.
      </p>

      <Button type="submit" className="feedback__submit">Send feedback</Button>

      <p
        className={`feedback__status${status ? ` feedback__status--${status.tone}` : ''}`}
        id="feedback-status"
        role="status"
      >
        {status?.text}
      </p>

      <button type="button" className="feedback__report" onClick={startIncorrectReport}>
        <span className="feedback__report-text">Report an incorrect answer</span>
        <ArrowRight aria-hidden="true" strokeWidth={2} />
      </button>
    </form>
    </div>
  )
}

export default FooterFeedbackForm
