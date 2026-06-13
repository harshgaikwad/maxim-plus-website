import { Link } from 'react-router-dom'
import SEO, { organizationSchema } from '../components/SEO'
import './About.css'

const timeline = [
  { year: '2008', icon: '🌱', title: 'Founded', desc: 'SAI Industries established in Pune as a manufacturer, trader, and supplier of industrial safety products. Started with Personal Protective Equipment for local industries.' },
  { year: '2012', icon: '📦', title: 'Safety & Packaging', desc: 'Expanded portfolio by acquiring Safety and Packaging product verticals, broadening our service offering to include packing materials and hardware.' },
  { year: '2015', icon: '🏭', title: 'New Manufacturing Site', desc: 'Added new manufacturing sites in Chakan, Pune, to fulfil requirements for OEM networks. Acquired Packaging & Hardware items to serve automotive clients.' },
  { year: '2016', icon: '⚡', title: 'Intelligent Safety Products', desc: 'New plant completion. Established the Intelligent Safety Product Business Unit for advanced industrial development — marking a major leap in our capabilities.' },
  { year: '2024+', icon: '🚀', title: 'Maxim Plus Established', desc: 'Maxim Plus launched as our premium customer-facing brand for wiping solutions and protective clothing. Serving 100+ clients across 12+ industries throughout Maharashtra.' },
]

const values = [
  { icon: '🏆', title: 'Quality First', desc: 'We never compromise on product quality. Every item in our catalogue is tested and verified to meet or exceed industry standards.' },
  { icon: '🤝', title: 'Customer Centric', desc: 'Our customers\' success is our success. We build lasting partnerships through honest dealings and dedicated support.' },
  { icon: '🔬', title: 'Innovation', desc: 'With our in-house R&D team, we continuously seek better solutions for our clients\' evolving safety needs.' },
  { icon: '🚚', title: 'Reliability', desc: 'Timely delivery and consistent supply — our clients can count on us to be there when they need us most.' },
]

export default function About() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is Maxim Plus?',
        acceptedAnswer: { '@type': 'Answer', text: 'Maxim Plus is the premier safety solutions brand manufactured and backed by SAI Industries, offering protective clothing, PPE, and industrial wiping solutions.' } },
      { '@type': 'Question', name: 'When was the company founded?',
        acceptedAnswer: { '@type': 'Answer', text: 'The manufacturing backbone, SAI Industries, was founded in 2008 in Pune, Maharashtra.' } },
      { '@type': 'Question', name: 'What products does Maxim Plus supply?',
        acceptedAnswer: { '@type': 'Answer', text: 'Maxim Plus supplies protective clothing, industrial wipes, PPE, construction safety products, fire safety equipment, and road safety products.' } },
      { '@type': 'Question', name: 'Where is Maxim Plus located?',
        acceptedAnswer: { '@type': 'Answer', text: 'Maxim Plus products are manufactured at Gat No. 230, Near Volkswagen Gate, Mahalunge Ingale, Tal. Khed, Pune 410501, Maharashtra, India.' } },
    ]
  }

  return (
    <div>
      <SEO
        title="About Maxim Plus — Safety Products Manufacturer, Pune"
        description="Learn about Maxim Plus, Pune's trusted safety products and wiping solutions brand backed by SAI Industries. Serving 100+ clients across 12+ industries."
        keywords="about Maxim Plus, safety products manufacturer Pune, PPE supplier history Maharashtra, protective clothing Pune, industrial wiping solutions Pune, Sai Industries"
        canonicalPath="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
        schemas={[organizationSchema(), faqSchema]}
      />
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--mp-orange-light)' }}>Our Story</div>
          <h1 className="heading-display heading-lg" style={{ color: '#fff' }}>About Maxim Plus</h1>
          <p style={{ color: 'rgba(255,255,255,.72)', maxWidth: 520, marginTop: '.75rem', fontSize: '1.05rem' }}>
            15 years of manufacturing excellence in industrial safety. Built on quality, trust, and innovation.
          </p>
        </div>
      </section>

      {/* About content */}
      <section className="section">
        <div className="container about-intro">
          <div className="about-intro__left animate-slide-left">
            <div className="eyebrow">Who We Are</div>
            <h2 className="heading-display heading-lg">
              Pune's Leading <span className="text-gradient-navy">Safety Partner</span>
            </h2>
            <p style={{ marginTop: '1.25rem', fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--text-body)' }}>
              Maxim Plus is a leading name in Pune providing complete industrial safety solutions.
              Backed by the robust manufacturing capabilities of SAI Industries, our products comprise protective clothing,
              industrial wiping solutions, PPE kits, construction safety, and fire safety products.
            </p>
            <p style={{ marginTop: '.75rem', fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--text-body)' }}>
              Our manufacturing journey started in 2008 under SAI Industries. Since then, we have strived hard to provide 
              prompt service, high-end quality, and custom solutions to our customers. Today, the Maxim Plus brand represents 
              our commitment to advanced industrial development and specialized safety products.
            </p>
            <p style={{ marginTop: '.75rem', fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--text-body)' }}>
              The reason behind our success is best quality/guaranteed products, transparent dealing,
              timely delivery, and our friendliness with customers.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn--primary">View Our Products</Link>
              <Link to="/contact" className="btn btn--navy">Contact Us</Link>
            </div>
          </div>

          <div className="about-intro__right animate-slide-right">
            <div className="about-intro__cards">
              <div className="mv-card">
                <div className="mv-card__icon">🎯</div>
                <h3 className="mv-card__title">Our Mission</h3>
                <p className="mv-card__text">
                  To provide high quality wiping solutions in the field of Industrial Wipes and PPE,
                  ensuring affordability and maximum market coverage as the best supplier. We aim to grow 
                  consistently by maintaining a smooth rhythm with our customers.
                </p>
              </div>
              <div className="mv-card mv-card--orange">
                <div className="mv-card__icon">🔭</div>
                <h3 className="mv-card__title">Our Vision</h3>
                <p className="mv-card__text">
                  To drive new improvement through innovation and integration of state-of-the-art technologies.
                  To include more products as per customer requirements and become the most respected firm
                  in the industrial safety industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">What Drives Us</div>
            <h2 className="heading-display heading-lg">Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="value-card animate-fade-up" style={{ animationDelay: `${i * .1}s` }}>
                <div className="value-card__icon">{v.icon}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">15 Years of Growth</div>
            <h2 className="heading-display heading-lg">Our <span className="text-gradient-navy">Journey</span></h2>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={item.year} className={`timeline-item animate-fade-up ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`} style={{ animationDelay: `${i * .12}s` }}>
                <div className="timeline-card">
                  <div className="timeline-card__icon">{item.icon}</div>
                  <div className="timeline-year">{item.year}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">Where to Find Us</div>
            <h2 className="heading-display heading-lg">Our Location</h2>
          </div>
          <div className="location-card">
            <div className="location-card__info">
              <h3>Maxim Plus</h3>
              <p>Manufacturing by SAI Industries<br />Gat No. 230, Near Skoda-Volkswagen Company Material Gate,<br />Mahalunge Ingale, Tal. Khed, Dist. Pune — 410501, Maharashtra</p>
              <div className="location-card__contacts">
                <a href="tel:+918623836464" className="location-contact">
                  <span>📞</span> +91 8623836464
                </a>
                <a href="tel:+918605418324" className="location-contact">
                  <span>📞</span> +91 8605418324
                </a>
                <a href="mailto:info@maximpluss.com" className="location-contact">
                  <span>✉️</span> info@maximpluss.com
                </a>
              </div>
            </div>
            <div className="location-card__map">
              <div className="map-placeholder">
                <span>📍</span>
                <p>Mahalunge Ingale, Tal. Khed,<br />Pune 410501</p>
                <a
                  href="https://maps.google.com/?q=Mahalunge+Ingale+Khed+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--navy btn--sm"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
