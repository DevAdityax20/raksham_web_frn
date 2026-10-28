// Integration point for the future feedback endpoint.
// No backend exists yet, so this never reports success: callers must treat
// `ok: false` as "not sent" and keep the user's input.
export async function submitFeedback() {
  return { ok: false, reason: 'not-connected' }
}
