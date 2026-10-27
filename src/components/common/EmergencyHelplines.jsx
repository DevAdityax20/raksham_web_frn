import { Phone } from 'lucide-react'
import { helplines } from '../../data/helplines.js'

function EmergencyHelplines() {
  return (
    <section className="helplines" id="helplines" aria-labelledby="helplines-title">
      <div className="helplines__intro">
        <span className="helplines__icon" aria-hidden="true">
          <Phone fill="currentColor" strokeWidth={1.5} />
        </span>
        <div>
          <h2 className="helplines__title" id="helplines-title">Need urgent help?</h2>
          <p className="helplines__sub">Contact official helplines</p>
        </div>
      </div>
      <ul className="helplines__list">
        {helplines.map(({ number, name, description }) => (
          <li className="helplines__item" key={number}>
            <a className="helplines__link" href={`tel:${number}`} aria-label={`Call ${number}, ${name}`}>
              <span className="helplines__number">{number}</span>
              <span className="helplines__name">{name}</span>
              <span className="helplines__desc">{description}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default EmergencyHelplines
