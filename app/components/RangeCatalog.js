"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./range-catalog.module.css";

export default function RangeCatalog({ products, indianNames = [], supplierMode = false }) {
  const normalized = useMemo(() => products.map(product => ({ ...product, range: product.range || (indianNames.includes(product.name) ? "indian" : "imported") })), [products, indianNames]);
  const ranges = ["indian", "imported"].filter(range => normalized.some(product => product.range === range));
  const [active, setActive] = useState(ranges[0] || "indian");
  const [activeCategory, setActiveCategory] = useState("all");
  const inRange = normalized.filter(product => product.range === active);
  const categories = [...new Set(inRange.map(product => product.usageCategory || product.category).filter(Boolean))];
  const visible = activeCategory === "all" ? inRange : inRange.filter(product => (product.usageCategory || product.category) === activeCategory);
  const selectRange = range => { setActive(range); setActiveCategory("all"); };
  const rangeLabel = active === "indian" ? "Indian" : "imported";
  if (!ranges.length) return null;

  return <div className={styles.catalog} data-range-catalog>
    <div className={styles.tabs} data-single={ranges.length === 1 ? "true" : undefined} role="tablist" aria-label="Product origin range">
      <button type="button" role="tab" aria-selected={active === "indian"} onClick={() => selectRange("indian")}>Indian Range <small>Celebré / CAMPCO</small></button>
      <button type="button" role="tab" aria-selected={active === "imported"} onClick={() => selectRange("imported")}>Imported Range <small>Delta international brands</small></button>
    </div>
    <div className={styles.categorySection}>
      <div className={styles.filterHeading}><div><small>Browse by usage</small><h3>Find the right ingredient category</h3></div><p>Select an application category to quickly narrow {inRange.length} {rangeLabel.toLowerCase()} products.</p></div>
      <div className={styles.categoryRail} role="group" aria-label={`Filter ${rangeLabel.toLowerCase()} products by usage category`}>
        <button type="button" aria-pressed={activeCategory === "all"} onClick={() => setActiveCategory("all")}>All products <span>{inRange.length}</span></button>
        {categories.map(category => <button type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} key={category}>{category} <span>{inRange.filter(product => (product.usageCategory || product.category) === category).length}</span></button>)}
      </div>
      <div className={styles.resultsSummary} aria-live="polite"><strong>{activeCategory === "all" ? `All ${rangeLabel.toLowerCase()} products` : activeCategory}</strong><span>{visible.length} {visible.length === 1 ? "ingredient" : "ingredients"}</span></div>
    </div>
    <div className={styles.grid} key={`${active}-${activeCategory}`}>{visible.map(product => <Link className={styles.card} href={`/products/${product.slug}`} key={product.slug}>
      <div className={styles.image}><img src={product.image} alt={`${product.name} by ${product.brand || "Vikranth"}`} loading="lazy"/><span>{product.brand || (active === "indian" ? "Indian range" : "Imported range")}</span></div>
      <div><small>{product.usageCategory || product.category}</small><h3>{product.name}</h3>{product.packs && <p>{product.packs}</p>}<b>Explore product <i>→</i></b></div>
    </Link>)}</div>
    {supplierMode && <p className={styles.note}>Only products supported by the approved supplier catalog are shown. Grade, pack and availability are confirmed per enquiry.</p>}
  </div>;
}