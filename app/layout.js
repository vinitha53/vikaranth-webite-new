import "./globals.css";
import "./sections-v2.css";
import FloatingIconDock from "./components/FloatingIconDock";

const siteUrl = "https://www.vikranthchem.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Food Ingredients Supplier in Chennai, India | Vikranth",
  description: "Vikranth supplies bakery, chocolate, dairy, beverage and specialty food ingredients to manufacturers, bakeries and food businesses across India.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: "/",
    title: "Food Ingredients Supplier in Chennai, India | Vikranth",
    description: "Bakery, chocolate, dairy, beverage and specialty food ingredients for professional buyers across India.",
    siteName: "Vikranth Chemical Corporation",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Food Ingredients Supplier in Chennai, India | Vikranth",
    description: "Bakery, chocolate, dairy, beverage and specialty food ingredients for professional buyers across India.",
  },
};

export default function RootLayout({ children }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "Vikranth Chemical Corporation",
      alternateName: ["Vikranth Chemicals", "VCC Chennai"],
      url: siteUrl,
      logo: `${siteUrl}/logo-vikranth.png`,
      description: "Vikranth Chemical Corporation imports, distributes and supplies food ingredients and specialty chemicals to manufacturers across India.",
      telephone: "+91-87544-42924",
      email: "vikranth.chemicals@gmail.com",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Saraswathy Enclave, Plot No. I & II, 4th Floor, Perambur-Redhills High Road, Secretariat Colony Main Road, Lakshmipuram, Kolathur",
          addressLocality: "Chennai",
          postalCode: "600099",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Plot No. 2, Sri Sai Ram Street, 1st Floor, Jyothi Nagar, Ponnimmanmedu",
          addressLocality: "Chennai",
          postalCode: "600110",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      ],
      sameAs: [
        "https://in.linkedin.com/company/vikranth-chemical-corporation",
        "https://www.facebook.com/search/top?q=Vikranth%20Chemical%20Corporation",
        "https://www.instagram.com/explore/search/keyword/?q=vikranth%20chemical%20corporation",
      ],
      knowsAbout: ["Bakery ingredients", "Chocolate ingredients", "Dairy ingredients", "Beverage ingredients", "Hydrocolloids", "Food additives", "Nutraceutical ingredients"],
      contactPoint: [
        { "@type": "ContactPoint", telephone: "+91-87544-42924", contactType: "sales", areaServed: "IN", availableLanguage: ["en", "ta"] },
        { "@type": "ContactPoint", telephone: "+91-97909-20252", contactType: "customer service", areaServed: "IN", availableLanguage: ["en", "ta"] },
      ],      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Vikranth Chemical Corporation",
      alternateName: ["Vikranth Chemicals", "VCC Chennai"],
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }],
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <FloatingIconDock />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}


