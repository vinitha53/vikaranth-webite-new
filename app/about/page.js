import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import AboutStory from "./AboutStory";

const faq = [
  ["What does Vikranth Chemical Corporation supply?", "We supply and distribute food ingredients and specialty ingredients for bakery, chocolate, dairy, beverages, ice cream, jams, nutraceutical and pharmaceutical applications."],
  ["Where does Vikranth supply?", "We are based in Chennai and support professional buyers across India, with a strong network across South India."],
  ["Can I request samples or product documents?", "Yes. Share the application, product requirement, quantity and delivery location so our team can advise on available samples, specifications and next steps."],
  ["How do I contact Vikranth for a quotation?", "Use the Request a Quote link or contact our Chennai team with your ingredient requirement and commercial details."],
];

export const metadata = {
  title: "About Vikranth Chemical Corporation | Food Ingredient Supplier in Chennai",
  description: "Learn how Vikranth Chemical Corporation supplies bakery, chocolate, dairy, beverage, nutraceutical and pharmaceutical ingredients from Chennai to food businesses across India.",
  keywords: ["food ingredient supplier Chennai", "food ingredients distributor India", "bakery ingredients supplier", "chocolate ingredients supplier", "Vikranth Chemical Corporation"],
  alternates: { canonical: "/about/" },
  openGraph: { title: "About Vikranth Chemical Corporation", description: "A Chennai-based food ingredient partner supporting manufacturers and professional buyers across India.", type: "website", url: "/about/" },
  twitter: { card: "summary", title: "About Vikranth Chemical Corporation", description: "Food ingredient sourcing and distribution support from Chennai." },
};

export default function AboutPage() {
  const structuredData = [
    { "@context": "https://schema.org", "@type": "AboutPage", name: "About Vikranth Chemical Corporation", description: metadata.description, url: "https://www.vikranthchem.com/about/", mainEntity: { "@id": "https://www.vikranthchem.com/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.vikranthchem.com/" }, { "@type": "ListItem", position: 2, name: "About", item: "https://www.vikranthchem.com/about/" }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question,answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  return <main><DetailHeader/><AboutStory/><DetailFooter/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}/></main>;
}