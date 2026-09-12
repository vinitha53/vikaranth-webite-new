"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, CakeSlice, Factory, MapPin, Phone, ShieldCheck, ShoppingBasket, Truck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./about.module.css";
import { partners } from "../data/partners";
import { aboutBuyerLabels, aboutFaqs } from "../data/about-content";
import { WHATSAPP_NUMBERS } from "../data/whatsapp";

// Skip the full laboratory tube and juice-bottle scene, including its transitions.
const heroFrames = [
  ...Array.from({ length: 120 }, (_, index) => index + 1),
  ...Array.from({ length: 91 }, (_, index) => index + 210),
];
const frameCount = heroFrames.length;
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
    title: "Built for Commercial Buyers across India",
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
const frameUrl = (index) => "/about-distribution-sequence/ezgif-frame-" + String(heroFrames[index]).padStart(3, "0") + ".webp";
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
    const mobileView = window.matchMedia("(max-width: 600px)").matches;
    if (reducedMotion || mobileView) return undefined;
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileView = window.matchMedia("(max-width: 600px)").matches;
    if (reducedMotion) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const reveals = mobileView ? [] : gsap.utils.toArray(".aboutReveal:not([data-buyer-reveal])").map((item, index) => gsap.fromTo(item, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", once: true }, delay: (index % 3) * 0.05 }));
    const buyerReveals = gsap.utils.toArray("[data-buyer-reveal]").map((item, index) => gsap.fromTo(item, { autoAlpha: 0, y: 38, scale: index ? .975 : 1 }, { autoAlpha: 1, y: 0, scale: 1, duration: .82, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 90%", once: true }, delay: index * .1 }));
    return () => [...reveals, ...buyerReveals].forEach((tween) => { tween.scrollTrigger?.kill(); tween.kill(); });
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
      <div className="aboutReveal"><span className={styles.eyebrow}>Who we are</span><h2 id="company-intro-title">A Chennai Distributor with a Pan-India Supply Outlook</h2><p>Vikranth Chemical Corporation (VCC) is a Chennai-based food ingredient distributor, supplier and wholesaler, providing quality food and specialty ingredients to manufacturers, processors, commercial bakeries and food businesses across India.</p><p>Our portfolio includes ingredients for bakery, chocolate and confectionery, dairy, beverages, ice cream, fruit processing, food additives, functional ingredients and nutraceutical applications.</p><p>From ingredient enquiry and sourcing to product documentation, quotation and dispatch, VCC provides practical ingredient supply support across Chennai, South India and serviceable locations throughout India.</p><div className={styles.buyerLabels}>{aboutBuyerLabels.map((label) => <span key={label}>{label}</span>)}</div></div>
      <div className={styles.companyImage + " aboutReveal"}><img src="/about-overview.webp" width="760" height="820" alt="Food ingredients prepared for commercial sourcing review" loading="lazy" /><div><small>Application-first support</small><strong>Ingredients, people and practical supply conversations.</strong></div></div>
    </section>

    <section className={styles.buyerJourney} aria-labelledby="buyer-journey-title">
      <div className={styles.buyerJourneyIntro + " aboutReveal"} data-buyer-reveal="heading">
        <div>
          <span className={styles.eyebrow}>Ingredients for your next step</span>
          <h2 id="buyer-journey-title">From your first batch to your next production run.</h2>
        </div>
        <p>Commercial sourcing is our focus. Whether you buy for a factory, a growing business or your own kitchen, our Chennai team can help you check the right supply option.</p>
      </div>
      <div className={styles.buyerJourneyGrid}>
        <article className={styles.buyerJourneyFeatured + " aboutReveal"} data-buyer-reveal="card">
          <div className={styles.buyerJourneyMeta}><Factory /><span>01</span></div>
          <h3>Manufacturers &amp;<br />wholesale buyers</h3>
          <p>Plan bulk purchases and repeat supply. Share your grade, monthly volume, delivery schedule and document requirements.</p>
          <Link href="/contact/#enquiry">Discuss bulk supply <ArrowRight /></Link>
        </article>
        <article className="aboutReveal" data-buyer-reveal="card">
          <div className={styles.buyerJourneyMeta}><CakeSlice /><span>02</span></div>
          <h3>Bakeries &amp; growing businesses</h3>
          <p>Source ingredients for your bakery, cafe, restaurant or growing food business. Ask about available packs for your batch size.</p>
          <Link href="/contact/#enquiry">Find your pack size <ArrowRight /></Link>
        </article>
        <article className="aboutReveal" data-buyer-reveal="card">
          <div className={styles.buyerJourneyMeta}><ShoppingBasket /><span>03</span></div>
          <h3>Home bakers &amp; personal buyers</h3>
          <p>Have a smaller requirement? Tell us what you need. We will confirm suitable products, pack sizes and minimum quantities.</p>
          <Link href="/contact/#enquiry">Ask about a small order <ArrowRight /></Link>
        </article>
      </div>
    </section>
    <section className={styles.warehouseSection} aria-labelledby="warehouse-title">
      <div className={styles.warehouseGallery + " aboutReveal"}>
        <figure className={styles.warehousePhotoPrimary}>
          <img src="/1st iamge.png" width="1536" height="1024" alt="Professional food ingredient warehouse facility serving Chennai" loading="lazy" decoding="async" />
          <figcaption>01 &nbsp; Warehouse facility</figcaption>
        </figure>
        <figure className={styles.warehousePhotoSecondary}>
          <img src="/2nd iamge.png" width="1536" height="1024" alt="Organised food ingredient warehouse stock checking and dispatch preparation" loading="lazy" decoding="async" />
          <figcaption>02 &nbsp; Operations &amp; dispatch</figcaption>
        </figure>
      </div>
      <div className={styles.warehouseCopy + " aboutReveal"}>
        <span className={styles.eyebrow}>Warehouse &amp; distribution</span>
        <h2 id="warehouse-title">Reliable Ingredient Supply, From Stock to Delivery</h2>
        <p>Our Chennai warehouse supports the day-to-day handling and distribution of food ingredients for customers across India. From receiving and storing products to order preparation and dispatch, we maintain a practical supply process built around customer requirements.</p>
        <p>We work with our sourcing and distribution network to support consistent availability of ingredients across bakery, confectionery, beverages, dairy and other food applications.</p>
        <ul className={styles.warehousePoints}>
          <li><Building2 /><span><strong>Chennai warehouse base</strong><small>Supporting commercial food ingredient requirements.</small></span></li>
          <li><BadgeCheck /><span><strong>Requirement-led handling</strong><small>Products and packs checked against each enquiry.</small></span></li>
          <li><Truck /><span><strong>Dispatch coordination</strong><small>For Chennai, South India and serviceable locations across India.</small></span></li>
        </ul>
        <Link className={styles.warehouseCta} href="/contact/#enquiry">Discuss Your Requirement <ArrowRight /></Link>
      </div>
    </section>

    <section className={styles.documentationSection} aria-labelledby="documentation-title">
      <div className="aboutReveal"><span className={styles.eyebrow}>Quality and documentation</span><h2 id="documentation-title">Product-Specific Information, Clearly Shared</h2><p>Ingredient performance depends on the exact product, grade, supplier specification, formulation and process. Where available, Vikranth coordinates specifications, certificates of analysis, technical data sheets, safety data sheets and related supplier information for buyer review.</p><div className={styles.documentTypes}><span>FSSAI Certificate</span><span>Specifications</span><span>COA</span><span>TDS</span><span>SDS</span></div><aside><ShieldCheck /><p>Website information supports product discovery and sourcing; final trials, dosage, technical suitability and regulatory approval remain with the buyer’s qualified team.</p></aside></div>
      <div className={styles.certificateShowcase + " aboutReveal"} aria-label="FSSAI certificate and product documentation">
        <div className={styles.certificatePaper}>
          <img
            src="/fssai-license-badge.png"
            width="1254"
            height="1254"
            alt="FSSAI licensed food safety compliance badge for Vikranth Chemical Corporation"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.certificateFooter}><span><BadgeCheck /> Compliance documentation</span><Link href="/contact/#enquiry">Request a certificate copy <ArrowRight /></Link></div>
      </div>
    </section>

    <section className={styles.networkSection} aria-labelledby="network-title">
      <div className={styles.sectionHeading + " aboutReveal"}><span className={styles.eyebrow}>Verified portfolio navigation</span><h2 id="network-title">Manufacturer &amp; Supplier Network</h2><p>Vikranth’s portfolio includes ingredient options associated with established manufacturers and suppliers. Exact product, brand, grade, availability, documentation and commercial relationship are confirmed for each enquiry.</p></div>
      <div className={styles.networkGrid}>{partners.map((partner) => <Link href={"/associates/" + partner.slug} key={partner.slug}><img src={partner.logo} width="150" height="60" alt={partner.name + " logo"} loading="lazy" /><strong>{partner.name}</strong><ArrowRight /></Link>)}</div>
      <Link className={styles.sectionCta} href="/associates/">View All Suppliers <ArrowRight /></Link>
    </section>

    <section className={styles.anchorSpotlight} aria-labelledby="anchor-spotlight-title">
      <div className={styles.anchorStory + " aboutReveal"}>
        <div className={styles.anchorIdentity}>
          <img src="/partners/anchor.webp" width="180" height="80" alt="Anchor by Vikranth food ingredients" loading="lazy" decoding="async" />
          <span>Vikranth’s own manufacturing brand</span>
        </div>
        <span className={styles.eyebrow}>Our own product range</span>
        <h2 id="anchor-spotlight-title">Anchor Food Ingredients for Professional Bakery Production</h2>
        <p className={styles.anchorAnswer}><strong>What is Anchor?</strong> Anchor is Vikranth Chemical Corporation’s in-house manufacturing brand for professional bakery and food-manufacturing applications.</p>
        <p>The Anchor range gives bakeries and commercial food producers a direct route to application-focused ingredients backed by Vikranth’s product guidance, enquiry support and supply coordination from Chennai.</p>
        <div className={styles.anchorProof}><span>In-house manufacturing brand</span><span>Bakery-focused range</span><span>Direct product support</span></div>
        <div className={styles.anchorActions}>
          <Link href="/associates/anchor/">Explore the Full Anchor Range <ArrowRight /></Link>
          <a href={"https://wa.me/" + WHATSAPP_NUMBERS.anchor + "?text=I%20would%20like%20to%20enquire%20about%20Anchor%20products"} target="_blank" rel="noreferrer">Ask for Price &amp; Availability</a>
        </div>
      </div>
      <div className={styles.anchorProducts + " aboutReveal"} aria-label="Popular Anchor bakery products">
        <Link href="/products/cake-syrup/" className={styles.anchorProductCard}>
          <div><span>Popular bakery enquiry</span><strong>Anchor Cake Syrup</strong><p>Helps cakes retain moisture, freshness and softness while reducing dryness during storage.</p><small>Check current packs and availability <ArrowRight /></small></div>
          <img src="/product-images/other-products/corn-syrup.webp" width="520" height="520" alt="Anchor Cake Syrup for moisture and softness in professional bakery production" loading="lazy" decoding="async" />
        </Link>
        <Link href="/products/biscuit-enhancer/" className={styles.anchorProductCard}>
          <div><span>Popular bakery enquiry</span><strong>Anchor Biscuit Enhancer</strong><p>Supports consistent texture, handling and finished-product quality in professional biscuit production.</p><small>Request a current quotation <ArrowRight /></small></div>
          <img src="/product-images/anchor/biscuit-enhancer.png" width="520" height="520" alt="Anchor Biscuit Enhancer for professional biscuit production" loading="lazy" decoding="async" />
        </Link>
        <p className={styles.anchorAvailability}>Product format, grade, pack size, price and current availability are confirmed for each commercial enquiry.</p>
      </div>
    </section>

    <section className={styles.coverageSection} aria-labelledby="coverage-title">
      <div className="aboutReveal"><span className={styles.eyebrow}>Distribution reach</span><h2 id="coverage-title">Chennai Roots. South India Strength. Pan-India Reach.</h2><p>From our base in Kolathur, Chennai, we support B2B ingredient enquiries for local manufacturers, buyers across South India and customers in serviceable locations throughout India. Share the product, quantity and delivery city so our team can confirm packs, availability, freight and dispatch options.</p><div className={styles.coverageGrid}><article><MapPin /><span>Chennai</span><strong>Responsive local sourcing support</strong></article><article><Building2 /><span>South India</span><strong>Wholesale and manufacturing requirements</strong></article><article><Truck /><span>Pan India</span><strong>Commercial supply coordination</strong></article></div><div className={styles.coverageActions}><a href="tel:+919840992985"><Phone />Call the Chennai Team</a><Link href="/contact/#enquiry">Send Your Requirement</Link><a href="https://www.google.com/maps/search/?api=1&query=Vikranth+Chemical+Corporation+Kolathur+Chennai" target="_blank" rel="noreferrer"><MapPin />View on Google Maps</a></div></div>
    </section>

    <section className={styles.aboutFaq} aria-labelledby="about-faq-title">
      <div className={styles.sectionHeading + " aboutReveal"}><span className={styles.eyebrow}>Company and sourcing answers</span><h2 id="about-faq-title">About Vikranth: Buyer Questions</h2></div>
      <div>{aboutFaqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span><h3>{question}</h3><b>+</b></summary><p>{answer}</p></details>)}</div>
    </section>

    <section className={styles.finalCta}><span>Start a conversation</span><h2>Tell Us What Your Product Needs</h2><p>Share the application, required ingredient, approximate quantity, document needs and delivery location. The Vikranth team will review the requirement and confirm the next sourcing step.</p><div><Link href="/contact/#enquiry">Request a Quotation <ArrowRight /></Link><a href={"https://wa.me/" + WHATSAPP_NUMBERS.general} target="_blank" rel="noreferrer">Discuss on WhatsApp</a></div></section>
  </>;
}
