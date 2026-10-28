import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import SignIn from '../pages/auth/SignIn.jsx'
import CreateAccount from '../pages/auth/CreateAccount.jsx'

// Start every route change at the top, unless the URL targets an in-page anchor.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/create-account" element={<CreateAccount />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
