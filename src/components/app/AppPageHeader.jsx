import LanguageSwitch from './LanguageSwitch.jsx'
import QuickExitButton from './QuickExitButton.jsx'

// Page title and subtitle on the left; language switch and Quick exit on the right.
function AppPageHeader({ title, subtitle }) {
  return (
    <header className="dash-header">
      <div>
        <h1 className="dash-header__title dash-header__title--page">{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      <div className="dash-header__tools">
        <LanguageSwitch />
        <QuickExitButton className="app-quick-exit--desktop" />
      </div>
    </header>
  )
}

export default AppPageHeader
