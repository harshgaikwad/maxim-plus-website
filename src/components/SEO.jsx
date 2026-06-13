/**
 * SEO.jsx — Centralized SEO component for Maxim Plus
 * Handles: Meta titles, descriptions, Open Graph, Twitter Cards,
 *          canonical URLs, JSON-LD structured data.
 */
import { Helmet } from 'react-helmet-async'

const SITE_URL  = 'https://www.maximpluss.com'
const SITE_NAME = 'Maxim Plus'
const DEFAULT_OG_IMAGE = `${SITE_URL}/maxim-og.png`

/** Shared company info — used across schemas */
const COMPANY = {
  name:        'Maxim Plus',
  alternateName: ['Maxim Plus THE EXPERT SOLUTIONS', 'Maxim Plus Pune', 'Sai Industries'],
  url:         SITE_URL,
  logo:        `${SITE_URL}/Maximplus.webp`,
  telephone:   ['+918623836464', '+918605418324'],
  email:       'info@maximpluss.com',
  foundingDate: '2008',
  address: {
    '@type':          'PostalAddress',
    streetAddress:    'Gat No. 230, Near Volkswagen Gate, Mahalunge Ingale',
    addressLocality:  'Khed',
    addressRegion:    'Maharashtra',
    postalCode:       '410501',
    addressCountry:   'IN',
  },
  geo: {
    '@type':   'GeoCoordinates',
    latitude:  18.7411,
    longitude: 73.9100,
  },
  openingHours: 'Mo-Sa 09:00-18:00',
  priceRange:   '₹₹',
  areaServed:   ['Pune', 'Maharashtra', 'India'],
  sameAs: [
    'https://www.maximpluss.com',
  ],
}

// ── Reusable schema builders ─────────────────────────────────────

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    '@id':      `${SITE_URL}/#organization`,
    name:       COMPANY.name,
    alternateName: COMPANY.alternateName,
    url:        COMPANY.url,
    logo: {
      '@type':       'ImageObject',
      url:           COMPANY.logo,
      width:         300,
      height:        100,
    },
    foundingDate: COMPANY.foundingDate,
    address:      COMPANY.address,
    telephone:    COMPANY.telephone,
    email:        COMPANY.email,
    sameAs:       COMPANY.sameAs,
    description:  'Maxim Plus is Pune\'s leading manufacturer, distributor, and supplier of industrial safety products — PPE, Protective Clothing, Construction Safety, Fire Safety, Road Safety, and industrial wiping solutions. Manufacturing backed by SAI Industries.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'SAI Industries',
      url: 'https://www.saiindustries.in',
    },
  }
}

function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    ['LocalBusiness', 'Store'],
    '@id':      `${SITE_URL}/#localbusiness`,
    name:       COMPANY.name,
    image:      DEFAULT_OG_IMAGE,
    url:        COMPANY.url,
    telephone:  COMPANY.telephone[0],
    email:      COMPANY.email,
    address:    COMPANY.address,
    geo:        COMPANY.geo,
    openingHoursSpecification: {
      '@type':    'OpeningHoursSpecification',
      dayOfWeek:  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens:      '09:00',
      closes:     '18:00',
    },
    priceRange:  COMPANY.priceRange,
    areaServed:  COMPANY.areaServed.map(a => ({ '@type': 'AdministrativeArea', name: a })),
    hasMap:      'https://maps.google.com/?q=Mahalunge+Ingale+Khed+Pune+410501',
    sameAs:      COMPANY.sameAs,
    description: 'Maxim Plus — Pune\'s trusted safety products manufacturer since 2008. Supplying PPE kits, protective clothing, fire safety, construction safety, road safety, and industrial wiping solutions across Maharashtra. Manufacturing by SAI Industries.',
    knowsAbout:  ['PPE', 'Personal Protective Equipment', 'Protective Clothing', 'Construction Safety', 'Fire Safety', 'Road Safety', 'Industrial Wiping Solutions', 'Lint Free Wipes'],
  }
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${SITE_URL}/#website`,
    url:        SITE_URL,
    name:       SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type':       'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

function breadcrumbSchema(items) {
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.name,
      item:      `${SITE_URL}${item.path}`,
    })),
  }
}

// ── Main SEO Component ───────────────────────────────────────────

export default function SEO({
  title,
  description,
  keywords,
  canonicalPath  = '/',
  ogImage        = DEFAULT_OG_IMAGE,
  ogType         = 'website',
  noIndex        = false,
  schemas        = [],
  breadcrumbs    = null,
}) {
  const fullTitle    = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — THE EXPERT SOLUTIONS™ | Safety & Wiping Products`
  const canonicalUrl = `${SITE_URL}${canonicalPath}`

  const allSchemas = [...schemas]
  if (breadcrumbs) allSchemas.push(breadcrumbSchema(breadcrumbs))

  return (
    <Helmet>
      {/* ── Core ── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical"           href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* ── Open Graph (Facebook, WhatsApp, LinkedIn) ── */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"   content={`${SITE_NAME} — THE EXPERT SOLUTIONS™`} />
      <meta property="og:type"        content={ogType} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_IN" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
      <meta name="twitter:image:alt"   content={`${SITE_NAME} — THE EXPERT SOLUTIONS™`} />

      {/* ── Geo / Local SEO ── */}
      <meta name="geo.region"          content="IN-MH" />
      <meta name="geo.placename"       content="Pune, Maharashtra" />
      <meta name="geo.position"        content="18.7411;73.9100" />
      <meta name="ICBM"                content="18.7411, 73.9100" />

      {/* ── JSON-LD Schemas ── */}
      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema, null, 0)}
        </script>
      ))}
    </Helmet>
  )
}

// ── Exported schema builders for use in pages ────────────────────
export {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbSchema,
}
