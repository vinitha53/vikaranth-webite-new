"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, FileCheck2, MapPin, PackageCheck, Phone, Search, ShieldCheck, Truck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./about.module.css";
import { partners } from "../data/partners";
import { aboutBuyerLabels, aboutFaqs, aboutIndustries, aboutProcess } from "../data/about-content";
import { WHATSAPP_NUMBERS } from "../data/whatsapp";

const frameCount = 300;
const storyChapters = [
  {
    eyebrow: "01 / 04 - From cocoa to possibility",
    title: "Food Ingredient Distributor & Wholesaler in Chennai",
    copy: "Vikranth Chemical Corporation connects food manufacturers, bakeries, processors and professional buyers with dependable ingredient sourcing.",
    highlight: "Commercial quantities. Relevant documents. Reliable sourcing support."
  },
  {
    eyebrow: "02 / 04 - Application-led portfolio",
    title: "Ingredients for the Products India Makes",
    copy: "Source ingredients for chocolate, bakery, dairy, beverages, ice cream, fruit processing, nutrition and specialty food applications.",
    highlight: "One sourcing partner across multiple food industries."
  },
  {
    eyebrow: "03 / 04 - Wholesale supply support",
    title: "Built for Commercial Buyers Across South India",
    copy: "We help clarify grades, pack sizes, quantities and available product documents before coordinating quotations and dispatch.",
    highlight: "Practical support from requirement to repeat supply."
  },
  {
    eyebrow: "04 / 04 - Pan-India distribution",
    title: "Chennai Roots. Pan-India Reach.",
    copy: "Share your product requirement and delivery city. Our team will confirm availability, packs, freight and serviceability across India.",
    highlight: "Your next ingredient conversation starts here.",
    actions: true
  }
];
const frameUrl = (index) => "/about-distribution-sequence/ezgif-frame-" + String(index + 1).padStart(3, "0") + ".webp";
const motionProfile = () => window.innerWidth <= 600
  ? { step: 4, cacheLimit: 12, preloadRadius: 2 }
  : window.innerWidth <= 1024
    ? { step: 2, cacheLimit: 18, preloadRadius: 3 }
    : { step: 1, cacheLimit: 26, preloadRadius: 4 };

function drawCover(canvas, image) {
  const ctx = canvas.getContext("2d");
  const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth > 1200 ? 1.25 : 1.5);
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
  canvas.style.opacity = "1";
}

export default function AboutStory() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const currentFrame = useRef(0);
  const progressRef = useRef(null);
  const chapterRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;
    const profile = motionProfile();
    const cache = new Map();
    let requestedFrame = 0;
    const playhead = { frame: 0 };

    const normaliseFrame = (frame) => Math.min(frameCount - 1, Math.max(0, Math.round(frame / profile.step) * profile.step));
    const trimCache = (activeFrame) => {
      if (cache.size <= profile.cacheLimit) return;
      [...cache.keys()]
        .sort((a, b) => Math.abs(b - activeFrame) - Math.abs(a - activeFrame))
        .slice(0, cache.size - profile.cacheLimit)
        .forEach((key) => {
          const oldImage = cache.get(key);
          oldImage.onload = null;
          oldImage.onerror = null;
          oldImage.src = "";
          cache.delete(key);
        });
    };
    const loadFrame = (frame, renderWhenReady = false) => {
      const index = normaliseFrame(frame);
      const cached = cache.get(index);
      if (cached) {
        if (renderWhenReady && cached.complete && cached.naturalWidth && canvasRef.current) drawCover(canvasRef.current, cached);
        return;
      }
      const image = new Image();
      image.decoding = "async";
      image.src = frameUrl(index);
      image.onload = () => {
        if (!cancelled && canvasRef.current && requestedFrame === index) drawCover(canvasRef.current, image);
        trimCache(requestedFrame);
      };
      cache.set(index, image);
    };
    const render = () => {
      const frame = normaliseFrame(playhead.frame);
      requestedFrame = frame;
      currentFrame.current = frame;
      loadFrame(frame, true);
      for (let offset = 1; offset <= profile.preloadRadius; offset += 1) {
        loadFrame(frame + offset * profile.step);
        loadFrame(frame - offset * profile.step);
      }
      trimCache(frame);
      if (progressRef.current) progressRef.current.style.setProperty("--progress", (playhead.frame / (frameCount - 1) * 100) + "%");
    };
    loadFrame(0, true);
    for (let offset = 1; offset <= profile.preloadRadius; offset += 1) loadFrame(offset * profile.step);
    const tween = gsap.to(playhead, { frame: frameCount - 1, ease: "none", onUpdate: render, scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: 0.55, invalidateOnRefresh: true } });
    const chapters = chapterRefs.current.filter(Boolean);
    gsap.set(chapters, { autoAlpha: 0, y: 28 });
    gsap.set(chapters[0], { autoAlpha: 1, y: 0 });
    const copyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        invalidateOnRefresh: true
      }
    });
    copyTimeline.to({ progress: 0 }, { progress: 1, duration: 1, ease: "none" }, 0);
    [0.2, 0.44, 0.68].forEach((position, index) => {
      copyTimeline
        .to(chapters[index], { autoAlpha: 0, y: -28, duration: 0.08, ease: "power1.in" }, position)
        .fromTo(chapters[index + 1], { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, position + 0.03);
    });
    const resize = () => {
      const image = cache.get(currentFrame.current);
      if (image?.complete && image.naturalWidth && canvasRef.current) drawCover(canvasRef.current, image);
    };
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      tween.scrollTrigger?.kill();
      tween.kill();
      copyTimeline.scrollTrigger?.kill();
      copyTimeline.kill();
      cache.forEach((image) => { image.onload = null; image.onerror = null; });
      cache.clear();
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
        <img className={styles.heroPoster} src="/about-distribution-sequence/ezgif-frame-001.webp" width="1920" height="1080" alt="Cocoa ingredients supplied by Vikranth Chemical Corporation" fetchPriority="high" decoding="async" />
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.shade} />
        <div ref={progressRef} className={styles.progress} />
        <nav className={styles.heroBreadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>About</span></nav>
        <div className={styles.storyCopy}>
          {storyChapters.map((chapter, index) => <article
            className={styles.storyChapter}
            key={chapter.eyebrow}
            ref={(element) => { chapterRefs.current[index] = element; }}
          >
            <span>{chapter.eyebrow}</span>
            {index === 0
              ? <h1 id="about-page-title">{chapter.title}</h1>
              : <h2>{chapter.title}</h2>}
            <p>{chapter.copy}</p>
            <strong>{chapter.highlight}</strong>
            {chapter.actions && <div className={styles.heroButtons}><Link href="/products/">Explore Our Ingredients <ArrowRight /></Link><Link href="/contact/#enquiry">Discuss Your Requirement</Link></div>}
          </article>)}
        </div>
        <div className={styles.scrollCue}>Scroll to explore <span /></div>
      </div>
    </section>

    <section className={styles.verifiedStrip} aria-label="Verified Business Details">
      <ul><li><MapPin />Chennai, Tamil Nadu</li><li><Truck />Pan-India B2B supply coordination</li><li><Building2 />11 industry-focused ingredient groups</li><li><BadgeCheck />GSTIN 33AADFV9327N1ZO</li></ul>
    </section>

    <section className={styles.companyIntro} aria-labelledby="company-intro-title">
      <div className="aboutReveal"><span className={styles.eyebrow}>Who we are</span><h2 id="company-intro-title">A Chennai Distributor with a Pan-India Supply Outlook</h2><p>Vikranth works with procurement teams, product developers, wholesalers, commercial bakeries, food processors and hospitality buyers that need a practical route from ingredient enquiry to commercial supply.</p><p>Tell us the product, application or functional result you need. We help identify the relevant grade, pack size, commercial quantity and available documentation, then coordinate quotation and dispatch for Chennai, South India and serviceable locations across India.</p><div className={styles.buyerLabels}>{aboutBuyerLabels.map((label) => <span key={label}>{label}</span>)}</div></div>
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
      <div className="aboutReveal"><span className={styles.eyebrow}>Distribution reach</span><h2 id="coverage-title">Chennai Roots. South India Strength. Pan-India Reach.</h2><p>From our base in Kolathur, Chennai, we support B2B ingredient enquiries for local manufacturers, buyers across South India and customers in serviceable locations throughout India. Share the product, quantity and delivery city so our team can confirm packs, availability, freight and dispatch options.</p><div className={styles.coverageGrid}><article><MapPin /><span>Chennai</span><strong>Responsive local sourcing support</strong></article><article><Building2 /><span>South India</span><strong>Wholesale and manufacturing requirements</strong></article><article><Truck /><span>Pan India</span><strong>Commercial supply coordination</strong></article></div><address>Saraswathy Enclave, Lakshmipuram, Kolathur, Chennai &ndash; 600099, Tamil Nadu, India.</address><div className={styles.coverageActions}><a href="tel:+918754442924"><Phone />Call the Chennai Team</a><Link href="/contact/#enquiry">Send Your Requirement</Link><a href="https://www.google.com/maps/search/?api=1&query=Vikranth+Chemical+Corporation+Kolathur+Chennai" target="_blank" rel="noreferrer"><MapPin />View on Google Maps</a></div></div>
    </section>

    <section className={styles.aboutFaq} aria-labelledby="about-faq-title">
      <div className={styles.sectionHeading + " aboutReveal"}><span className={styles.eyebrow}>Company and sourcing answers</span><h2 id="about-faq-title">About Vikranth: Buyer Questions</h2></div>
      <div>{aboutFaqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span><h3>{question}</h3><b>+</b></summary><p>{answer}</p></details>)}</div>
    </section>

    <section className={styles.finalCta}><span>Start a conversation</span><h2>Tell Us What Your Product Needs</h2><p>Share the application, required ingredient, approximate quantity, document needs and delivery location. The Vikranth team will review the requirement and confirm the next sourcing step.</p><div><Link href="/contact/#enquiry">Request a Quotation <ArrowRight /></Link><a href={"https://wa.me/" + WHATSAPP_NUMBERS.general} target="_blank" rel="noreferrer">Discuss on WhatsApp</a></div></section>
  </>;
}
