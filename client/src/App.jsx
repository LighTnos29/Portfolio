
import Hero from './components/hero.jsx'
import WhiteNoise from './components/WhiteNoise.jsx'
import BackgroundGradient from './components/BackgroundGradient.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Global gradient balls background for all components */}
      <BackgroundGradient />
      
      {/* Navigation bar */}
      <Navbar />
      
      {/* Global white noise overlay for all components */}
      <WhiteNoise opacity={0.02} zIndex={9999} />
      
      <Hero />
    </div>
  )
}

export default App
