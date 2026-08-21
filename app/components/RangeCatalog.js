"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./range-catalog.module.css";

export default function RangeCatalog({ products, indianNames = [], supplierMode = false }) {
  const normalized = useMemo(() => products.map(product => ({...product, range: product.range || (indianNames.includes(product.name) ? "indian" : "imported")})), [products, indianNames]);
  const ranges = ["indian", "imported"].filter(range => normalized.some(product => product.range === range));
  const [active, setActive] = useState(ranges[0] || "indian");
  const visible = normalized.filter(product => product.range === active);
  const brands = [...new Set(visible.map(product => product.brand || (active === "indian" ? "CAMPCO / Celebre" : "Imported portfolio")))];
  if (!ranges.length) return null;
  return <div className={styles.catalog} data-range-catalog>
    {ranges.length === 2 && <div className={styles.tabs} role="tablist" aria-label="Product origin range">
      <button type="button" role="tab" aria-selected={active === "indian"} onClick={() => setActive("indian")}>Indian Range <small>Celebré / CAMPCO</small></button>
      <button type="button" role="tab" aria-selected={active === "imported"} onClick={() => setActive("imported")}>Imported Range <small>Delta international brands</small></button>
    </div>}
    <div className={styles.brandRail} aria-label="Brands in selected range">{brands.map(brand => <strong key={brand}>{brand}</strong>)}</div>
    <div className={styles.grid} key={active}>{visible.map(product => <Link className={styles.card} href={`/products/${product.slug}`} key={product.slug}>
      <div className={styles.image}><img src={product.image} alt={`${product.name} by ${product.brand || "Vikranth"}`} loading="lazy"/><span>{product.brand || (active === "indian" ? "Indian range" : "Imported range")}</span></div>
      <div><small>{product.category}</small><h3>{product.name}</h3>{product.packs && <p>{product.packs}</p>}<b>Explore product <i>→</i></b></div>
    </Link>)}</div>
    {supplierMode && <p className={styles.note}>Only products supported by the approved supplier catalog are shown. Grade, pack and availability are confirmed per enquiry.</p>}
  </div>;
}
