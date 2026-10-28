import { Ban, Check, CircleMinus } from 'lucide-react'

// tone: 'can' (yellow checks) | 'cannot' (outlined prohibition icons)
function CapabilityList({ tone, heading, items }) {
  const isCan = tone === 'can'
  return (
    <div className="capability">
      <h4 className="capability__heading">
        <span className={`capability__lead capability__lead--${tone}`} aria-hidden="true">
          {isCan ? <Check strokeWidth={3} /> : <Ban strokeWidth={1.75} />}
        </span>
        {heading}
      </h4>
      <ul className="capability__list">
        {items.map((item) => (
          <li className="capability__item" key={item}>
            {isCan ? (
              <span className="capability__check" aria-hidden="true">
                <Check strokeWidth={3} />
              </span>
            ) : (
              <CircleMinus className="capability__minus" aria-hidden="true" strokeWidth={1.75} />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CapabilityList
