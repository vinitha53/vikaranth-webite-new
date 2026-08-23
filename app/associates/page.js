import { partners } from "../data/partners";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import AssociatesClient from "./AssociatesClient";

const siteUrl = "https://www.vikranthchem.com";
const canonicalUrl = `${siteUrl}/associates/`;

export const metadata = {
  title: "Food Ingredient Manufacturers & Suppliers | Vikranth",
  description: "Explore ingredient manufacturers and product portfolios available for enquiry through Vikranth. Relationship details are confirmed per brand.",
  keywords: ["food ingredient supplier Chennai", "food ingredient distributor India", "CAMPCO supplier Chennai", "Döhler distributor India", "Roquette supplier India", "CP Kelco distributor Chennai", "Nitta Gelatin supplier Chennai", "bakery ingredient supplier Pan India", "cocoa powder supplier Chennai", "hydrocolloid supplier India", "starch derivative supplier India", "food emulsifier supplier Chennai"],
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", url: canonicalUrl,
    title: "Food Ingredient Manufacturer & Supplier Portfolios | Vikranth",
    description: "Explore 12 ingredient portfolios available for enquiry through Vikranth. Request current product information, documents and B2B pricing.",
    siteName: "Vikranth Chemical Corporation", locale: "en_IN",
    images: [{ url: "/ingredient-portfolio.png", alt: "Vikranth food ingredient partner network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Ingredient Manufacturer & Supplier Portfolios | Vikranth",
    description: "Browse manufacturer and supplier portfolios for bakery, chocolate, dairy, beverage and specialty food ingredient enquiries.",
    images: ["/ingredient-portfolio.png"],
  },
};

const faqs = [
  { question: "Can I enquire about CAMPCO ingredients through Vikranth?", answer: "Yes. Vikranth accepts enquiries for listed CAMPCO cocoa and chocolate ingredients. Ask the team to confirm the current product, grade, availability and applicable commercial relationship before purchase." },
  { question: "Does Vikranth handle enquiries outside Chennai?", answer: "Vikranth is based in Chennai and accepts B2B enquiries from other Indian locations. Delivery coverage, freight and lead time are confirmed for the specific product, quantity and destination." },
  { question: "Which manufacturer portfolios can I enquire about?", answer: "The directory currently presents 12 ingredient portfolios. A listing or logo does not by itself claim an authorised distributorship; relationship type, territory, product range and availability are confirmed against current information." },
  { question: "How do I request a sample or SDS (Safety Data Sheet) from Vikranth?", answer: "You can request samples, spec sheets or SDS documents by calling +91 87544 42924, emailing vikranth.chemicals@gmail.com, or submitting an enquiry through the Request a Quote form on this page." },
  { question: "Is there a minimum order quantity for bulk ingredient orders?", answer: "Minimum order quantities vary by product and brand. Share your requirement through the enquiry form or WhatsApp and our team will confirm pricing and MOQ for your specific ingredient." },
  { question: "Which industries can submit ingredient enquiries?", answer: "Vikranth supports enquiries from bakery, chocolate and confectionery, dairy, beverage, ice cream and other professional food-processing businesses." },
  { question: "How can I contact Vikranth Chemical Corporation directly?", answer: "Call +91 87544 42924, email vikranth.chemicals@gmail.com, or visit our facility at Saraswathy Enclave, Lakshmipuram, Kolathur, Chennai — 600099." },
];

export default function AssociatesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${canonicalUrl}#webpage`,
      name: "Ingredient Manufacturers and Supplier Portfolios", url: canonicalUrl,
      description: metadata.description, about: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Suppliers", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "ItemList", name: "Manufacturer and supplier portfolios available for enquiry", numberOfItems: partners.length,
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
