// Temporary stand-in for the backend: keeps sample data edits in this browser tab only
// (sessionStorage), so nothing is permanently saved and nothing leaves the device.
export function readStore(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function writeStore(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage blocked: changes last until the page reloads.
  }
}
