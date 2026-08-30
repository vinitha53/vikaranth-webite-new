"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Truck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./associates.module.css";
import cards from "./supplier-cards.module.css";

const categoryLabels = {
  campco: "Cocoa & chocolate",
  "delta-nutritives": "Dessert & dairy",
  roquette: "Plant-based ingredients",
  "nitta-gelatin-india-ltd": "Gelatin solutions",
  doehler: "Flavours & systems",
  "cp-kelco": "Hydrocolloids",
  "calpro-specialities-pvt-ltd": "Cocoa & dairy",
  "gujarat-ambuja-exports-ltd": "Starch derivatives",
  "fine-organics": "Food emulsifiers",
  "shree-gluco-biotech-pvt-ltd": "Sweeteners",
  "paramesu-biotech-ltd": "Maize starch",
  anchor: "Bakery ingredients",
};

const cardCopy = {
  campco: "Cocoa and chocolate ingredients for bakery, confectionery, dessert and beverage formulations.",
  "delta-nutritives": "Dessert, chocolate, frozen fruit, dairy, ice cream and bakery ingredient solutions.",
  roquette: "Plant-based ingredients, starches, sweeteners, proteins and selected pharmaceutical solutions.",
  "nitta-gelatin-india-ltd": "Gelatin solutions and functional ingredients for food, nutrition and pharmaceutical applications.",
  doehler: "Natural ingredients, flavours and integrated food and beverage systems for modern formulations.",
  "cp-kelco": "Nature-based hydrocolloids for texture, suspension, stability and formulation performance.",
  "calpro-specialities-pvt-ltd": "Cocoa powders, dairy proteins and practical food ingredient solutions for manufacturers.",
  "gujarat-ambuja-exports-ltd": "Sorbitol 70% solution, starch derivatives and agro-processing ingredients for industrial applications.",
  "fine-organics": "Specialty additives and food emulsifiers engineered for reliable processing performance.",
  "shree-gluco-biotech-pvt-ltd": "Starch-derived sweeteners and carbohydrate ingredients for professional food production.",
  "paramesu-biotech-ltd": "Maize starch and derivative solutions for bakery and wider food manufacturing needs.",
  anchor: "Vikranth's in-house ingredient range for bakery and food manufacturing applications.",
};

function updateCardTilt(event) {
  if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  card.style.setProperty("--mx", `${x * 100}%`);
  card.style.setProperty("--my", `${y * 100}%`);
  card.style.setProperty("--rx", `${(0.5 - y) * 3.2}deg`);
  card.style.setProperty("--ry", `${(x - 0.5) * 3.2}deg`);
}

function resetCardTilt(event) {
  const card = event.currentTarget;
  card.style.setProperty("--mx", "50%");
  card.style.setProperty("--my", "50%");
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
}

export default function AssociatesClient({ partners, faqs }) {
  const pageRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All portfolios");
  const categoryOptions = ["All portfolios", ...new Set(Object.values(categoryLabels))];
  const visiblePartners = activeCategory === "All portfolios" ? partners : partners.filter((partner) => categoryLabels[partner.slug] === activeCategory);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      // A restrained scrub gives logos depth without distracting from directory use.
      gsap.utils.toArray(`.${cards.logoFloat}`).forEach((logo) => {
        gsap.fromTo(logo, { y: 8 }, {
          y: -8,
          ease: "none",
          scrollTrigger: { trigger: logo.closest("a"), start: "top bottom", end: "bottom top", scrub: 0.7 },
        });
      });

      gsap.utils.toArray(`.${styles.sectionHead}`).forEach((heading) => {
        gsap.from(heading, { opacity: 0, y: 18, duration: 0.62, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 86%", once: true } });
      });
    }, pageRef);

    return () => scope.revert();
  }, [partners.length]);

  return (
    <div ref={pageRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="supplier-title">
        <div className={styles.heroArt} aria-hidden="true"><i/><i/><i/></div>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Suppliers</span></nav>
          <span className={styles.eyebrow}>Manufacturer and supplier directory</span>
          <h1 id="supplier-title"><span className={styles.heroLine}>Ingredient Manufacturers</span><span className={styles.heroLine}>and Supplier Portfolios</span></h1>
          <p>Explore product portfolios available for enquiry through Vikranth. The exact manufacturer, source, grade, availability and commercial relationship are confirmed for each requirement.</p>
          <div className={styles.heroActions}><a href="#supplier-directory">Explore portfolios <ArrowRight /></a><Link href="/contact#enquiry">Send an ingredient enquiry</Link></div>
        </div>
        <div className={styles.trustStrip} aria-label="Directory guidance"><div><strong>{partners.length}</strong><span>Portfolio pages</span></div><div><strong>Product-led</strong><span>Enquiry routing</span></div><div><strong>Per product</strong><span>Document checks</span></div><div><strong>Transparent</strong><span>Relationship wording</span></div></div>
      </section>
      <section className={`${styles.directory} ${cards.directory}`} aria-label="Ingredient supplier directory">
        <div className={styles.sectionHead} id="supplier-directory"><span>Supplier portfolios</span><h2>Browse by ingredient specialism</h2><p>A logo identifies a portfolio for enquiry; it does not by itself claim an authorised distributorship. Relationship type and territory are confirmed against current documentation.</p></div>
        <div className={styles.filters} aria-label="Filter supplier portfolios">
          {categoryOptions.map((category) => <button type="button" className={activeCategory === category ? styles.activeFilter : ""} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}
        </div>
        <div className={cards.grid}>
          {visiblePartners.map((partner) => {
            const index = partners.findIndex((item) => item.slug === partner.slug);
            return (
            <Link
              className={cards.card}
              href={`/associates/${partner.slug}`}
              key={partner.slug}
              aria-label={`Explore ${partner.name} ingredients`}
              onPointerMove={updateCardTilt}
              onPointerLeave={resetCardTilt}
            >
              <span className={cards.spotlight} aria-hidden="true" />
              <span className={cards.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div className={cards.logoStage}>
                <i className={cards.orbit} aria-hidden="true" />
                <div className={cards.logoFloat}>
                  {partner.logo ? (
                    <Image src={partner.logo} fill sizes="(max-width: 639px) 70vw, (max-width: 1279px) 34vw, 280px" alt={`${partner.name} logo`} />
                  ) : (
                    <span className={cards.anchorLogo}>ANCHOR<small>by Vikranth</small></span>
                  )}
                </div>
              </div>
              <div className={cards.body}>
                <div className={cards.copy}>
                  <span className={cards.category}>{categoryLabels[partner.slug]}</span>
                  <h3>{partner.name}</h3>
                  <i className={cards.rule} aria-hidden="true" />
                  <p>{cardCopy[partner.slug]}</p>
                </div>
                <span className={cards.explore}>Explore partner <ArrowRight /></span>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.sectionHead}><span>Frequently requested</span><h2 id="faq-title">Frequently asked questions</h2></div>
        <div className={styles.faqList}>{faqs.map(({ question, answer }, index) => {
          const open = openFaq === index;
          return <article className={styles.faqItem} key={question}><h3><button type="button" aria-expanded={open} aria-controls={`answer-${index}`} onClick={() => setOpenFaq(open ? -1 : index)}>{question}<ChevronDown /></button></h3><div id={`answer-${index}`} className={open ? styles.faqOpen : styles.faqClosed}><div><p>{answer}</p></div></div></article>;
        })}</div>
      </section>

      <section className={styles.finalCta}><div><Truck /><div><span>Chennai based · Delivery confirmed per enquiry</span><h2>Start your ingredient enquiry</h2><p>Share the product, grade, application, quantity and delivery city. Our team will confirm the practical next step.</p></div><div className={styles.finalActions}><Link href="/contact#enquiry">Request a quote <ArrowRight /></Link><a href="https://wa.me/918754442924" target="_blank" rel="noreferrer">WhatsApp us</a></div></div></section>
    </div>
  );
}
