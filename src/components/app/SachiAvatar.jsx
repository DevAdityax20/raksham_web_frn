import { useState } from 'react'
import ShieldMark from './ShieldMark.jsx'
import { SACHI_AVATAR_URL } from '../../data/app.js'

// Sachi's illustrated avatar; falls back to the shield mark if the image cannot load.
function SachiAvatar() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="chat-avatar chat-avatar--fallback" aria-hidden="true">
        <ShieldMark />
      </span>
    )
  }

  return (
    <img
      className="chat-avatar"
      src={SACHI_AVATAR_URL}
      alt=""
      width="56"
      height="56"
      onError={() => setFailed(true)}
    />
  )
}

export default SachiAvatar
