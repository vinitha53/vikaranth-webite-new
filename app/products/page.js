import { industries, products } from "../data/catalog";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import CoreSeoContent from "../components/CoreSeoContent";
import { coreContent } from "../data/core-content";
import ProductsCatalog from "./ProductsCatalog";

const siteUrl = "https://www.vikranthchemicalcorporation.com";

export const metadata = {
  title: "Food Ingredient Products in Chennai & India | Vikranth",
  description: "Browse bakery, cocoa, dairy, beverage, hydrocolloid, sweetener, starch, protein, emulsifier, preservative and acidulant ingredients.",
  alternates: { canonical: "/products/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: "/products/", title: "Food Ingredient Products in Chennai & India | Vikranth", description: "Browse Vikranth's B2B food ingredient catalogue by product family and application.", siteName: "Vikranth Chemical Corporation", locale: "en_IN" },
};

export default function ProductsPage() {
  const schema = [{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${siteUrl}/products/`,
    name: "Food Ingredient Products for Commercial Manufacturing",
    description: "A category-led directory of food ingredients available for B2B enquiry through Vikranth Chemical Corporation.",
    about: { "@id": `${siteUrl}/#organization` },
    mainEntity: { "@type": "ItemList", numberOfItems: industries.length, itemListElement: industries.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${siteUrl}/industries/${item.slug}/` })) },
  }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products/` }] }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: coreContent.products.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }];
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><DetailHeader /><ProductsCatalog><CoreSeoContent content={coreContent.products} compact /></ProductsCatalog><DetailFooter /></main>;
}
