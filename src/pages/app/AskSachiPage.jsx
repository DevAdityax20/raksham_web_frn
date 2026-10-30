import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ChatHeader from '../../components/app/ChatHeader.jsx'
import ChatMessage from '../../components/app/ChatMessage.jsx'
import ChatComposer from '../../components/app/ChatComposer.jsx'
import { useSachiChat } from '../../hooks/useSachiChat.js'
import { sachiQuestions } from '../../data/sachiQuestions.js'

function SachiChat({ description, area }) {
  const { t } = useTranslation()
  const chat = useSachiChat({ description, area })
  const { state, question } = chat
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [state.messages.length])

  const progress = state.finished ? 100 : (chat.current / (chat.total + 1)) * 100

  return (
    <div className="chat">
      <ChatHeader
        area={state.area}
        onChangeArea={chat.setArea}
        onStartOver={() => chat.reset({ description: '', area: state.area })}
      />

      <div className="chat__progress">
        <p>{state.finished ? t('app.chat.progressDone') : t('app.chat.progress', { current: chat.current, total: chat.total })}</p>
        <div
          className="chat__bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={sachiQuestions.length}
          aria-valuenow={state.finished ? sachiQuestions.length : state.index}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="chat__scroll">
        <div className="chat__thread" aria-live="polite">
          {state.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              active={message.kind === 'question' && question?.id === message.qid}
              answers={state.answers}
              onAnswer={chat.answer}
              onSkip={chat.skip}
            />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <ChatComposer onSend={chat.sendText} />
    </div>
  )
}

function AskSachiPage() {
  const { state, key } = useLocation()
  // Keyed by navigation, so arriving with a new description or area starts a fresh conversation.
  return <SachiChat key={key} description={state?.description ?? ''} area={state?.area ?? null} />
}

export default AskSachiPage
