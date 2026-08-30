"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./detail.module.css";

const productImages = {
  "Cake Gel": "/product-images/other-products/cake-gel.webp",
  "Cake Life": "/product-images/other-products/cake-life.webp",
  "Custard Powder": "/product-images/other-products/custard-powder.webp"
};

export default function BakeryCategoryShowcase({ groups, products, categoryLabel = "Bakery", fallbackImage = "/products/bakery-ingredients.webp" }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabsRef = useRef(null);

  const group = groups[active];
  const available = group.ingredients.map(name => products.find(product => product.name === name)).filter(Boolean);

  useEffect(() => {
    if (paused || groups.length < 2) return;
    const timer = window.setInterval(() => {
      setActive(category => (category + 1) % groups.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [paused, groups.length]);

  const chooseCategory = index => {
    const next = Math.max(0, Math.min(groups.length - 1, index));
    setActive(next);
    window.requestAnimationFrame(() => {
      const tabs = tabsRef.current;
      const tab = tabs?.children[next];
      if (!tabs || !tab) return;
      tabs.scrollTo({ left: tab.offsetLeft - (tabs.clientWidth - tab.clientWidth) / 2, behavior: "smooth" });
    });
  };

  return <section className={styles.bakeryShowcase} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
    <div className={styles.bakeryTabsBar}>
      <button className={styles.bakeryTabArrow} type="button" onClick={() => chooseCategory(active - 1)} disabled={active === 0} aria-label="Previous category" title="Previous category"><ChevronLeft /></button>
      <div className={styles.bakeryTabs} ref={tabsRef} role="tablist" aria-label={`${categoryLabel} product categories`}>
        {groups.map((item, index) => <button className={index === active ? styles.bakeryTabActive : styles.bakeryTab} type="button" role="tab" aria-selected={index === active} key={item.name} onClick={() => chooseCategory(index)}>{item.name}</button>)}
      </div>
      <button className={styles.bakeryTabArrow} type="button" onClick={() => chooseCategory(active + 1)} disabled={active === groups.length - 1} aria-label="Next category" title="Next category"><ChevronRight /></button>
    </div>
    <div className={styles.bakeryGroupHeading}>
      <div><span>Available ingredients for</span><h3>{group.name}</h3><p>{group.description}</p></div>
      <div className={styles.sliderProgress} aria-label={`Category ${active + 1} of ${groups.length}`}><span>{String(active + 1).padStart(2, "0")}</span><i><b style={{ width: `${((active + 1) / groups.length) * 100}%` }}/></i><span>{String(groups.length).padStart(2, "0")}</span></div>
    </div>
    <div className={styles.bakeryProductGrid}>
      {available.map(product => <Link className={styles.bakeryProductCard} href={`/products/${product.slug}`} key={product.slug}>
        <div className={styles.bakeryProductImage}><img src={productImages[product.name] || product.image || fallbackImage} alt={`${product.name} used for ${group.name}`}/><span>Available</span></div>
        <div className={styles.bakeryProductCopy}><small>{group.name}</small><h4>{product.name}</h4><p>Commercial ingredient for {group.name.toLowerCase()}</p><strong>View ingredient page <span aria-hidden="true">-&gt;</span></strong></div>
      </Link>)}
    </div>
    <div className={styles.autoPlayNote}><span className={paused ? styles.pauseDot : styles.playDot}/>{paused ? "Paused while viewing products" : "Categories change every 10 seconds"}</div>
  </section>;
}
