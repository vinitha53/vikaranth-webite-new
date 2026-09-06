import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import { aboutFaqs } from "../data/about-content";
import AboutStory from "./AboutStory";

const siteUrl = "https://www.vikranthchemicalcorporation.com";
const canonicalUrl = siteUrl + "/about/";

export const metadata = {
  title: "About Vikranth | Pan-India Food Ingredient Distributor",
  description: "Vikranth is a Chennai food ingredient distributor, supplier and wholesaler serving B2B buyers across South India and serviceable locations Pan India.",
  alternates: { canonical: canonicalUrl },
  openGraph: { title: "Vikranth | Food Ingredient Distributor & Wholesaler", description: "Chennai-based B2B ingredient sourcing for buyers across South India and serviceable locations Pan India.", type: "website", url: canonicalUrl, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: "/about-distribution-sequence/ezgif-frame-300.webp", alt: "Food ingredient portfolio supplied by Vikranth Chemical Corporation" }] },
  twitter: { card: "summary_large_image", title: "Vikranth | Food Ingredient Distributor & Wholesaler", description: "Chennai-based B2B ingredient sourcing for buyers across South India and serviceable locations Pan India.", images: ["/about-distribution-sequence/ezgif-frame-300.webp"] }
};

export default function AboutPage() {
  const structuredData = [
    { "@context": "https://schema.org", "@type": "AboutPage", "@id": canonicalUrl + "#webpage", name: "About Vikranth Chemical Corporation", description: metadata.description, url: canonicalUrl, isPartOf: { "@id": siteUrl + "/#website" }, mainEntity: { "@id": siteUrl + "/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: "About", item: canonicalUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: aboutFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }
  ];
  return <main><DetailHeader /><AboutStory /><DetailFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></main>;
}
