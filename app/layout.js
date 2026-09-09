import "./globals.css";
import { business, serviceAreas } from "./data/business";
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
  title: "Food Ingredients Supplier Chennai | Pan-India | Vikranth",
  description: business.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: "/",
    title: "Food Ingredients Supplier Chennai | Pan-India | Vikranth",
    description: business.description,
    images: [{ url: "/hero-home-poster.webp", width: 1280, height: 720, alt: "Bakery, chocolate, dairy and beverage food ingredients supplied by Vikranth Chemical Corporation in Chennai" }],
    siteName: "Vikranth Chemical Corporation",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Ingredients Supplier Chennai | Pan-India | Vikranth",
    description: business.description,
    images: ["/hero-home-poster.webp"],
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
      description: business.description,
      taxID: "33AADFV9327N1ZO",
      telephone: "+91-98409-92985",
      email: "vikranth.chemicals@gmail.com",
      sameAs: [
        "https://in.linkedin.com/company/vikranth-chemical-corporation",
      ],
      knowsAbout: ["Bakery ingredients", "Chocolate ingredients", "Dairy ingredients", "Beverage ingredients", "Hydrocolloids", "Food additives", "Nutraceutical ingredients"],
      contactPoint: [
        { "@type": "ContactPoint", telephone: "+91-98409-92985", contactType: "general enquiries", areaServed: "IN", availableLanguage: ["en", "ta"] },
        { "@type": "ContactPoint", telephone: "+91-87544-29922", contactType: "Anchor products", areaServed: "IN", availableLanguage: ["en", "ta"] },
        { "@type": "ContactPoint", telephone: "+91-98410-68559", contactType: "Delta Nutritives", areaServed: "IN", availableLanguage: ["en", "ta"] },
        { "@type": "ContactPoint", telephone: "+91-87544-42924", contactType: "other brands", areaServed: "IN", availableLanguage: ["en", "ta"] },
      ],
      areaServed: serviceAreas,
      address: { "@type": "PostalAddress", streetAddress: "Plot No. 2, Sri Sai Ram Street, 1st Floor, Jyothi Nagar, Ponnimmanmedu", addressLocality: "Chennai", addressRegion: "Tamil Nadu", postalCode: "600110", addressCountry: "IN" },
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
