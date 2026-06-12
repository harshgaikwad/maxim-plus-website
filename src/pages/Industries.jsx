import { Link } from 'react-router-dom'
import { industries } from '../data/industries'
import SEO from '../components/SEO'
import './Industries.css'

export default function Industries() {
  return (
    <div>
      <SEO
        title="Industries We Serve — Automotive, Aerospace, Pharma Safety Products | Pune"
        description="Maxim Plus supplies certified safety products to 12+ industries across Maharashtra: Automotive, Aerospace, Defence, Electronics, Pharmaceuticals, Construction, Food Processing, Paint Shops & more. ISO-standard PPE and safety solutions."
        keywords="safety products automotive industry Pune, PPE aerospace industry Maharashtra, pharmaceutical safety equipment, electronics cleanroom safety, construction industry safety Pune, food processing safety products, paint shop PPE supplier, safety equipment Chakan Pune, defense safety products Maharashtra"
        canonicalPath="/industries"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ]}
      />
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--mp-orange-light)' }}>Who We Serve</div>
          <h1 className="heading-display heading-lg" style={{ color: '#fff' }}>Industries We Serve</h1>
          <p style={{ color: 'rgba(255,255,255,.72)', maxWidth: 540, marginTop: '.75rem', fontSize: '1.05rem' }}>
            From Aerospace to Pharmaceuticals — Maxim Plus protects workers across every major sector with certified safety solutions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">12 Sectors</div>
            <h2 className="heading-display heading-lg">
              Every Industry Deserves <span className="text-gradient-navy">the Best Safety</span>
            </h2>
            <p>We understand that each industry has unique safety challenges. Our product range is designed to meet the specific requirements of diverse sectors.</p>
          </div>

          <div className="industries-detail-grid">
            {industries.map((ind, i) => (
              <div key={ind.id} className="industry-card animate-fade-up" style={{ animationDelay: `${i * 0.07}s`, '--ind-color': ind.color }}>
                <div className="industry-card__icon">{ind.icon}</div>
                <h3 className="industry-card__name">{ind.name}</h3>
                <p className="industry-card__desc">{ind.desc}</p>
                <Link to="/products" className="industry-card__link">
                  View Products →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries gear visual */}
      <section className="section section--dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--mp-orange-light)', justifyContent: 'center' }}>
            Our Expertise
          </div>
          <h2 className="heading-display heading-lg" style={{ color: '#fff' }}>
            The Maxim Plus Ecosystem
          </h2>
          <p style={{ color: 'rgba(255,255,255,.65)', maxWidth: 600, margin: '1rem auto 3rem', fontSize: '1.05rem' }}>
            At the center of every industry we serve, Maxim Plus acts as the single source for all safety needs.
          </p>
          <div className="ecosystem-grid">
            {[
              { label: 'Protective Clothing', icon: '👔', to: '/products?div=clothing' },
              { label: 'PPE & Industrial', icon: '🦺', to: '/products?div=ppe' },
              { label: 'Wiping Solutions', icon: '🧹', to: '/wiping-solutions' },
              { label: 'Construction Safety', icon: '🏗️', to: '/products?div=construction' },
              { label: 'Fire & Road Safety', icon: '🔥', to: '/products?div=fire' },
            ].map(item => (
              <Link key={item.label} to={item.to} className="ecosystem-card">
                <span style={{ fontSize: '2.5rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '3rem' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">Get Industry-Specific Quote</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
