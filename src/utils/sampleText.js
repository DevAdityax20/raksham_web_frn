// Display text for sample drafts and checklists. Sample text comes from the locale files
// (so it follows the language); anything the user edited is stored on the record and wins.
export function draftText(draft, t) {
  const base = `app.sample.drafts.${draft.id}`
  return {
    title: draft.title ?? t(`${base}.title`),
    summary: t(`${base}.summary`),
    body: draft.body ?? t(`${base}.body`),
    area: t(`app.areas.${draft.areaId}`),
  }
}

export function checklistTitle(list, t) {
  return t(`app.sample.checklists.${list.id}.title`)
}

export function itemText(list, item, t) {
  const base = `app.sample.checklists.${list.id}.items.${item.n}`
  return { text: t(`${base}.text`), description: t(`${base}.description`) }
}
