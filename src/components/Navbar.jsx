import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import maximLogo from '/Maximplus.webp'
import './Navbar.css'

const navLinks = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/products',    label: 'Products' },
  { to: '/wiping-solutions', label: 'Wiping Solutions' },
  { to: '/industries',  label: 'Industries' },
  { to: '/contact',     label: 'Contact' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <img src={maximLogo} alt="Maxim Plus" className="navbar__logo-img" />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="navbar__nav hide-mobile" aria-label="Main navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── CTA ── */}
        <Link
          to="/contact"
          className="btn btn--primary btn--sm hide-mobile"
          onClick={() => setMenuOpen(false)}
        >
          Get a Quote
        </Link>

        {/* ── Mobile Hamburger ── */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        <nav className="navbar__drawer-nav">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__drawer-link ${isActive ? 'navbar__drawer-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="btn btn--primary"
            style={{ marginTop: '1rem', width: '100%' }}
            onClick={() => setMenuOpen(false)}
          >
            Get a Quote
          </Link>
        </nav>
      </div>
      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}
