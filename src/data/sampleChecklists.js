// Sample checklists for the My checklist preview. Titles and item text live in the locale files under
// `app.sample.checklists.<id>`; a note the user adds is stored on the item. `items` lists item numbers
// and whether each starts out done.
export const sampleChecklists = [
  {
    id: 'c1',
    areaId: 'cyber',
    createdAt: '2026-10-01',
    updatedAt: '2026-10-11',
    items: [{ n: 1, done: true }, { n: 2, done: true }, { n: 3, done: false }, { n: 4, done: false }, { n: 5, done: false }],
  },
  {
    id: 'c2',
    areaId: 'general',
    createdAt: '2026-10-03',
    updatedAt: '2026-10-09',
    items: [{ n: 1, done: false }, { n: 2, done: false }, { n: 3, done: false }, { n: 4, done: false }],
  },
  {
    id: 'c3',
    areaId: 'domestic',
    createdAt: '2026-09-28',
    updatedAt: '2026-10-07',
    items: [{ n: 1, done: true }, { n: 2, done: true }, { n: 3, done: true }, { n: 4, done: true }],
  },
  {
    id: 'c4',
    areaId: 'police',
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
    items: [{ n: 1, done: true }, { n: 2, done: false }, { n: 3, done: false }, { n: 4, done: false }],
  },
]
