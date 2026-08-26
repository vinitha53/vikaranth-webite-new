"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./range-catalog.module.css";

export default function RangeCatalog({ products, indianNames = [], supplierMode = false, categoryField = "usageCategory" }) {
  const normalized = useMemo(() => products.map(product => ({ ...product, range: product.range || (indianNames.includes(product.name) ? "indian" : "imported") })), [products, indianNames]);
  const ranges = ["indian", "imported"].filter(range => normalized.some(product => product.range === range));
  const [active, setActive] = useState(ranges[0] || "indian");
  const [activeCategory, setActiveCategory] = useState("all");
  const inRange = normalized.filter(product => product.range === active);
  const categoryFor = product => product[categoryField] || product.usageCategory || product.category;
  const categories = [...new Set(inRange.map(categoryFor).filter(Boolean))];
  const visible = activeCategory === "all" ? inRange : inRange.filter(product => categoryFor(product) === activeCategory);
  const visibleGroups = activeCategory === "all"
    ? categories.map(category => ({ category, products: visible.filter(product => categoryFor(product) === category) }))
    : [{ category: activeCategory, products: visible }];
  const selectRange = range => { setActive(range); setActiveCategory("all"); };
  const rangeLabel = active === "indian" ? "Indian" : "imported";
  if (!ranges.length) return null;

  return <div className={styles.catalog} data-range-catalog>
    {ranges.length === 2 && <div className={styles.tabs} role="tablist" aria-label="Product origin range">
      <button type="button" role="tab" aria-selected={active === "indian"} onClick={() => selectRange("indian")}>Indian Range <small>Celebré / CAMPCO</small></button>
      <button type="button" role="tab" aria-selected={active === "imported"} onClick={() => selectRange("imported")}>Imported Range <small>Delta international brands</small></button>
    </div>}
    <div className={styles.categorySection}>
      <div className={styles.filterHeading}><div><small>Browse by category</small><h3>Find the right ingredient category</h3></div><p>Select a catalogue category to quickly narrow {inRange.length} {rangeLabel.toLowerCase()} products.</p></div>
      <div className={styles.categoryRail} role="group" aria-label={`Filter ${rangeLabel.toLowerCase()} products by category`}>
        <button type="button" aria-pressed={activeCategory === "all"} onClick={() => setActiveCategory("all")}>All products <span>{inRange.length}</span></button>
        {categories.map(category => <button type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} key={category}>{category} <span>{inRange.filter(product => categoryFor(product) === category).length}</span></button>)}
      </div>
      <div className={styles.resultsSummary} aria-live="polite"><strong>{activeCategory === "all" ? `All ${rangeLabel.toLowerCase()} products` : activeCategory}</strong><span>{visible.length} {visible.length === 1 ? "ingredient" : "ingredients"}</span></div>
    </div>
    <div className={styles.groups} key={`${active}-${activeCategory}`}>{visibleGroups.map(group => {
      const headingId = `range-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      return <section className={styles.group} key={group.category} aria-labelledby={headingId}>
        <div className={styles.groupHeading}><h3 id={headingId}>{group.category}</h3><span>{group.products.length} {group.products.length === 1 ? "product" : "products"}</span></div>
        <div className={styles.grid}>{group.products.map(product => <Link className={styles.card} href={`/products/${product.slug}`} key={product.slug}>
          <div className={styles.image}><img src={product.image} alt={`${product.name} by ${product.brand || "Vikranth"}`} loading="lazy"/><span>{product.brand || (active === "indian" ? "Indian range" : "Imported range")}</span></div>
          <div><small>{categoryFor(product)}</small><h3>{product.name}</h3>{product.packs && <p>{product.packs}</p>}<b>Explore product <i>→</i></b></div>
        </Link>)}</div>
      </section>;
    })}</div>
    {supplierMode && <p className={styles.note}>Only products matched to the approved supplier catalogue are shown. Grade, pack and availability are confirmed per enquiry.</p>}
  </div>;
}
