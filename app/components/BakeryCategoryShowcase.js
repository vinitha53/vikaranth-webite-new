"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./detail.module.css";

const productImages = {
  "Cake Gel": "/popular-cake-gel.png",
  "Cake Life": "/popular-cake-premix.png",
  "Cake Premix": "/popular-cake-premix.png",
  "Custard Powder": "/popular-custard-powder.png",
  "Frozen Croissant": "/products/bakery-image.webp"
};

export default function BakeryCategoryShowcase({ groups, products, categoryLabel = "Bakery", fallbackImage = "/products/bakery-ingredients.webp" }) {
  const [active, setActive] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const railRef = useRef(null);

  const group = groups[active];
  const available = group.ingredients.map(name => products.find(product => product.name === name)).filter(Boolean);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (cardIndex < available.length - 1) {
        setCardIndex(cardIndex + 1);
      } else {
        setCardIndex(0);
        setActive(category => (category + 1) % groups.length);
      }
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [cardIndex, available.length, groups.length]);

  useEffect(() => {
    const card = railRef.current?.children[cardIndex];
    if (card && railRef.current) railRef.current.scrollTo({ left: card.offsetLeft - railRef.current.offsetLeft, behavior: "smooth" });
  }, [cardIndex, active]);

  const chooseCategory = index => { setActive(index); setCardIndex(0); };

  return <section className={styles.bakeryShowcase}>
    <div className={styles.bakeryTabs} role="tablist" aria-label={`${categoryLabel} product categories`}>
      {groups.map((item, index) => <button className={index === active ? styles.bakeryTabActive : styles.bakeryTab} type="button" role="tab" aria-selected={index === active} key={item.name} onClick={() => chooseCategory(index)}>{item.name}</button>)}
    </div>
    <div className={styles.bakeryGroupHeading}>
      <div><span>Available ingredients for</span><h3>{group.name}</h3><p>{group.description}</p></div>
      <div className={styles.sliderProgress} aria-label={`Category ${active + 1} of ${groups.length}`}><span>{String(active + 1).padStart(2, "0")}</span><i><b style={{ width: `${((active + 1) / groups.length) * 100}%` }}/></i><span>{String(groups.length).padStart(2, "0")}</span></div>
    </div>
    <div className={styles.bakeryRail} ref={railRef} style={{ "--visible-cards": Math.min(available.length, 4) }}>
      {available.map(product => <Link className={styles.bakeryProductCard} href={`/products/${product.slug}`} key={product.slug}>
        <div className={styles.bakeryProductImage}><img src={productImages[product.name] || product.image || fallbackImage} alt={`${product.name} used for ${group.name}`}/><span>Available</span></div>
        <h4>{product.name}</h4><p>Used in {group.name.toLowerCase()}</p><strong>View ingredient <span aria-hidden="true">→</span></strong>
      </Link>)}
    </div>
    <div className={styles.autoPlayNote}><span className={styles.playDot}/>Ingredients and categories move automatically</div>
  </section>;
}
