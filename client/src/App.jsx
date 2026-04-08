import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Portfolio from './pages/Portfolio.jsx'

// Admin pages are rarely visited — load them only when needed
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div style={{ backgroundColor: '#000', minHeight: '100vh' }} />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <Suspense fallback={<div style={{ backgroundColor: '#000', minHeight: '100vh' }} />}>
            <AdminDashboard />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
