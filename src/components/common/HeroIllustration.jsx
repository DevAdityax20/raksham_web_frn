import { useTranslation } from 'react-i18next'
import { Compass, FileText, Users } from 'lucide-react'
import { guidanceCards } from '../../data/content.js'

const cardIcons = { document: FileText, compass: Compass, people: Users }

function Tree({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 40V24" />
      <path d="M-6 28 0 20" />
      <circle cx="0" cy="0" r="21" />
    </g>
  )
}

function HeroIllustration() {
  const { t } = useTranslation()
  return (
    <div className="hero-art">
      <svg className="hero-art__svg" viewBox="0 0 790 700" aria-hidden="true" focusable="false">
        {/* sparks */}
        <g strokeLinecap="round" strokeWidth="5">
          <path d="M160 18l32 44" stroke="#fff" />
          <path d="M118 72l44 24" stroke="#ffc400" />
          <path d="M140 300l34 38" stroke="#ffc400" />
          <path d="M475 462l55-60" stroke="#fff" strokeWidth="3" />
          <path d="M600 262l-6 18" stroke="#fff" strokeWidth="2" />
        </g>

        {/* shield */}
        <path
          fill="#ffc400"
          d="M373 45 545 100q7 2 7 12v138q0 90-179 210Q195 340 195 250V112q0-10 6-12Z"
        />

        {/* scales of justice */}
        <g stroke="#0a0a0a" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="373" cy="150" r="10" fill="#0a0a0a" />
          <path d="M373 160V335" strokeWidth="13" />
          <path d="M296 186Q373 176 450 186" strokeWidth="9" />
          <path d="M303 190 270 250M303 190 336 250M438 190 405 250M438 190 471 250" strokeWidth="4" />
          <path d="M268 248h70a35 35 0 0 1-70 0ZM403 248h70a35 35 0 0 1-70 0Z" fill="#0a0a0a" strokeWidth="4" />
          <path d="M330 340h86" strokeWidth="14" />
        </g>

        {/* landmarks and ground */}
        <g stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M6 517 300 497" />
          <path d="M440 523 745 560" />
          <Tree x={47} y={478} />
          <Tree x={248} y={455} />
          {/* India Gate */}
          <path d="M96 500V400h8V382h72v18h8v100" />
          <path d="M112 500V450a32 32 0 0 1 64 0v50" />
          <path d="M104 400h72M120 382v-18h40v18M132 364v-14h16v14" />
          {/* skyline and tower */}
          <path d="M520 530v-60h24v60M550 530v-44h22v44M580 530v-26h18" />
          <path d="M650 535v-88h70v88M662 447c0-16 10-30 23-42 13 12 23 26 23 42" />
          <path d="M685 405v-34M679 371h12" />
          <path d="M672 535v-30c0-14 26-14 26 0v30" />
          <Tree x={620} y={485} />
          <Tree x={575} y={455} />
        </g>

        {/* road */}
        <g stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M410 520C300 535 180 520 240 556c60 35 195 25 185 58-8 28-60 52-95 69" />
          <path d="M340 550c120 0 250 10 300 70 20 25-5 60-40 60" />
        </g>
      </svg>

      <ul className="hero-art__cards">
        {guidanceCards.map(({ id, icon }, index) => {
          const Icon = cardIcons[icon]
          return (
            <li className={`hero-art__card hero-art__card--${index + 1}`} key={id}>
              <Icon aria-hidden="true" strokeWidth={1.5} />
              <span>{t(`hero.cards.${id}`)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default HeroIllustration
