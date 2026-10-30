// Integration point for Sachi, the AI assistant. No backend exists yet, so this never
// reports success; callers must treat `ok: false` as "no guidance available".
export async function requestGuidance() {
  return { ok: false, reason: 'not-connected' }
}
