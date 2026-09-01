"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, BadgeCheck, Beaker, Box, Building2, CakeSlice, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleGauge, Clock3, FlaskConical,
  Globe2, Handshake, Headphones, HeartPulse, IceCreamBowl, Leaf,
  Mail, MapPin, Menu, Milk, PackageCheck, Phone,
  ShieldCheck, Sparkles, Truck, Wheat, X, Zap
} from "lucide-react";
import GlobalSearch from "./components/GlobalSearch";
import { getProductHref, industries, productMenuGroupsByIndustrySlug } from "./data/catalog";
import { partners } from "./data/partners";
import { WHATSAPP_NUMBERS } from "./data/whatsapp";

const verifiedClaimsAvailable = false;
const verifiedGuidesAvailable = false;

const homeFaqs = [
  ["What food ingredients does Vikranth Chemical supply in Chennai?", "Vikranth Chemical Corporation supplies bakery, chocolate and confectionery, dairy, beverage, ice cream, fruit-processing, hydrocolloid, sweetener, functional, nutraceutical and food-additive ingredients for manufacturers and professional buyers."],
  ["Which manufacturer portfolios can buyers enquire about through Vikranth?", "Buyers can enquire about listed portfolios from Roquette, Döhler, CP Kelco, Nitta Gelatin India and other ingredient manufacturers. The exact manufacturer, relationship, grade and current availability are confirmed for each enquiry."],
  ["Does Vikranth Chemical supply food ingredients outside Chennai?", "Vikranth is based in Chennai and accepts business enquiries from Tamil Nadu, South India and other locations across India. Delivery options and serviceability are confirmed for the selected product, quantity and destination."],
  ["Does Vikranth support bulk ingredient requirements?", "Yes. Vikranth primarily supports manufacturers, bakeries, food processors and other professional buyers with bulk and wholesale ingredient requirements. Mention the product, application, approximate quantity and delivery location when requesting a quotation."],
  ["Can retail or small-quantity buyers purchase from Vikranth?", "Select retail and small-quantity enquiries are considered for specific ingredients. Share the product, application and required quantity, and the team will confirm current availability."],
];

const allProductGroups = [
  { name: "Bakery Ingredients", icon: CakeSlice, image: "/industries/bakery-ingredients.webp", accent: "#efb16f", blurb: "Commercial bakery ingredients for improved cake volume, bread texture, softness and shelf-life performance.", subgroups: {
    "Cake Ingredients": ["Cake Gel", "Cake Life", "Custard Powder"],
    "Bread Ingredients": ["Bread Yield Improver"], "Leavening Agents": ["MACP (Mono Acid Calcium Phosphate)", "Baking Powder"], "Biscuit Ingredients": ["Biscuit Enhancer"],
    "Bakery Syrups": ["Cake Syrup"], "Shelf Life Improvers": ["Calcium Propionate (CP)"]
  }},
  { name: "Chocolate & Confectionery", icon: Sparkles, image: "/industries/chocolate-confectionery.webp", accent: "#a76443", blurb: "Cocoa powder, cocoa butter, couverture, chocolate compounds and confectionery ingredients for professional production.", subgroups: {
    "Cocoa Products": ["Cocoa Butter", "Cocoa Mass", "Cocoa Powder"], "Chocolate Range": ["Dark Chocolate", "Milk Chocolate", "White Chocolate"],
    "Choco Chips": ["White Chips", "Dark Chips", "Milk Chips"], "Chocomass": ["White Chocomass", "Dark Chocomass", "Milk Chocomass"],
    "Chocolate Paste": ["Choco Paste"], "Chocolate Beverage Solutions": ["Chocolate Drink"]
  }},
  { name: "Dairy", icon: Milk, image: "/industries/dairy-ingredients.webp", accent: "#e8d8bb", blurb: "Milk powder and whey products for food manufacturers.", subgroups: {
    "Milk Powder": ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"]
  }},
  { name: "Beverage Ingredients", icon: FlaskConical, image: "/industries/beverage-ingredients.webp", accent: "#d68d55", blurb: "Beverage flavours, fruit bases, sweeteners and stabilizing ingredients for consistent commercial drink formulations.", subgroups: {
    "Beverage Flavours": ["Natural Food and Beverage Ingredients"], "Beverage Bases": ["Chocolate Drink"]
  }},
  { name: "Icecream Products", icon: IceCreamBowl, image: "/industries/ice-cream-ingredients.webp", accent: "#f4cfc2", blurb: "Ice cream bases, flavours, dessert toppings and stabilizers for smooth texture, body and reliable batch consistency.", subgroups: {
    "Ice Cream Stabilizers": ["Ice Cream Stabilizer"]
  }},
  { name: "Fruit Processing", icon: Leaf, image: "/industries/fruit-processing.webp", accent: "#c68556", blurb: "Fruit fillings, purees, preparations, pectin and glaze solutions for bakery, beverage and dessert applications.", subgroups: {
    "Fruit Fillings": ["Fruit Filling"], "Fruit Preparations": ["Fruit Crush"],
    "Gelling Agents": ["Genu Pectin"], "Glazes & Toppings": ["Glaze Gel"]
  }},
  { name: "Hydrocolloids", icon: Beaker, image: "/industries/hydrocolloids-stabilizers.webp", accent: "#a97e56", blurb: "Pectin, gelatin, xanthan gum, guar gum and CMC for viscosity control, stability, texture and mouthfeel.", subgroups: {
    "Pectin": ["Genu Pectin (For Jam, Juice, Jelly, etc.)"], "Gelatin": ["Gelatin 120 Bloom", "Gelatin 180 Bloom"],
    "Food Gums": ["Xanthan Gum", "Guar Gum", "Sodium CMC"], "Ice Cream Stabilizers": ["Ice Cream Stabilizer"]
  }},
  { name: "Sweeteners, Syrups & Starches", icon: Wheat, image: "/industries/sweeteners-syrups-starches.webp", accent: "#d0a34f", blurb: "Liquid glucose, sorbitol, dextrose, maltodextrin and food starches for sweetness, body and processing performance.", subgroups: {
    "Liquid Sweeteners": ["Liquid Glucose", "High Maltose Syrups", "Sorbitol 70% Solution", "Invert Sugar"], "Sweeteners": ["Glucose D", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Sucrose"], "Sugar Free": ["Sucralose", "Acesulfame K", "Aspartame Powder", "Saccharin", "Maltitol"],
    "Starches": ["Maize Starch", "Maize Starch Powder", "Potato Starch"], "Carbohydrates": ["Dextrose Monohydrate", "Maltodextrin Powder"], "Syrups": ["Cake Syrup"]
  }},
  { name: "Functional Ingredients", icon: CircleGauge, image: "/industries/functional-ingredients.webp", accent: "#b97547", blurb: "Food emulsifiers, proteins and processing aids selected for dependable texture, structure, stability and production efficiency.", subgroups: {
    "Emulsifiers": ["GMS Flakes", "GMS Powder", "Sorbitan Monostearate", "Finamul 90", "Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin"],
    "Proteins": ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Full-Fat Soya Flour", "Vital Wheat Gluten", "Skimmed Milk Powder"],
    "Processing Ingredients": ["Calcium Carbonate", "Calcium Chloride", "Calcium Gluconate", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"]
  }},
  { name: "Nutraceutical & Pharma", icon: HeartPulse, image: "/industries/nutraceutical-pharma.webp", accent: "#bf8c6e", blurb: "Proteins, gelatin, vitamins and mineral ingredients for nutraceutical, wellness and pharmaceutical product development.", subgroups: {
    "Protein Ingredients": ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein"], "Gelatin": ["Gelatin 120 Bloom", "Gelatin 180 Bloom"],
    "Vitamins & Minerals": ["Ascorbic Acid", "Calcium Carbonate", "Calcium Gluconate"], "Sugar-Free Excipients": ["Isomalt", "SWEETPEARL® P 200 Maltitol"]
  }},
  { name: "Food Additives & Preservatives", icon: ShieldCheck, image: "/industries/food-additives-preservatives.webp", accent: "#956039", blurb: "Food preservatives, acidulants, leavening agents, colours and flavours for shelf life, taste and processing control.", subgroups: {
    "Preservatives": ["Potassium Sorbate", "Sorbic Acid", "Sodium Benzoate", "Potassium Metabisulphite (KMS)"],
    "Acidulants": ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Vinegar", "Ascorbic Acid"],
    "Emulsifiers": ["Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin", "GMS Flakes", "GMS Powder", "Sorbitan Monostearate", "Finamul 90"],
    "Hydrocolloids": ["Xanthan Gum", "Guar Gum", "Sodium CMC"],
    "Sweeteners & Syrups": ["Sorbitol 70% Solution", "Invert Sugar", "Aspartame Powder", "Malt Extract Powder"],
    "Starches & Functional Ingredients": ["Potato Starch", "Vital Wheat Gluten", "Whey Protein", "Soya Protein"],
    "Leavening & Baking Ingredients": ["Ammonium Bicarbonate", "Baking Powder", "Sodium Bicarbonate", "SAPP (Sodium Acid Pyrophosphate)"],
    "Minerals & Processing Ingredients": ["Calcium Carbonate", "Calcium Chloride", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"],
    "Colours, Flavours & Natural Extracts": ["Black Cocoa Powder", "Caramel", "Extra Pure Vanillin", "Orange Oil", "Saucetec"],
    "Milk Powder": ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"]
  }}
];

const productGroups = [
  allProductGroups[1], allProductGroups[0], allProductGroups[3],
  allProductGroups[4], allProductGroups[8], allProductGroups[9],
  allProductGroups[2], allProductGroups[10], allProductGroups[6],
  allProductGroups[5], allProductGroups[7]
];
const industrySlugs = ["chocolate-confectionery","bakery-ingredients","beverage-ingredients","ice-cream-ingredients","functional-ingredients","nutraceutical-pharma","dairy-ingredients","food-additives-preservatives","hydrocolloids-stabilizers","fruit-processing","sweeteners-syrups-starches"];
const productCategories = productGroups.map((group, index) => ({
  id: String(index + 1).padStart(2, "0"),
  name: group.name,
  description: group.blurb,
  image: `/products/${industrySlugs[index]}-v2.webp`,
  thumbnail: `/products/${industrySlugs[index]}-v1.webp`,
  href: `/industries/${industrySlugs[index]}`
}));

const ecosystemImage = "/ingredient-portfolio.webp";
const ecosystemCategories = [
  { number: "01", name: <>Chocolate &amp;<br/>Confectionery</>, label: "Chocolate & Confectionery", icon: Box, href: "/industries/chocolate-confectionery", groupIndex: 0 },
  { number: "02", name: <>Bakery<br/>Ingredients</>, label: "Bakery Ingredients", icon: Wheat, href: "/industries/bakery-ingredients", groupIndex: 1 },
  { number: "03", name: <>Beverage<br/>Ingredients</>, label: "Beverage Ingredients", icon: FlaskConical, href: "/industries/beverage-ingredients", groupIndex: 2 },
  { number: "04", name: <>Icecream<br/>Products</>, label: "Icecream Products", icon: IceCreamBowl, href: "/industries/ice-cream-ingredients", groupIndex: 3 },
  { number: "05", name: <>Functional<br/>Ingredients</>, label: "Functional Ingredients", icon: Sparkles, href: "/industries/functional-ingredients", groupIndex: 4 },
  { number: "06", name: <>Nutraceutical &amp;<br/>Pharma</>, label: "Nutraceutical & Pharma", icon: HeartPulse, href: "/industries/nutraceutical-pharma", groupIndex: 5 },
  { number: "07", name: <>Dairy</>, label: "Dairy", icon: Milk, href: "/industries/dairy-ingredients", groupIndex: 6 },
  { number: "08", name: <>Food Additives &amp;<br/>Preservatives</>, label: "Food Additives & Preservatives", icon: ShieldCheck, href: "/industries/food-additives-preservatives", groupIndex: 7 },
  { number: "09", name: <>Hydrocolloids</>, label: "Hydrocolloids", icon: Beaker, href: "/industries/hydrocolloids-stabilizers", groupIndex: 8 },
  { number: "10", name: <>Fruit<br/>Processing</>, label: "Fruit Processing", icon: Leaf, href: "/industries/fruit-processing", groupIndex: 9 },
  { number: "11", name: <>Sweeteners, Syrups<br/>&amp; Starches</>, label: "Sweeteners, Syrups & Starches", icon: CircleGauge, href: "/industries/sweeteners-syrups-starches", groupIndex: 10 }
];

const associates = [
  { name: "CAMPCO", logo: "/partners/campco-heart.webp" },
  { name: "Delta Nutritives", logo: "/partners/delta.webp" },
  { name: "Roquette", logo: "/partners/roquette.webp" },
  { name: "Nitta Gelatin India", logo: "/partners/nitta.webp" },
  { name: "Döhler", logo: "/partners/doehler.webp" },
  { name: "CP Kelco", logo: "/partners/cp-kelco.webp" },
  { name: "Calpro Specialities Pvt. Ltd.", logo: "/partners/calpro.webp" },
  { name: "Gujarat Ambuja Exports Ltd.", logo: "/partners/ambuja.webp" },
  { name: "Fine Organics", logo: "/partners/fine-organics.webp" },
  { name: "Shree Gluco Biotech Pvt. Ltd.", logo: "/partners/shree-gluco.webp" },
  { name: "Paramesu Biotech Ltd.", logo: "/partners/paramesu.webp" },
  { name: "Anchor (In-house manufacturing brand)", logo: "/partners/anchor.webp" }
];
const partnerSlugs = ["campco","delta-nutritives","roquette","nitta-gelatin-india-ltd","doehler","cp-kelco","calpro-specialities-pvt-ltd","gujarat-ambuja-exports-ltd","fine-organics","shree-gluco-biotech-pvt-ltd","paramesu-biotech-ltd","anchor"];

const testimonials = [
  { quote: "Vikranth has consistently supported our ingredient requirements with dependable quality and prompt service. Their team understands our application needs and recommends suitable products.", role: "Purchase Manager", company: "Bakery Manufacturer", location: "Chennai", result: "Dependable quality and prompt service", initials: "PM" },
  { quote: "The cocoa products we source through Vikranth deliver consistent taste, colour and performance across our production batches. Their communication and delivery coordination are excellent.", role: "Production Head", company: "Chocolate & Confectionery Brand", location: "Tamil Nadu", result: "Consistent quality across every batch", initials: "PH" },
  { quote: "From product selection to documentation and dispatch, the entire process is handled professionally. Vikranth has become a reliable ingredient partner for our growing business.", role: "Managing Director", company: "Food Processing Company", location: "South India", result: "Professional support from selection to dispatch", initials: "MD" },
];

const ingredientInsights = [
  ["Cocoa guide", "How to Choose Cocoa Powder for Bakery Products", "Understand colour, flavour and application considerations.", "01"],
  ["Cocoa ingredients", "Cocoa Powder, Cocoa Mass or Cocoa Butter?", "Learn the function of each cocoa ingredient.", "02"],
  ["Bakery guide", "Choosing Ingredients for Better Cake Texture", "Explore premixes, emulsifiers, proteins and leavening agents.", "03"],
  ["Texture guide", "How Stabilizers Improve Food Texture", "Understand consistency in dairy, beverages and desserts.", "04"]
];

function Logo({ light = false }) {
  return (
    <a className={`logo ${light ? "light" : ""}`} href="#home" aria-label="Vikranth home">
      <img className="brand-logo-image" src="/logo-vikranth.webp" alt="VCC — Vikranth Chemical Corporation" width="156" height="73" decoding="async" />
    </a>
  );
}

function QuoteForm({ selected, onDone }) {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => onDone?.(), 3200); };
  if (sent) return (
    <div className="success-state">
      <span><Check size={30}/></span><h3>Request confirmed.</h3>
      <p>Thank you. A Vikranth ingredient specialist will contact you within one business day.</p>
    </div>
  );
  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="field-row">
        <label>Your name<input placeholder="Full name" required /></label>
        <label>Company name<input placeholder="Company" required /></label>
      </div>
      <div className="field-row">
        <label>Work email<input type="email" placeholder="name@company.com" required /></label>
        <label>Phone number<input type="tel" placeholder="+91" required /></label>
      </div>
      <label>Ingredient or application<input defaultValue={selected || ""} placeholder="e.g. Cocoa Powder" /></label>
      <div className="field-row">
        <label>Required quantity<input placeholder="e.g. 500 kg" required /></label>
        <label>Delivery location<input placeholder="City / PIN code" required /></label>
      </div>
      <label>Message<textarea placeholder="Tell us about your product or requirement" rows="3" required /></label>
      <button className="btn primary wide" type="submit">Confirm request <ArrowRight size={17}/></button>
      <p className="form-note"><ShieldCheck size={14}/> Your details stay private and are used only for this enquiry.</p>
    </form>
  );
}

function AnimatedStat({ value, suffix = "+", label, Icon, delay = 0 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }
    let frame;
    const startTime = performance.now() + delay;
    const duration = 1250;
    const tick = (now) => {
      if (now < startTime) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, delay]);

  return (
    <div className="trust-stat" ref={(node) => {
      if (!node || started) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      }, { threshold: 0.35 });
      observer.observe(node);
    }}>
      <span className="trust-stat-icon" aria-hidden="true"><Icon /></span>
      <span className="trust-stat-copy">
        <strong>{count}{suffix}</strong>
        <span>{label}</span>
      </span>
    </div>
  );
}

function BotanicalCorners() {
  return (
    <div className="botanical-corners" aria-hidden="true">
      <span className="botanical-line botanical-cocoa"><img src="/decor/cocoa-corner.webp" alt="" width="1254" height="1254" loading="lazy" decoding="async" /></span>
      <span className="botanical-line botanical-leaves"><img src="/decor/leaf-corner.webp" alt="" width="1254" height="1254" loading="lazy" decoding="async" /></span>
    </div>
  );
}

function IngredientEcosystem() {
  const renderCard = (category) => {
    const Icon = category.icon;
    return (
      <a className="vcc-ecosystem-card" href={category.href} key={category.number} aria-label={`Explore ${category.label}`}>
        <span className="vcc-ecosystem-number">{category.number}</span>
        <Icon aria-hidden="true"/>
        <span className="vcc-ecosystem-name">{category.name}</span>
        <ArrowRight className="vcc-ecosystem-arrow" aria-hidden="true"/>
      </a>
    );
  };

  return (
    <section className="vcc-ingredient-ecosystem botanical-light-section" aria-labelledby="ecosystem-title">
      <BotanicalCorners/>
      <div className="vcc-ecosystem-heading">
        <span className="vcc-ecosystem-eyebrow"><i/>The Vikranth Ingredient Ecosystem<i/></span>
        <h2 id="ecosystem-title">Everything Your Product Needs</h2>
        <p>Eleven focused portfolios. One dependable B2B ingredient partner.</p>
      </div>
      <div className="vcc-ecosystem-layout">
        <svg className="vcc-ecosystem-connectors" viewBox="0 0 1400 610" preserveAspectRatio="none" aria-hidden="true">
          <g>{[65,185,305,425,545].map((y, i) => <path key={`l-${y}`} d={`M 310 ${y} L ${355 + i * 4} ${y} L ${430 + i * 7} ${105 + i * 100}`}/>)}</g>
          <g>{[55,155,255,355,455,555].map((y, i) => <path key={`r-${y}`} d={`M 1090 ${y} L ${1045 - i * 3} ${y} L ${970 - i * 5} ${82 + i * 89}`}/>)}</g>
          <g>{[65,185,305,425,545].map(y => <circle key={`lc-${y}`} cx="310" cy={y} r="5"/>)}{[55,155,255,355,455,555].map(y => <circle key={`rc-${y}`} cx="1090" cy={y} r="5"/>)}</g>
        </svg>
        <div className="vcc-ecosystem-column vcc-ecosystem-left">{ecosystemCategories.slice(0, 5).map(renderCard)}</div>
        <div className="vcc-ecosystem-centre">
          <div className="vcc-ecosystem-image-wrap">
            <img src={ecosystemImage} alt="Vikranth food ingredient portfolio featuring bakery, chocolate, dairy, beverage, fruit and specialty ingredients" loading="lazy" decoding="async"/>
            <div className="vcc-ecosystem-badge"><IceCreamBowl aria-hidden="true"/><strong>B2B</strong><span>Ingredient<br/>Portfolio</span><i/></div>
          </div>
          <a className="vcc-ecosystem-cta" href="/products">Explore All Products</a>
        </div>
        <div className="vcc-ecosystem-column vcc-ecosystem-right">{ecosystemCategories.slice(5).map(renderCard)}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [industryMegaOpen, setIndustryMegaOpen] = useState(false);
  const [supplierMegaOpen, setSupplierMegaOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(1);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const megaMenuRef = useRef(null);
  const heroVideoRef = useRef(null);
  const featureMotionFrame = useRef(null);
  const insightCarouselRef = useRef(null);
  const insightTrackRef = useRef(null);
  const insightControlTimer = useRef(null);
  const supplierMarqueeRef = useRef(null);
  const supplierTrackRef = useRef(null);
  const supplierControlTimer = useRef(null);
  const customerMarqueeRef = useRef(null);
  const customerTrackRef = useRef(null);
  const customerControlTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      const saveData = navigator.connection?.saveData;
      if (reducedMotion.matches || saveData) {
        video.pause();
        video.removeAttribute("autoplay");
      } else {
        video.play().catch(() => {});
      }
    };
    updatePlayback();
    reducedMotion.addEventListener?.("change", updatePlayback);
    return () => reducedMotion.removeEventListener?.("change", updatePlayback);
  }, []);
  useEffect(() => () => {
    if (featureMotionFrame.current) cancelAnimationFrame(featureMotionFrame.current);
    if (insightControlTimer.current) window.clearTimeout(insightControlTimer.current);
    if (supplierControlTimer.current) window.clearTimeout(supplierControlTimer.current);
    if (customerControlTimer.current) window.clearTimeout(customerControlTimer.current);
  }, []);
  useEffect(() => {
    if (testimonialPaused) return;
    const rotation = window.setTimeout(() => {
      setActiveTestimonial(current => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearTimeout(rotation);
  }, [activeTestimonial, testimonialPaused]);
  useEffect(() => {
    const nodes = document.querySelectorAll(".section-head, .portfolio-visual, .product-card, .about-section-head, .about-visual, .about-copy, .about .value-list > div, .quality-section-head, .faq-section-head, .quality-copy, .quality-cards article, .supplier-head, .supplier-feature > div, .insight-grid article, .vcc-ecosystem-heading, .vcc-ecosystem-card, .vcc-ecosystem-centre, .testimonial-heading, .testimonial-card-grid .testimonial-card, .testimonial-trust-summary > div, .cta-inner");
    const botanicalNodes = document.querySelectorAll(".botanical-corners");
    nodes.forEach((node, index) => {
      node.classList.add("reveal-item");
      node.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    const botanicalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-drawn"));
    }, { threshold: 0.18 });
    nodes.forEach((node) => observer.observe(node));
    botanicalNodes.forEach((node) => botanicalObserver.observe(node));
    return () => { observer.disconnect(); botanicalObserver.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = (quoteOpen || menuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [quoteOpen, menuOpen]);

  useEffect(() => {
    if (!megaOpen && !industryMegaOpen && !supplierMegaOpen) return;
    const closeOnOutsideClick = (event) => {
      if (!megaMenuRef.current?.contains(event.target)) {
        setMegaOpen(false);
        setIndustryMegaOpen(false);
        setSupplierMegaOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setIndustryMegaOpen(false);
        setSupplierMegaOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [megaOpen, industryMegaOpen, supplierMegaOpen]);

  useEffect(() => {
    if (activeGroup < thumbnailStart) setThumbnailStart(activeGroup);
    if (activeGroup > thumbnailStart + 4) setThumbnailStart(activeGroup - 4);
  }, [activeGroup, thumbnailStart]);

  const openQuote = (product = "") => { setSelectedProduct(product); setQuoteOpen(true); setMenuOpen(false); };
  const jump = () => { setMenuOpen(false); setMegaOpen(false); setIndustryMegaOpen(false); setSupplierMegaOpen(false); };
  const updateFeatureSpotlight = (event) => {
    const card = event.currentTarget;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.style.setProperty("--spotlight-opacity", "0");
      return;
    }
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--spotlight-opacity", "1");
    if (featureMotionFrame.current) cancelAnimationFrame(featureMotionFrame.current);
    featureMotionFrame.current = requestAnimationFrame(() => {
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };
  const clearFeatureSpotlight = (event) => event.currentTarget.style.setProperty("--spotlight-opacity", "0");
  const moveInsightCarousel = (direction) => {
    const track = insightTrackRef.current;
    const motion = track?.getAnimations().find(animation => animation.animationName === "insightCarouselRight");
    if (!motion) {
      const card = track?.querySelector("article");
      insightCarouselRef.current?.scrollBy({ left: direction * ((card?.offsetWidth || 340) + 18), behavior: "smooth" });
      return;
    }
    const duration = Number(motion.effect?.getTiming().duration) || 34000;
    if (direction < 0 && Number(motion.currentTime) < duration) motion.currentTime = Number(motion.currentTime || 0) + duration;
    motion.updatePlaybackRate(direction * 4.5);
    if (insightControlTimer.current) window.clearTimeout(insightControlTimer.current);
    insightControlTimer.current = window.setTimeout(() => motion.updatePlaybackRate(1), 720);
  };
  const moveSupplierCarousel = (direction) => {
    const track = supplierTrackRef.current;
    const motion = track?.getAnimations().find(animation => animation.animationName === "partnerFlowLTR");
    if (!motion) {
      const card = track?.querySelector(".associate-logo");
      supplierMarqueeRef.current?.scrollBy({ left: direction * ((card?.offsetWidth || 205) + 46), behavior: "smooth" });
      return;
    }
    const duration = Number(motion.effect?.getTiming().duration) || 40000;
    if (direction < 0 && Number(motion.currentTime) < duration) motion.currentTime = Number(motion.currentTime || 0) + duration;
    motion.updatePlaybackRate(direction * 4.5);
    if (supplierControlTimer.current) window.clearTimeout(supplierControlTimer.current);
    supplierControlTimer.current = window.setTimeout(() => motion.updatePlaybackRate(1), 720);
  };
  const activeMegaCategory = productCategories[activeGroup] || productCategories[0];
  const activeMegaIndustry = industries[activeGroup] || industries[0];
  const activeMegaGroups = productMenuGroupsByIndustrySlug[activeMegaIndustry.slug] || [{ name: "Ingredients", ingredients: activeMegaIndustry.products }];


  const moveCustomerCarousel = (direction) => {
    const track = customerTrackRef.current;
    const motion = track?.getAnimations().find(animation => animation.animationName === "homeTrustedCustomerFlow");
    if (!motion) {
      const card = track?.querySelector(".home-customer-logo");
      customerMarqueeRef.current?.scrollBy({ left: direction * ((card?.offsetWidth || 205) + 46), behavior: "smooth" });
      return;
    }
    const duration = Number(motion.effect?.getTiming().duration) || 34000;
    if (direction < 0 && Number(motion.currentTime) < duration) motion.currentTime = Number(motion.currentTime || 0) + duration;
    motion.updatePlaybackRate(direction * 4.5);
    if (customerControlTimer.current) window.clearTimeout(customerControlTimer.current);
    customerControlTimer.current = window.setTimeout(() => motion.updatePlaybackRate(1), 720);
  };
  return (
    <main className="home-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://www.vikranthchemicalcorporation.com/#webpage", url: "https://www.vikranthchemicalcorporation.com/", name: "Food Ingredients Supplier in Chennai | Vikranth Chemical", description: "Vikranth Chemical Corporation supplies bakery, chocolate, dairy, beverage and food-additive ingredients across India. Request a quote today.", isPartOf: { "@id": "https://www.vikranthchemicalcorporation.com/#website" }, about: { "@id": "https://www.vikranthchemicalcorporation.com/#organization" } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
        { "@context": "https://schema.org", "@type": "ItemList", name: "Food ingredient categories", itemListElement: productCategories.map((category, index) => ({ "@type": "ListItem", position: index + 1, name: category.name, url: `https://www.vikranthchemicalcorporation.com${category.href}/` })) },
      ]) }} />
      <div className="utility">
        <div className="utility-viewport">
          <div className="utility-track">
            <div className="utility-set">
              <span><BadgeCheck size={14}/> Food Ingredients</span>
              <span><MapPin size={14}/> Chennai</span>
              <span className="utility-tag">Chennai · India</span>
              <a className="utility-contact" href="tel:+918754442924"><Phone size={14}/> +91 87544 42924</a>
              <a className="utility-contact" href="mailto:vikranth.chemicals@gmail.com"><Mail size={14}/> vikranth.chemicals@gmail.com</a>
            </div>
            <div className="utility-set" aria-hidden="true">
              <span><BadgeCheck size={14}/> Food Ingredients</span>
              <span><MapPin size={14}/> Chennai</span>
              <span className="utility-tag">Chennai · India</span>
              <span className="utility-contact"><Phone size={14}/> +91 87544 42924</span>
              <span className="utility-contact"><Mail size={14}/> vikranth.chemicals@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <header className={scrolled ? "scrolled" : ""} ref={megaMenuRef}>
        <div className="container nav-wrap">
          <Logo />
          <nav id="home-navigation" className={`home-nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
            <a href="#home" onClick={jump}>Home</a>
            <a href="/about" onClick={jump}>About</a>
            <button className="nav-product" onClick={() => { setMegaOpen(v => !v); setIndustryMegaOpen(false); setSupplierMegaOpen(false); }} aria-expanded={megaOpen} aria-controls="products-mega-menu">Products <ChevronDown size={14}/></button>
            <a className="mobile-products-link" href="/products" onClick={jump}>Products</a>
            <button className="nav-product nav-industry" onClick={() => { setIndustryMegaOpen(v => !v); setMegaOpen(false); setSupplierMegaOpen(false); }} aria-expanded={industryMegaOpen} aria-controls="industries-mega-menu">Industries <ChevronDown size={14}/></button>
            <a className="mobile-products-link" href="/industries" onClick={jump}>Industries</a>
            <button className="nav-product nav-supplier" onClick={() => { setSupplierMegaOpen(v => !v); setMegaOpen(false); setIndustryMegaOpen(false); }} aria-expanded={supplierMegaOpen} aria-controls="suppliers-mega-menu">Suppliers <ChevronDown size={14}/></button>
            <a className="mobile-products-link" href="/associates" onClick={jump}>Suppliers</a>
            <a href="/contact" onClick={jump}>Contact</a>
          </nav>
          <div className="nav-actions">
            <GlobalSearch onOpen={() => { setMenuOpen(false); setMegaOpen(false); setIndustryMegaOpen(false); setSupplierMegaOpen(false); }}/>
            <button className="btn primary header-quote" onClick={() => openQuote("Header quote request")}>Request a Quote <ArrowRight size={16}/></button>
            <button className="menu-trigger" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="home-navigation">{menuOpen ? <X/> : <Menu/>}</button>
          </div>
        </div>
        <div id="products-mega-menu" className={`mega-menu vcc-products-mega-menu latest-mega-menu ${megaOpen ? "show" : ""}`} aria-hidden={!megaOpen}>
          <span className="latest-mega-pointer" aria-hidden="true"/>
          <div className="latest-mega-surface">
            <aside className="latest-mega-selector" aria-label="Product categories">
              <div className="latest-mega-selector-head">
                <Wheat aria-hidden="true"/>
                <div>
                  <span>Product Categories</span>
                  <small>{productCategories.length} industries</small>
                </div>
                <p>Ingredients organised by industry.</p>
              </div>
              <div className="latest-mega-selector-list">
                {productCategories.map((category, index) => (
                  <button
                    key={category.id}
                    className={activeGroup === index ? "active" : ""}
                    type="button"
                    onMouseEnter={() => setActiveGroup(index)}
                    onFocus={() => setActiveGroup(index)}
                    onClick={() => setActiveGroup(index)}
                  >
                    <small aria-hidden="true">{String(index + 1).padStart(2, "0")}</small>
                    <span>{category.name}</span>
                    <ChevronRight aria-hidden="true"/>
                  </button>
                ))}
              </div>
            </aside>
            <section className="latest-mega-product-panel" aria-live="polite">
              <div className="latest-mega-product-head">
                <div>
                  <span>Ingredients for</span>
                  <h2>{activeMegaCategory.name}</h2>
                  <p>{activeMegaCategory.description}</p>
                </div>
                <a href={activeMegaCategory.href} onClick={jump}>Explore category <ArrowRight aria-hidden="true"/></a>
              </div>
              <div className="latest-mega-product-groups">
                {activeMegaGroups.map((group) => (
                  <div className="latest-mega-product-group" key={group.name}>
                    <h3>{group.name}</h3>
                    <div>
                      {group.ingredients.map((product) => (
                        <a key={`${group.name}-${product}`} href={getProductHref(product)} onClick={jump}>
                          <span>{product}</span>
                          <ArrowRight aria-hidden="true"/>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div id="industries-mega-menu" className={`mega-menu latest-mega-menu industry-mega-menu industries-showcase-menu ${industryMegaOpen ? "show" : ""}`} aria-hidden={!industryMegaOpen}>
          <span className="latest-mega-pointer industry-mega-pointer" aria-hidden="true"/>
          <div className="industries-showcase-surface">
            <aside className="industries-showcase-intro">
              <div>
                <span>Solutions by industry</span>
                <p>Find ingredients selected for your production needs.</p>
              </div>
              <img src="/industries/chocolate-confectionery.webp" alt="Chocolate, bakery and dessert ingredient applications" width="420" height="560"/>
              <a href="/industries" onClick={jump}>View All Industries <ArrowRight aria-hidden="true"/></a>
            </aside>
            <section className="industries-showcase-content">
              <div className="industries-showcase-heading">
                <span>Industries We Serve</span>
                <small>{industries.length} specialist categories</small>
              </div>
              <div className="industries-showcase-grid" aria-label="Industries">
                {productCategories.map((industry, index) => {
                  const IndustryIcon = productGroups[index]?.icon || Building2;
                  return (
                    <a key={industry.id} className={index === 1 ? "featured" : ""} href={industry.href} onClick={jump}>
                      <IndustryIcon className="industry-showcase-icon" aria-hidden="true"/>
                      <strong>{industry.name}</strong>
                      <p>{industry.description}</p>
                      <ArrowRight className="industry-showcase-arrow" aria-hidden="true"/>
                    </a>
                  );
                })}
              </div>
              <div className="industries-showcase-help">
                <span className="industries-help-icon"><Headphones aria-hidden="true"/></span>
                <strong>Not sure which solution fits your application?</strong>
                <button type="button" onClick={() => openQuote("Industry ingredient specialist request")}>Speak to an Ingredient Specialist <ArrowRight aria-hidden="true"/></button>
              </div>
            </section>
          </div>
        </div>
        <div id="suppliers-mega-menu" className={`mega-menu latest-mega-menu industry-mega-menu supplier-mega-menu ${supplierMegaOpen ? "show" : ""}`} aria-hidden={!supplierMegaOpen}>
          <span className="latest-mega-pointer supplier-mega-pointer" aria-hidden="true"/>
          <div className="industry-menu-surface">
            <div className="industry-menu-head">
              <Handshake aria-hidden="true"/>
              <div><span>Supplier Network</span><h2>Explore by supplier</h2></div>
              <small>{partners.length} suppliers</small>
            </div>
            <div className="industry-menu-grid" aria-label="Suppliers">
              {partners.map((partner) => (
                <a key={partner.slug} href={`/associates/${partner.slug}`} onClick={jump}>
                  {partner.logo ? <img className="supplier-item-logo" src={partner.logo} alt="" width="180" height="80" loading="lazy" decoding="async"/> : <span className="supplier-item-logo supplier-item-logo-fallback" aria-hidden="true">A</span>}
                  <span>{partner.name}</span>
                  <ArrowRight className="industry-item-arrow" aria-hidden="true"/>
                </a>
              ))}
              <a className="industry-menu-all" href="/associates" onClick={jump}>
                <span>View all suppliers</span>
                <ArrowRight aria-hidden="true"/>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <video
          ref={heroVideoRef}
          className="hero-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-chocolate-poster.webp"
          aria-hidden="true"
        >
          <source src="/hero-chocolate-ingredients.mp4" type="video/mp4" media="(min-width: 541px)" />
        </video>
        <div className="hero-shade"/>
        <div className="hero-grain" aria-hidden="true"/>
        <div className="container hero-content">
          <span className="hero-mini-title">Food Ingredients · Chennai</span>
          <h1>Food Ingredients <em>Supplier in Chennai</em></h1>
          <div className="hero-copy">
            <p>Bakery, chocolate &amp; confectionery, dairy, beverage, ice cream, fruit processing, hydrocolloids, sweeteners, functional, nutraceutical and food additive ingredients. Explore listed portfolios from Roquette, Döhler, CP Kelco, Nitta Gelatin India and Anchor; availability and delivery are confirmed per enquiry.</p>
            <small className="hero-tagline" aria-hidden="true">Your Product Vision. Our Ingredient Expertise.</small>
            <div className="hero-buttons">
              <a className="btn gold" href="/contact/#enquiry">Request Quote <ArrowRight size={17}/></a>
              <a className="btn ghost" href="https://wa.me/918754442924">WhatsApp Us</a>
              <a className="btn ghost hero-catalogue-link" href="/brochure/">Download Product Catalogue</a>
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span/> Scroll</div>
      </section>

      <section className="home-trust-strip botanical-light-section" aria-labelledby="trust-strip-title">
        <div className="container">
          <div className="trust-strip-copy"><h2 id="trust-strip-title">Food Ingredients Distributor in South India</h2><p>Chennai-based ingredient sourcing for food businesses.</p></div>
          <div className="trust-strip-points">{[[BadgeCheck,"GSTIN 33AADFV9327N1ZO"],[MapPin,"Chennai-based supplier"],[Box,"11 ingredient categories"],[Handshake,"Structured procurement support"]].map(([Icon,label]) => <div key={label}><Icon aria-hidden="true"/><span>{label}</span></div>)}</div>
        </div>
      </section>

      {verifiedClaimsAvailable && <section className="metrics">
        <div className="container metric-grid">
          {[
            [Clock3, "25+", "Years of", "Experience"], [Handshake, "250+", "Business", "Clients"],
            [PackageCheck, "60+", "Ingredient", "Products"], [Globe2, "15+", "Distribution", "Partnerships"]
          ].map(([Icon,n,line1,line2]) => <div key={n} className="metric-item"><span className="metric-icon"><Icon/></span><span className="metric-copy"><strong>{n}</strong><small>{line1}<br/>{line2}</small></span></div>)}
        </div>
      </section>}

      <section className="supplier-section botanical-light-section" id="suppliers">
        <BotanicalCorners/>
        <div className="container">
          <div className="supplier-head"><div><span className="eyebrow">Our Principal Brands</span><h2>Manufacturer &amp;<br/><em>Supplier Network</em></h2></div><p>Vikranth works with established ingredient manufacturers and suppliers across chocolate, bakery, dairy, stabiliser, starch, protein and specialty ingredient categories. Exact product availability, grade, packaging and documentation are confirmed for each enquiry.</p></div>
          <div className="supplier-marquee-shell">
            <button className="supplier-carousel-control previous" type="button" aria-label="Move product network left" aria-controls="supplier-logo-track" onClick={() => moveSupplierCarousel(-1)}><ChevronLeft/></button>
            <div className="logo-marquee" ref={supplierMarqueeRef}><div className="logo-track" id="supplier-logo-track" ref={supplierTrackRef}>{[...partners,...partners].map((partner,i) => <a href={`/associates/${partner.slug}`} className="associate-logo" key={`${partner.slug}-${i}`}>{partner.logo ? <img src={partner.logo} alt={`${partner.name} logo`} width="180" height="80" loading="lazy" decoding="async" /> : <span className="anchor-mark" aria-label={`${partner.name} logo`}>A</span>}</a>)}</div></div>
            <button className="supplier-carousel-control next" type="button" aria-label="Move product network right" aria-controls="supplier-logo-track" onClick={() => moveSupplierCarousel(1)}><ChevronRight/></button>
          </div>
          <div className="supplier-feature">
            <div><Globe2/><span>Product-specific sourcing</span><p>Confirm the manufacturer, grade and available commercial source.</p></div>
            <div><Truck/><span>Delivery confirmation</span><p>Quantity, freight and destination serviceability are checked per order.</p></div>
            <div><Headphones/><span>Human support</span><p>One responsive team from product selection to repeat supply.</p></div>
          </div>
          <div className="supplier-cta-row"><a className="btn outline" href="/associates/">View All Suppliers <ArrowRight size={16}/></a></div>
        </div>
      </section>
      <section className="section product-section botanical-light-section" id="industries" aria-labelledby="industries-title">
        <BotanicalCorners/>
        <div className="container">
          <div className="section-head portfolio-section-head">
            <div>
              <span className="eyebrow">Applications</span>
              <h2 id="industries-title">
                <span className="portfolio-title-line"><span>Industries We Supply</span></span>
              </h2>
            </div>
            <div><p>Ingredients for bakeries, confectioners, dairy, beverages, ice cream and food processing.</p>
              <a className="text-link" href="/industries/">See All Industries <ArrowRight size={16}/></a>
            </div>
          </div>
          <div className="portfolio-visual">
            <img src="/ingredient-portfolio.webp" alt="Chocolate, bakery, dairy, fruit and beverage ingredient applications" width="1821" height="864" loading="lazy" decoding="async" />
            <div className="portfolio-overlay">
              <span>Application-led sourcing</span>
              <strong>From ingredient to finished product.</strong>
              <button className="btn gold" onClick={() => openQuote()}>Discuss your formulation <ArrowRight size={16}/></button>
            </div>
            <div className="portfolio-tags"><span>Cocoa & chocolate</span><span>Bakery systems</span><span>Dairy & cream</span><span>Fruit & beverage</span></div>
          </div>
          <div className="product-grid" id="portfolio-grid">
            {productGroups.map((group, i) => {
              const Icon = group.icon;
              return <a className="product-card" href={`/industries/${industrySlugs[i]}`} aria-label={`View ${group.name} products`} key={group.name} style={{"--accent": group.accent, "--delay": `${i * 60}ms`}}>
                {group.image ? (
                  <div className="category-photo">
                    <img src={group.image} alt={`${group.name} for commercial food production`} width="640" height="480" loading="lazy" decoding="async"/>
                  </div>
                ) : (
                  <div className="category-photo category-placeholder" aria-hidden="true"><Icon/><span>Product image coming soon</span></div>
                )}
                <span className="category-hover-overlay" aria-hidden="true"/>
                <div className="category-card-content">
                  <h3>{group.name}</h3>
                  <span className="category-title-line" aria-hidden="true"/>
                  <p>{group.blurb}</p>
                  <span className="product-route">View Products <ArrowRight size={15}/></span>
                </div>
              </a>
            })}
          </div>
        </div>
      </section>


      <section className="section enquiry-types botanical-light-section" aria-labelledby="enquiry-types-title">
        <BotanicalCorners/>
        <div className="container">
          <div className="section-head"><div><span className="eyebrow">Enquiry options</span><h2 id="enquiry-types-title">Business &amp; Retail Enquiries</h2></div><p>Bulk, wholesale and selected small-quantity enquiries.</p></div>
          <div className="enquiry-type-grid"><article><Building2/><h3>Bulk &amp; Business</h3><p>For manufacturers, bakeries and food processors.</p></article><article><PackageCheck/><h3>Small Quantity</h3><p>Selected ingredients, subject to availability.</p></article></div>
          <a className="btn primary" href="/contact/#enquiry">Send Your Requirement <ArrowRight size={16}/></a>
        </div>
      </section>

      <section className="section about proof-section botanical-light-section" id="about" aria-labelledby="proof-title">
        <BotanicalCorners/>
        <div className="container proof-inner">
          <header className="proof-heading">
            <span className="eyebrow">Why choose Vikranth</span>
            <h2 id="proof-title">Food Ingredient Supply Across South India</h2>
          </header>
          <div className="proof-layout">
            <figure className="proof-visual">
              <img src="/home-warehouse-inventory.jpeg" alt="Food ingredient product inventory stored for distribution from Chennai across South India" width="1264" height="841" loading="lazy" decoding="async"/>
              <figcaption><PackageCheck aria-hidden="true"/> Food ingredient inventory and supply coordination</figcaption>
            </figure>
            <div className="proof-content">
              <p className="proof-summary">Chennai-based ingredient sourcing and distribution for food manufacturers, bakeries, processors and professional buyers.</p>
              <div className="proof-grid" aria-label="Vikranth business highlights">
                {[
                  [Clock3, "25+", "Years of experience", "Ingredient sourcing and supply support."],
                  [Handshake, "1,000+", "Customers served", "Food businesses across Chennai and South India."],
                  [PackageCheck, "300+", "Food ingredient products", "Bakery, chocolate, dairy, beverage and specialty ingredients."],
                  [Building2, "11", "Industries supplied", "Application-led supply for manufacturers and professional buyers."]
                ].map(([Icon, value, title, description]) => <article className="proof-card" key={title}>
                  <span className="proof-icon" aria-hidden="true"><Icon/></span>
                  <strong>{value}</strong>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      {verifiedGuidesAvailable && <section className="section insights botanical-light-section" id="insights">
        <BotanicalCorners/>
        <div className="container">
          <div className="section-title-line insight-section-title"><div className="insight-heading-copy"><span className="eyebrow">Ingredient knowledge</span><h2>Practical Answers for<br/><em>Better Products</em></h2></div><a href="#contact">Explore ingredient guides <ArrowRight size={16}/></a></div>
          <div className="insight-carousel-shell">
            <button className="insight-carousel-control previous" type="button" aria-label="Move ingredient guides left" aria-controls="ingredient-insight-track" onClick={() => moveInsightCarousel(-1)}><ChevronLeft/></button>
            <div className="insight-carousel" ref={insightCarouselRef} aria-label="Ingredient knowledge guides">
              <div className="insight-grid" id="ingredient-insight-track" ref={insightTrackRef}>
                {[...ingredientInsights, ...ingredientInsights].map(([tag,title,summary,no], index) => {
                  const duplicate = index >= ingredientInsights.length;
                  return <article key={`${no}-${index}`} aria-hidden={duplicate ? "true" : undefined}>
                    <span className="article-no">{no}</span><small>{tag}</small><h3>{title}</h3><p>{summary}</p>
                    <div><button type="button" tabIndex={duplicate ? -1 : 0} aria-label={`Read ${title}`}><ArrowRight/></button></div>
                  </article>;
                })}
              </div>
            </div>
            <button className="insight-carousel-control next" type="button" aria-label="Move ingredient guides right" aria-controls="ingredient-insight-track" onClick={() => moveInsightCarousel(1)}><ChevronRight/></button>
          </div>
        </div>
      </section>}

      <section className="section company-intro botanical-light-section" aria-labelledby="company-intro-title">
        <BotanicalCorners/>
        <div className="container company-intro-inner"><div className="company-intro-copy"><span className="eyebrow">Chennai food ingredient partner</span><h2 id="company-intro-title">About Vikranth Chemical Corporation</h2><p>Vikranth Chemical Corporation is a Chennai-based supplier and distributor of food and specialty ingredients for bakery, confectionery, dairy, beverage and food-manufacturing companies. Business buyers across Tamil Nadu, South India and other Indian locations can enquire about current availability, grades, packaging, product documents and delivery options.</p><a className="btn dark" href="/about">Learn More About Vikranth <ArrowRight size={16}/></a></div><figure className="company-intro-visual"><img src="/vikranth-facility.jpeg" alt="Vikranth Chemical Corporation food ingredient distribution facility serving Chennai and South India" width="1264" height="841" loading="lazy" decoding="async"/><figcaption>Chennai operations · South India supply support</figcaption></figure></div>
      </section>

      {verifiedClaimsAvailable && <section className="testimonial-section" aria-labelledby="testimonial-title">
        <div className="container testimonial-inner">
          <div className="testimonial-heading">
            <div><span className="eyebrow">Trusted by food businesses</span><h2 id="testimonial-title">Reliable Ingredients.<br/><em>Consistent Results.</em></h2></div>
          </div>
          <div
            className="testimonial-showcase-light"
            onMouseEnter={() => setTestimonialPaused(true)}
            onMouseLeave={() => setTestimonialPaused(false)}
            onFocus={() => setTestimonialPaused(true)}
            onBlur={() => setTestimonialPaused(false)}
          >
            <figure className="testimonial-professional-image">
              <img src="/home-testimonial.webp" alt="Food professionals reviewing ingredient samples" width="1122" height="1402" loading="lazy" decoding="async" />
              <figcaption><BadgeCheck size={17}/> Trusted ingredient support for professional food businesses</figcaption>
            </figure>
            <div className="testimonial-carousel" aria-live="polite">
              {testimonials.map((review, index) => (
              <article
                className={`testimonial-card testimonial-slide ${index === activeTestimonial ? "active" : ""}`}
                key={review.role}
                aria-hidden={index !== activeTestimonial}
              >
                <span className="testimonial-quote-mark" aria-hidden="true">“</span>
                <div className="testimonial-rating" aria-label="5 out of 5 stars">
                  <span aria-hidden="true">★★★★★</span>
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <footer>
                  <span className="author-avatar" aria-hidden="true">{review.initials}</span>
                  <div><strong>{review.role}</strong><small>{review.company} · {review.location}</small></div>
                </footer>
              </article>
              ))}
              <div className="testimonial-carousel-controls">
                <div className="testimonial-carousel-dots" aria-label="Choose testimonial">
                  {testimonials.map((review, index) => (
                    <button
                      key={review.role}
                      className={index === activeTestimonial ? "active" : ""}
                      onClick={() => setActiveTestimonial(index)}
                      aria-label={`Show testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="testimonial-carousel-arrows">
                  <button onClick={() => setActiveTestimonial(current => (current - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><ChevronLeft /></button>
                  <span>{String(activeTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
                  <button onClick={() => setActiveTestimonial(current => (current + 1) % testimonials.length)} aria-label="Next testimonial"><ChevronRight /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-trust-summary" aria-label="Vikranth business trust summary">
            <AnimatedStat value={25} label="Years of Experience" Icon={Clock3} />
            <AnimatedStat value={60} label="Products" Icon={PackageCheck} delay={100} />
            <AnimatedStat value={15} label="Distribution Partnerships" Icon={Handshake} delay={200} />
            <AnimatedStat value={250} label="Clients" Icon={Building2} delay={300} />
          </div>
        </div>
      </section>}

      <section className="faq-section botanical-light-section" id="faq" aria-labelledby="faq-heading">
        <BotanicalCorners/>
        <div className="container">
          <div className="faq-section-head">
            <span className="eyebrow">Frequently asked questions</span>
            <h2 id="faq-heading">Food Ingredient Supply Questions</h2>
          </div>
          <div className="faq-layout">
          <div className="faq-list">
            {homeFaqs.map(([question, answer]) => (
              <details key={question}>
                <summary><h3>{question}</h3><span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <a className="btn gold faq-contact" href="/faq/">See All FAQs <ArrowRight size={16}/></a>
          </div>
        </div>
      </section>
      <section className="cta-section" id="contact">
        <div className="cta-bg"/><div className="container cta-inner">
          <span className="eyebrow light-text">Tell us what you need</span>
          <h2>Looking for a Food Ingredient<br/><em>Supplier in Chennai?</em></h2>
          <p>Share your required ingredient, application, quantity and delivery location. The Vikranth team will review the requirement and respond with availability and the next steps.</p>
          <div><a className="btn gold" href="/contact/#enquiry">Request a Quote <ArrowRight size={17}/></a><a className="btn ghost" href="tel:+918754442924"><Phone size={16}/> Call Vikranth</a></div>
        </div>
      </section>

      <section className="contact-strip botanical-light-section botanical-light-compact" aria-label="Contact information">
        <BotanicalCorners/>
        <div className="container contact-strip-grid">
          <div><span className="eyebrow">Start your ingredient enquiry</span><h2>Vikranth Chemical Corporation</h2></div>
          <a href="tel:+914425657360"><Phone/><span><small>Phone</small><b>044 2565 7360 / 044 2565 7369<br/>+91 87544 42924 / +91 97909 20252</b></span></a>
          <a href="mailto:vikranth.chemicals@gmail.com"><Mail/><span><small>Email</small><b>vikranth.chemicals@gmail.com</b></span></a>
          <a href="https://www.google.com/maps/search/?api=1&query=Plot+No+2+Sri+Sai+Ram+Street+Jyothi+Nagar+Ponnimmanmedu+Chennai+600110" target="_blank" rel="noreferrer"><MapPin/><span><small>Address & directions</small><b>Plot No. 2, Sri Sai Ram Street, 1st Floor, Jyothi Nagar, Ponnimmanmedu, Chennai 600110</b></span></a>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div><Logo light/><p>Vikranth Chemical Corporation supplies bakery, chocolate, dairy, beverage and specialty food ingredients to manufacturers and professional buyers from Chennai, India.</p></div>
          <div><h4>Explore</h4><a href="/about">About</a><a href="/products/">Products</a><a href="/industries/">Industries</a><a href="/associates/">Suppliers</a><a href="/brochure">Brochure</a><a href="/contact">Contact</a><a href="/faq/">FAQs</a></div>
          <div><h4>Product families</h4>{productGroups.slice(0,5).map((g,i) => <a key={g.name} href={`/industries/${industrySlugs[i]}`}>{g.name}</a>)}</div>
          <div className="footer-contact"><h4>Contact</h4><a className="footer-contact-number" href={"https://wa.me/" + WHATSAPP_NUMBERS.general} target="_blank" rel="noreferrer"><strong>General Enquiries</strong><span>+91 87544 42924</span></a><a className="footer-contact-number" href={"https://wa.me/" + WHATSAPP_NUMBERS.anchor} target="_blank" rel="noreferrer"><strong>Anchor Products</strong><span>+91 87544 29922</span></a><a className="footer-contact-number" href={"https://wa.me/" + WHATSAPP_NUMBERS.delta} target="_blank" rel="noreferrer"><strong>Delta Nutritives</strong><span>+91 98410 68559</span></a><a href="mailto:vikranth.chemicals@gmail.com">vikranth.chemicals@gmail.com</a><p>Saraswathy Enclave, Lakshmipuram, Kolathur,<br/>Chennai — 600099, Tamil Nadu, India.</p><p>GSTIN: 33AADFV9327N1ZO</p><p>Serving Chennai and business enquiries across India.</p></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Vikranth Chemical Corporation</span><span className="footer-secondary-links"><a href="/site-map/">HTML Sitemap</a> · <a href="/sitemap.xml">XML Sitemap</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="#contact">LinkedIn</a></span></div>
      </footer>

      <div className={`quote-drawer ${quoteOpen ? "open" : ""}`}>
        <button className="drawer-backdrop" onClick={() => setQuoteOpen(false)} aria-label="Close quote form"/>
        <aside>
          <button className="drawer-close" onClick={() => setQuoteOpen(false)}><X/></button>
          <span className="eyebrow">Priority response desk</span>
          <h2>Tell us what<br/>you’re making.</h2>
          <p>Share your ingredient, application, quantity and delivery location. Our team will confirm availability and suitable next steps.</p>
          <QuoteForm selected={selectedProduct} onDone={() => setQuoteOpen(false)}/>
          <div className="drawer-contact"><Phone/><span><small>Prefer to talk?</small><b>+91 87544 42924</b></span></div>
        </aside>
      </div>
    </main>
  );
}
