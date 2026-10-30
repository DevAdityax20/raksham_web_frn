// Client-side session marker used only by the temporary test login (see testLogin.js).
// It stores a flag, never a password. A real backend session will replace this.
const KEY = 'raksham.session'

export function isSignedIn() {
  try {
    return window.sessionStorage.getItem(KEY) === 'test'
  } catch {
    return false
  }
}

export function startTestSession() {
  try {
    window.sessionStorage.setItem(KEY, 'test')
  } catch {
    // Storage unavailable (private mode): the session then lasts only until a reload.
  }
}

export function endSession() {
  try {
    window.sessionStorage.removeItem(KEY)
  } catch {
    // Nothing to clear.
  }
}
