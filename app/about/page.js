import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import CoreSeoContent from "../components/CoreSeoContent";
import { coreContent } from "../data/core-content";
import AboutStory from "./AboutStory";

const faq = coreContent.about.faqs;

export const metadata = {
  title: "About Vikranth | Food Ingredient Supplier in Chennai",
  description: "Learn how Vikranth Chemical Corporation supports B2B food manufacturers with ingredient sourcing, documentation and commercial enquiry coordination.",
  keywords: ["food ingredient supplier Chennai", "food ingredients distributor India", "bakery ingredients supplier", "chocolate ingredients supplier", "Vikranth Chemical Corporation"],
  alternates: { canonical: "/about/" },
  openGraph: { title: "About Vikranth Chemical Corporation", description: "A Chennai ingredient-sourcing partner supporting professional food businesses.", type: "website", url: "/about/" },
  twitter: { card: "summary", title: "About Vikranth Chemical Corporation", description: "Food ingredient sourcing and distribution support from Chennai." },
};

export default function AboutPage() {
  const structuredData = [
    { "@context": "https://schema.org", "@type": "AboutPage", name: "About Vikranth Chemical Corporation", description: metadata.description, url: "https://www.vikranthchemicalcorporation.com/about/", mainEntity: { "@id": "https://www.vikranthchemicalcorporation.com/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.vikranthchemicalcorporation.com/" }, { "@type": "ListItem", position: 2, name: "About", item: "https://www.vikranthchemicalcorporation.com/about/" }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question,answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  return <main><DetailHeader/><AboutStory/><CoreSeoContent content={coreContent.about}/><DetailFooter/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}/></main>;
}
