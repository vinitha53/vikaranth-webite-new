"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, FileCheck2, Search, SlidersHorizontal, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./products.module.css";

const cocoaStages = [
  { name: "Cocoa bean", note: "The origin", image: "/contact/cocoa-bean-three-quarter.webp", className: styles.bean },
  { name: "Cocoa mass", note: "The foundation", image: "/partner-products/Campco/Cocoa Mass.webp", className: styles.mass },
  { name: "Choco paste", note: "The application", image: "/choco-paste-cutout.webp", className: styles.paste },
];

export default function ProductsCatalog({ categories, productCount, children }) {
  const rootRef = useRef(null);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCategories = useMemo(() => categories.map((category) => ({
    ...category,
    products: normalizedQuery ? category.products.filter((product) => `${product.name} ${category.name}`.toLowerCase().includes(normalizedQuery)) : category.products,
  })).filter((category) => category.products.length), [categories, normalizedQuery]);
  const resultCount = visibleCategories.reduce((total, category) => total + category.products.length, 0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      gsap.from(`.${styles.heroCopy} > *`, { opacity: 0, y: 26, duration: 0.75, stagger: 0.09, ease: "power3.out" });
      gsap.from(`.${styles.cocoaCard}`, { opacity: 0, y: 50, rotate: -3, duration: 0.9, stagger: 0.12, ease: "back.out(1.35)" });
      gsap.to(`.${styles.bean}`, { y: -30, rotate: 8, ease: "none", scrollTrigger: { trigger: `.${styles.cocoaStory}`, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      gsap.to(`.${styles.mass}`, { y: 22, rotate: -4, ease: "none", scrollTrigger: { trigger: `.${styles.cocoaStory}`, start: "top bottom", end: "bottom top", scrub: 0.9 } });
      gsap.to(`.${styles.paste}`, { y: -18, x: 12, ease: "none", scrollTrigger: { trigger: `.${styles.cocoaStory}`, start: "top bottom", end: "bottom top", scrub: 0.75 } });
      ScrollTrigger.batch(`.${styles.categorySection}`, { start: "top 86%", once: true, onEnter: (items) => gsap.fromTo(items, { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.72, stagger: 0.1, ease: "power3.out" }) });
    }, rootRef);
    return () => scope.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="products-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>B2B ingredient catalogue · Chennai</span>
          <h1 id="products-title">Food Ingredient Products for Commercial Manufacturing</h1>
          <p>Browse by product family, then enquire for the exact grade, source, quantity, pack size, current availability and product documents.</p>
          <div className={styles.heroActions}><a href="#catalogue">Browse {categories.length} categories <ArrowRight /></a><Link href="/contact#enquiry">Request product documents <FileCheck2 /></Link></div>
        </div>
        <div className={styles.cocoaStory} aria-label="From cocoa bean to cocoa ingredients">
          {cocoaStages.map((stage, index) => <article className={`${styles.cocoaCard} ${stage.className}`} key={stage.name}><span>{String(index + 1).padStart(2, "0")}</span><Image src={stage.image} width={300} height={260} sizes="(max-width: 760px) 42vw, 250px" alt={`${stage.name} ingredient`} priority={index === 0} /><div><small>{stage.note}</small><strong>{stage.name}</strong></div></article>)}
        </div>
      </section>

      <section className={styles.guidance} aria-label="Catalogue guidance"><SlidersHorizontal aria-hidden="true" /><div><strong>Choose by product family or search by ingredient.</strong><p>A listing is a catalogue reference, not a stock or suitability guarantee. Confirm the grade, specification and current commercial terms before ordering.</p></div><span>{productCount} ingredient pages</span></section>

      {children}

      <section className={styles.catalogue} id="catalogue" aria-labelledby="catalogue-title">
        <div className={styles.catalogueHead}><div><span className={styles.eyebrow}>Product categories</span><h2 id="catalogue-title">Find the right ingredient family</h2></div><label className={styles.searchBox}><Search aria-hidden="true" /><span className={styles.srOnly}>Search ingredients</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cocoa, pectin, starch..." />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear ingredient search"><X /></button>}</label></div>
        <nav className={styles.categoryNav} aria-label="Product category shortcuts">{categories.map((category, index) => <a href={`#${category.slug}`} key={category.slug}><span>{String(index + 1).padStart(2, "0")}</span>{category.name}</a>)}</nav>
        {query && <p className={styles.results} role="status">{resultCount} matching catalogue entries</p>}
        <div className={styles.categoryList}>{visibleCategories.map((category) => <section className={styles.categorySection} id={category.slug} key={category.slug}><div className={styles.categoryIntro}><span>{String(categories.findIndex((item) => item.slug === category.slug) + 1).padStart(2, "0")}</span><div><small>Ingredient family</small><h2>{category.name}</h2><p>{category.summary}</p><Link href={`/industries/${category.slug}`}>Application guide <ArrowRight /></Link></div></div><div className={styles.productGrid}>{category.products.map((product) => <Link className={styles.productCard} href={`/products/${product.slug}`} key={`${category.slug}-${product.slug}`}><span className={styles.productImage}><Image src={product.image} fill sizes="(max-width: 620px) 45vw, (max-width: 1000px) 28vw, 190px" alt={`${product.name} for commercial food production`} /></span><span className={styles.productCopy}><strong>{product.name}</strong><small>View product <ArrowRight /></small></span></Link>)}</div></section>)}</div>
        {!visibleCategories.length && <div className={styles.empty}><h2>No ingredient found</h2><p>Try a broader product name or send us the specification you need.</p><Link href="/contact#enquiry">Ask our sourcing team <ArrowRight /></Link></div>}
      </section>
    </div>
  );
}
