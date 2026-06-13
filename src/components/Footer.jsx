import { Link } from 'react-router-dom'
import maximLogo from '/Maximplus.webp'
import './Footer.css'

const footerLinks = {
  'Company': [
    { label: 'About Us',    to: '/about' },
    { label: 'Products',    to: '/products' },
    { label: 'Wiping Solutions', to: '/wiping-solutions' },
    { label: 'Industries',  to: '/industries' },
    { label: 'Contact',     to: '/contact' },
  ],
  'Products': [
    { label: 'PPE & Industrial',      to: '/products?div=ppe' },
    { label: 'Protective Clothing',   to: '/products?div=clothing' },
    { label: 'Wiping Solutions',      to: '/wiping-solutions' },
    { label: 'Construction Safety',   to: '/products?div=construction' },
    { label: 'Fire Safety',           to: '/products?div=fire' },
    { label: 'Road Safety',           to: '/products?div=road' },
  ],
  'Industries': [
    { label: 'Automotive',     to: '/industries' },
    { label: 'Aerospace',      to: '/industries' },
    { label: 'Pharmaceutical', to: '/industries' },
    { label: 'Electronics',    to: '/industries' },
    { label: 'Construction',   to: '/industries' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* ── CTA Banner ── */}
      <div className="footer__cta">
        <div className="container">
          <div className="footer__cta-inner">
            <div>
              <h2 className="heading-display heading-md" style={{ color: '#fff' }}>
                Ready to Protect Your Workforce?
              </h2>
              <p style={{ color: 'rgba(255,255,255,.75)', marginTop: '.5rem' }}>
                Get expert guidance and a customised quote — today.
              </p>
            </div>
            <div className="footer__cta-actions">
              <Link to="/contact" className="btn btn--primary btn--lg">
                Get a Free Quote
              </Link>
              <a href="tel:+918623836464" className="btn btn--outline btn--lg">
                📞 Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__logo">
                <img src={maximLogo} alt="Maxim Plus" className="footer__logo-img" />
              </div>
              <p className="footer__brand-desc">
                Pune's leading manufacturer and supplier of industrial safety products, protective clothing, and wiping solutions. Trusted by 100+ clients across 12+ industries since 2008.
              </p>

              <div className="footer__contact-info">
                <div className="footer__contact-item">
                  <span>📍</span>
                  <span>Gat No. 230, Near Volkswagen Gate, Mahalunge Ingale, Tal. Khed, Pune 410501</span>
                </div>
                <div className="footer__contact-item">
                  <span>📞</span>
                  <a href="tel:+918623836464">+91 8623836464</a>
                </div>
                <div className="footer__contact-item">
                  <span>📞</span>
                  <a href="tel:+918605418324">+91 8605418324</a>
                </div>
                <div className="footer__contact-item">
                  <span>✉️</span>
                  <a href="mailto:info@maximpluss.com">info@maximpluss.com</a>
                </div>
                <div className="footer__contact-item">
                  <span>🌐</span>
                  <a href="https://www.maximpluss.com" target="_blank" rel="noopener noreferrer">www.maximpluss.com</a>
                </div>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer__col">
                <h4 className="footer__col-title">{title}</h4>
                <ul className="footer__col-links">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Maxim Plus. All rights reserved.</p>
          <p>
            Manufacturing by <strong>SAI Industries</strong>, Pune, Maharashtra.
          </p>
        </div>
      </div>
    </footer>
  )
}
