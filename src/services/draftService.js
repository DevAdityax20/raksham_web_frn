import { sampleDrafts } from '../data/sampleDrafts.js'
import { today } from '../utils/formatDate.js'
import { readStore, writeStore } from './sessionStore.js'

// Local mock of the drafts API. Replace the bodies with backend calls once it exists.
const KEY = 'raksham.sample.drafts'

export function listDrafts() {
  return readStore(KEY, sampleDrafts)
}

function commit(drafts) {
  writeStore(KEY, drafts)
  return drafts
}

// `changes` may carry { title, body }; the updated date moves to today.
export function updateDraft(id, changes) {
  return commit(listDrafts().map((draft) => (draft.id === id ? { ...draft, ...changes, updatedAt: today() } : draft)))
}

export function deleteDraft(id) {
  return commit(listDrafts().filter((draft) => draft.id !== id))
}

// Downloads a plain-text copy of the draft to the user's own device.
export function exportDraft({ title, areaLabel, body }) {
  const text = `${title}\n${areaLabel}\n\n${body}\n`
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `${title.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'draft'}.txt`
  link.click()
  URL.revokeObjectURL(url)
}
