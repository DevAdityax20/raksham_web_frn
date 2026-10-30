import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Lock } from 'lucide-react'
import logo from '../../assets/images/logo.png'
import { quickAreas } from '../../data/app.js'

// The big black card: describe a situation or pick a problem area, then continue in Ask Sachi.
function AssistantCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [description, setDescription] = useState('')

  const start = (event) => {
    event.preventDefault()
    // The text travels in navigation state, so nothing the user typed is lost.
    navigate('/app/ask-sachi', { state: { description: description.trim() } })
  }

  return (
    <section className="dash-assistant" aria-labelledby="assistant-title">
      <p className="dash-assistant__label">
        <img className="dash-assistant__mark" src={logo} alt="" width="26" height="26" />
        {t('app.assistant.label')}
      </p>
      <h2 className="dash-assistant__title" id="assistant-title">
        {t('app.assistant.titlePrefix')} <em>{t('app.assistant.titleHighlight')}</em>
      </h2>

      <form className="dash-assistant__form" onSubmit={start}>
        <label className="sr-only" htmlFor="assistant-input">{t('app.assistant.placeholder')}</label>
        <input
          id="assistant-input"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t('app.assistant.placeholder')}
          autoComplete="off"
        />
        <button type="submit" className="dash-start">
          {t('app.assistant.start')}
          <ArrowRight aria-hidden="true" strokeWidth={2.25} />
        </button>
      </form>

      <p className="dash-assistant__privacy">
        <Lock aria-hidden="true" strokeWidth={1.6} />
        {t('app.assistant.privacy')}
      </p>

      <div className="dash-assistant__areas">
        <span className="dash-assistant__choose">{t('app.assistant.choose')}</span>
        <ul>
          {quickAreas.map((area) => (
            <li key={area}>
              <button
                type="button"
                className="dash-pill"
                onClick={() => navigate('/app/ask-sachi', { state: { area } })}
              >
                {t(`app.areas.${area}`)}
              </button>
            </li>
          ))}
        </ul>
        <Link className="dash-assistant__all" to="/app/problem-areas">
          {t('app.assistant.seeAll')}
          <ArrowRight aria-hidden="true" strokeWidth={2} />
        </Link>
      </div>
    </section>
  )
}

export default AssistantCard
