"use client";

import { useMemo, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import styles from "./range-catalog.module.css";

const brandLogos = {
  Callebaut: "/brand-logos/callebaut.png",
  "Cacao Barry": "/brand-logos/cacao-barry.png",
  "Molino Dallagiovanna": "/brand-logos/molino-dallagiovanna.png",
  "DLA Naturals": "/brand-logos/dla-naturals.png",
  MEC3: "/brand-logos/mec3.png",
  "Elle & Vire Professionnel": "/brand-logos/elle-vire.png",
  Corman: "/brand-logos/corman.png",
  DIRA: "/brand-logos/dira.png",
  Switz: "/brand-logos/switz.png",
  ARYZTA: "/brand-logos/aryzta.png",
  Pernigotti: "/brand-logos/pernigotti.png",
  Sosa: "/brand-logos/sosa-clean.png",
  Celebre: "/brand-logos/celebre.png",
  "CSM / Ulmer Spatz": "/brand-logos/csm-clean.png",
};

export default function RangeCatalog({ products, indianNames = [], supplierMode = false, categoryField = "usageCategory" }) {
  const normalized = useMemo(() => products.map(product => ({ ...product, range: product.range || (indianNames.includes(product.name) ? "indian" : "imported") })), [products, indianNames]);
  const ranges = ["indian", "imported"].filter(range => normalized.some(product => product.range === range));
  const [active, setActive] = useState(ranges[0] || "indian");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openGroups, setOpenGroups] = useState({});
  const inRange = normalized.filter(product => product.range === active);
  const categoryFor = product => product[categoryField] || product.usageCategory || product.category;
  const categories = [...new Set(inRange.map(categoryFor).filter(Boolean))];
  const visible = activeCategory === "all" ? inRange : inRange.filter(product => categoryFor(product) === activeCategory);
  const visibleGroups = activeCategory === "all"
    ? categories.map(category => ({ category, products: visible.filter(product => categoryFor(product) === category) }))
    : [{ category: activeCategory, products: visible }];
  const selectRange = range => { setActive(range); setActiveCategory("all"); };
  const rangeLabel = active === "indian" ? "Indian" : "imported";
  const collapseInPlace = (event, groupKey) => {
    const section = event.currentTarget.closest("section");
    const viewportAnchor = section?.nextElementSibling || section;
    const anchorTop = viewportAnchor?.getBoundingClientRect().top;
    flushSync(() => setOpenGroups(current => ({ ...current, [groupKey]: false })));
    if (viewportAnchor && Number.isFinite(anchorTop)) {
      const positionChange = viewportAnchor.getBoundingClientRect().top - anchorTop;
      if (positionChange) window.scrollBy({ top: positionChange, behavior: "auto" });
    }
  };
  if (!ranges.length) return null;

  return <div className={styles.catalog} data-range-catalog>
    {ranges.length === 2 && <div className={styles.tabs} role="tablist" aria-label="Product origin range">
      <button type="button" role="tab" aria-selected={active === "indian"} onClick={() => selectRange("indian")}>Indian Range <small>Celebre</small></button>
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
    <div className={styles.groups} key={`${active}-${activeCategory}`}>{visibleGroups.map((group, groupIndex) => {
      const headingId = `range-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      const contentId = `${headingId}-products`;
      const groupKey = `${active}:${group.category}`;
      const isOpen = openGroups[groupKey] ?? groupIndex === 0;
      return <section className={styles.group} key={group.category} aria-labelledby={headingId}>
        <button className={styles.groupHeading} type="button" aria-expanded={isOpen} aria-controls={contentId} onClick={() => setOpenGroups(current => ({ ...current, [groupKey]: !isOpen }))}>
          <span className={styles.groupTitle}><i aria-hidden="true">{String(groupIndex + 1).padStart(2, "0")}</i><span><small>Ingredient collection</small><strong id={headingId}>{group.category}</strong></span></span>
          <span className={styles.groupMeta}><span><b>{group.products.length}</b> {group.products.length === 1 ? "product" : "products"}</span><i className={styles.groupChevron} aria-hidden="true" /></span>
        </button>
        <div className={styles.groupContent} id={contentId} hidden={!isOpen}>
          <p className={styles.groupIntroduction}>Explore {group.products.length} professional {group.category.toLowerCase()} {group.products.length === 1 ? "ingredient" : "ingredients"}. Open a product for sourcing, pack, specification and enquiry details.</p>
          <div className={styles.grid}>{group.products.map((product, productIndex) => <Link className={styles.card} href={`/products/${product.slug}`} key={product.slug}>
            <div className={styles.image}>
              <img src={product.image} alt={`${product.name} by ${product.brand || "Vikranth"}`} loading="lazy"/>
              {brandLogos[product.brand]
                ? <span className={styles.brandLogoBadge} title={product.brand} style={{ "--brand-float-delay": `${(productIndex % 6) * -0.32}s` }}><img src={brandLogos[product.brand]} alt={`${product.brand} logo`} loading="lazy"/></span>
                : <span>{product.brand || (active === "indian" ? "Indian range" : "Imported range")}</span>}
            </div>
            <div><small>{categoryFor(product)}</small><h3>{product.name}</h3>{product.packs && <p>{product.packs}</p>}<b>Explore product <i>→</i></b></div>
          </Link>)}</div>
          <button className={styles.collapseButton} type="button" onClick={event => collapseInPlace(event, groupKey)}>Collapse {group.category}<span aria-hidden="true">↑</span></button>
        </div>
      </section>;
    })}</div>
    {supplierMode && <p className={styles.note}>Only products matched to the approved supplier catalogue are shown. Grade, pack and availability are confirmed per enquiry.</p>}
  </div>;
}
