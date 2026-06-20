import { Link } from 'react-router-dom'
import { products } from '../data/products'
import maximLogo from '/Maximplus.webp'
import SEO from '../components/SEO'
import './WipingSolutions.css'

const wipeProducts = products.filter(p => p.division === 'wipes')

const features = [
  { icon: '💧', title: 'Hydrophilic Nature', desc: 'Special treatment to pick up water and solvents faster than usual, reducing wiping time.' },
  { icon: '🔬', title: 'Lint Free Surface', desc: "Polyester continuous monofilament fibre yarn doesn't let out fibre lints from the surface." },
  { icon: '⚡', title: '200%+ Absorption', desc: 'Unique knitting pattern absorbs at a faster rate, retaining 2× its weight of liquid.' },
  { icon: '✂️', title: 'Sealed Edges', desc: 'Laser-cut technology ensures lint-free sealed edges — no loose threads, ever.' },
  { icon: '🚫', title: 'Binder Free', desc: 'No additives and no silicones. Safe for the most sensitive industrial applications.' },
  { icon: '✨', title: 'Smooth Surface', desc: 'Ensures zero wiping marks after your wiping job — perfect finish guaranteed.' },
]

const industries = [
  { icon: '🚗', name: 'Automotive' },
  { icon: '🎨', name: 'Paint Shop' },
  { icon: '✈️', name: 'Aerospace' },
  { icon: '💻', name: 'Electronics' },
  { icon: '💊', name: 'Pharmaceuticals' },
  { icon: '🔬', name: 'R&D Labs' },
  { icon: '🔭', name: 'Optical & Glass' },
  { icon: '🖨️', name: 'Printing' },
  { icon: '🌾', name: 'Food Processing' },
  { icon: '🏨', name: 'Hotel & Restaurant' },
]

export default function WipingSolutions() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type':    'Product',
    name:       'Maxim Plus Industrial Wiping Solutions',
    brand: { '@type': 'Brand', name: 'Maxim Plus', slogan: 'The Expert Solutions™' },
    url:        'https://www.maximpluss.com/wiping-solutions',
    image:      'https://www.maximpluss.com/Maximplus.png',
    description: 'Maxim Plus offers premium lint-free industrial wiping cloths — polyester wipes, microfibre wipes, tack rags, and glass wipes — for automotive, aerospace, pharmaceutical, electronics, and cleanroom applications. Zero wiping marks. Binder-free. 200%+ absorption.',
    category:   'Industrial Wiping Solutions',
    offers: {
      '@type':        'AggregateOffer',
      priceCurrency:  'INR',
      availability:   'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Maxim Plus' },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Lint Free',        value: 'Yes' },
      { '@type': 'PropertyValue', name: 'Absorption',       value: '200%+' },
      { '@type': 'PropertyValue', name: 'Edge Type',        value: 'Laser Cut Sealed' },
      { '@type': 'PropertyValue', name: 'Binder Free',      value: 'Yes' },
      { '@type': 'PropertyValue', name: 'Wiping Marks',     value: 'Zero' },
    ]
  }

  return (
    <div className="maxim-page">
      <SEO
        title="Industrial Wipes & Wiping Solutions | Maxim Plus Pune"
        description="Premium lint-free polyester wipes, microfibre cloths, tack rags & glass wipes for automotive, aerospace, pharma & electronics. Zero wiping marks. Binder-free."
        keywords="Maxim Plus wipes, lint free industrial wipes Pune, polyester wiping cloth manufacturer, microfibre wipes supplier Maharashtra, tack rag automotive, cleanroom wipes India, industrial wiping solution Pune"
        canonicalPath="/wiping-solutions"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Wiping Solutions', path: '/wiping-solutions' },
        ]}
        schemas={[productSchema]}
      />
      {/* ── Hero ── */}
      <section className="maxim-hero">
        <div className="maxim-hero__bg" />
        <div className="container maxim-hero__content">
          <div className="maxim-hero__left animate-slide-left">
            <h1 className="heading-display heading-xl" style={{ color: '#fff' }}>
              Wiping <span style={{ color: 'var(--mp-orange-light)' }}>Solutions</span>
            </h1>
            <p className="maxim-hero__sub">
              Our flagship product lineup. High-quality wiping solutions engineered for critical applications — 
              from semiconductor fabs to automotive paint shops.
            </p>
            <p className="maxim-hero__tagline">
              "Smart way to make a stain-free world"
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Link to="/contact" className="btn btn--primary btn--lg">Request Samples</Link>
            </div>
          </div>
          <div className="maxim-hero__right animate-slide-right">
            <div className="maxim-hero__visual">
              <div className="maxim-hero__circle">
                <img src="/products/cat_wipes.webp" alt="Wiping Solutions" className="maxim-hero__logo-img" style={{ objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <div className="maxim-hero__floating-tag tag--1">✓ Lint Free</div>
              <div className="maxim-hero__floating-tag tag--2">✓ 200%+ Absorption</div>
              <div className="maxim-hero__floating-tag tag--3">✓ Zero Wiping Marks</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Range ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">Product Range</div>
            <h2 className="heading-display heading-lg">Complete Wiping Solutions</h2>
            <p>From ultra-clean lint-free cloths for semiconductor fabs to tack-rags for automotive paint shops — we have the right wipe for every application.</p>
          </div>
          <div className="wipes-grid">
            {wipeProducts.map((product, i) => (
              <div key={product.id} className="wipe-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="wipe-card__header">
                  <span className="wipe-card__emoji">{product.emoji}</span>
                  <div className="wipe-card__cat">{product.category}</div>
                </div>
                <h3 className="wipe-card__name">{product.name}</h3>
                <p className="wipe-card__desc">{product.desc}</p>
                {product.features && (
                  <ul className="wipe-card__features">
                    {product.features.map(f => <li key={f}><span style={{ color: 'var(--mp-orange)', fontWeight: 700, marginRight: '.4rem' }}>✓</span>{f}</li>)}
                  </ul>
                )}
                {product.models && (
                  <div className="wipe-card__models">
                    {product.models.map(m => <span key={m} className="model-badge">{m}</span>)}
                  </div>
                )}
                {product.sizes && (
                  <div className="wipe-card__sizes">📐 Sizes: {product.sizes.join(', ')}</div>
                )}
                <Link to="/contact" className="btn btn--primary btn--sm" style={{ marginTop: 'auto' }}>
                  Get a Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO Content Section ── */}
      <section className="section section--light" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="seo-content-block" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="heading-display heading-md" style={{ color: 'var(--mp-navy-dark)', marginBottom: '1rem' }}>
              Why Choose Maxim Plus Industrial Wiping Solutions?
            </h2>
            <p style={{ color: 'var(--text-color)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              In high-precision manufacturing, ordinary rags and standard cloth are simply not enough. Contamination from loose lint, dust, or silicone binders can ruin an entire production batch, especially in the <strong>Automotive, Aerospace, Pharmaceutical, and Electronics</strong> industries. That is why <strong>Maxim Plus</strong> engineers premium, specialized industrial wiping solutions designed specifically to protect your sensitive equipment and ensure flawless finishing.
            </p>
            <h3 className="heading-display" style={{ color: 'var(--mp-navy)', marginBottom: '0.75rem', fontSize: '1.4rem' }}>
              Advanced Materials & Unmatched Absorbency
            </h3>
            <p style={{ color: 'var(--text-color)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Our wiping products—including <strong>Polyester Continuous Monofilament Fibre Wipes, Microfibre Cloths, Poly-Cellulose Cleanroom Wipes, and Tack Rags</strong>—are manufactured using state-of-the-art laser cutting and sealed edge technology. This guarantees a 100% lint-free surface. With an absorption capacity exceeding 200% of their own weight, our hydrophilic wipes instantly pick up water, solvents, oils, and chemical spills faster than traditional materials. 
            </p>
            <p style={{ color: 'var(--text-color)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Furthermore, every Maxim Plus wiping solution is strictly <strong>binder-free and silicone-free</strong>. Whether you are prepping a car body in a paint shop, maintaining optical glass, or sterilizing an R&D laboratory surface, our wipes leave absolutely zero wiping marks, residue, or chemical contamination behind.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow">Why Maxim Plus</div>
            <h2 className="heading-display heading-lg">
              The <span className="text-gradient-navy">Expert Difference</span>
            </h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.title} className="feature-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="section maxim-industries">
        <div className="container">
          <div className="section-header section-header--center">
            <div className="eyebrow" style={{ color: 'var(--mp-orange-light)' }}>Applications</div>
            <h2 className="heading-display heading-lg" style={{ color: '#fff' }}>Industries We Serve</h2>
          </div>
          <div className="maxim-industry-grid">
            {industries.map((ind, i) => (
              <div key={ind.name} className="maxim-industry-chip animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <span>{ind.icon}</span>
                <span>{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section--light">
        <div className="container maxim-cta">
          <h2 className="heading-display heading-lg">Ready for a cleaner workspace?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '.75rem' }}>
            Contact us for samples, custom sizes, or a bulk quote.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">Request Samples / Quote</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
