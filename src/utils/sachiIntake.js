import i18n from 'i18next'
import { sachiQuestions } from '../data/sachiQuestions.js'

const MAX_CHARS = 1900 // the backend accepts up to 2000 characters per message

// Turns the answers to the guided questions into one message for Sachi, in the language the
// person is using. Skipped questions are left out.
export function buildIntakeSummary(answers) {
  const lines = sachiQuestions
    .filter((question) => answers[question.id] !== undefined)
    .map((question) => {
      const answer = answers[question.id]
      const label = question.options?.includes(answer) ? i18n.t(`app.chat.questions.${question.id}.options.${answer}`) : answer
      return `${i18n.t(`app.chat.questions.${question.id}.text`)} ${label}`
    })

  const text =
    lines.length > 0 ? [i18n.t('app.chat.intakeIntro'), ...lines].join('\n') : i18n.t('app.chat.intakeEmpty')
  return text.slice(0, MAX_CHARS)
}

// The language code the backend understands.
export const backendLanguage = () => (i18n.language?.startsWith('hi') ? 'hi' : 'en')
