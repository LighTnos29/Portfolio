import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://lightnos.dev'
const DEFAULT_TITLE = 'Udit Agrawal | Full Stack Developer — Lightnos.dev'
const DEFAULT_DESC = 'Full-stack developer and MERN Stack specialist with 3+ years of experience. Building scalable systems and shipping products that move fast.'
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Udit Agrawal',
  url: SITE_URL,
  jobTitle: 'Full Stack Developer',
  description: DEFAULT_DESC,
  sameAs: [
    'https://github.com/LighTnos29',
    'https://www.linkedin.com/in/udit-agrawal-141292276/',
  ],
  knowsAbout: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Python', 'MERN Stack'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lightnos.dev',
  url: SITE_URL,
  description: DEFAULT_DESC,
  author: { '@type': 'Person', name: 'Udit Agrawal' },
}

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image = DEFAULT_OG,
  url = SITE_URL,
  type = 'website',
}) => {
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const canonicalUrl = url || SITE_URL

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Udit Agrawal" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Lightnos.dev" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@LighTnos29" />
      <meta name="twitter:creator" content="@LighTnos29" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  )
}

export default SEO
