import "./globals.css";
import "./responsive.css";
import DeferredGlobalWidgets from "./components/DeferredGlobalWidgets";
import WebVitals from "./components/WebVitals";

const siteUrl = "https://www.vikranthchemicalcorporation.com";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf8f3",
  colorScheme: "light",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Food Ingredients Supplier in Chennai | Vikranth Chemical",
  description: "Vikranth Chemical Corporation supplies bakery, chocolate, dairy, beverage and food-additive ingredients across India. Request a quote today.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: "/",
    title: "Food Ingredients Supplier in Chennai | Vikranth Chemical",
    description: "Vikranth Chemical Corporation supplies bakery, chocolate, dairy, beverage and food-additive ingredients across India. Request a quote today.",
    images: [{ url: "/hero-chocolate-poster.jpg", width: 1920, height: 1080, alt: "Bakery, chocolate, dairy and beverage food ingredients supplied by Vikranth Chemical Corporation in Chennai" }],
    siteName: "Vikranth Chemical Corporation",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Ingredients Supplier in Chennai | Vikranth Chemical",
    description: "Vikranth Chemical Corporation supplies bakery, chocolate, dairy, beverage and food-additive ingredients across India. Request a quote today.",
    images: ["/hero-chocolate-poster.jpg"],
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
      description: "Vikranth Chemical Corporation is a Chennai-based supplier and distributor of bakery, chocolate, confectionery, dairy, beverage, ice cream, fruit-processing, hydrocolloid, sweetener, functional, nutraceutical and food-additive ingredients for professional buyers.",
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
      ],
      knowsAbout: ["Bakery ingredients", "Chocolate ingredients", "Dairy ingredients", "Beverage ingredients", "Hydrocolloids", "Food additives", "Nutraceutical ingredients"],
      contactPoint: [
        { "@type": "ContactPoint", telephone: "+91-87544-42924", contactType: "sales", areaServed: "IN", availableLanguage: ["en", "ta"] },
        { "@type": "ContactPoint", telephone: "+91-97909-20252", contactType: "customer service", areaServed: "IN", availableLanguage: ["en", "ta"] },
      ],
      areaServed: [{ "@type": "City", name: "Chennai" }, { "@type": "Country", name: "India" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Vikranth Chemical Corporation",
      alternateName: ["Vikranth Chemicals", "VCC Chennai"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <DeferredGlobalWidgets />
        <WebVitals />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
