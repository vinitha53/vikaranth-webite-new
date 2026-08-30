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
import CoreSeoContent from "./components/CoreSeoContent";
import { getProductHref, industries, productMenuGroupsByIndustrySlug } from "./data/catalog";
import { coreContent } from "./data/core-content";
import { partners } from "./data/partners";

const verifiedClaimsAvailable = false;
const verifiedGuidesAvailable = false;

const homeFaqs = [
  ["Which food ingredients does Vikranth supply?", "Vikranth supplies ingredients for bakery, chocolate, dairy, beverages, ice cream, fruit processing, hydrocolloids, sweeteners, starches, proteins, emulsifiers, preservatives and related manufacturing needs. Current availability and grade must be confirmed."],
  ["Do you supply food ingredients outside Chennai?", "Vikranth is based in Chennai and supports business enquiries from different locations. Share your delivery city and quantity so the team can confirm availability and supply options."],
  ["Can you help us select the right ingredient?", "Yes. Share your application, expected function, required grade and quantity. The team can help identify suitable product options for evaluation."],
  ["Can we request product specifications or certificates?", "Product specifications and supporting documents can be requested. Availability depends on the selected ingredient and manufacturer."],
  ["Do you support bulk ingredient requirements?", "Yes. Vikranth primarily supports manufacturers, bakeries, food processors and other professional buyers. Mention your approximate quantity when requesting a quotation."],
  ["What information is needed for a quotation?", "Provide the ingredient name, grade or application, required quantity, delivery location, company name and contact information."],
  ["Is Vikranth a food ingredients supplier in Chennai?", "Yes. Vikranth Chemical Corporation is a Chennai-based B2B food-ingredient supplier for manufacturers and professional buyers."],
  ["Can I request a product sample?", "Sample availability depends on the ingredient, supplier and project. Include the product, application, sample quantity and delivery location."],
  ["Are COA, TDS and SDS documents available?", "Availability varies by product, grade and supplier. State the exact document required in the enquiry."],
  ["Does Vikranth provide formulation approval?", "No. The team may help identify product families and available documents, but final formulation, dosage, safety, regulatory compliance and production approval remain with the buyer's qualified team."],
];

const productGroups = [
  { name: "Bakery Ingredients", icon: CakeSlice, image: "/industries/bakery-ingredients.webp", accent: "#efb16f", blurb: "Commercial bakery ingredients for improved cake volume, bread texture, softness and shelf-life performance.", subgroups: {
    "Cake Ingredients": ["Cake Gel", "Cake Life", "Custard Powder"],
    "Bread Ingredients": ["Bread Yield Improver"], "Leavening Agents": ["MACP (Mono Acid Calcium Phosphate)", "Baking Powder"],
    "Bakery Syrups": ["Cake Syrup"], "Shelf Life Improvers": ["Calcium Propionate (CP)"]
  }},
  { name: "Chocolate & Confectionery", icon: Sparkles, image: "/industries/chocolate-confectionery.webp", accent: "#a76443", blurb: "Cocoa powder, cocoa butter, couverture, chocolate compounds and confectionery ingredients for professional production.", subgroups: {
    "Cocoa Products": ["Cocoa Butter", "Cocoa Mass", "Cocoa Powder"], "Chocolate Range": ["Dark Chocolate", "Milk Chocolate", "White Chocolate"],
    "Choco Chips": ["White Chips", "Dark Chips", "Milk Chips"], "Chocomass": ["White Chocomass", "Dark Chocomass", "Milk Chocomass"],
    "Chocolate Paste": ["Choco Paste"], "Chocolate Beverage Solutions": ["Chocolate Drink"]
  }},
  { name: "Dairy Ingredients", icon: Milk, image: "/industries/dairy-ingredients.webp", accent: "#e8d8bb", blurb: "Milk powder and whey products for food manufacturers.", subgroups: {
    "Milk Powder": ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"]
  }},
  { name: "Beverage Ingredients", icon: FlaskConical, image: "/industries/beverage-ingredients.webp", accent: "#d68d55", blurb: "Beverage flavours, fruit bases, sweeteners and stabilizing ingredients for consistent commercial drink formulations.", subgroups: {
    "Beverage Flavours": ["Natural Food and Beverage Ingredients"], "Beverage Bases": ["Chocolate Drink"]
  }},
  { name: "Ice Cream Ingredients", icon: IceCreamBowl, image: "/industries/ice-cream-ingredients.webp", accent: "#f4cfc2", blurb: "Ice cream bases, flavours, dessert toppings and stabilizers for smooth texture, body and reliable batch consistency.", subgroups: {
    "Ice Cream Stabilizers": ["Ice Cream Stabilizer"]
  }},
  { name: "Fruit Processing", icon: Leaf, image: "/industries/fruit-processing.webp", accent: "#c68556", blurb: "Fruit fillings, purees, preparations, pectin and glaze solutions for bakery, beverage and dessert applications.", subgroups: {
    "Fruit Fillings": ["Fruit Filling"], "Fruit Preparations": ["Fruit Crush"],
    "Gelling Agents": ["Genu Pectin"], "Glazes & Toppings": ["Glaze Gel"]
  }},
  { name: "Hydrocolloids, Gums & Stabilizers", icon: Beaker, image: "/industries/hydrocolloids-stabilizers.webp", accent: "#a97e56", blurb: "Pectin, gelatin, xanthan gum, guar gum and CMC for viscosity control, stability, texture and mouthfeel.", subgroups: {
    "Pectin": ["Genu Pectin (For Jam, Juice, Jelly, etc.)"], "Gelatin": ["Gelatin 120 Bloom", "Gelatin 180 Bloom"],
    "Food Gums": ["Xanthan Gum", "Guar Gum", "Sodium CMC"], "Ice Cream Stabilizers": ["Ice Cream Stabilizer"]
  }},
  { name: "Sweeteners, Syrups & Starches", icon: Wheat, image: "/industries/sweeteners-syrups-starches.webp", accent: "#d0a34f", blurb: "Liquid glucose, sorbitol, dextrose, maltodextrin and food starches for sweetness, body and processing performance.", subgroups: {
    "Liquid Sweeteners": ["Liquid Glucose", "High Maltose Syrups", "Sorbitol 70% Solution", "Invert Sugar"], "Sweeteners": ["Glucose D", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Aspartame Powder"],
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
    "Acidulants": ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Ascorbic Acid"],
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

const industrySlugs = ["bakery-ingredients","chocolate-confectionery","dairy-ingredients","beverage-ingredients","ice-cream-ingredients","fruit-processing","hydrocolloids-stabilizers","sweeteners-syrups-starches","functional-ingredients","nutraceutical-pharma","food-additives-preservatives"];
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
  { number: "01", name: <>Bakery<br/>Ingredients</>, label: "Bakery Ingredients", icon: Wheat, href: "/industries/bakery-ingredients", groupIndex: 0 },
  { number: "02", name: <>Chocolate &amp;<br/>Confectionery</>, label: "Chocolate & Confectionery", icon: Box, href: "/industries/chocolate-confectionery", groupIndex: 1 },
  { number: "03", name: <>Dairy<br/>Ingredients</>, label: "Dairy Ingredients", icon: Milk, href: "/industries/dairy-ingredients", groupIndex: 2 },
  { number: "04", name: <>Beverage<br/>Ingredients</>, label: "Beverage Ingredients", icon: FlaskConical, href: "/industries/beverage-ingredients", groupIndex: 3 },
  { number: "05", name: <>Ice Cream<br/>Ingredients</>, label: "Ice Cream Ingredients", icon: IceCreamBowl, href: "/industries/ice-cream-ingredients", groupIndex: 4 },
  { number: "06", name: <>Fruit<br/>Processing</>, label: "Fruit Processing", icon: Leaf, href: "/industries/fruit-processing", groupIndex: 5 },
  { number: "07", name: <>Hydrocolloids &amp;<br/>Stabilizers</>, label: "Hydrocolloids & Stabilizers", icon: Beaker, href: "/industries/hydrocolloids-stabilizers", groupIndex: 6 },
  { number: "08", name: <>Sweeteners, Syrups<br/>&amp; Starches</>, label: "Sweeteners, Syrups & Starches", icon: CircleGauge, href: "/industries/sweeteners-syrups-starches", groupIndex: 7 },
  { number: "09", name: <>Functional<br/>Ingredients</>, label: "Functional Ingredients", icon: Sparkles, href: "/industries/functional-ingredients", groupIndex: 8 },
  { number: "10", name: <>Nutraceutical &amp;<br/>Pharma</>, label: "Nutraceutical & Pharma", icon: HeartPulse, href: "/industries/nutraceutical-pharma", groupIndex: 9 },
  { number: "11", name: <>Food Additives &amp;<br/>Preservatives</>, label: "Food Additives & Preservatives", icon: ShieldCheck, href: "/industries/food-additives-preservatives", groupIndex: 10 }
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
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const megaMenuRef = useRef(null);
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
        { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://www.vikranthchem.com/#webpage", url: "https://www.vikranthchem.com/", name: "Food Ingredients Supplier in Chennai & India | Vikranth", description: "Source bakery, chocolate, dairy, beverage and specialty food ingredients from Vikranth in Chennai. Enquire for bulk supply and product documents.", isPartOf: { "@id": "https://www.vikranthchem.com/#website" }, about: { "@id": "https://www.vikranthchem.com/#organization" } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ]) }} />
      <div className="utility">
        <div className="utility-viewport">
          <div className="utility-track">
            <div className="utility-set">
              <span><BadgeCheck size={14}/> B2B Food Ingredient Supplier</span>
              <span><MapPin size={14}/> Chennai</span>
              <span className="utility-tag">Serving businesses across India</span>
              <a className="utility-contact" href="tel:+918754442924"><Phone size={14}/> +91 87544 42924</a>
              <a className="utility-contact" href="mailto:vikranth.chemicals@gmail.com"><Mail size={14}/> vikranth.chemicals@gmail.com</a>
            </div>
            <div className="utility-set" aria-hidden="true">
              <span><BadgeCheck size={14}/> B2B Food Ingredient Supplier</span>
              <span><MapPin size={14}/> Chennai</span>
              <span className="utility-tag">Serving businesses across India</span>
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
            <a href="#insights" onClick={jump}>Blog</a>
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
        <div id="industries-mega-menu" className={`mega-menu latest-mega-menu industry-mega-menu ${industryMegaOpen ? "show" : ""}`} aria-hidden={!industryMegaOpen}>
          <span className="latest-mega-pointer industry-mega-pointer" aria-hidden="true"/>
          <div className="industry-menu-surface">
            <div className="industry-menu-head">
              <Building2 aria-hidden="true"/>
              <div><span>Industries We Serve</span><h2>Explore by industry</h2></div>
              <small>{industries.length} industries</small>
            </div>
            <div className="industry-menu-grid" aria-label="Industries">
              {productCategories.map((industry, index) => {
                const IndustryIcon = productGroups[index]?.icon || Building2;
                return (
                  <a key={industry.id} href={industry.href} onClick={jump}>
                    <IndustryIcon className="industry-item-icon" aria-hidden="true"/>
                    <span>{industry.name}</span>
                    <ArrowRight className="industry-item-arrow" aria-hidden="true"/>
                  </a>
                );
              })}
              <a className="industry-menu-all" href="/industries" onClick={jump}>
                <span>View all industries</span>
                <ArrowRight aria-hidden="true"/>
              </a>
            </div>
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
                  {partner.logo ? <img className="supplier-item-logo" src={partner.logo} alt="" loading="lazy" decoding="async"/> : <span className="supplier-item-logo supplier-item-logo-fallback" aria-hidden="true">A</span>}
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
          className="hero-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-chocolate-poster.webp"
          aria-hidden="true"
        >
          <source src="/hero-chocolate-ingredients.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade"/>
        <div className="hero-grain" aria-hidden="true"/>
        <div className="container hero-content">
          <span className="hero-mini-title">Food Ingredients Supplier in Chennai</span>
          <h1>Your Product <em>Vision.</em> Our Ingredient<br/><em>Expertise.</em></h1>
          <div className="hero-copy">
            <p>Bakery, chocolate, dairy, beverage and specialty ingredients for commercial production, with grade, document and quotation support.</p>
            <div className="hero-buttons">
              <a className="btn gold" href="/contact/#enquiry">Request a quotation <ArrowRight size={17}/></a>
              <a className="btn ghost" href="https://wa.me/918754442924">Discuss your application</a>
            </div>
          </div>
        </div>
        <div className="scroll-cue"><span/> Scroll to discover</div>
      </section>

      {verifiedClaimsAvailable && <section className="metrics">
        <div className="container metric-grid">
          {[
            [Clock3, "25+", "Years of", "Experience"], [Handshake, "250+", "Business", "Clients"],
            [PackageCheck, "60+", "Ingredient", "Products"], [Globe2, "15+", "Distribution", "Partnerships"]
          ].map(([Icon,n,line1,line2]) => <div key={n} className="metric-item"><span className="metric-icon"><Icon/></span><span className="metric-copy"><strong>{n}</strong><small>{line1}<br/>{line2}</small></span></div>)}
        </div>
      </section>}

      <section className="section product-section botanical-light-section" id="products">
        <BotanicalCorners/>
        <div className="container">
          <div className="section-head portfolio-section-head">
            <div>
              <span className="eyebrow">Explore our portfolio</span>
              <h2>
                <span className="portfolio-title-line"><span>Food Ingredients</span></span>
                <span className="portfolio-title-line"><em>for Every Formulation</em></span>
              </h2>
            </div>
            <div><p>Explore bakery, cocoa, dairy, fruit, sweetener, stabilizer, emulsifier and processing ingredients for commercial food production.</p>
              <a className="text-link" href="/products">Search all ingredients <ArrowRight size={16}/></a>
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
            {productGroups.slice(0, showAllProducts ? productGroups.length : 4).map((group, i) => {
              const Icon = group.icon;
              return <a className="product-card" href={`/industries/${industrySlugs[i]}`} aria-label={`View ${group.name} products`} key={group.name} style={{"--accent": group.accent, "--delay": `${i * 60}ms`}}>
                {group.image ? (
                  <div className="category-photo">
                    <img src={group.image} alt={`${group.name} for commercial food production`} loading="lazy" decoding="async"/>
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
          <button className={`btn outline center-btn portfolio-toggle ${showAllProducts ? "expanded" : ""}`} onClick={() => setShowAllProducts(value => !value)} aria-expanded={showAllProducts} aria-controls="portfolio-grid">
            {showAllProducts ? "Show Less" : "Show More Products"} <ChevronDown size={17}/>
          </button>
        </div>
      </section>

      <section className="section about botanical-light-section" id="about">
        <BotanicalCorners/>
        <div className="container">
          <div className="about-section-head">
            <span className="eyebrow">Why Vikranth?</span>
            <h2>Ingredient Sourcing<br/><em>Made Simpler</em></h2>
          </div>
          <div className="about-grid">
          <div className="about-visual">
            <div className="lab-stage about-video-stage">
              <img src="/home-about.webp" alt="Ingredient sourcing team reviewing food ingredients" width="1448" height="1086" loading="lazy" decoding="async"/>
              <div className="about-video-shade"></div>
            </div>
            <div className="about-caption"><span className="about-since"><BadgeCheck/><b>GST registered</b></span><i/><p>GSTIN 33AADFV9327N1ZO · Product and relationship details confirmed per enquiry.</p></div>
          </div>
          <div className="about-copy">
            <p className="lead">Ingredient sourcing designed for manufacturers, bakeries, processors and professional buyers.</p>
            <div className="value-list">
              {[
                [Box, "Wide Ingredient Portfolio", "Source ingredients across bakery, chocolate, dairy, beverage and specialty applications."],
                [Handshake, "Manufacturer Portfolio Enquiries", "Explore listed manufacturer portfolios while exact relationship and availability are confirmed per product."],
                [Beaker, "Application-Based Guidance", "Discuss your finished product and identify ingredients suited to your requirement."],
                [Zap, "Responsive Quotations", "Receive clear support for availability, quantity and commercial enquiries."],
                [PackageCheck, "Business-Focused Supply", "Practical sourcing for manufacturers, bakeries, processors and professional buyers."]
              ].map(([Icon,title,text], index) => <div key={title} style={{"--value-index": index, "--mouse-x": "50%", "--mouse-y": "50%", "--spotlight-opacity": 0}} onPointerEnter={updateFeatureSpotlight} onPointerMove={updateFeatureSpotlight} onPointerLeave={clearFeatureSpotlight}>
                <i className="value-card-orbit" aria-hidden="true"/><i className="value-card-corner" aria-hidden="true"/>
                <span><Icon/></span><section><h3>{title}</h3><p>{text}</p></section>
              </div>)}
            </div>
            <button className="btn dark" onClick={() => openQuote()}>Work with Vikranth <ArrowRight size={16}/></button>
          </div>
          </div>
        </div>
      </section>

      <section className="supplier-section botanical-light-section" id="suppliers">
        <BotanicalCorners/>
        <div className="container">
          <div className="supplier-head"><div><span className="eyebrow">Manufacturer portfolios</span><h2>Multiple Product Portfolios.<br/><em>One Enquiry Route.</em></h2></div><p>Explore listed portfolios for product identification. Exact relationship, source, grade and current availability are confirmed for every enquiry.</p></div>
          <div className="supplier-marquee-shell">
            <button className="supplier-carousel-control previous" type="button" aria-label="Move product network left" aria-controls="supplier-logo-track" onClick={() => moveSupplierCarousel(-1)}><ChevronLeft/></button>
            <div className="logo-marquee" ref={supplierMarqueeRef}><div className="logo-track" id="supplier-logo-track" ref={supplierTrackRef}>{[...partners,...partners].map((partner,i) => <a href={`/associates/${partner.slug}`} className="associate-logo" key={`${partner.slug}-${i}`}>{partner.logo ? <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" decoding="async" /> : <span className="anchor-mark" aria-label={`${partner.name} logo`}>A</span>}</a>)}</div></div>
            <button className="supplier-carousel-control next" type="button" aria-label="Move product network right" aria-controls="supplier-logo-track" onClick={() => moveSupplierCarousel(1)}><ChevronRight/></button>
          </div>
          <div className="supplier-feature">
            <div><Globe2/><span>Product-specific sourcing</span><p>Confirm the manufacturer, grade and available commercial source.</p></div>
            <div><Truck/><span>Delivery confirmation</span><p>Quantity, freight and destination serviceability are checked per order.</p></div>
            <div><Headphones/><span>Human support</span><p>One responsive team from product selection to repeat supply.</p></div>
          </div>
        </div>
      </section>

      <section className="quality-section botanical-light-section" id="quality" aria-labelledby="quality-heading">
        <BotanicalCorners/>
        <div className="container">
          <div className="quality-section-head">
            <span className="eyebrow">Quality-led sourcing</span>
            <h2 id="quality-heading">Confidence in Every Ingredient</h2>
          </div>
          <div className="quality-grid">
            <div className="quality-copy">
              <span className="quality-copy-label"><ShieldCheck size={16}/> Sourcing assurance for professional buyers</span>
              <p>Every requirement follows a clear sourcing path—from supplier alignment and available product documents to careful fulfilment and repeat-order support. Specifications, certificates and supporting information are coordinated according to product and supplier availability.</p>
              <div className="quality-assurance-flow" aria-label="Our sourcing assurance process">
                <span><b>01</b> Supplier aligned</span><i aria-hidden="true"/><span><b>02</b> Information checked</span><i aria-hidden="true"/><span><b>03</b> Supply coordinated</span>
              </div>
              <button className="btn dark quality-information-cta" onClick={() => openQuote("Product information request")}>Request Product Information <ArrowRight size={16}/></button>
            </div>
            <div className="quality-cards">
              {[
                [ShieldCheck, "Supplier information checks", "Confirm the manufacturer, commercial source and relationship for the selected product."],
                [PackageCheck, "Product information support", "Request available specifications, certificates and supporting product documents."],
                [BadgeCheck, "Careful handling and fulfilment", "Product-aware coordination from commercial requirement through dispatch."],
                [Globe2, "Repeat-order continuity", "Responsive support for recurring grades, pack sizes and professional requirements."]
              ].map(([Icon, title, text], index) => <article key={title} style={{"--quality-index": index, "--mouse-x": "50%", "--mouse-y": "50%", "--spotlight-opacity": 0}} onPointerEnter={updateFeatureSpotlight} onPointerMove={updateFeatureSpotlight} onPointerLeave={clearFeatureSpotlight}>
                <span className="quality-card-step" aria-hidden="true">0{index + 1}</span><i className="quality-card-glow" aria-hidden="true"/><span className="quality-icon"><Icon/></span><div><h3>{title}</h3><p>{text}</p></div>
              </article>)}
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

      <section className="home-trusted-customers botanical-light-section" aria-labelledby="home-trusted-customers-title">
        <BotanicalCorners/>
        <div className="home-trusted-customers-heading">
          <span id="home-trusted-customers-title" className="eyebrow">Trusted Customers</span>
        </div>
        <div className="home-customer-carousel-shell">
          <button className="home-customer-carousel-control previous" type="button" aria-label="Move trusted customers left" aria-controls="home-customer-logo-track" onClick={() => moveCustomerCarousel(-1)}><ChevronLeft/></button>
          <div className="home-customer-marquee" ref={customerMarqueeRef} aria-label="Trusted customer logos">
            <div className="home-customer-marquee-track" id="home-customer-logo-track" ref={customerTrackRef}>
            {[
              ["hershey.jpg", "The Hershey Company"],
              ["cavinkare.jpg", "CavinKare"],
              ["milka.jpg", "Milka"],
              ["lotte.jpg", "Lotte"],
              ["a2b.png", "A2B Indian Veg Restaurant"],
              ["nilgiris.png", "Nilgiris"],
              ["amrutanjan.png", "Amrutanjan"],
              ["hershey.jpg", "The Hershey Company"],
              ["cavinkare.jpg", "CavinKare"],
              ["milka.jpg", "Milka"],
              ["lotte.jpg", "Lotte"],
              ["a2b.png", "A2B Indian Veg Restaurant"],
              ["nilgiris.png", "Nilgiris"],
              ["amrutanjan.png", "Amrutanjan"]
            ].map(([logo, name], index) => (
              <div className="home-customer-logo" key={`${name}-${index}`}>
                <img src={`/trusted-customers/${logo}`} alt={`${name} logo`} loading="lazy" />
              </div>
            ))}
            </div>
          </div>
          <button className="home-customer-carousel-control next" type="button" aria-label="Move trusted customers right" aria-controls="home-customer-logo-track" onClick={() => moveCustomerCarousel(1)}><ChevronRight/></button>
        </div>
      </section>

      <IngredientEcosystem/>

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

      <CoreSeoContent content={coreContent.home} compact hideFaq />

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
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <button className="btn gold faq-contact" onClick={() => openQuote("Technical guidance")}>
            Contact our technical team <ArrowRight size={16}/>
          </button>
          </div>
        </div>
      </section>
      <section className="cta-section" id="contact">
        <div className="cta-bg"/><div className="container cta-inner">
          <span className="eyebrow light-text">Tell us what you need</span>
          <h2>Looking for a<br/><em>Food Ingredient Supplier?</em></h2>
          <p>Share your product, application, quantity and delivery location. Our team will respond with availability and suitable next steps.</p>
          <div><button className="btn gold" onClick={() => openQuote()}>Request a quote <ArrowRight size={17}/></button><a className="btn ghost" href="tel:+918754442924"><Phone size={16}/> +91 87544 42924</a></div>
        </div>
      </section>

      <section className="contact-strip botanical-light-section botanical-light-compact" aria-label="Contact information">
        <BotanicalCorners/>
        <div className="container contact-strip-grid">
          <div><span className="eyebrow">Start your ingredient enquiry</span><h2>Vikranth Chemical Corporation</h2></div>
          <a href="tel:+914425657360"><Phone/><span><small>Phone</small><b>044 2565 7360 / 044 2565 7369<br/>+91 87544 42924 / +91 97909 20252</b></span></a>
          <a href="mailto:vikranth.chemicals@gmail.com"><Mail/><span><small>Email</small><b>vikranth.chemicals@gmail.com</b></span></a>
          <a href="https://www.google.com/maps/search/?api=1&query=Saraswathy+Enclave+Lakshmipuram+Kolathur+Chennai+600099" target="_blank" rel="noreferrer"><MapPin/><span><small>Address & directions</small><b>Saraswathy Enclave, Perambur–Redhills High Road, Lakshmipuram, Kolathur, Chennai 600099</b></span></a>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div><Logo light/><p>Vikranth Chemical Corporation supplies bakery, chocolate, dairy, beverage and specialty food ingredients to manufacturers and professional buyers from Chennai, India.</p></div>
          <div><h4>Explore</h4><a href="/about">About</a><a href="#products">Products</a><a href="#industries">Industries</a><a href="#insights">Resources</a><a href="/brochure">Brochure</a><a href="/contact">Contact</a><a href="#faq">FAQs</a></div>
          <div><h4>Product families</h4>{productGroups.slice(0,5).map((g,i) => <a key={g.name} href={`/industries/${industrySlugs[i]}`}>{g.name}</a>)}</div>
          <div><h4>Contact</h4><a href="tel:+918754442924">+91 87544 42924</a><a href="mailto:vikranth.chemicals@gmail.com">vikranth.chemicals@gmail.com</a><p>Saraswathy Enclave, Lakshmipuram, Kolathur,<br/>Chennai — 600099, Tamil Nadu, India.</p><p>GSTIN: 33AADFV9327N1ZO</p></div>
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

