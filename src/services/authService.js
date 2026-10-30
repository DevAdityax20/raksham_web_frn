import { startTestSession } from './session.js'
import { TEST_LOGIN_ENABLED, matchesTestLogin } from './testLogin.js'

// Integration points for the future authentication backend.
// No auth API exists yet, so apart from the temporary test login these never report
// success: callers must treat `ok: false` as "nothing happened". Never persist credentials.
export async function signIn({ identifier, password }) {
  if (TEST_LOGIN_ENABLED) {
    if (!matchesTestLogin(identifier, password)) return { ok: false, reason: 'invalid' }
    startTestSession()
    return { ok: true }
  }
  return { ok: false, reason: 'not-connected' }
}

export async function createAccount() {
  return { ok: false, reason: 'not-connected' }
}

export async function signInWithGoogle() {
  return { ok: false, reason: 'not-configured' }
}
