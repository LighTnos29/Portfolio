
import Hero from './components/hero.jsx'
import BackgroundGradient from './components/BackgroundGradient.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#000000' }}>

      <BackgroundGradient />

      <Navbar />
       <Hero />
      
     
    </div>
  )
}

export default App
