import "./globals.css";
import "./sections.css";

const siteUrl = "https://www.vikranthchem.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Food Ingredients Supplier in Chennai, India | Vikranth",
  description: "Vikranth supplies bakery, chocolate, dairy, beverage and specialty food ingredients to manufacturers, bakeries and food businesses across India.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
      url: siteUrl,
      logo: `${siteUrl}/logo-vikranth.png`,
      description: "Vikranth Chemical Corporation imports, distributes and supplies food ingredients and specialty chemicals to manufacturers across India.",
      telephone: "+91-87544-42924",
      email: "vikranth.chemicals@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Saraswathy Enclave, Plot No. I & II, 4th Floor, Perambur–Redhills High Road, Secretariat Colony Main Road, Lakshmipuram, Kolathur",
        addressLocality: "Chennai",
        postalCode: "600099",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Vikranth Chemical Corporation",
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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        ["Which food ingredients does Vikranth supply?", "Vikranth supplies bakery, cocoa, chocolate, dairy, beverage, protein, sweetener, starch, stabilizer and specialty food ingredients for B2B requirements."],
        ["Do you supply food ingredients outside Chennai?", "Vikranth is based in Chennai and supports business enquiries from different locations. Share your delivery city and quantity so the team can confirm availability and supply options."],
        ["Can you help us select the right ingredient?", "Yes. Share your application, expected function, required grade and quantity. The team can help identify suitable product options for evaluation."],
        ["Can we request product specifications or certificates?", "Product specifications and supporting documents can be requested. Availability depends on the selected ingredient and manufacturer."],
        ["Do you support bulk ingredient requirements?", "Yes. Vikranth primarily supports manufacturers, bakeries, food processors and other professional buyers. Mention your approximate quantity when requesting a quotation."],
        ["What information is needed for a quotation?", "Provide the ingredient name, grade or application, required quantity, delivery location, company name and contact information."],
      ].map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    },
  ];

  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
