import { useCallback, useReducer } from 'react'
import { sachiQuestions } from '../data/sachiQuestions.js'
import { requestGuidance } from '../services/sachiService.js'

// Messages store structured data (not translated text) so the conversation re-translates
// when the language changes and is never reset by it.
function createInitialState({ description, area, guest = false }) {
  const messages = [{ id: 1, role: 'sachi', kind: 'greeting', guest }]
  if (description) messages.push({ id: 2, role: 'user', kind: 'free', text: description })
  messages.push({ id: 3, role: 'sachi', kind: 'question', qid: sachiQuestions[0].id })
  return { area, messages, answers: {}, index: 0, finished: false, nextId: 4 }
}

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
        return {
          ...state,
          messages: [
            ...state.messages,
            { ...userMessage, id: state.nextId },
            { id: state.nextId + 1, role: 'sachi', kind: 'followUp' },
          ],
          nextId: state.nextId + 2,
        }
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
    case 'guidance':
      return {
        ...state,
        messages: [...state.messages, { id: state.nextId, role: 'sachi', kind: 'finished' }],
        nextId: state.nextId + 1,
      }
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

  // Called when the final question is answered or skipped.
  const finish = useCallback(async (answers) => {
    const result = await requestGuidance({ answers })
    // `ok: true` will carry real guidance once the service exists; today it is always not-connected.
    if (!result.ok) dispatch({ type: 'guidance' })
  }, [])

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
      dispatch({ type: 'text', text })
      if (!state.finished && isLast) finish({ ...state.answers, [sachiQuestions[state.index].id]: text })
    },
    [finish, isLast, state.answers, state.finished, state.index],
  )

  return {
    state,
    total,
    current: Math.min(state.index + 1, total),
    question: state.finished ? null : sachiQuestions[state.index],
    answer,
    skip,
    sendText,
    setArea: (area) => dispatch({ type: 'area', area }),
    reset: (nextInitial) => dispatch({ type: 'reset', initial: nextInitial }),
  }
}
