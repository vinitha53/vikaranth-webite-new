"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Truck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./associates.module.css";

const filters = [
  ["all", "All"], ["bakery", "Bakery"], ["chocolate", "Chocolate"],
  ["dairy", "Dairy"], ["beverage", "Beverage"], ["starch", "Starch & sweeteners"],
];

const partnerCategories = {
  campco: ["bakery", "chocolate", "beverage"],
  "delta-nutritives": ["bakery", "chocolate", "dairy"],
  roquette: ["starch", "dairy"],
  "nitta-gelatin-india-ltd": ["dairy", "chocolate"],
  doehler: ["beverage", "dairy"],
  "cp-kelco": ["beverage", "dairy"],
  "calpro-specialities-pvt-ltd": ["chocolate", "dairy"],
  "gujarat-ambuja-exports-ltd": ["starch", "bakery"],
  "fine-organics": ["bakery", "chocolate"],
  "shree-gluco-biotech-pvt-ltd": ["starch", "bakery"],
  "paramesu-biotech-ltd": ["starch", "bakery"],
  anchor: ["bakery"],
};

const cardCopy = {
  campco: "CAMPCO cocoa & chocolate ingredient supplier in Chennai — for bakery, confectionery, dessert and beverage formulations.",
  "delta-nutritives": "Delta Nutritives distributor in Chennai — dessert, chocolate, frozen fruit, dairy, ice cream and bakery ingredients.",
  roquette: "Roquette supplier in India — plant-based ingredients, starches, sweeteners, proteins and select pharmaceutical-grade solutions.",
  "nitta-gelatin-india-ltd": "Nitta Gelatin distributor in Chennai — gelatin solutions and related functional food applications.",
  doehler: "Döhler supplier in India — natural ingredients, flavours and integrated food and beverage systems.",
  "cp-kelco": "CP Kelco distributor in Chennai — nature-based hydrocolloids and formulation solutions for food manufacturers.",
  "calpro-specialities-pvt-ltd": "Calpro Specialities supplier in Chennai — cocoa powders, dairy proteins and food ingredient solutions.",
  "gujarat-ambuja-exports-ltd": "Gujarat Ambuja Exports distributor in India — sorbitol, starch derivatives and agro-processing ingredients.",
  "fine-organics": "Fine Organics supplier in Chennai — specialty additives and food emulsifier solutions for manufacturers.",
  "shree-gluco-biotech-pvt-ltd": "Shree Gluco Biotech distributor in India — starch-derived sweeteners and carbohydrate ingredients.",
  "paramesu-biotech-ltd": "Paramesu Biotech supplier in Chennai — maize starch and starch derivative solutions.",
  anchor: "Anchor by Vikranth — our in-house bakery and food manufacturing ingredient range, made and supplied from Chennai.",
};

const filterLabel = {
  campco: "Cocoa & chocolate", "delta-nutritives": "Dessert & dairy", roquette: "Plant-based ingredients",
  "nitta-gelatin-india-ltd": "Gelatin", doehler: "Flavours & systems", "cp-kelco": "Hydrocolloids",
  "calpro-specialities-pvt-ltd": "Cocoa & dairy", "gujarat-ambuja-exports-ltd": "Starch derivatives",
  "fine-organics": "Emulsifiers", "shree-gluco-biotech-pvt-ltd": "Sweeteners",
  "paramesu-biotech-ltd": "Maize starch", anchor: "Bakery ingredients",
};

export default function AssociatesClient({ partners, faqs }) {
  const pageRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);

  const visiblePartners = useMemo(
    () => partners.filter((partner) => filter === "all" || partnerCategories[partner.slug]?.includes(filter)),
    [filter, partners]
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      // Scroll: once-only section and partner-card reveals.
      gsap.utils.toArray(`.${styles.sectionHead}`).forEach((heading) => {
        gsap.from(heading, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 85%", once: true } });
      });
      gsap.from(`.${styles.partnerCard}`, { opacity: 0, y: 20, duration: 0.52, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: `.${styles.partnerGrid}`, start: "top 85%", once: true } });
    }, pageRef);

    return () => {
      scope.revert();
    };
  }, [partners.length]);

  return (
    <div ref={pageRef} className={styles.page}>
      <section className={styles.directory} aria-labelledby="partners-title">

        <div className={styles.partnerGrid}>
          {visiblePartners.map((partner) => <Link className={styles.partnerCard} href={`/associates/${partner.slug}`} key={partner.slug}>
            <div className={styles.logoBox}>{partner.logo ? <Image src={partner.logo} alt={`${partner.name} logo — food ingredient supplier Chennai`} width={220} height={90} sizes="(max-width: 767px) 65vw, (max-width: 1279px) 28vw, 220px" /> : <span className={styles.anchorLogo}>ANCHOR<small>by Vikranth</small></span>}</div>
            <span className={styles.cardCategory}>{filterLabel[partner.slug]}</span><h3>{partner.name}</h3><p>{cardCopy[partner.slug]}</p><span className={styles.explore}>Explore partner <ArrowRight /></span>
          </Link>)}
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.sectionHead}><span>Frequently requested</span><h2 id="faq-title">Frequently asked questions</h2></div>
        <div className={styles.faqList}>{faqs.map(({ question, answer }, index) => {
          const open = openFaq === index;
          return <article className={styles.faqItem} key={question}><h3><button type="button" aria-expanded={open} aria-controls={`answer-${index}`} onClick={() => setOpenFaq(open ? -1 : index)}>{question}<ChevronDown /></button></h3><div id={`answer-${index}`} className={open ? styles.faqOpen : styles.faqClosed}><div><p>{answer}</p></div></div></article>;
        })}</div>
      </section>

      <section className={styles.finalCta}><div><Truck /><div><span>Chennai based · Pan India supply</span><h2>Start your ingredient enquiry</h2><p>Share the product, grade, application, quantity and delivery city. Our team will confirm the practical next step.</p></div><div className={styles.finalActions}><Link href="/contact#enquiry">Request a quote <ArrowRight /></Link><a href="https://wa.me/918754442924" target="_blank" rel="noreferrer">WhatsApp us</a></div></div></section>
    </div>
  );
}
