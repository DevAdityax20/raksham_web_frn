// Integration points for the future authentication backend.
// No auth API exists yet, so these never report success: callers must treat
// `ok: false` as "nothing happened". Never persist credentials on the client.
export async function signIn() {
  return { ok: false, reason: 'not-connected' }
}

export async function createAccount() {
  return { ok: false, reason: 'not-connected' }
}

export async function signInWithGoogle() {
  return { ok: false, reason: 'not-configured' }
}
