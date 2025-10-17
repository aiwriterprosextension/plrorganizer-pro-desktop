import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  keywords?: string[];
  image?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: object;
}

export default function SEO({
  title,
  description,
  canonical,
  type = "website",
  keywords = [],
  image = "https://storage.googleapis.com/gpt-engineer-file-uploads/9Bn48JBTFTNmtKGIvwbqCQxCWzs1/social-images/social-1760243917846-plr_organizer_og_image.png",
  article,
  structuredData
}: SEOProps) {
  const location = useLocation();
  const baseUrl = "https://plrorganizerpro.lovable.app";
  const fullCanonical = canonical || `${baseUrl}${location.pathname}`;
  const fullTitle = title.includes("PLR Organizer Pro") ? title : `${title} | PLR Organizer Pro`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PLR Organizer Pro",
    "url": baseUrl,
    "description": "The most powerful PLR content management system for organizing, tracking, and monetizing your Private Label Rights content.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="PLR Organizer Pro" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@plrorganizer" />
      <meta name="twitter:creator" content="@plrorganizer" />

      {/* Article specific meta tags */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="PLR Organizer Pro" />
    </Helmet>
  );
}
