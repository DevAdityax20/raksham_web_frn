import { sampleChecklists } from '../data/sampleChecklists.js'
import { today } from '../utils/formatDate.js'
import { readStore, writeStore } from './sessionStore.js'

// Local mock of the checklist API. Replace the bodies with backend calls once it exists.
const KEY = 'raksham.sample.checklists'

export function listChecklists() {
  return readStore(KEY, sampleChecklists)
}

function commit(lists) {
  writeStore(KEY, lists)
  return lists
}

function updateList(id, change) {
  return commit(listChecklists().map((list) => (list.id === id ? { ...change(list), updatedAt: today() } : list)))
}

const updateItem = (list, n, change) => ({
  ...list,
  items: list.items.map((item) => (item.n === n ? { ...item, ...change(item) } : item)),
})

export const toggleItem = (id, n) => updateList(id, (list) => updateItem(list, n, (item) => ({ done: !item.done })))
export const setItemNote = (id, n, note) => updateList(id, (list) => updateItem(list, n, () => ({ note })))
export const resetChecklist = (id) => updateList(id, (list) => ({ ...list, items: list.items.map((item) => ({ ...item, done: false })) }))
export const deleteChecklist = (id) => commit(listChecklists().filter((list) => list.id !== id))

// 'notStarted' | 'inProgress' | 'completed'
export function progressOf(list) {
  const total = list.items.length
  const done = list.items.filter((item) => item.done).length
  const status = done === 0 ? 'notStarted' : done === total ? 'completed' : 'inProgress'
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0, status }
}
