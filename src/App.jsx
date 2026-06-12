import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import WipingSolutions from './pages/WipingSolutions'
import Industries from './pages/Industries'
import Contact from './pages/Contact'

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/products"   element={<Products />} />
          <Route path="/wiping-solutions" element={<WipingSolutions />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact"    element={<Contact />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              gap: '1rem',
              paddingTop: '5rem',
            }}>
              <div style={{ fontSize: '5rem' }}>🛡️</div>
              <h1 style={{ color: 'var(--mp-navy)', fontSize: '2.5rem', fontWeight: 800 }}>Page Not Found</h1>
              <p style={{ color: 'var(--text-muted)' }}>The page you're looking for doesn't exist.</p>
              <a href="/" className="btn btn--primary" style={{ marginTop: '.5rem' }}>Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
