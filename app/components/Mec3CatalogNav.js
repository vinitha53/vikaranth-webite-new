import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mec3Categories, mec3ProductCount } from "../data/mec3-catalog";
import styles from "./mec3-catalog.module.css";

export default function Mec3CatalogNav() {
  return <section className={styles.navigator} aria-labelledby="mec3-catalog-title">
    <div className={styles.navigatorBrand}>
      <span className={styles.logoPlate}><Image src="/brand-logos/mec3-seo.webp" width={150} height={82} alt="MEC3 logo" /></span>
      <div><small>Premium ice cream</small><h3 id="mec3-catalog-title">Explore the MEC3 catalogue</h3><p>Select a range to open its dedicated product table with item codes and pack sizes.</p></div>
      <span className={styles.total}><strong>{mec3ProductCount}</strong> catalogue products</span>
    </div>
    <nav className={styles.rangeGrid} aria-label="MEC3 product ranges">
      {mec3Categories.map((item, index) => <Link href={`/associates/delta-nutritives/mec3/${item.slug}`} key={item.slug}>
        <span className={styles.rangeNumber}>{String(index + 1).padStart(2, "0")}</span>
        <span><small>{item.eyebrow}</small><strong>{item.title}</strong><em>{item.products.length} {item.products.length === 1 ? "product" : "products"}</em></span>
        <ArrowRight aria-hidden="true" />
      </Link>)}
    </nav>
  </section>;
}
