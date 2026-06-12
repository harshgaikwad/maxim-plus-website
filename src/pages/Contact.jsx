import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SEO, { localBusinessSchema } from '../components/SEO'
import {
  sanitizeEmailHeader,
  sanitizeText,
  sanitizeQueryParam,
  sanitizePhone,
  isValidEmail,
  canSubmitForm,
  honeypotIsClear,
} from '../utils/security'
import './Contact.css'

export default function Contact() {
  const location  = useLocation()
  const formRef   = useRef(null)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  // ── Sanitize URL query param before use as default value ───────
  const params  = new URLSearchParams(location.search)
  const product = sanitizeQueryParam(params.get('product') || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const data = new FormData(e.target)

    // ── Honeypot check — bots fill hidden fields, humans don't ──
    if (!honeypotIsClear(data.get('_hp'))) {
      // Silently succeed (don't tell the bot it was caught)
      setSuccess(true)
      return
    }

    // ── Rate limiting — prevents rapid re-submission ────────────
    if (!canSubmitForm(6000)) {
      setError('Please wait a moment before submitting again.')
      return
    }

    // ── Sanitize every field ─────────────────────────────────────
    const name     = sanitizeEmailHeader(data.get('name')     || '')
    const company  = sanitizeEmailHeader(data.get('company')  || '')
    const phone    = sanitizePhone(      data.get('phone')    || '')
    const email    = sanitizeText(       data.get('email')    || '', 254)
    const industry = sanitizeEmailHeader(data.get('industry') || '')
    const prod     = sanitizeText(       data.get('products') || '', 300)
    const msg      = sanitizeText(       data.get('message')  || '', 1000)

    // ── Validation ───────────────────────────────────────────────
    if (!name)    { setError('Please enter your name.');            return }
    if (!company) { setError('Please enter your company name.');    return }
    if (!phone)   { setError('Please enter a valid phone number.'); return }
    if (email && !isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    // ── Build mailto — subject AND body both encoded ──────────────
    // SECURITY: encodeURIComponent on subject prevents email header injection
    const subject = encodeURIComponent(`Quote Request from ${name} — Maxim Plus`)
    const body    = encodeURIComponent(
      `Name: ${name}\r\nCompany: ${company}\r\nPhone: ${phone}\r\nEmail: ${email}\r\nIndustry: ${industry}\r\nProducts: ${prod}\r\n\r\nMessage:\r\n${msg}`
    )

    // SECURITY: Using a hard-coded recipient — never user-controlled
    window.location.href =
      `mailto:info@maximpluss.com?subject=${subject}&body=${body}`

    setSuccess(true)
    formRef.current?.reset()
  }

  const contactFaqSchema = {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I get a quote from Maxim Plus?',
        acceptedAnswer: { '@type': 'Answer', text: 'Fill in the quote request form on our Contact page or call us at +91 8623836464. We respond within 24 hours with a customised quote.' } },
      { '@type': 'Question', name: 'What are Maxim Plus business hours?',
        acceptedAnswer: { '@type': 'Answer', text: 'Maxim Plus is open Monday to Saturday, 9:00 AM to 6:00 PM. We respond to email enquiries within 24 hours.' } },
      { '@type': 'Question', name: 'Does Maxim Plus deliver across Maharashtra?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, Maxim Plus delivers safety products across Pune, Maharashtra, and all major cities in India.' } },
      { '@type': 'Question', name: 'Can I visit the manufacturing facility?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, we welcome visits at our SAI Industries factory at Gat No. 230, Near Volkswagen Gate, Mahalunge Ingale, Tal. Khed, Pune 410501. Please call ahead to schedule.' } },
    ]
  }

  return (
    <div>
      <SEO
        title="Contact Maxim Plus — Get a Free Safety Products Quote | Pune"
        description="Contact Maxim Plus for a free quote on protective clothing, industrial wipes, PPE, construction safety, and fire safety products. Call +91 8623836464 or email us. Located at Mahalunge Ingale, Khed, Pune 410501, Maharashtra. Open Mon–Sat 9AM–6PM."
        keywords="contact Maxim Plus Pune, safety products quote Pune, protective clothing supplier contact Maharashtra, safety equipment enquiry Pune, buy safety products Pune, industrial wipes supplier contact"
        canonicalPath="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
        schemas={[localBusinessSchema(), contactFaqSchema]}
      />
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--mp-orange-light)' }}>Get in Touch</div>
          <h1 className="heading-display heading-lg" style={{ color: '#fff' }}>Contact Maxim Plus</h1>
          <p style={{ color: 'rgba(255,255,255,.72)', maxWidth: 500, marginTop: '.75rem', fontSize: '1.05rem' }}>
            Request a quote, ask a question, or visit us — we're here to help.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">

          {/* ── Left: Info ── */}
          <div className="contact-info animate-slide-left">
            <h2 className="heading-display heading-md" style={{ color: 'var(--mp-navy)' }}>We'd love to hear from you</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '.75rem', lineHeight: 1.7 }}>
              Fill in the form and we'll get back to you with a customised quote and expert recommendations for your industry.
            </p>

            <div className="contact-details">
              {[
                { icon: '📍', label: 'Address', value: 'Manufacturing by SAI Industries, Gat No. 230, Near Volkswagen Gate, Mahalunge Ingale, Tal. Khed, Pune 410501', href: null },
                { icon: '📞', label: 'Phone', value: '+91 8623836464', href: 'tel:+918623836464' },
                { icon: '📞', label: 'Phone 2', value: '+91 8605418324', href: 'tel:+918605418324' },
                { icon: '✉️', label: 'Email', value: 'info@maximpluss.com', href: 'mailto:info@maximpluss.com' },
                { icon: '🌐', label: 'Website', value: 'www.maximpluss.com', href: 'https://www.maximpluss.com' },
              ].map(item => (
                <div key={item.label} className="contact-detail">
                  <div className="contact-detail__icon">{item.icon}</div>
                  <div>
                    <div className="contact-detail__label">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="contact-detail__value">{item.value}</a>
                      : <div className="contact-detail__value">{item.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-hours">
              <h4>Business Hours</h4>
              <p>Monday — Saturday: 9:00 AM – 6:00 PM</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>We respond to enquiries within 24 hours</p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="contact-form-card animate-slide-right">
            <h3 className="contact-form-title">Request a Free Quote</h3>

            {success ? (
              <div className="contact-form__success" role="alert">
                <div style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>✅</div>
                <h4 style={{ color: 'var(--mp-navy)', fontFamily: 'var(--font-heading)', marginBottom: '.5rem' }}>
                  Your email client is opening!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>
                  A pre-filled message has been prepared. Simply send it and we'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate aria-label="Quote request form">

                {/* ── Honeypot — hidden from real users, bots fill it ── */}
                <input
                  type="text"
                  name="_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                />

                {/* ── Error banner ── */}
                {error && (
                  <div className="contact-form__error" role="alert" aria-live="assertive">
                    ⚠️ {error}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text"
                      className="form-input"
                      placeholder="Your name"
                      maxLength={100}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="company">Company *</label>
                    <input
                      id="company" name="company" type="text"
                      className="form-input"
                      placeholder="Company name"
                      maxLength={150}
                      autoComplete="organization"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel"
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      maxLength={20}
                      autoComplete="tel"
                      pattern="[+\d\s\-()]{7,20}"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      id="email" name="email" type="email"
                      className="form-input"
                      placeholder="you@company.com"
                      maxLength={254}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="industry">Your Industry *</label>
                  <select id="industry" name="industry" className="form-select" required defaultValue="">
                    <option value="" disabled>Select your industry</option>
                    {['Automotive', 'Aerospace', 'Defense', 'Engineering', 'Electronics & Semiconductor',
                      'Food Processing', 'Pharmaceutical & Healthcare', 'Paint Shop', 'Printing',
                      'R&D / Research Lab', 'Optical Industry', 'Building & Construction', 'Other'].map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="products">Products Interested In</label>
                  <input
                    id="products"
                    name="products"
                    type="text"
                    className="form-input"
                    defaultValue={product}
                    placeholder="e.g., Protective Clothing, Lint Free Wipes, Safety Helmets"
                    maxLength={300}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message / Specifications</label>
                  <textarea
                    id="message" name="message"
                    className="form-textarea"
                    placeholder="Tell us your requirements, quantity, and any specific specifications..."
                    maxLength={1000}
                  />
                  <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: '.25rem', textAlign: 'right' }}>
                    Max 1000 characters
                  </p>
                </div>
                <button type="submit" className="btn btn--primary" style={{ width: '100%', padding: '1rem' }}>
                  Send Quote Request ✉️
                </button>
                <p className="contact-form__disclaimer">
                  By submitting, we'll open your email client with a pre-filled message to info@maximpluss.com
                </p>
              </form>
            )}
          </div>
        </div>
      </section>


      {/* Alternatives */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">Other Ways to Reach Us</div>
            <h2 className="heading-display heading-md">Connect Directly</h2>
          </div>
          <div className="contact-alternatives">
            <a href="tel:+918623836464" className="alt-card">
              <span className="alt-card__icon">📞</span>
              <h4>Call Us</h4>
              <p>+91 8623836464</p>
              <span className="alt-card__cta">Call Now →</span>
            </a>
            <a href="mailto:info@maximpluss.com" className="alt-card">
              <span className="alt-card__icon">✉️</span>
              <h4>Email Us</h4>
              <p>info@maximpluss.com</p>
              <span className="alt-card__cta">Send Email →</span>
            </a>
            <a href="https://www.maximpluss.com" target="_blank" rel="noopener noreferrer" className="alt-card">
              <span className="alt-card__icon">🌐</span>
              <h4>Maxim Plus</h4>
              <p>www.maximpluss.com</p>
              <span className="alt-card__cta">Visit Site →</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
