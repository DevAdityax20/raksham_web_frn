// Question configuration for the Ask Sachi flow. Text and option labels live in the locale
// files under `app.chat.questions.<id>`. This is mock configuration: when the backend exists,
// the same shape should be returned by the API instead of being defined here.
//   type 'choice': the user picks one of `options` (or types a free answer)
//   type 'text'  : the user types a free answer
export const sachiQuestions = [
  { id: 'danger', type: 'choice', options: ['yes', 'no', 'unsure'] },
  { id: 'when', type: 'choice', options: ['today', 'week', 'earlier'] },
  { id: 'what', type: 'text' },
  { id: 'evidence', type: 'choice', options: ['yes', 'no', 'unsure'] },
]
