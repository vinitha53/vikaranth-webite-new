import "./globals.css";
import "./sections-v2.css";
import "./responsive.css";
import FloatingIconDock from "./components/FloatingIconDock";
import GlobalCocoaGuide from "./components/GlobalCocoaGuide";

const siteUrl = "https://www.vikranthchem.com";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf8f3",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Food Ingredients Supplier in Chennai & India | Vikranth",
  description: "Source bakery, chocolate, dairy, beverage and specialty food ingredients from Vikranth in Chennai. Enquire for bulk supply and product documents.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: "/",
    title: "Food Ingredients Supplier in Chennai & India | Vikranth",
    description: "Source bakery, chocolate, dairy, beverage and specialty food ingredients from Vikranth in Chennai.",
    siteName: "Vikranth Chemical Corporation",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Food Ingredients Supplier in Chennai & India | Vikranth",
    description: "Source bakery, chocolate, dairy, beverage and specialty food ingredients from Vikranth in Chennai.",
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
      logo: `${siteUrl}/logo-vikranth.webp`,
      description: "Vikranth Chemical Corporation is a Chennai-based B2B supplier of bakery, chocolate, dairy, beverage and specialty food ingredients.",
      taxID: "33AADFV9327N1ZO",
      telephone: "+91-87544-42924",
      email: "vikranth.chemicals@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Saraswathy Enclave, Plot No. I & II, 4th Floor, Perambur-Redhills High Road, Secretariat Colony Main Road, Lakshmipuram, Kolathur",
        addressLocality: "Chennai",
        postalCode: "600099",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
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
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <GlobalCocoaGuide />
        <FloatingIconDock />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}


