import Link from "next/link";
import { industries } from "../data/catalog";
import { DetailHeader, DetailFooter, styles } from "../components/DetailChrome";

const siteUrl = "https://www.vikranthchem.com";

export const metadata = {
  title: "Food Ingredient Industries in Chennai & India | Vikranth",
  description: "Explore B2B ingredient solutions for bakery, chocolate, dairy, beverages, ice cream and food manufacturing from Chennai across India.",
  keywords: ["food ingredient industries", "food manufacturing ingredients Chennai", "B2B food ingredients India", "bakery ingredients Chennai"],
  alternates: { canonical: "/industries/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: "/industries/", title: "Food Ingredient Industries | Vikranth", description: "Ingredient solutions by food application and industry.", siteName: "Vikranth Chemical Corporation", locale: "en_IN" },
};

export default function IndustriesPage() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", url: `${siteUrl}/industries/`, name: "Food Ingredient Industries", about: { "@id": `${siteUrl}/#organization` }, mainEntity: { "@type": "ItemList", itemListElement: industries.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${siteUrl}/industries/${item.slug}` })) } };
  return <main className={styles.page}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><DetailHeader /><section className={styles.hero}><div className={styles.heroCopy}><small>Industries we support</small><h1>Ingredient Solutions for Growing Food Businesses</h1><p>Choose an industry to explore relevant products, applications, FAQs and sourcing support for Chennai and Pan-India enquiries.</p></div></section><div className={styles.content}><section className={styles.productGrid}>{industries.map((item) => <Link className={styles.productCard} href={`/industries/${item.slug}`} key={item.slug}><img src={item.image} alt={`${item.name} solutions`} /><div><h3>{item.name}</h3><p>Explore solutions →</p></div></Link>)}</section></div><DetailFooter /></main>;
}
