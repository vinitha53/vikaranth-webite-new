import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FileText, PackageCheck } from "lucide-react";
import { DetailFooter, DetailHeader } from "../../../../components/DetailChrome";
import { getMec3Category, mec3Categories } from "../../../../data/mec3-catalog";
import styles from "./mec3-range.module.css";

export function generateStaticParams() {
  return mec3Categories.map(({ slug }) => ({ slug: "delta-nutritives", range: slug }));
}

export async function generateMetadata({ params }) {
  const { range } = await params;
  const item = getMec3Category(range);
  if (!item) return {};
  const description = `${item.title} MEC3 products with item codes and pack sizes. Enquire through Vikranth Chemical Corporation in Chennai.`;
  return { title: `${item.title} - MEC3 Products | Vikranth`, description, alternates: { canonical: `/associates/delta-nutritives/mec3/${item.slug}/` } };
}

export default async function Mec3RangePage({ params }) {
  const { slug, range } = await params;
  if (slug !== "delta-nutritives") notFound();
  const item = getMec3Category(range);
  if (!item) notFound();
  const productDescription = item.slug === "granfrutta-range"
    ? "An innovative solution for creating quality gelato using the best of fruit with the convenience of a professional semi-finished product."
    : `A professional MEC3 ${item.title.toLowerCase()} ingredient. Confirm dosage, application, specification and current availability before use.`;

  return <main className={styles.page}>
    <DetailHeader />
    <section className={styles.hero}>
      <Image className={styles.heroImage} src="/mec3/mec3-catalog-hero.webp" fill priority sizes="100vw" alt="MEC3 artisan gelato range" />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroContent}>
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/associates/delta-nutritives">Delta Nutritives</Link><span>/</span><span>MEC3</span></nav>
        <Image src="/brand-logos/mec3.webp" width={178} height={96} alt="MEC3 logo" />
        <span className={styles.eyebrow}>{item.eyebrow}</span>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <a href="#product-table">View {item.products.length} products <ArrowRight /></a>
      </div>
    </section>

    <section className={styles.introduction}>
      <span className={styles.ribbon}>MEC3 - The genuine company</span>
      <div><small>The professional gelato collection</small><h2>{item.title}</h2><p>{item.description}</p></div>
      <aside><PackageCheck /><p>Item codes and pack sizes are taken from the Delta Imported Catalogue, June 2026. Technical suitability and availability are confirmed during enquiry.</p></aside>
    </section>

    <section className={styles.catalogue} id="product-table" aria-labelledby="table-title">
      <div className={styles.tableHeading}><div><span className={styles.eyebrow}>MEC3 catalogue</span><h2 id="table-title">{item.title} products</h2></div><span>{item.products.length} products</span></div>
      <div className={styles.tableWrap}>
        <table>
          <thead><tr><th>S.No</th><th>Product name</th><th>Description</th>{item.products.some(product => product.dosage) && <th>Dosage / ltr</th>}<th>Packing</th></tr></thead>
          <tbody>{item.products.map((product, index) => <tr key={`${product.code}-${product.name}`}><td data-label="S.No"><strong>{index + 1}</strong></td><td data-label="Product name">{product.name}</td><td data-label="Description">{productDescription}</td>{item.products.some(entry => entry.dosage) && <td data-label="Dosage / ltr">{product.dosage || "Confirm"}</td>}<td data-label="Packing">{product.pack}</td></tr>)}</tbody>
        </table>
      </div>
    </section>

    <section className={styles.selection}><div><FileText /><span><small>Need a specification or quotation?</small><strong>Share the item code, application and required quantity.</strong></span></div><Link href={`/contact#enquiry`}>Enquire for {item.title} <ArrowRight /></Link></section>

    <nav className={styles.rangeNav} aria-label="Other MEC3 ranges"><h2>Explore other MEC3 ranges</h2><div>{mec3Categories.filter(category => category.slug !== item.slug).map(category => <Link href={`/associates/delta-nutritives/mec3/${category.slug}`} key={category.slug}>{category.title}<ArrowRight /></Link>)}</div><Link className={styles.backLink} href="/associates/delta-nutritives#products"><ArrowLeft /> Back to Delta products</Link></nav>
    <DetailFooter />
  </main>;
}
