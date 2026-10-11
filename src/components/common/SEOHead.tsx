import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  /** Alias for `canonical` — several pages pass this name. */
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
  /** Alias for `structuredData` — several pages pass this name. */
  schemaJson?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Care International  Academy | UK Accredited Professional Education & Training",
  description = "Leading UK academy for accredited professional qualifications in Security (SIA), Construction (CSCS), Health & Social Care, Business Diplomas, and International University Pathways.",
  keywords,
  canonical,
  canonicalUrl,
  ogType = "website",
  ogImage = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
  structuredData,
  schemaJson,
}) => {
  const resolvedCanonical = canonical || canonicalUrl;
  const resolvedStructuredData = structuredData || schemaJson;
  const siteTitle = title.includes("Care International  Academy")
    ? title
    : `${title} | Care International  Academy UK`;
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://Care International academy.ac.uk";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={resolvedCanonical || currentUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Care International  Academy UK" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={resolvedCanonical || currentUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {resolvedStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(resolvedStructuredData)}
        </script>
      )}
    </Helmet>
  );
};
