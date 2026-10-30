import { Navigate } from 'react-router-dom'
import { isSignedIn } from '../../services/session.js'
import { TEST_LOGIN_ENABLED } from '../../services/testLogin.js'

// Guards /app. It only enforces sign-in while the test login is available; otherwise the app
// stays open as a UI preview, because no other way to sign in exists yet.
function RequireSession({ children }) {
  if (TEST_LOGIN_ENABLED && !isSignedIn()) return <Navigate to="/auth/sign-in" replace />
  return children
}

export default RequireSession
