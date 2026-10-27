import Navbar from '../components/layout/Navbar.jsx'
import HeroSection from '../sections/HeroSection.jsx'
import WhyRakshamSection from '../sections/WhyRakshamSection.jsx'
import LegalCategoriesSection from '../sections/LegalCategoriesSection.jsx'
import HowItWorksSection from '../sections/HowItWorksSection.jsx'
import HumanHelpSection from '../sections/HumanHelpSection.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhyRakshamSection />
        <LegalCategoriesSection />
        <HowItWorksSection />
        <HumanHelpSection />
      </main>
    </>
  )
}

export default App
