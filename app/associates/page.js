import { partners } from "../data/partners";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import AssociatesClient from "./AssociatesClient";

const siteUrl = "https://www.vikranthchem.com";
const canonicalUrl = `${siteUrl}/associates/`;

export const metadata = {
  title: "Food Ingredient Suppliers in Chennai & Pan India | Authorized Partner Brands — Vikranth",
  description: "Vikranth supplies CAMPCO, Döhler, Roquette, CP Kelco and Nitta Gelatin food ingredients from Chennai to manufacturers across Pan India. Request samples and pricing.",
  keywords: ["food ingredient supplier Chennai", "food ingredient distributor India", "CAMPCO supplier Chennai", "Döhler distributor India", "Roquette supplier India", "CP Kelco distributor Chennai", "Nitta Gelatin supplier Chennai", "bakery ingredient supplier Pan India", "cocoa powder supplier Chennai", "hydrocolloid supplier India", "starch derivative supplier India", "food emulsifier supplier Chennai"],
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", url: canonicalUrl,
    title: "Authorized Food Ingredient Suppliers & Partner Brands in Chennai — Vikranth",
    description: "Explore 12 ingredient brands supplied by Vikranth across Chennai and Pan India. Request samples, documents and B2B pricing.",
    siteName: "Vikranth Chemical Corporation", locale: "en_IN",
    images: [{ url: "/ingredient-portfolio.png", alt: "Vikranth food ingredient partner network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Ingredient Suppliers Chennai | Pan India Distribution — Vikranth",
    description: "Supplier of CAMPCO, Döhler, Roquette, CP Kelco and more for bakery, chocolate, dairy and beverage manufacturers.",
    images: ["/ingredient-portfolio.png"],
  },
};

const faqs = [
  { question: "Who is the authorized supplier of CAMPCO ingredients in Chennai?", answer: "Vikranth Chemical Corporation, based in Kolathur, Chennai, is an authorized supplier and distributor of CAMPCO cocoa and chocolate ingredients for bakery, confectionery, dessert and beverage manufacturers." },
  { question: "Does Vikranth supply food ingredients only in Chennai, or Pan India?", answer: "Vikranth is based in Chennai but supplies bakery, chocolate, dairy and beverage ingredients to manufacturers across Tamil Nadu and Pan India, with dispatch handled from our Chennai facility." },
  { question: "What food ingredient brands does Vikranth Chemical Corporation distribute?", answer: "Vikranth distributes 12 brands including CAMPCO, Delta Nutritives, Roquette, Nitta Gelatin, Döhler, CP Kelco, Calpro Specialities, Gujarat Ambuja Exports, Fine Organics, Shree Gluco Biotech, Paramesu Biotech, and our in-house brand, Anchor." },
  { question: "How do I request a sample or SDS (Safety Data Sheet) from Vikranth?", answer: "You can request samples, spec sheets or SDS documents by calling +91 87544 42924, emailing vikranth.chemicals@gmail.com, or submitting an enquiry through the Request a Quote form on this page." },
  { question: "Is there a minimum order quantity for bulk ingredient orders?", answer: "Minimum order quantities vary by product and brand. Share your requirement through the enquiry form or WhatsApp and our team will confirm pricing and MOQ for your specific ingredient." },
  { question: "Is Vikranth Chemical Corporation MSME registered?", answer: "Yes, Vikranth Chemical Corporation is registered under Udyam (MSME registration UDYAM-TN-27-0145318), based in Chennai, Tamil Nadu." },
  { question: "Which industries does Vikranth supply ingredients to?", answer: "Vikranth supplies bakery, chocolate and confectionery, dairy, beverage and ice cream manufacturers, along with other food processing businesses across India." },
  { question: "How can I contact Vikranth Chemical Corporation directly?", answer: "Call +91 87544 42924, email vikranth.chemicals@gmail.com, or visit our facility at Saraswathy Enclave, Lakshmipuram, Kolathur, Chennai — 600099." },
];

export default function AssociatesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org", "@type": "Organization", "@id": `${siteUrl}/#organization`,
      name: "Vikranth Chemical Corporation", url: siteUrl, logo: `${siteUrl}/logo-vikranth.png`,
      telephone: "+91-87544-42924", email: "vikranth.chemicals@gmail.com",
      address: { "@type": "PostalAddress", streetAddress: "Saraswathy Enclave, Lakshmipuram, Kolathur", addressLocality: "Chennai", addressRegion: "Tamil Nadu", postalCode: "600099", addressCountry: "IN" },
      areaServed: ["Chennai", "Tamil Nadu", "India"],
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Suppliers", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "ItemList", name: "Food ingredient brands supplied by Vikranth", numberOfItems: partners.length,
      itemListElement: partners.map((partner, index) => ({ "@type": "ListItem", position: index + 1, name: partner.name, url: `${siteUrl}/associates/${partner.slug}/`, description: partner.summary })),
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <DetailHeader />
      <AssociatesClient partners={partners} faqs={faqs} />
      <DetailFooter />
    </main>
  );
}
