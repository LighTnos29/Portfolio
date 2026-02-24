import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'Lightnos.dev — Udit Agrawal | Full Stack Developer',
  description = 'Full-stack developer and MERN Stack specialist with over 3 years of experience. Building scalable systems and shipping products that move fast.',
  image = '',
  url = '',
  type = 'website',
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const fullUrl = url || siteUrl
  const imageUrl = image
    ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
    : `${siteUrl}/og-image.jpg` // Default OG image if none provided

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  )
}

export default SEO
