import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products, divisions } from '../data/products'
import SEO from '../components/SEO'
import './Products.css'

export default function Products() {
  const [activeDiv, setActiveDiv] = useState('all')
  const [search, setSearch]       = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    let p = products
    if (activeDiv !== 'all') p = p.filter(x => x.division === activeDiv)
    if (activeCategory !== 'all') p = p.filter(x => x.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      p = p.filter(x =>
        x.name.toLowerCase().includes(q) ||
        x.desc.toLowerCase().includes(q) ||
        x.category.toLowerCase().includes(q)
      )
    }
    return p
  }, [activeDiv, search, activeCategory])

  const categories = useMemo(() => {
    const base = activeDiv === 'all' ? products : products.filter(x => x.division === activeDiv)
    return ['all', ...new Set(base.map(x => x.category))]
  }, [activeDiv])

  const divisionColors = {
    ppe:          '#0B1F3F',
    clothing:     '#8B5CF6',
    wipes:        '#6AAD2A',
    construction: '#2563EB',
    fire:         '#DC2626',
    road:         '#D97706',
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type':    'ItemList',
    name:       'Maxim Plus Safety Products Catalogue',
    description: 'Complete range of Protective Clothing, PPE, Wiping Solutions, Construction Safety, Fire Safety, and Road Safety products supplied by Maxim Plus, Pune.',
    numberOfItems: products.length,
    itemListElement: divisions.map((div, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       div.label,
      description: div.desc,
    }))
  }

  return (
    <div className="products-page">
      <SEO
        title="Safety Products Catalogue — Protective Clothing, PPE & Wipes | Pune"
        description="Browse 500+ safety products from Maxim Plus, Pune: Protective Clothing, PPE kits, fire extinguishers, construction safety harnesses, road safety cones, and industrial wipes. Best prices. Fast delivery across Maharashtra."
        keywords="PPE kits Pune, protective clothing manufacturer Maharashtra, construction safety harness Pune, fire extinguisher supplier Pune, road safety cones Maharashtra, industrial safety gloves, safety shoes supplier Pune, industrial wipes, lint free wipes"
        canonicalPath="/products"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ]}
        schemas={[itemListSchema]}
      />
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--mp-orange-light)' }}>Our Catalogue</div>
          <h1 className="heading-display heading-lg" style={{ color: '#fff' }}>
            500+ Safety Products
          </h1>
          <p style={{ color: 'rgba(255,255,255,.72)', maxWidth: 560, marginTop: '.75rem', fontSize: '1.05rem' }}>
            Browse our complete range across Protective Clothing, PPE, Construction, Fire Safety, Road Safety, and Wiping Solutions.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBlock: '3rem' }}>
        {/* ── Division Tabs ── */}
        <div className="products__div-tabs">
          <button
            className={`div-tab ${activeDiv === 'all' ? 'div-tab--active' : ''}`}
            onClick={() => { setActiveDiv('all'); setActiveCategory('all') }}
          >
            All Products
          </button>
          {divisions.map(div => (
            <button
              key={div.id}
              className={`div-tab ${activeDiv === div.id ? 'div-tab--active' : ''}`}
              style={activeDiv === div.id ? { '--tab-color': divisionColors[div.id] } : {}}
              onClick={() => { setActiveDiv(div.id); setActiveCategory('all') }}
            >
              {div.icon} {div.label}
            </button>
          ))}
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="products__toolbar">
          <div className="products__search-wrap">
            <span className="products__search-icon">🔍</span>
            <input
              type="text"
              className="products__search"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="products__search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <div className="products__cat-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-tab ${activeCategory === cat ? 'cat-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="products__count">
          Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
          {activeDiv !== 'all' && ` in ${divisions.find(d => d.id === activeDiv)?.label}`}
          {search && ` matching "${search}"`}
        </div>

        {/* ── Product Grid ── */}
        {filtered.length > 0 ? (
          <div className="products__grid">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} divisionColors={divisionColors} />
            ))}
          </div>
        ) : (
          <div className="products__empty">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3>No products found</h3>
            <p>Try a different search or category filter</p>
            <button
              className="btn btn--primary"
              style={{ marginTop: '1rem' }}
              onClick={() => { setSearch(''); setActiveCategory('all'); setActiveDiv('all') }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="products__cta">
          <div className="products__cta-inner">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', color: '#fff' }}>
                Can't find what you need?
              </h3>
              <p style={{ color: 'rgba(255,255,255,.72)', marginTop: '.4rem' }}>
                We source custom products. Contact us with your requirements.
              </p>
            </div>
            <Link to="/contact" className="btn btn--primary btn--lg">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, index, divisionColors }) {
  const [showDetail, setShowDetail] = useState(false)
  const color = divisionColors[product.division] || '#0B1F3F'
  const division = divisions.find(d => d.id === product.division)

  const generatedImageIds = [
    'ppe-01', 'ppe-02', 'ppe-03', 'ppe-04', 'ppe-05', 'ppe-06', 'ppe-07', 'ppe-08', 'ppe-09', 'ppe-10',
    'ppe-11', 'ppe-12', 'ppe-13', 'ppe-14', 'ppe-15', 'ppe-16', 'ppe-17', 'ppe-18', 'ppe-19', 'ppe-20',
    'wipe-01', 'wipe-02', 'wipe-03', 'wipe-04', 'wipe-05', 'wipe-06', 'wipe-07',
    'cs-01', 'cs-02', 'cs-03', 'cs-04', 'cs-05', 'cs-06', 'cs-07', 'cs-08', 'cs-09', 'cs-10',
    'fs-06', 'fs-08', 'fs-09', 'fs-10', 'fs-11', 'fs-13', 'fs-14',
    'rs-01', 'rs-02', 'rs-03', 'rs-04', 'rs-05',
    'cl-01', 'cl-02', 'cl-03', 'cl-04', 'cl-06', 'cl-07', 'cl-08', 'cl-09', 'cl-10', 'cl-11', 'cl-13', 'cl-14', 'cl-16', 'cl-19', 'cl-20', 'cl-23', 'cl-25'
  ]

  let imageSrc = division?.image
  if (generatedImageIds.includes(product.id)) {
    imageSrc = `/products/prod_${product.id.replace('-', '_')}.webp`
  }

  return (
    <div
      className="product-card animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 0.07}s`, '--card-color': color }}
    >
      <div className="product-card__image-wrapper">
        <img src={imageSrc} alt={product.category} className="product-card__image" loading="lazy" />
        <span className="product-card__cat badge"
          style={{ background: `${color}f0`, color: '#fff' }}
        >
          {product.category}
        </span>
      </div>

      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__desc">{product.desc}</p>

      {product.features && (
        <ul className="product-card__features">
          {product.features.slice(0, 3).map(f => (
            <li key={f}>
              <span className="feature-check">✓</span>
              {f}
            </li>
          ))}
        </ul>
      )}

      {product.models && (
        <div className="product-card__models">
          {product.models.map(m => (
            <span key={m} className="model-badge">{m}</span>
          ))}
        </div>
      )}

      <div className="product-card__footer">
        <Link
          to={`/contact?product=${encodeURIComponent(product.name)}`}
          className="btn btn--primary btn--sm"
        >
          Request Quote
        </Link>
        <a href="tel:+918623836464" className="btn btn--outline-navy btn--sm">
          📞 Call
        </a>
      </div>
    </div>
  )
}
