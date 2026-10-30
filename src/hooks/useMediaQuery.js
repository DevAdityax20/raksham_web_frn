import { useSyncExternalStore } from 'react'

// Live match state of a CSS media query (for layout decisions that CSS alone cannot make).
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', notify)
      return () => list.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
