"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Check, FileCheck2, MapPin, PackageCheck, Phone, Search, ShieldCheck, Truck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./about.module.css";
import { partners } from "../data/partners";
import { aboutBuyerLabels, aboutFaqs, aboutIndustries, aboutProcess } from "../data/about-content";
import { WHATSAPP_NUMBERS } from "../data/whatsapp";

const frameCount = 300;
const frameUrl = (index) => "/about-sequence/frame-" + String(index + 1).padStart(3, "0") + ".webp";
const frameIndexesForViewport = () => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = reduced ? 1 : window.innerWidth <= 560 ? 10 : window.innerWidth <= 900 ? 16 : 24;
  if (count === 1) return [0];
  return Array.from({ length: count }, (_, index) => Math.round((index / (count - 1)) * (frameCount - 1)));
};

function drawCover(canvas, image) {
  const ctx = canvas.getContext("2d");
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
    canvas.width = width * ratio;
    canvas.height = height * ratio;
  }
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#211007";
  ctx.fillRect(0, 0, width, height);
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  ctx.drawImage(image, (width - renderedWidth) / 2, (height - renderedHeight) / 2, renderedWidth, renderedHeight);
}

export default function AboutStory() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrame = useRef(0);
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let cancelled = false;
    const frameIndexes = frameIndexesForViewport();
    const images = frameIndexes.map((sourceIndex, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = frameUrl(sourceIndex);
      image.onload = () => {
        if (!cancelled && index === 0 && canvasRef.current) drawCover(canvasRef.current, image);
      };
      return image;
    });
    imagesRef.current = images;
    const playhead = { frame: 0 };
    const render = () => {
      const frame = Math.max(0, Math.min(images.length - 1, Math.round(playhead.frame)));
      currentFrame.current = frame;
      const image = images[frame];
      if (image?.complete && image.naturalWidth && canvasRef.current) drawCover(canvasRef.current, image);
      if (progressRef.current) progressRef.current.style.setProperty("--progress", (images.length === 1 ? 100 : frame / (images.length - 1) * 100) + "%");
    };
    const tween = gsap.to(playhead, { frame: images.length - 1, ease: "none", onUpdate: render, scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: 0.35, invalidateOnRefresh: true } });
    const resize = () => {
      const image = images[currentFrame.current];
      if (image?.complete && image.naturalWidth && canvasRef.current) drawCover(canvasRef.current, image);
    };
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reveals = gsap.utils.toArray(".aboutReveal").map((item, index) => gsap.fromTo(item, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", once: true }, delay: (index % 3) * 0.05 }));
    return () => reveals.forEach((tween) => { tween.scrollTrigger?.kill(); tween.kill(); });
  }, []);

  return <>
    <section ref={sectionRef} className={styles.sequence} aria-labelledby="about-page-title">
      <div className={styles.sticky}>
        <img className={styles.heroPoster} src="/about-sequence/frame-001.webp" width="1920" height="1080" alt="Vikranth food ingredient sourcing and commercial supply" fetchPriority="high" decoding="async" />
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.shade} />
        <div ref={progressRef} className={styles.progress} />
        <nav className={styles.heroBreadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>About</span></nav>
        <div className={styles.storyCopy}>
          <span>Chennai-Based B2B Ingredient Partner</span>
          <h1 id="about-page-title">About Vikranth Chemical Corporation</h1>
          <p>Vikranth Chemical Corporation is a Chennai-based food ingredient supplier and distributor connecting manufacturers, bakeries and professional buyers with ingredients for bakery, chocolate, dairy, beverage, ice cream, fruit-processing and specialty applications.</p>
          <strong>Clearer sourcing. Relevant documentation. Practical supply support.</strong>
          <div className={styles.heroButtons}><Link href="/products/">Explore Our Ingredients <ArrowRight /></Link><Link href="/contact/#enquiry">Discuss Your Requirement</Link></div>
        </div>
        <div className={styles.scrollCue}>Scroll to explore <span /></div>
      </div>
    </section>

    <section className={styles.verifiedStrip} aria-label="Verified Business Details">
      <ul><li><MapPin />Chennai, Tamil Nadu</li><li><BadgeCheck />GSTIN 33AADFV9327N1ZO</li><li><Building2 />11 industry-focused ingredient groups</li><li><FileCheck2 />Product-document support where available</li></ul>
    </section>

    <section className={styles.companyIntro} aria-labelledby="company-intro-title">
      <div className="aboutReveal"><span className={styles.eyebrow}>Who we are</span><h2 id="company-intro-title">A Clearer Route from Requirement to Ingredient</h2><p>Vikranth works with procurement teams, product developers, production teams, commercial bakeries, food processors and hospitality buyers who need a practical route from ingredient enquiry to commercial supply.</p><p>Buyers can approach the team with a product name, finished application or functional need. Vikranth helps clarify the required grade, pack size, quantity, documents and current sourcing options before quotation and fulfilment are coordinated.</p><div className={styles.buyerLabels}>{aboutBuyerLabels.map((label) => <span key={label}>{label}</span>)}</div></div>
      <div className={styles.companyImage + " aboutReveal"}><img src="/about-overview.webp" width="760" height="820" alt="Food ingredients prepared for commercial sourcing review" loading="lazy" /><div><small>Application-first support</small><strong>Ingredients, people and practical supply conversations.</strong></div></div>
    </section>

    <section className={styles.portfolioSection} aria-labelledby="portfolio-title">
      <div className={styles.sectionHeading + " aboutReveal"}><span className={styles.eyebrow}>Industry portfolio</span><h2 id="portfolio-title">Ingredients Organised Around Production Needs</h2><p>The portfolio connects ingredient families with the products they help create. Explore each industry page to find relevant options for flavour, texture, structure, stability, nutrition, preservation and processing performance.</p></div>
      <div className={styles.industryLinks}>{aboutIndustries.map(([label, href], index) => <Link href={href} key={href}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><ArrowRight /></Link>)}</div>
      <Link className={styles.sectionCta} href="/industries/">Explore Industries <ArrowRight /></Link>
    </section>

    <section className={styles.processSection} aria-labelledby="process-title">
      <div className={styles.sectionHeading + " aboutReveal"}><span className={styles.eyebrow}>Commercial ingredient sourcing</span><h2 id="process-title">Built Around the Buyer’s Requirement</h2><p>Every enquiry starts with the finished product and the result the buyer needs—not with a generic product list.</p></div>
      <div className={styles.processGrid}>{aboutProcess.map(([title, copy], index) => { const Icon = [Search, PackageCheck, FileCheck2, Truck][index]; return <article className="aboutReveal" key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>; })}</div>
      <Link className={styles.sectionCta} href="/contact/#enquiry">Start an Ingredient Enquiry <ArrowRight /></Link>
    </section>

    <section className={styles.documentationSection} aria-labelledby="documentation-title">
      <div className="aboutReveal"><span className={styles.eyebrow}>Quality and documentation</span><h2 id="documentation-title">Product-Specific Information, Clearly Shared</h2><p>Ingredient performance depends on the exact product, grade, supplier specification, formulation and process. Where available, Vikranth coordinates specifications, certificates of analysis, technical data sheets, safety data sheets and related supplier information for buyer review.</p><aside><ShieldCheck /><p>Website information supports product discovery and sourcing; final trials, dosage, technical suitability and regulatory approval remain with the buyer’s qualified team.</p></aside></div>
      <img className="aboutReveal" src="/about-quality.webp" width="720" height="640" alt="Food ingredient samples and documentation reviewed for sourcing" loading="lazy" />
    </section>

    <section className={styles.networkSection} aria-labelledby="network-title">
      <div className={styles.sectionHeading + " aboutReveal"}><span className={styles.eyebrow}>Verified portfolio navigation</span><h2 id="network-title">Manufacturer &amp; Supplier Network</h2><p>Vikranth’s portfolio includes ingredient options associated with established manufacturers and suppliers. Exact product, brand, grade, availability, documentation and commercial relationship are confirmed for each enquiry.</p></div>
      <div className={styles.networkGrid}>{partners.map((partner) => <Link href={"/associates/" + partner.slug} key={partner.slug}><img src={partner.logo} width="150" height="60" alt={partner.name + " logo"} loading="lazy" /><strong>{partner.name}</strong><ArrowRight /></Link>)}</div>
      <Link className={styles.sectionCta} href="/associates/">View All Suppliers <ArrowRight /></Link>
    </section>

    <section className={styles.coverageSection} aria-labelledby="coverage-title">
      <div className="aboutReveal"><span className={styles.eyebrow}>Location and service area</span><h2 id="coverage-title">Based in Chennai. Open to Business Enquiries Across India.</h2><p>Vikranth Chemical Corporation is based in Kolathur, Chennai and supports professional ingredient enquiries from Chennai, South India and other Indian locations. Share the product, quantity and delivery city so the team can confirm current availability, pack options, freight and serviceability.</p><address>Saraswathy Enclave, Lakshmipuram, Kolathur, Chennai – 600099, Tamil Nadu, India.</address><div><a href="tel:+918754442924"><Phone />Call the Chennai Team</a><Link href="/contact/#enquiry">Send Your Requirement</Link><a href="https://www.google.com/maps/search/?api=1&query=Vikranth+Chemical+Corporation+Kolathur+Chennai" target="_blank" rel="noreferrer"><MapPin />View on Google Maps</a></div></div>
    </section>

    <section className={styles.aboutFaq} aria-labelledby="about-faq-title">
      <div className={styles.sectionHeading + " aboutReveal"}><span className={styles.eyebrow}>Company and sourcing answers</span><h2 id="about-faq-title">About Vikranth: Buyer Questions</h2></div>
      <div>{aboutFaqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span><h3>{question}</h3><b>+</b></summary><p>{answer}</p></details>)}</div>
    </section>

    <section className={styles.finalCta}><span>Start a conversation</span><h2>Tell Us What Your Product Needs</h2><p>Share the application, required ingredient, approximate quantity, document needs and delivery location. The Vikranth team will review the requirement and confirm the next sourcing step.</p><div><Link href="/contact/#enquiry">Request a Quotation <ArrowRight /></Link><a href={"https://wa.me/" + WHATSAPP_NUMBERS.general} target="_blank" rel="noreferrer">Discuss on WhatsApp</a></div></section>
  </>;
}