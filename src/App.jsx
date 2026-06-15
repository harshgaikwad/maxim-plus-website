import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import SEO from './components/SEO'
import FloatingCart from './components/FloatingCart'
import CartDrawer from './components/CartDrawer'
import { useQuoteCart } from './context/QuoteCartContext'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const WipingSolutions = lazy(() => import('./pages/WipingSolutions'))
const Industries = lazy(() => import('./pages/Industries'))
const Contact = lazy(() => import('./pages/Contact'))
const QuoteCheckout = lazy(() => import('./pages/QuoteCheckout'))

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

export default function App() {
  const { toastMessage } = useQuoteCart()

  return (
    <>
      {toastMessage && (
        <div className="toast-notification">
          ✓ {toastMessage}
        </div>
      )}
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<div className="page-loader">Loading...</div>}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/products"   element={<Products />} />
            <Route path="/wiping-solutions" element={<WipingSolutions />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/quote-request" element={<QuoteCheckout />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div className="not-found-page">
                <SEO title="Page Not Found" noIndex={true} />
                <div className="not-found-icon">🛡️</div>
                <h1 className="not-found-title">Page Not Found</h1>
                <p className="not-found-desc">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn--primary not-found-btn">Go Home</a>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      <FloatingCart />
      <CartDrawer />
    </>
  )
}
