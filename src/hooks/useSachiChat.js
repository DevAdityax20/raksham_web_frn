import { useCallback, useEffect, useReducer, useRef } from 'react'
import { sachiQuestions } from '../data/sachiQuestions.js'
import { requestGuidance } from '../services/sachiService.js'
import { backendLanguage, buildIntakeSummary } from '../utils/sachiIntake.js'

const MAX_HISTORY = 18 // the backend accepts at most 20 messages per request

// Messages store structured data (not translated text) so the conversation re-translates
// when the language changes and is never reset by it.
function createInitialState({ description, area, guest = false }) {
  const messages = [{ id: 1, role: 'sachi', kind: 'greeting', guest }]
  if (description) messages.push({ id: 2, role: 'user', kind: 'free', text: description })
  messages.push({ id: 3, role: 'sachi', kind: 'question', qid: sachiQuestions[0].id })
  return { area, messages, answers: {}, index: 0, finished: false, nextId: 4 }
}

// What the backend sees: only the person's own words and Sachi's earlier replies.
const startConversation = ({ description }) => (description ? [{ role: 'user', content: description }] : [])

// Move to the next question, or finish after the last one.
function advance(state, added) {
  const messages = [...state.messages, ...added.map((m, i) => ({ ...m, id: state.nextId + i }))]
  let nextId = state.nextId + added.length
  const index = state.index + 1
  if (index >= sachiQuestions.length) {
    return { ...state, messages, nextId, index, finished: true }
  }
  messages.push({ id: nextId, role: 'sachi', kind: 'question', qid: sachiQuestions[index].id })
  nextId += 1
  return { ...state, messages, nextId, index }
}

// Drops the "writing a reply" placeholder and any earlier error before a new one is shown.
const withoutPending = (messages) => messages.filter((m) => m.kind !== 'thinking' && m.kind !== 'aiError')

function appendSachi(state, message) {
  return {
    ...state,
    messages: [...withoutPending(state.messages), { id: state.nextId, role: 'sachi', ...message }],
    nextId: state.nextId + 1,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'answer': {
      const question = sachiQuestions[state.index]
      if (state.finished || question?.id !== action.qid) return state
      const added = [{ role: 'user', kind: 'answer', qid: action.qid, option: action.option }]
      if (action.qid === 'danger' && action.option === 'yes') added.push({ role: 'sachi', kind: 'dangerYes' })
      return advance({ ...state, answers: { ...state.answers, [action.qid]: action.option } }, added)
    }
    case 'skip': {
      if (state.finished || sachiQuestions[state.index]?.id !== action.qid) return state
      return advance(state, [{ role: 'user', kind: 'skip', qid: action.qid }])
    }
    case 'text': {
      const userMessage = { role: 'user', kind: 'free', text: action.text }
      if (state.finished) {
        return { ...state, messages: [...state.messages, { ...userMessage, id: state.nextId }], nextId: state.nextId + 1 }
      }
      const qid = sachiQuestions[state.index].id
      return advance({ ...state, answers: { ...state.answers, [qid]: action.text } }, [userMessage])
    }
    case 'area':
      return {
        ...state,
        area: action.area,
        messages: [...state.messages, { id: state.nextId, role: 'sachi', kind: 'areaChanged', area: action.area }],
        nextId: state.nextId + 1,
      }
    case 'thinking':
      return appendSachi(state, { kind: 'thinking' })
    case 'reply':
      return appendSachi(state, { kind: 'ai', ...action.reply })
    case 'error':
      return appendSachi(state, { kind: 'aiError', reason: action.reason, offer: action.offer })
    case 'reset':
      return createInitialState(action.initial)
    default:
      return state
  }
}

export function useSachiChat(initial) {
  const [state, dispatch] = useReducer(reducer, initial, createInitialState)
  const total = sachiQuestions.length
  const isLast = state.index === total - 1
  const thinking = state.messages.some((m) => m.kind === 'thinking')

  // Refs hold what the backend request needs without re-creating the callbacks below.
  const conversation = useRef(startConversation(initial))
  const run = useRef(0) // bumps on reset so a late reply to an old conversation is ignored
  const offerRef = useRef(false)
  const areaRef = useRef(state.area)
  useEffect(() => {
    areaRef.current = state.area
  }, [state.area])

  // Sends the conversation so far to Sachi on the backend and shows the outcome.
  // `offer` adds the "official resources / advocates" next steps under the reply.
  const ask = useCallback(async (offer = false) => {
    offerRef.current = offer
    const ticket = ++run.current
    dispatch({ type: 'thinking' })
    const result = await requestGuidance({
      messages: conversation.current.slice(-MAX_HISTORY),
      language: backendLanguage(),
      area: areaRef.current,
    })
    if (ticket !== run.current) return
    if (result.ok) {
      conversation.current = [...conversation.current, { role: 'assistant', content: result.reply }]
      dispatch({
        type: 'reply',
        reply: { text: result.reply, emergency: result.emergency, helplines: result.helplines, grounded: result.grounded, offer },
      })
    } else {
      dispatch({ type: 'error', reason: result.reason, offer })
    }
  }, [])

  // Called when the final question is answered or skipped.
  const finish = useCallback(
    (answers) => {
      conversation.current = [...conversation.current, { role: 'user', content: buildIntakeSummary(answers) }]
      ask(true)
    },
    [ask],
  )

  const answer = useCallback(
    (qid, option) => {
      dispatch({ type: 'answer', qid, option })
      if (isLast) finish({ ...state.answers, [qid]: option })
    },
    [finish, isLast, state.answers],
  )

  const skip = useCallback(
    (qid) => {
      dispatch({ type: 'skip', qid })
      if (isLast) finish(state.answers)
    },
    [finish, isLast, state.answers],
  )

  const sendText = useCallback(
    (text) => {
      if (thinking) return
      dispatch({ type: 'text', text })
      if (state.finished) {
        conversation.current = [...conversation.current, { role: 'user', content: text }]
        ask(false)
      } else if (isLast) {
        finish({ ...state.answers, [sachiQuestions[state.index].id]: text })
      }
    },
    [ask, finish, isLast, state.answers, state.finished, state.index, thinking],
  )

  const retry = useCallback(() => ask(offerRef.current), [ask])

  const reset = useCallback((nextInitial) => {
    run.current += 1
    conversation.current = startConversation(nextInitial)
    dispatch({ type: 'reset', initial: nextInitial })
  }, [])

  return {
    state,
    total,
    thinking,
    current: Math.min(state.index + 1, total),
    question: state.finished ? null : sachiQuestions[state.index],
    answer,
    skip,
    sendText,
    retry,
    setArea: (area) => dispatch({ type: 'area', area }),
    reset,
  }
}
