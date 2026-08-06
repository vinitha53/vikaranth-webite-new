import Link from "next/link";
import { products } from "../data/catalog";
import { DetailHeader, DetailFooter, styles } from "../components/DetailChrome";

const siteUrl = "https://www.vikranthchem.com";

export const metadata = {
  title: "Food Ingredients in Chennai & India | Vikranth",
  description: "Browse B2B food ingredients for bakery, chocolate, dairy, beverage and manufacturing. Enquire from Chennai for bulk supply across India.",
  keywords: ["food ingredients supplier Chennai", "B2B food ingredients India", "bulk food ingredients", "food ingredients distributor Chennai"],
  alternates: { canonical: "/products/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: "/products/", title: "Food Ingredients in Chennai & India | Vikranth", description: "Browse Vikranth's B2B food ingredient portfolio for professional production.", siteName: "Vikranth Chemical Corporation", locale: "en_IN" },
};

export default function ProductsPage() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", url: `${siteUrl}/products/`, name: "Food Ingredients in Chennai and India", about: { "@id": `${siteUrl}/#organization` }, mainEntity: { "@type": "ItemList", itemListElement: products.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${siteUrl}/products/${item.slug}` })) } };
  return <main className={styles.page}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><DetailHeader /><section className={styles.hero}><div className={styles.heroCopy}><small>Complete ingredient portfolio</small><h1>Food Ingredients for Professional Production</h1><p>Explore individual product pages with application guidance, common buyer questions, sourcing information and documentation support.</p></div></section><div className={styles.content}><section className={styles.productGrid}>{products.map((item) => <Link className={styles.productCard} href={`/products/${item.slug}`} key={item.slug}><img src={item.image} alt={`${item.name} food ingredient`} /><div><h3>{item.name}</h3><p>{item.category} →</p></div></Link>)}</section></div><DetailFooter /></main>;
}
