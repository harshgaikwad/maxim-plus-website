import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { stats } from '../data/industries'
import { divisions } from '../data/products'
import './Home.css'
import maximLogo from '/Maximplus.png'
import SEO, { organizationSchema, localBusinessSchema, websiteSchema } from '../components/SEO'

/* ── Counter hook ── */
function useCounter(target, duration = 2000, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])
  return val
}

/* ── Stat Item ── */
function StatItem({ stat, active }) {
  const val = useCounter(stat.value, 1800, active)
  return (
    <div className="stat-item animate-fade-up">
      <span className="stat-icon">{stat.icon}</span>
      <div className="stat-number">
        {val}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  )
}

/* ── Division Card ── */
function DivisionCard({ div, index }) {
  const icons = {
    ppe: '🦺',
    clothing: '👔',
    wipes: '🧹',
    construction: '🏗️',
    fire: '🔥',
    road: '🚧',
  }
  const titles = {
    ppe: 'PPE & Industrial',
    clothing: 'Protective Clothing',
    wipes: 'Wiping Solutions',
    construction: 'Construction Safety',
    fire: 'Fire Safety',
    road: 'Road Safety',
  }
  const descs = {
    ppe: 'Complete range of Personal Protective Equipment, abrasives, adhesives, and industrial supplies.',
    clothing: 'Specialized protective wear for paint shops, welding, thermal risks, chemicals, labs, and ESD environments.',
    wipes: 'Premium lint-free, non-woven, and micro-fiber wiping solutions under the Maxim Plus brand.',
    construction: 'Fall protection systems, scaffolding, PPE kits, and first aid for construction sites.',
    fire: 'Extinguishers, alarm systems, sprinklers, and fire safety accessories for all fire classes.',
    road: 'Hi-visibility workwear, road safety PPE, and emergency kits for road workers.',
  }
  const to = div.id === 'wipes' ? '/wiping-solutions' : `/products?div=${div.id}`

  return (
    <Link to={to} className="division-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="division-card__icon">{icons[div.id]}</div>
      <h3 className="division-card__title">{titles[div.id]}</h3>
      <p className="division-card__desc">{descs[div.id]}</p>
      <span className="division-card__arrow">
        Explore →
      </span>
    </Link>
  )
}

/* ── Why Maxim Plus ── */
const whyItems = [
  { icon: '🏆', title: 'Best-in-Class Quality', desc: 'Guaranteed products with stringent quality checks. Designed for maximum protection and durability.' },
  { icon: '🚚', title: 'Timely Delivery', desc: 'Reliable logistics with on-time delivery track record. Pan-Maharashtra supply network.' },
  { icon: '🤝', title: 'Transparent Dealing', desc: 'Honest pricing, no hidden costs. Customer-first approach since 2008.' },
  { icon: '🔬', title: 'Expert Guidance', desc: 'In-house R&D team and safety experts to recommend the right solution for your application.' },
  { icon: '🏭', title: 'SAI Industries Backing', desc: 'Robust manufacturing and production backbone ensuring consistent supply and quality control.' },
  { icon: '⚡', title: '15+ Years Experience', desc: 'Established 2008, expanded in 2016 with an Intelligent Safety Products facility in Pune.' },
]

/* ── CLIENTELE ── */
const clientsList = [
  { name: 'ŠKODA', domain: 'skoda-auto.com' },
  { name: 'Volkswagen', domain: 'volkswagen.com' },
  { name: 'Gestamp', domain: 'gestamp.com' },
  { name: 'GM', domain: 'gm.com' },
  { name: 'JCB', domain: 'jcb.com' },
  { name: 'SANY', domain: 'sanyglobal.com' },
  { name: 'Ognibene', domain: 'ognibene.com' },
  { name: 'POSCO', domain: 'posco.com' },
  { name: 'Plastic Omnium', domain: 'plasticomnium.com' },
  { name: 'Varroc', domain: 'varroc.com' },
  { name: 'Mahindra CIE', domain: 'cieautomotive.com' },
  { name: 'Endurance', domain: 'endurancegroup.com' },
  { name: 'Jaya Hind', domain: 'jayahind.com' },
  { name: 'JSW', domain: 'jsw.in' },
  { name: 'Jindal SAW Ltd.', domain: 'jindalsaw.com' },
  { name: 'Freudenberg', domain: 'freudenberg.com' },
  { name: 'Reliable', domain: 'reliableautotech.com' },
  { name: 'Bridgestone', domain: 'bridgestone.com' },
  { name: 'Mungi', domain: 'mungi.com' },
  { name: 'Thyssenkrupp', domain: 'thyssenkrupp.com' },
  { name: 'Kawasaki', domain: 'kawasaki.com' },
  { name: 'Mars', domain: 'mars.com' },
  { name: 'Mondelēz', domain: 'mondelezinternational.com' },
  { name: 'Sterling', domain: 'sterlinghospitals.com' },
]

function ClientLogo({ client }) {
  const [error, setError] = useState(false)
  return (
    <div className="client-logo-card">
      <div className="client-img-wrapper">
        {!error ? (
          <img
            src={`/clients/${client.domain}.png`}
            alt={client.name}
            onError={() => setError(true)}
            className="client-img"
            loading="lazy"
          />
        ) : (
          <span className="client-name-text" style={{ fontSize: '1rem' }}>{client.name}</span>
        )}
      </div>
      <span className="client-logo-name">{client.name}</span>
    </div>
  )
}

export default function Home() {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: .3 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="home">
      <SEO
        title="Maxim Plus — THE EXPERT SOLUTIONS™ | Pune Safety Products"
        description="Maxim Plus — Pune's leading manufacturer & supplier of protective clothing, PPE kits, construction safety, fire safety & industrial wipes. Serving 100+ clients across Maharashtra."
        keywords="Maxim Plus, PPE supplier Pune, safety equipment manufacturer Maharashtra, protective clothing Pune, personal protective equipment Pune, construction safety products, industrial wipes, lint free wipes"
        canonicalPath="/"
        breadcrumbs={[{ name: 'Home', path: '/' }]}
        schemas={[organizationSchema(), localBusinessSchema(), websiteSchema()]}
      />
      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__bg-navy" />
          <div className="hero__bg-orange" />
          <div className="hero__bg-pattern" />
        </div>

        <div className="hero__content container">
          <div className="hero__left animate-slide-left">
            <div className="eyebrow" style={{ color: 'var(--mp-orange-light)' }}>
              <span style={{ background: 'var(--mp-orange-light)', width: '2rem', height: '2px', display: 'block', borderRadius: '1px' }} />
              Pune's Safety Leader Since 2008
            </div>
            <h1 className="heading-display heading-xl hero__headline">
              Maxim Plus
              <br />
              <span className="text-gradient" style={{ fontSize: '0.65em' }}>THE EXPERT SOLUTIONS™</span>
            </h1>
            <p className="hero__sub">
              Your Complete Safety Partner. Manufacturer, distributor &amp; supplier of Protective Clothing, PPE,
              Construction Safety, Fire Safety &amp; Wiping Solutions.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn--primary btn--lg">
                Explore Products
              </Link>
              <Link to="/contact" className="btn btn--outline btn--lg">
                Get a Quote
              </Link>
            </div>
            <div className="hero__trust">
              <span className="hero__trust-badge">✓ 15+ Years Trusted</span>
              <span className="hero__trust-badge">✓ 500+ Products</span>
              <span className="hero__trust-badge">✓ 100+ Clients</span>
            </div>
          </div>

          <div className="hero__right animate-slide-right">
            <div className="hero__visual">
              <div className="hero__visual-ring hero__visual-ring--outer animate-float" />
              <div className="hero__visual-ring hero__visual-ring--inner" />
              <div className="hero__visual-center" style={{ padding: '0.0rem' }}>
                <img
                  src={maximLogo}
                  alt="Maxim Plus"
                  className="hero__visual-circular"
                />
              </div>
              {/* Floating badges */}
              <div className="hero__badge hero__badge--1 animate-float" style={{ animationDelay: '-.5s' }}>
                👔 Protective Clothing
              </div>
              <div className="hero__badge hero__badge--2 animate-float" style={{ animationDelay: '-1s' }}>
                🦺 PPE
              </div>
              <div className="hero__badge hero__badge--3 animate-float" style={{ animationDelay: '-1.5s' }}>
                🧽 Wiping Solutions
              </div>
              <div className="hero__badge hero__badge--4 animate-float" style={{ animationDelay: '-2s' }}>
                🏗️ Construction
              </div>
            </div>
          </div>
        </div>

        {/* Scroll chevron */}
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-arrow" />
        </div>
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <section className="stats-bar" ref={statsRef}>
        <div className="container stats-bar__grid">
          {stats.map(stat => (
            <StatItem key={stat.label} stat={stat} active={statsVisible} />
          ))}
        </div>
      </section>

      {/* ══════════ DIVISIONS ══════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">What We Offer</div>
            <h2 className="heading-display heading-lg">
              One Stop Solutions for All
              <br />
              <span className="text-gradient-navy">Your Safety Requirements</span>
            </h2>
            <p>From protective clothing and wiping solutions to fire suppression systems — we cover every dimension of workplace safety.</p>
          </div>
          <div className="divisions-grid">
            {divisions.map((div, i) => (
              <DivisionCard key={div.id} div={div} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MANUFACTURING SPOTLIGHT ══════════ */}
      <section className="section maxim-spotlight">
        <div className="container maxim-spotlight__inner">
          <div className="maxim-spotlight__left animate-slide-left">
            <div className="eyebrow" style={{ color: 'var(--mp-orange-light)' }}>
              Our Backbone
            </div>
            <h2 className="heading-display heading-lg" style={{ color: '#fff' }}>
              Manufacturing by
              <br />
              <span style={{ color: 'var(--mp-orange-light)' }}>
                SAI Industries
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.75)', marginTop: '1rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Maxim Plus is backed by the robust manufacturing capabilities of SAI Industries.
              Based near Pune, our Intelligent Safety Products facility ensures uncompromising quality
              control, custom production capabilities, and reliable supply chains across our entire product range.
            </p>
            <div className="maxim-spotlight__features">
              {['In-house R&D', 'Custom Sizing', 'Quality Control', 'Pan-Maharashtra Supply', 'Bulk Manufacturing'].map(f => (
                <span key={f} className="badge badge--white">{f}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn--primary btn--lg">
                Learn About Us
              </Link>
            </div>
          </div>
          <div className="maxim-spotlight__right animate-slide-right">
            <div className="maxim-spotlight__visual">
              <div className="maxim-spotlight__card">
                <div style={{ fontSize: '3rem', marginBottom: '.75rem' }}>🏭</div>
                <h3 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>Intelligent Safety<br />Products Facility</h3>
              </div>
              <div className="maxim-spotlight__stat-row">
                {[
                  { val: '2008', label: 'Established' },
                  { val: '100%', label: 'Quality Check' },
                  { val: '500+', label: 'Products' },
                ].map(s => (
                  <div key={s.label} className="maxim-spotlight__stat">
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--mp-orange-light)', fontSize: '1.4rem' }}>{s.val}</div>
                    <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CLIENTELE ══════════ */}
      <section className="clientele-section section">
        <div className="container">
          <div className="section-header section-header--center" style={{ marginBottom: '1rem' }}>
            <div className="eyebrow">Our Clientele</div>
            <h2 className="heading-display heading-lg">
              Trusted by <span className="text-gradient-navy">Global Leaders</span>
            </h2>
            <p>We are proud to serve some of the most respected brands across the globe.</p>
          </div>

          <div className="clientele-marquee">
            <div className="clientele-track">
              {/* Duplicated for infinite seamless scrolling */}
              {[...clientsList, ...clientsList].map((client, i) => (
                <ClientLogo key={i} client={client} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ INDUSTRIES ══════════ */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">Who We Serve</div>
            <h2 className="heading-display heading-lg">
              12+ Industries <span className="text-gradient-navy">Trust Maxim Plus</span>
            </h2>
            <p>From Aerospace to Pharmaceuticals — our safety products protect workers across every major sector.</p>
          </div>
          <div className="industries-grid">
            {[
              { icon: '🚗', name: 'Automotive' },
              { icon: '✈️', name: 'Aerospace' },
              { icon: '🛡️', name: 'Defense' },
              { icon: '⚙️', name: 'Engineering' },
              { icon: '💻', name: 'Electronics & Semiconductor' },
              { icon: '🌾', name: 'Food Processing' },
              { icon: '💊', name: 'Pharmaceutical' },
              { icon: '🎨', name: 'Paint Shop' },
              { icon: '🖨️', name: 'Printing' },
              { icon: '🔬', name: 'R&D Research Lab' },
              { icon: '🔭', name: 'Optical Industry' },
              { icon: '🏗️', name: 'Building & Construction' },
            ].map((ind, i) => (
              <div key={ind.name} className="industry-chip animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="industry-chip__icon">{ind.icon}</span>
                <span className="industry-chip__name">{ind.name}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/industries" className="btn btn--navy">View All Industries</Link>
          </div>
        </div>
      </section>

      {/* ══════════ WHY MAXIM PLUS ══════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">Why Choose Maxim Plus</div>
            <h2 className="heading-display heading-lg">
              The Maxim Plus <span className="text-gradient-navy">Advantage</span>
            </h2>
            <p>Six pillars of excellence that have made us the most trusted safety partner in Pune.</p>
          </div>
          <div className="why-grid">
            {whyItems.map((item, i) => (
              <div key={item.title} className="why-card animate-fade-up" style={{ animationDelay: `${i * .1}s` }}>
                <div className="why-card__icon">{item.icon}</div>
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MILESTONES ══════════ */}
      <section className="section section--dark milestone-section">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow" style={{ color: 'var(--mp-orange-light)' }}>Our Journey</div>
            <h2 className="heading-display heading-lg" style={{ color: '#fff' }}>
              Built on 15 Years of Excellence
            </h2>
          </div>
          <div className="milestones">
            {[
              { year: '2008', title: 'Founded', desc: 'SAI Industries established in Pune as a safety products supplier.' },
              { year: '2012', title: 'Safety & Packaging', desc: 'Expanded into safety and packaging product verticals.' },
              { year: '2015', title: 'Growth', desc: 'Acquired packaging & hardware. New manufacturing site in Chakan, Pune.' },
              { year: '2016', title: 'New Plant', desc: 'Launched Intelligent Safety Product Business Unit for advanced industrial development.' },
              { year: '2024+', title: 'Maxim Plus', desc: 'Maxim Plus brand established. Serving 100+ clients, 500+ products, 12+ industries.' },
            ].map((m, i) => (
              <div key={m.year} className="milestone-item animate-fade-up" style={{ animationDelay: `${i * .12}s` }}>
                <div className="milestone-year">{m.year}</div>
                <div className="milestone-dot" />
                <div className="milestone-content">
                  <h4 className="milestone-title">{m.title}</h4>
                  <p className="milestone-desc">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
