"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, BadgeCheck, Beaker, Box, Building2, CakeSlice, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleGauge, Clock3, Factory, FlaskConical,
  Globe2, Handshake, Headphones, HeartPulse, IceCreamBowl, Leaf,
  Mail, MapPin, Menu, Milk, PackageCheck, Phone, Search,
  ShieldCheck, Sparkles, Truck, Wheat, X, Zap
} from "lucide-react";

const productGroups = [
  { name: "Bakery Ingredients", icon: CakeSlice, image: "/products/bakery-image.png", accent: "#efb16f", blurb: "Commercial bakery ingredients for improved cake volume, bread texture, softness and shelf-life performance.", subgroups: {
    "Cake Ingredients": ["Cake Gel", "Cake Life", "Cake Premix", "Custard Powder"],
    "Bread Ingredients": ["Bread Yield Improver"], "Leavening Agents": ["MACP", "Baking Powder"],
    "Bakery Syrups": ["Corn Syrup"], "Shelf Life Improvers": ["Calcium Propionate (CP)"], "Frozen Bakery": ["Frozen Croissant"]
  }},
  { name: "Chocolate & Confectionery", icon: Sparkles, image: "/products/chocolate-confectionery.webp", accent: "#a76443", blurb: "Cocoa powder, cocoa butter, couverture, chocolate compounds and confectionery ingredients for professional production.", subgroups: {
    "Cocoa Products": ["Cocoa Butter", "Cocoa Mass", "Cocoa Powder"], "Chocolate Range": ["Dark Chocolate", "Milk Chocolate", "White Chocolate"],
    "Choco Chips": ["White Chips", "Dark Chips", "Milk Chips"], "Chocomass": ["White Chocomass", "Dark Chocomass", "Milk Chocomass"],
    "Chocolate Paste": ["Choco Paste"], "Beverage Solutions": ["Chocolate Drink"], "Couverture": ["Callebaut 811", "Callebaut 823", "Callebaut W2", "Bitter Chocolate 70-3", "CB Plein Aroma Cocoa Powder"]
  }},
  { name: "Dairy Ingredients", icon: Milk, image: "/products/dairy-image.png", accent: "#e8d8bb", blurb: "Dairy ingredients including whipping cream, cream cheese, butter, milk powder and whey products for food manufacturers.", subgroups: {
    "Cream Products": ["Whipping Cream", "Cream Cheese"], "Butter Products": ["Butter"],
    "Milk Powders": ["Good Day Milk Powder", "Krishna Milk Powder"], "Whey Products": ["Amul Whey Powder"]
  }},
  { name: "Beverage Ingredients", icon: FlaskConical, image: "/products/beverage-image.png", accent: "#d68d55", blurb: "Beverage flavours, fruit bases, sweeteners and stabilizing ingredients for consistent commercial drink formulations.", subgroups: {
    "Beverage Flavours": ["Flavours & Natural Ingredients"], "Beverage Bases": ["Chocolate Drink"], "Fruit Ingredients": ["Fruit Crush"]
  }},
  { name: "Ice Cream Ingredients", icon: IceCreamBowl, image: "/products/ice-cream-ingredients.png", imagePosition: "67% center", accent: "#f4cfc2", blurb: "Ice cream bases, flavours, dessert toppings and stabilizers for smooth texture, body and reliable batch consistency.", subgroups: {
    "Ice Cream Bases": ["Frozen Yogurt Premix", "Panna Base"], "Flavours": ["French Vanilla", "Cocoa Miscela"],
    "Toppings": ["Dessert Toppings"], "Stabilizers": ["Ice Cream Stabilizer"]
  }},
  { name: "Fruit Processing", icon: Leaf, image: "/products/fruit-processing-image.png", accent: "#c68556", blurb: "Fruit fillings, purees, preparations, pectin and glaze solutions for bakery, beverage and dessert applications.", subgroups: {
    "Fruit Fillings": ["Fruit Filling"], "Fruit Preparations": ["Fruit Crush"], "Frozen Fruits & Purees": ["Frozen Fruits", "Fruit Purees"],
    "Gelling Agents": ["Genu Pectin"], "Glazes & Toppings": ["Glaze Gel"]
  }},
  { name: "Hydrocolloids & Stabilizers", icon: Beaker, image: "/products/hydrocolloids-pharma.png", imagePosition: "25% center", accent: "#a97e56", blurb: "Pectin, gelatin, xanthan gum, guar gum and CMC for viscosity control, stability, texture and mouthfeel.", subgroups: {
    "Pectin": ["Genu Pectin"], "Gelatin": ["Gelatin 120 Bloom", "Gelatin 180 Bloom"],
    "Food Gums": ["Xanthan Gum", "Guar Gum", "Sodium CMC"], "Stabilizers": ["Ice Cream Stabilizer"]
  }},
  { name: "Sweeteners, Syrups & Starches", icon: Wheat, image: "/products/sweeteners-syrups-starches-image.png", accent: "#d0a34f", blurb: "Liquid glucose, sorbitol, dextrose, maltodextrin and food starches for sweetness, body and processing performance.", subgroups: {
    "Liquid Sweeteners": ["Liquid Glucose", "Sorbitol 70% Solution", "Invert Sugar"], "Sweeteners": ["Sorbitol", "Aspartame"],
    "Starches": ["Maize Starch", "Potato Starch"], "Carbohydrates": ["Dextrose Monohydrate", "Maltodextrine Powder"], "Syrups": ["Corn Syrup"]
  }},
  { name: "Functional Ingredients", icon: CircleGauge, image: "/products/functional-ingredients-image.png", accent: "#b97547", blurb: "Food emulsifiers, proteins and processing aids selected for dependable texture, structure, stability and production efficiency.", subgroups: {
    "Emulsifiers": ["GMS Flakes", "GMS Powder", "Sorbitan Mono Stearate", "Finamul 90", "DMG", "PGMS", "SMS", "PGPR", "Soya Lecithin"],
    "Proteins": ["Whey Protein", "Whey Powder", "Soya Protein", "Vital Wheat Gluten", "Skimmed Milk Powder"],
    "Processing Ingredients": ["Calcium Carbonate", "Calcium Chloride", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"]
  }},
  { name: "Nutraceutical & Pharma", icon: HeartPulse, image: "/products/hydrocolloids-pharma.png", imagePosition: "72% center", accent: "#bf8c6e", blurb: "Proteins, gelatin, vitamins and mineral ingredients for nutraceutical, wellness and pharmaceutical product development.", subgroups: {
    "Protein Ingredients": ["Whey Protein", "Whey Powder", "Soya Protein"], "Gelatin": ["Gelatin 120 Bloom", "Gelatin 180 Bloom"],
    "Vitamins & Minerals": ["Ascorbic Acid", "Calcium Carbonate"]
  }},
  { name: "Food Additives & Preservatives", icon: ShieldCheck, image: "/products/food-additives-preservatives-image.png", accent: "#956039", blurb: "Food preservatives, acidulants, leavening agents, colours and flavours for shelf life, taste and processing control.", subgroups: {
    "Preservatives": ["Potassium Sorbate", "Sorbic Acid", "Sodium Benzoate", "Potassium Metabisulphite (KMS)"],
    "Acidulants": ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Ascorbic Acid"],
    "Leavening": ["Ammonium Bicarbonate", "Baking Powder", "Sodium Bicarbonate", "SAPP"],
    "Colours, Flavours & Extracts": ["Black Cocoa Powder", "Caramel", "Extra Pure Vanillin", "Orange Oil", "Saucetec"]
  }}
];

const industries = [
  ["Industrial Bakeries", CakeSlice], ["Cake & Dessert Manufacturers", Sparkles], ["Chocolate & Confectionery", Box],
  ["Beverage Manufacturers", FlaskConical], ["Dairy & Ice Cream", Milk], ["Hotels & Commercial Kitchens", Building2],
  ["Nutraceutical Companies", HeartPulse], ["Food-Processing Businesses", Factory]
];


const popularShowcases = [
  { name: "Bakery", groupIndex: 0, products: [["Cake Gel", "Commercial cakes & sponge systems", "5% center"], ["Cake Premix", "Consistent bakery production", "24% center"], ["Custard Powder", "Fillings, desserts & bakery", "48% center"], ["Baking Powder", "Cakes, biscuits & bakery", "76% center"]] },
  { name: "Chocolate & Cocoa", groupIndex: 1, products: [["Cocoa Powder", "Bakery, beverages & desserts", "8% center"], ["Cocoa Butter", "Chocolate & confectionery", "28% center"], ["Cocoa Mass", "Couverture & premium chocolate", "53% center"], ["Choco Chips", "Bakery inclusions & toppings", "78% center"]] },
  { name: "Dairy", groupIndex: 2, products: [["Whipping Cream", "Cakes, desserts & food service", "12% center"], ["Cream Cheese", "Bakery, desserts & savoury", "38% center"], ["Butter", "Bakery & confectionery", "66% center"], ["Skimmed Milk Powder", "Dairy, bakery & beverages", "88% center"]] },
  { name: "Beverage", groupIndex: 3, products: [["Natural Flavours", "Beverage formulation", "6% center"], ["Chocolate Drink", "Hot and cold beverages", "31% center"], ["Fruit Crush", "Beverages & food service", "58% center"], ["Orange Oil", "Flavour systems & beverages", "86% center"]] },
  { name: "Ice Cream", groupIndex: 4, products: [["Frozen Yogurt Premix", "Frozen dessert production", "8% center"], ["Panna Base", "Gelato & ice cream", "34% center"], ["French Vanilla", "Premium frozen desserts", "61% center"], ["Ice Cream Stabilizer", "Texture & melt control", "88% center"]] },
  { name: "Fruit", groupIndex: 5, products: [["Fruit Filling", "Bakery & dessert fillings", "7% center"], ["Frozen Fruits", "Food service & processing", "32% center"], ["Fruit Purees", "Beverages, desserts & dairy", "60% center"], ["Glaze Gel", "Bakery finishing & decoration", "87% center"]] },
  { name: "Stabilizers", groupIndex: 6, products: [["Genu Pectin", "Fruit, dairy & beverage systems", "7% center"], ["Xanthan Gum", "Viscosity & suspension", "31% center"], ["Guar Gum", "Texture & moisture control", "57% center"], ["Sodium CMC", "Stability & mouthfeel", "84% center"]] },
  { name: "Sweeteners", groupIndex: 7, products: [["Liquid Glucose", "Confectionery & bakery", "8% center"], ["Sorbitol", "Sweetness & moisture retention", "34% center"], ["Invert Sugar", "Bakery, beverages & desserts", "61% center"], ["Maltodextrine Powder", "Body, solids & processing", "88% center"]] },
  { name: "Functional", groupIndex: 8, products: [["GMS Flakes", "Emulsification & texture", "7% center"], ["Soya Lecithin", "Chocolate, bakery & processing", "33% center"], ["Whey Protein", "Nutrition & dairy systems", "59% center"], ["Vital Wheat Gluten", "Dough strength & structure", "86% center"]] },
  { name: "Nutraceuticals", groupIndex: 9, products: [["Whey Protein", "Sports & wellness nutrition", "8% center"], ["Soya Protein", "Plant protein formulations", "34% center"], ["Gelatin 180 Bloom", "Capsules, gummies & nutrition", "61% center"], ["Ascorbic Acid", "Vitamin fortification", "88% center"]] }
];
const associates = [
  { name: "CAMPCO", logo: "/partners/campco.png" },
  { name: "Roquette Riddhi Siddhi", logo: "/partners/roquette.png" },
  { name: "Döhler India", logo: "/partners/doehler.png" },
  { name: "Nitta Gelatin India", logo: "/partners/nitta.png" },
  { name: "Delta Nutritives", logo: "/partners/delta.png" },
  { name: "CP Kelco India", logo: "/partners/cp-kelco.png" },
  { name: "Calpro Foods", logo: "/partners/calpro.png" },
  { name: "Anchor Products", logo: null }
];

const testimonials = [
  { quote: "Vikranth has consistently supported our ingredient requirements with dependable quality and prompt service. Their team understands our application needs and recommends suitable products.", role: "Purchase Manager", company: "Bakery Manufacturer", location: "Chennai", result: "Dependable quality and prompt service", initials: "PM" },
  { quote: "The cocoa products we source through Vikranth deliver consistent taste, colour and performance across our production batches. Their communication and delivery coordination are excellent.", role: "Production Head", company: "Chocolate & Confectionery Brand", location: "Tamil Nadu", result: "Consistent quality across every batch", initials: "PH" },
  { quote: "From product selection to documentation and dispatch, the entire process is handled professionally. Vikranth has become a reliable ingredient partner for our growing business.", role: "Managing Director", company: "Food Processing Company", location: "South India", result: "Professional support from selection to dispatch", initials: "MD" },
];

function Logo({ light = false }) {
  return (
    <a className={`logo ${light ? "light" : ""}`} href="#home" aria-label="Vikranth home">
      <img className="brand-logo-image" src="/logo-vikranth.png" alt="VCC — Vikranth Chemical Corporation" />
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activePopularCategory, setActivePopularCategory] = useState(1);
  const [popularPaused, setPopularPaused] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);  useEffect(() => {
    if (popularPaused) return;
    const rotation = window.setTimeout(() => {
      setActivePopularCategory(current => (current + 1) % popularShowcases.length);
    }, 7000);
    return () => window.clearTimeout(rotation);
  }, [activePopularCategory, popularPaused]);
  useEffect(() => {
    if (testimonialPaused) return;
    const rotation = window.setTimeout(() => {
      setActiveTestimonial(current => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearTimeout(rotation);
  }, [activeTestimonial, testimonialPaused]);
  useEffect(() => {
    const nodes = document.querySelectorAll(".section-head, .portfolio-visual, .product-card, .popular-section-head, .popular-ingredient-card, .industry-grid article, .about-section-head, .about-visual, .about-copy, .about .value-list > div, .quality-section-head, .faq-section-head, .quality-copy, .quality-cards article, .supplier-head, .supplier-feature > div, .insight-grid article, .testimonial-heading, .testimonial-card-grid .testimonial-card, .testimonial-trust-summary > div, .cta-inner");
    nodes.forEach((node, index) => {
      node.classList.add("reveal-item");
      node.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = (quoteOpen || catalogOpen || menuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [quoteOpen, catalogOpen, menuOpen]);

  const allProducts = useMemo(() => productGroups.flatMap((group, groupIndex) =>
    Object.entries(group.subgroups).flatMap(([subgroup, items]) => items.map(item => ({ item, subgroup, group: group.name, groupIndex })))
  ), []);
  const matches = query.trim() ? allProducts.filter(p =>
    `${p.item} ${p.subgroup} ${p.group}`.toLowerCase().includes(query.toLowerCase())
  ) : allProducts;

  const popularShowcase = popularShowcases[activePopularCategory];

  const openQuote = (product = "") => { setSelectedProduct(product); setQuoteOpen(true); setCatalogOpen(false); setMenuOpen(false); };
  const jump = () => { setMenuOpen(false); setMegaOpen(false); };

  return (
    <main>
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

      <header className={scrolled ? "scrolled" : ""}>
        <div className="container nav-wrap">
          <Logo />
          <nav className={menuOpen ? "open" : ""}>
            <a href="#home" onClick={jump}>Home</a>
            <a href="#about" onClick={jump}>About</a>
            <button className="nav-product" onClick={() => setMegaOpen(v => !v)}>Products <ChevronDown size={14}/></button>
            <a href="#industries" onClick={jump}>Industries</a>
            <a href="#suppliers" onClick={jump}>Suppliers</a>
            <a href="#insights" onClick={jump}>Blog</a>
            <a href="#contact" onClick={jump}>Contact</a>
          </nav>
          <div className="nav-actions">
            <button className="btn primary header-quote" onClick={() => openQuote("Header quote request")}>Request a Quote <ArrowRight size={16}/></button>
            <button className="menu-trigger" onClick={() => setMenuOpen(v => !v)} aria-label="Open menu">{menuOpen ? <X/> : <Menu/>}</button>
          </div>
        </div>
        <div className={`mega-menu ${megaOpen ? "show" : ""}`}>
          <div className="container mega-grid">
            <div className="mega-list">
              <span className="eyebrow">Explore 100+ ingredients</span>
              {productGroups.map((group, i) => (
                <button key={group.name} className={activeGroup === i ? "active" : ""} onMouseEnter={() => setActiveGroup(i)} onClick={() => setActiveGroup(i)}>
                  <group.icon size={17}/>{group.name}<ChevronRight size={14}/>
                </button>
              ))}
            </div>
            <div className="mega-content">
              <div className="mega-heading"><span className="icon-badge"><span>{(() => { const I = productGroups[activeGroup].icon; return <I/>; })()}</span></span>
                <div><h3>{productGroups[activeGroup].name}</h3><p>{productGroups[activeGroup].blurb}</p></div>
              </div>
              <div className="mega-columns">
                {Object.entries(productGroups[activeGroup].subgroups).map(([sub, items]) => (
                  <div key={sub}><b>{sub}</b>{items.map(item => <button key={item} onClick={() => openQuote(item)}>{item}</button>)}</div>
                ))}
              </div>
              <button className="text-link" onClick={() => { setMegaOpen(false); setCatalogOpen(true); }}>View complete product catalogue <ArrowRight size={15}/></button>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <img className="hero-img hero-cake-cutout" src="/choco-paste-cutout.webp" alt="" decoding="async" fetchPriority="high" aria-hidden="true" />
        <div className="hero-shade"/>
        <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker"><span/> Food ingredient supplier in Chennai</span>
            <h1>Food Ingredients That<br/><em>Build Better Products</em></h1>
            <p>Source bakery, chocolate, dairy, beverage and specialty food ingredients through one dependable B2B partner.</p>
            <div className="hero-buttons">
              <button className="btn gold" onClick={() => setCatalogOpen(true)}>Explore ingredients <ArrowRight size={17}/></button>
              <button className="btn ghost" onClick={() => openQuote()}>Request a quote</button>
            </div>
            <div className="hero-trust">
              <span><ShieldCheck/> Quality-led sourcing</span><span><Headphones/> Application-focused support</span><span><Truck/> Reliable business supply</span>
            </div>
          </div>
        </div>
        <div className="scroll-cue"><span/> Scroll to discover</div>
      </section>

      <section className="metrics">
        <div className="container metric-grid">
          {[
            [Clock3, "12+", "Years of", "Experience"], [Handshake, "250+", "Business", "Clients"],
            [PackageCheck, "60+", "Ingredient", "Products"], [Globe2, "15+", "Distribution", "Partnerships"]
          ].map(([Icon,n,line1,line2]) => <div key={n} className="metric-item"><span className="metric-icon"><Icon/></span><span className="metric-copy"><strong>{n}</strong><small>{line1}<br/>{line2}</small></span></div>)}
        </div>
      </section>

      <section className="section product-section" id="products">
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
              <button className="text-link" onClick={() => setCatalogOpen(true)}>Search all ingredients <ArrowRight size={16}/></button>
            </div>
          </div>
          <div className="portfolio-visual">
            <img src="/ingredient-portfolio.png" alt="Chocolate, bakery, dairy, fruit and beverage ingredient applications" />
            <div className="portfolio-overlay">
              <span>Application-led sourcing</span>
              <strong>From ingredient to finished product.</strong>
              <button onClick={() => openQuote()}>Discuss your formulation <ArrowRight size={16}/></button>
            </div>
            <div className="portfolio-tags"><span>Cocoa & chocolate</span><span>Bakery systems</span><span>Dairy & cream</span><span>Fruit & beverage</span></div>
          </div>
          <div className="product-grid" id="portfolio-grid">
            {productGroups.slice(0, showAllProducts ? productGroups.length : 4).map((group, i) => {
              const Icon = group.icon;
              return <article className="product-card" key={group.name} style={{"--accent": group.accent, "--delay": `${i * 60}ms`}}>
                {group.image ? (
                  <div className="category-photo">
                    <img
                      src={group.image}
                      alt={`${group.name} for commercial food production`}
                      style={group.imagePosition ? { objectPosition: group.imagePosition } : undefined}
                    />
                  </div>
                ) : (
                  <div className="category-photo category-placeholder" aria-hidden="true">
                    <Icon/>
                    <span>Product image coming soon</span>
                  </div>
                )}
                <h3>{group.name}</h3><p>{group.blurb}</p>
                <button onClick={() => { setActiveGroup(i); setCatalogOpen(true); }}>View Products <ArrowRight size={15}/></button>
              </article>
            })}
          </div>
          <button
            className={`btn outline center-btn portfolio-toggle ${showAllProducts ? "expanded" : ""}`}
            onClick={() => setShowAllProducts(value => !value)}
            aria-expanded={showAllProducts}
            aria-controls="portfolio-grid"
          >
            {showAllProducts ? "Show Less" : "Show More Products"} <ChevronDown size={17}/>
          </button>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="container">
          <div className="about-section-head">
            <span className="eyebrow">Why Vikranth?</span>
            <h2>Ingredient Sourcing<br/><em>Made Simpler</em></h2>
          </div>
          <div className="about-grid">
          <div className="about-visual">
            <div className="lab-stage about-video-stage">
              <video src="/about-food-b2b.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Food ingredient applications and manufacturing"></video>
              <div className="about-video-shade"></div>
            </div>
            <div className="about-caption"><span className="about-since"><BadgeCheck/><b>Since 2001</b></span><i/><p>Built on dependable relationships, transparent trade and technical curiosity.</p></div>
          </div>
          <div className="about-copy">
            <p className="lead">Ingredient sourcing designed for manufacturers, bakeries, processors and professional buyers.</p>
            <div className="value-list">
              {[
                [Box, "Wide Ingredient Portfolio", "Source ingredients across bakery, chocolate, dairy, beverage and specialty applications."],
                [Handshake, "Reliable Manufacturer Network", "Access products from established Indian and international ingredient companies."],
                [Beaker, "Application-Based Guidance", "Discuss your finished product and identify ingredients suited to your requirement."],
                [Zap, "Responsive Quotations", "Receive clear support for availability, quantity and commercial enquiries."],
                [PackageCheck, "Business-Focused Supply", "Practical sourcing for manufacturers, bakeries, processors and professional buyers."]
              ].map(([Icon,title,text]) => <div key={title}><span><Icon/></span><section><h3>{title}</h3><p>{text}</p></section></div>)}
            </div>
            <button className="btn dark" onClick={() => openQuote()}>Work with Vikranth <ArrowRight size={16}/></button>
          </div>
          </div>
        </div>
      </section>

      <section
        className={`popular-section ${popularPaused ? "is-paused" : ""}`}
        aria-labelledby="popular-heading"
        onMouseEnter={() => setPopularPaused(true)}
        onMouseLeave={() => setPopularPaused(false)}
        onFocusCapture={() => setPopularPaused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPopularPaused(false); }}
      >
        <div className="container">
          <div className="popular-section-head">
            <span className="eyebrow">Frequently requested</span>
            <h2 id="popular-heading">Popular Food Ingredients</h2>
          </div>
          <div className="popular-category-nav" aria-label="Ingredient categories">
            <div className="popular-category-scroll" role="tablist" aria-label="Automatically rotating ingredient categories">
              {popularShowcases.map((showcase, index) => (
                <button key={showcase.name} role="tab" aria-selected={activePopularCategory === index} className={activePopularCategory === index ? "active" : ""} onClick={() => setActivePopularCategory(index)}>
                  {showcase.name}
                </button>
              ))}
            </div>
            <button className="popular-shop-all" onClick={() => { setActiveGroup(popularShowcase.groupIndex); setCatalogOpen(true); }}>View all {popularShowcase.name.toLowerCase()}</button>
          </div>
          <div className="popular-ingredient-showcase" key={popularShowcase.name} aria-live="polite">
            {popularShowcase.products.map(([product, application, position], index) => (
              <button className="popular-ingredient-card" style={{"--swap-delay": `${index * 75}ms`}} key={`${popularShowcase.name}-${product}`} onClick={() => openQuote(product)}>
                <span className="popular-ingredient-image"><img src="/ingredient-portfolio.png" alt={`${product} for commercial food production`} style={{objectPosition: position}} /></span>
                <strong>{product}</strong>
                <small>{application}</small>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section industries" id="industries">
        <div className="container">
          <span className="eyebrow light-text">Industries we support</span>
          <div className="industry-intro"><h2>Ingredients for Growing Food Businesses</h2><p>From product selection to repeat supply, Vikranth supports businesses that depend on consistent ingredients and responsive service.</p></div>
          <div className="industry-grid">
            {industries.map(([name, Icon], i) => <article key={name}><span>0{i+1}</span><Icon/><h3>{name}</h3><button onClick={() => openQuote(name)}>Discuss your application <ArrowRight size={14}/></button></article>)}
          </div>
          <button className="btn primary industry-cta" onClick={() => openQuote("Industry enquiry")}>View All Industries <ArrowRight size={16}/></button>
        </div>
      </section>

      <section className="supplier-section" id="suppliers">
        <div className="container">
          <div className="supplier-head"><div><span className="eyebrow">Our product network</span><h2>Established Manufacturers.<br/><em>One Reliable Supplier.</em></h2></div><p>Explore a broader ingredient portfolio through a local team that understands your product and sourcing requirements.</p></div>
          <div className="logo-marquee"><div className="logo-track">{[...associates,...associates].map((partner,i) => <div className="associate-logo" key={`${partner.name}-${i}`}>{partner.logo ? <img src={partner.logo} alt="" /> : <span className="anchor-mark">A</span>}<span><b>{partner.name}</b>{partner.detail && <small>{partner.detail}</small>}</span></div>)}</div></div>
          <div className="supplier-feature">
            <div><Globe2/><span>Worldwide sourcing</span><p>Access respected ingredient producers and specialized grades.</p></div>
            <div><Truck/><span>India-wide fulfillment</span><p>Commercial quantities delivered through an established network.</p></div>
            <div><Headphones/><span>Human support</span><p>One responsive team from product selection to repeat supply.</p></div>
          </div>
        </div>
      </section>

      <section className="quality-section" id="quality" aria-labelledby="quality-heading">
        <div className="container">
          <div className="quality-section-head">
            <span className="eyebrow">Quality-led sourcing</span>
            <h2 id="quality-heading">Confidence in Every Ingredient</h2>
          </div>
          <div className="quality-grid">
            <div className="quality-copy">
              <p>We focus on dependable sourcing, appropriate product handling and clear ingredient information. Product specifications, certificates and supporting documents can be requested according to product and supplier availability.</p>
              <button className="btn dark" onClick={() => openQuote("Product information")}>Request product information <ArrowRight size={16}/></button>
            </div>
            <div className="quality-cards">
              {[
                [ShieldCheck, "Established suppliers", "Ingredients sourced through established product networks."],
                [PackageCheck, "Product information support", "Specifications and supporting documents on request."],
                [BadgeCheck, "Hygienic handling and supply", "Appropriate care throughout commercial fulfilment."],
                [Globe2, "Repeat requirement consistency", "Support for ongoing professional ingredient needs."]
              ].map(([Icon, title, text]) => <article key={title}><Icon/><div><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section insights" id="insights">
        <div className="container">
          <div className="section-title-line"><div><span className="eyebrow">Ingredient knowledge</span><h2>Practical Answers for<br/><em>Better Products</em></h2></div><a href="#contact">Explore ingredient guides <ArrowRight size={16}/></a></div>
          <div className="insight-grid">
            {[
              ["Cocoa guide", "How to Choose Cocoa Powder for Bakery Products", "Understand colour, flavour and application considerations.", "01"],
              ["Cocoa ingredients", "Cocoa Powder, Cocoa Mass or Cocoa Butter?", "Learn the function of each cocoa ingredient.", "02"],
              ["Bakery guide", "Choosing Ingredients for Better Cake Texture", "Explore premixes, emulsifiers, proteins and leavening agents.", "03"],
              ["Texture guide", "How Stabilizers Improve Food Texture", "Understand consistency in dairy, beverages and desserts.", "04"]
            ].map(([tag,title,summary,no]) => <article key={no}><span className="article-no">{no}</span><small>{tag}</small><h3>{title}</h3><p>{summary}</p><div><button aria-label={`Read ${title}`}><ArrowRight/></button></div></article>)}
          </div>
        </div>
      </section>

      <section className="testimonial-section" aria-labelledby="testimonial-title">
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
              <img src="/testimonial-food-professionals.png" alt="Food professionals reviewing an ingredient formulation" />
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
            <AnimatedStat value={12} label="Years of Experience" Icon={Clock3} />
            <AnimatedStat value={60} label="Products" Icon={PackageCheck} delay={100} />
            <AnimatedStat value={15} label="Distribution Partnerships" Icon={Handshake} delay={200} />
            <AnimatedStat value={250} label="Clients" Icon={Building2} delay={300} />
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="faq-section-head">
            <span className="eyebrow">Frequently asked questions</span>
            <h2 id="faq-heading">Food Ingredient Supply Questions</h2>
          </div>
          <div className="faq-layout">
          <div className="faq-list">
            {[
              ["Which food ingredients does Vikranth supply?", "Vikranth supplies bakery, cocoa, chocolate, dairy, beverage, protein, sweetener, starch, stabilizer and specialty food ingredients for B2B requirements."],
              ["Do you supply food ingredients outside Chennai?", "Vikranth is based in Chennai and supports business enquiries from different locations. Share your delivery city and quantity so the team can confirm availability and supply options."],
              ["Can you help us select the right ingredient?", "Yes. Share your application, expected function, required grade and quantity. The team can help identify suitable product options for evaluation."],
              ["Can we request product specifications or certificates?", "Product specifications and supporting documents can be requested. Availability depends on the selected ingredient and manufacturer."],
              ["Do you support bulk ingredient requirements?", "Yes. Vikranth primarily supports manufacturers, bakeries, food processors and other professional buyers. Mention your approximate quantity when requesting a quotation."],
              ["What information is needed for a quotation?", "Provide the ingredient name, grade or application, required quantity, delivery location, company name and contact information."]
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <button className="text-link faq-contact" onClick={() => openQuote("Technical guidance")}>
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

      <section className="contact-strip" aria-label="Contact information">
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
          <div><h4>Explore</h4><a href="#about">About</a><a href="#products">Products</a><a href="#industries">Industries</a><a href="#insights">Resources</a><a href="#faq">FAQs</a></div>
          <div><h4>Product families</h4>{productGroups.slice(0,5).map(g => <button key={g.name} onClick={() => setCatalogOpen(true)}>{g.name}</button>)}</div>
          <div><h4>Contact</h4><a href="tel:+918754442924">+91 87544 42924</a><a href="mailto:vikranth.chemicals@gmail.com">vikranth.chemicals@gmail.com</a><p>Saraswathy Enclave, Lakshmipuram, Kolathur,<br/>Chennai — 600099, Tamil Nadu, India.</p></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Vikranth Chemical Corporation</span><span><a href="/site-map/">HTML Sitemap</a> · <a href="/sitemap.xml">XML Sitemap</a> · <a href="#contact">Privacy</a> · <a href="#contact">Terms</a> · <a href="#contact">LinkedIn</a></span></div>
      </footer>

      <button className="chatbot-fab" onClick={() => openQuote("Chatbot enquiry")} aria-label="Open ingredient chatbot">
        <img src="/chatbot-chef.png" alt="" />
      </button>
      <a className="whatsapp-fab" href="https://wa.me/918754442924" target="_blank" rel="noreferrer" aria-label="Chat with Vikranth on WhatsApp">
        <img src="/whatsapp-branded.png" alt="" />
      </a>

      <div className={`catalog-modal ${catalogOpen ? "open" : ""}`} aria-hidden={!catalogOpen}>
        <button className="modal-close" onClick={() => setCatalogOpen(false)}><X/></button>
        <div className="catalog-shell">
          <div className="catalog-header"><span className="eyebrow">Complete portfolio</span><h2>Find your ingredient.</h2>
            <div className="search-box"><Search/><input autoFocus={catalogOpen} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search cocoa, pectin, whey, syrupâ€¦"/>{query && <button onClick={() => setQuery("")}><X/></button>}</div>
          </div>
          <div className="catalog-body">
            {!query && <aside>{productGroups.map((g,i) => <button key={g.name} onClick={() => setActiveGroup(i)} className={activeGroup === i ? "active" : ""}>{g.name}<span>{Object.values(g.subgroups).flat().length}</span></button>)}</aside>}
            <section className="catalog-results">
              <div className="result-head"><span>{query ? `${matches.length} matches` : productGroups[activeGroup].name}</span><small>Tap any ingredient to request pricing</small></div>
              <div className="result-grid">
                {(query ? matches : allProducts.filter(p => p.groupIndex === activeGroup)).map((p,i) => <button key={`${p.item}-${i}`} onClick={() => openQuote(p.item)}>
                  <span>{p.subgroup}</span><b>{p.item}</b><i><ArrowRight/></i>
                </button>)}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className={`quote-drawer ${quoteOpen ? "open" : ""}`}>
        <button className="drawer-backdrop" onClick={() => setQuoteOpen(false)} aria-label="Close quote form"/>
        <aside>
          <button className="drawer-close" onClick={() => setQuoteOpen(false)}><X/></button>
          <span className="eyebrow">Priority response desk</span>
          <h2>Tell us what<br/>youâ€™re making.</h2>
          <p>Share your ingredient, application, quantity and delivery location. Our team will confirm availability and suitable next steps.</p>
          <QuoteForm selected={selectedProduct} onDone={() => setQuoteOpen(false)}/>
          <div className="drawer-contact"><Phone/><span><small>Prefer to talk?</small><b>+91 87544 42924</b></span></div>
        </aside>
      </div>
    </main>
  );
}
