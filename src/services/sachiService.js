// Sachi, the AI assistant, runs on the Raksham backend. The browser never talks to an AI provider
// and never holds an AI key. When no backend address is configured this reports "not-connected"
// instead of pretending to answer.
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

const REQUEST_TIMEOUT_MS = 60_000

// Resolves to { ok: true, reply, emergency, helplines, grounded, sources }
//          or { ok: false, reason } where reason is 'not-connected', 'network' or a backend error code.
export async function requestGuidance({ messages, language, area }) {
  if (!API_BASE) return { ok: false, reason: 'not-connected' }

  try {
    const response = await fetch(`${API_BASE}/sachi/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language, area: area ?? undefined }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    const body = await response.json().catch(() => null)
    if (response.ok && body?.success) return { ok: true, ...body.data }
    return { ok: false, reason: body?.error?.code ?? 'unknown' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
