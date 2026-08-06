import Link from "next/link";
import { partners } from "../data/partners";
import { DetailHeader, DetailFooter, styles } from "../components/DetailChrome";

const siteUrl = "https://www.vikranthchem.com";

export const metadata = {
  title: "Food Ingredient Partners & Brands | Vikranth Chennai",
  description: "Explore food ingredient partner and brand pages, products and applications. Enquire through Vikranth Chennai for documents, samples and India supply.",
  keywords: ["food ingredient brands India", "food ingredient partners Chennai", "ingredient manufacturers and suppliers", "Vikranth associates"],
  alternates: { canonical: "/associates/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: "/associates/", title: "Food Ingredient Partners & Brands | Vikranth", description: "Explore partner-specific ingredients and B2B enquiry routes.", siteName: "Vikranth Chemical Corporation", locale: "en_IN" },
};

export default function AssociatesPage() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", url: `${siteUrl}/associates/`, name: "Food Ingredient Partners and Brands", about: { "@id": `${siteUrl}/#organization` }, mainEntity: { "@type": "ItemList", itemListElement: partners.map((partner, index) => ({ "@type": "ListItem", position: index + 1, name: partner.name, url: `${siteUrl}/associates/${partner.slug}` })) } };
  return <main className={styles.page}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><DetailHeader /><section className={styles.hero}><div className={styles.heroCopy}><small>Our ingredient network</small><h1>Partner Ingredient Solutions</h1><p>Explore partner-specific products, applications, buyer FAQs and a local Chennai enquiry route supporting business requirements across India.</p></div></section><div className={styles.content}><section className={styles.partnerGrid}>{partners.map((partner) => <Link href={`/associates/${partner.slug}`} className={styles.partnerTile} key={partner.slug}><div>{partner.logo ? <img src={partner.logo} alt={`${partner.name} logo`} /> : <b>Anchor</b>}</div><h2>{partner.name}</h2><p>{partner.summary}</p><span>Explore partner →</span></Link>)}</section></div><DetailFooter /></main>;
}
