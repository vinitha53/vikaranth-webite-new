import Link from "next/link";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import { corePages, industryPages, partnerPages, productPages } from "../data/site-urls";
import styles from "./site-map.module.css";

export const metadata = {
  title: "Complete Sitemap | Food Ingredient Supplier in Chennai",
  description: "Browse every Vikranth product, industry, supplier and company page for food ingredient sourcing in Chennai and across India.",
  alternates: { canonical: "/site-map/" },
};

const groups = [
  { title: "Main Pages", description: "Company, product, quotation and policy information.", links: corePages.filter(({ path }) => path !== "/site-map/") },
  { title: "Industries and Applications", description: "Ingredient solutions for professional food production.", links: industryPages },
  { title: "Manufacturers and Suppliers", description: "Explore ingredient portfolios available for enquiry.", links: partnerPages },
  { title: "Food Ingredient Products", description: "Individual product pages with applications and sourcing details.", links: productPages },
];

export default function SiteMapPage() {
  return (
    <main className={styles.page}>
      <DetailHeader />
      <section className={styles.hero}><div><span>Website directory</span><h1>Complete Sitemap</h1><p>Explore every food ingredient, industry, manufacturer and business information page published by Vikranth Chemical Corporation.</p></div></section>
      <section className={styles.content}>
        <div className={styles.summary}><strong>{groups.reduce((total, group) => total + group.links.length, 0)}</strong><span>crawlable website pages</span><p>Serving food businesses in Chennai, Tamil Nadu, South India and across India.</p></div>
        {groups.map((group) => <section className={styles.group} key={group.title}><header><h2>{group.title}</h2><p>{group.description}</p></header><div className={styles.links}>{group.links.map(({ path, label }) => <Link href={path} key={path}>{label}<span aria-hidden="true">→</span></Link>)}</div></section>)}
      </section>
      <DetailFooter />
    </main>
  );
}