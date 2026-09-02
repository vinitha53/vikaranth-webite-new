import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import { aboutFaqs } from "../data/about-content";
import AboutStory from "./AboutStory";

const siteUrl = "https://www.vikranthchemicalcorporation.com";
const canonicalUrl = siteUrl + "/about/";

export const metadata = {
  title: "About Vikranth | Food Ingredient Supplier in Chennai",
  description: "Learn about Vikranth Chemical Corporation, a Chennai-based B2B supplier and distributor of bakery, chocolate, dairy, beverage and specialty ingredients.",
  alternates: { canonical: canonicalUrl },
  openGraph: { title: "About Vikranth Chemical Corporation | Chennai", description: "Meet the Chennai-based team supporting B2B ingredient sourcing across bakery, chocolate, dairy, beverage and specialty food applications.", type: "website", url: canonicalUrl, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: "/about-overview.webp", alt: "Food ingredients prepared for commercial sourcing review" }] },
  twitter: { card: "summary_large_image", title: "About Vikranth Chemical Corporation | Chennai", description: "Meet the Chennai-based team supporting B2B ingredient sourcing across bakery, chocolate, dairy, beverage and specialty food applications.", images: ["/about-overview.webp"] }
};

export default function AboutPage() {
  const structuredData = [
    { "@context": "https://schema.org", "@type": "AboutPage", "@id": canonicalUrl + "#webpage", name: "About Vikranth Chemical Corporation", description: metadata.description, url: canonicalUrl, isPartOf: { "@id": siteUrl + "/#website" }, mainEntity: { "@id": siteUrl + "/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: "About", item: canonicalUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: aboutFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }
  ];
  return <main><DetailHeader /><AboutStory /><DetailFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></main>;
}