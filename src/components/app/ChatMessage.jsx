import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PhoneCall } from 'lucide-react'
import SachiAvatar from './SachiAvatar.jsx'
import { mockUser } from '../../data/app.js'
import { sachiQuestions } from '../../data/sachiQuestions.js'

function UserMessage({ message }) {
  const { t } = useTranslation()
  let text = message.text
  if (message.kind === 'answer') text = t(`app.chat.questions.${message.qid}.options.${message.option}`)
  if (message.kind === 'skip') text = t('app.chat.skipped')
  return (
    <div className="chat-row chat-row--user">
      <p className="chat-bubble chat-bubble--user">{text}</p>
    </div>
  )
}

// One message from Sachi. For a question it also renders the answer buttons.
function SachiMessage({ message, active, answers, onAnswer, onSkip }) {
  const { t } = useTranslation()
  const question = message.kind === 'question' ? sachiQuestions.find((q) => q.id === message.qid) : null
  const answered = question ? answers[question.id] : undefined

  let text = ''
  if (message.kind === 'greeting') text = t('app.chat.greeting', { name: mockUser.name })
  if (message.kind === 'question') text = t(`app.chat.questions.${message.qid}.text`)
  if (message.kind === 'dangerYes') text = t('app.chat.dangerYes')
  if (message.kind === 'areaChanged') text = t('app.chat.areaChanged', { area: t(`app.areas.${message.area}`) })
  if (message.kind === 'finished') text = t('app.chat.finished')
  if (message.kind === 'followUp') text = t('app.chat.followUp')

  return (
    <div className="chat-row">
      <SachiAvatar />
      <div className="chat-col">
        <span className="chat-sender">{t('app.chat.sachi')}</span>
        <p className="chat-bubble">{text}</p>

        {message.kind === 'dangerYes' && (
          <a className="chat-action chat-action--call" href="tel:112">
            <PhoneCall aria-hidden="true" strokeWidth={1.8} />
            {t('app.emergency.shortNumber')}
          </a>
        )}

        {message.kind === 'finished' && (
          <div className="chat-options">
            <Link className="chat-option" to="/app/resources">{t('app.chat.official')}</Link>
            <Link className="chat-option" to="/app/advocates">{t('app.chat.advocates')}</Link>
          </div>
        )}

        {question?.type === 'choice' && (
          <div className="chat-options" role="group" aria-label={text}>
            {question.options.map((option) => {
              const selected = answered === option
              return (
                <button
                  key={option}
                  type="button"
                  className={`chat-option${selected ? ' is-selected' : ''}`}
                  aria-pressed={selected}
                  disabled={!active}
                  onClick={() => onAnswer(question.id, option)}
                >
                  {t(`app.chat.questions.${question.id}.options.${option}`)}
                </button>
              )
            })}
          </div>
        )}

        {question && active && (
          <button type="button" className="chat-skip" onClick={() => onSkip(question.id)}>
            {t('app.chat.skip')}
          </button>
        )}
      </div>
    </div>
  )
}

function ChatMessage({ message, ...rest }) {
  return message.role === 'user' ? <UserMessage message={message} /> : <SachiMessage message={message} {...rest} />
}

export default ChatMessage
