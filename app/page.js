"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, BadgeCheck, Beaker, Box, Building2, CakeSlice, Check,
  ChevronDown, ChevronRight, CircleGauge, Clock3, Factory, FlaskConical,
  Globe2, Handshake, Headphones, HeartPulse, IceCreamBowl, Leaf,
  Menu, MessageCircle, Milk, PackageCheck, Phone, Search, ShieldCheck,
  Sparkles, Truck, Wheat, X, Zap
} from "lucide-react";

const productGroups = [
  { name: "Bakery Ingredients", icon: CakeSlice, accent: "#efb16f", blurb: "Performance-led systems for consistent crumb, rise and shelf life.", subgroups: {
    "Cake Ingredients": ["Cake Gel", "Cake Life", "Cake Premix", "Custard Powder"],
    "Bread Ingredients": ["Bread Yield Improver"], "Leavening Agents": ["MACP", "Baking Powder"],
    "Bakery Syrups": ["Corn Syrup"], "Shelf Life Improvers": ["Calcium Propionate (CP)"], "Frozen Bakery": ["Frozen Croissant"]
  }},
  { name: "Chocolate & Confectionery", icon: Sparkles, accent: "#a76443", blurb: "Cocoa, couverture and chocolate solutions made for indulgence.", subgroups: {
    "Cocoa Products": ["Cocoa Butter", "Cocoa Mass", "Cocoa Powder"], "Chocolate Range": ["Dark Chocolate", "Milk Chocolate", "White Chocolate"],
    "Choco Chips": ["White Chips", "Dark Chips", "Milk Chips"], "Chocomass": ["White Chocomass", "Dark Chocomass", "Milk Chocomass"],
    "Chocolate Paste": ["Choco Paste"], "Beverage Solutions": ["Chocolate Drink"], "Couverture": ["Callebaut 811", "Callebaut 823", "Callebaut W2", "Bitter Chocolate 70-3", "CB Plein Aroma Cocoa Powder"]
  }},
  { name: "Dairy Ingredients", icon: Milk, accent: "#e8d8bb", blurb: "Cream, cheese, butter, milk and whey from trusted makers.", subgroups: {
    "Cream Products": ["Whipping Cream", "Cream Cheese"], "Butter Products": ["Butter"],
    "Milk Powders": ["Good Day Milk Powder", "Krishna Milk Powder"], "Whey Products": ["Amul Whey Powder"]
  }},
  { name: "Beverage Ingredients", icon: FlaskConical, accent: "#d68d55", blurb: "Flavours, natural bases and fruit solutions for better beverages.", subgroups: {
    "Beverage Flavours": ["Flavours & Natural Ingredients"], "Beverage Bases": ["Chocolate Drink"], "Fruit Ingredients": ["Fruit Crush"]
  }},
  { name: "Ice Cream Ingredients", icon: IceCreamBowl, accent: "#f4cfc2", blurb: "Bases, flavours, toppings and stabilizers for a smoother scoop.", subgroups: {
    "Ice Cream Bases": ["Frozen Yogurt Premix", "Panna Base"], "Flavours": ["French Vanilla", "Cocoa Miscela"],
    "Toppings": ["Dessert Toppings"], "Stabilizers": ["Ice Cream Stabilizer"]
  }},
  { name: "Fruit Processing", icon: Leaf, accent: "#c68556", blurb: "Fillings, purees, pectin and glazes with reliable fruit character.", subgroups: {
    "Fruit Fillings": ["Fruit Filling"], "Fruit Preparations": ["Fruit Crush"], "Frozen Fruits & Purees": ["Frozen Fruits", "Fruit Purees"],
    "Gelling Agents": ["Genu Pectin"], "Glazes & Toppings": ["Glaze Gel"]
  }},
  { name: "Hydrocolloids & Stabilizers", icon: Beaker, accent: "#a97e56", blurb: "Texture systems engineered for viscosity, stability and mouthfeel.", subgroups: {
    "Pectin": ["Genu Pectin"], "Gelatin": ["Gelatin 120 Bloom", "Gelatin 180 Bloom"],
    "Food Gums": ["Xanthan Gum", "Guar Gum", "Sodium CMC"], "Stabilizers": ["Ice Cream Stabilizer"]
  }},
  { name: "Sweeteners, Syrups & Starches", icon: Wheat, accent: "#d0a34f", blurb: "Sweetness, body and functional carbohydrates for every formulation.", subgroups: {
    "Liquid Sweeteners": ["Liquid Glucose", "Sorbitol 70% Solution", "Invert Sugar"], "Sweeteners": ["Sorbitol", "Aspartame"],
    "Starches": ["Maize Starch", "Potato Starch"], "Carbohydrates": ["Dextrose Monohydrate", "Maltodextrine Powder"], "Syrups": ["Corn Syrup"]
  }},
  { name: "Functional Ingredients", icon: CircleGauge, accent: "#b97547", blurb: "Emulsifiers, proteins and process aids for dependable performance.", subgroups: {
    "Emulsifiers": ["GMS Flakes", "GMS Powder", "Sorbitan Mono Stearate", "Finamul 90", "DMG", "PGMS", "SMS", "PGPR", "Soya Lecithin"],
    "Proteins": ["Whey Protein", "Whey Powder", "Soya Protein", "Vital Wheat Gluten", "Skimmed Milk Powder"],
    "Processing Ingredients": ["Calcium Carbonate", "Calcium Chloride", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"]
  }},
  { name: "Nutraceutical & Pharma", icon: HeartPulse, accent: "#bf8c6e", blurb: "Protein, gelatin, vitamin and mineral inputs for wellness systems.", subgroups: {
    "Protein Ingredients": ["Whey Protein", "Whey Powder", "Soya Protein"], "Gelatin": ["Gelatin 120 Bloom", "Gelatin 180 Bloom"],
    "Vitamins & Minerals": ["Ascorbic Acid", "Calcium Carbonate"]
  }},
  { name: "Food Additives & Preservatives", icon: ShieldCheck, accent: "#956039", blurb: "A comprehensive shelf-life, flavour, colour and processing portfolio.", subgroups: {
    "Preservatives": ["Potassium Sorbate", "Sorbic Acid", "Sodium Benzoate", "Potassium Metabisulphite (KMS)"],
    "Acidulants": ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Ascorbic Acid"],
    "Leavening": ["Ammonium Bicarbonate", "Baking Powder", "Sodium Bicarbonate", "SAPP"],
    "Colours, Flavours & Extracts": ["Black Cocoa Powder", "Caramel", "Extra Pure Vanillin", "Orange Oil", "Saucetec"]
  }}
];

const industries = [
  ["Bakery & Confectionery", CakeSlice], ["Dairy & Ice Cream", Milk], ["Beverages", FlaskConical],
  ["Pharmaceuticals", HeartPulse], ["Nutraceuticals", Leaf], ["Food Manufacturing", Factory],
  ["Hospitality", Building2], ["Industrial Applications", Beaker]
];

const associates = [
  { name: "CAMPCO", logo: "/partners/campco.png" },
  { name: "Delta Nutritives", logo: "/partners/delta.png" },
  { name: "Roquette", logo: "/partners/roquette.png" },
  { name: "Nitta Gelatin India Ltd.", logo: "/partners/nitta.png" },
  { name: "Döhler", logo: "/partners/doehler.png" },
  { name: "CP Kelco", logo: "/partners/cp-kelco.png" },
  { name: "Calpro Specialities Pvt. Ltd.", logo: "/partners/calpro.png" },
  { name: "Gujarat Ambuja Exports Ltd.", logo: "/partners/ambuja.png" },
  { name: "Fine Organics", logo: "/partners/fine-organics.png" },
  { name: "Shree Gluco Biotech Pvt. Ltd.", logo: "/partners/shree-gluco.png" },
  { name: "Paramesu Biotech Ltd.", logo: "/partners/paramesu.png" },
  { name: "Anchor", logo: null, detail: "In-house manufacturing brand" }
];

function Logo({ light = false }) {
  return (
    <a className={`logo ${light ? "light" : ""}`} href="#home" aria-label="Vikranth home">
      <span className="logo-mark"><i/><i/><i/><i/><i/><i/></span>
      <span><b>VIKRANTH</b><small>CHEMICAL CORPORATION</small></span>
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
      <label>Work email<input type="email" placeholder="name@company.com" required /></label>
      <div className="field-row">
        <label>Your name<input placeholder="Full name" required /></label>
        <label>Phone<input type="tel" placeholder="+91" required /></label>
      </div>
      <label>Product interest<input defaultValue={selected || ""} placeholder="e.g. Cocoa Powder" /></label>
      <label>Requirement<textarea placeholder="Tell us quantity, application and delivery city" rows="3" required /></label>
      <button className="btn primary wide" type="submit">Confirm request <ArrowRight size={17}/></button>
      <p className="form-note"><ShieldCheck size={14}/> Your details stay private and are used only for this enquiry.</p>
    </form>
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const nodes = document.querySelectorAll(".section-head, .product-card, .industry-grid article, .about-visual, .about-copy, .supplier-head, .supplier-feature > div, .insight-grid article, .cta-inner");
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

  const openQuote = (product = "") => { setSelectedProduct(product); setQuoteOpen(true); setCatalogOpen(false); setMenuOpen(false); };
  const jump = () => { setMenuOpen(false); setMegaOpen(false); };

  return (
    <main>
      <div className="utility">
        <div className="container utility-inner">
          <span><BadgeCheck size={14}/> ISO 9001:2015 Certified</span>
          <span><Globe2 size={14}/> Pan-India supply network</span>
          <span className="utility-tag">Ingredients that build your business</span>
          <a href="tel:+914442221314"><Phone size={14}/> +91 444 222 1314</a>
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
            <button className="mobile-quote btn primary" onClick={() => openQuote()}>Request a quote</button>
          </nav>
          <div className="nav-actions">
            <button className="search-trigger" onClick={() => setCatalogOpen(true)} aria-label="Search products"><Search size={19}/></button>
            <button className="btn primary desktop-quote" onClick={() => openQuote()}>Request a quote <ArrowRight size={16}/></button>
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
        <video className="hero-img" src="/vikranth-hero.mp4" poster="/hero-ingredients.png" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"></video>
        <div className="hero-shade"/>
        <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker"><span/> B2B ingredient solutions</span>
            <h1>Reliable ingredients.<br/><em>Stronger business.</em></h1>
            <p>A trusted importer, distributor and wholesaler of high-quality food ingredients and specialty chemicals—backed by responsive service and dependable pan-India supply.</p>
            <div className="hero-buttons">
              <button className="btn gold" onClick={() => setCatalogOpen(true)}>Explore products <ArrowRight size={17}/></button>
              <a className="btn ghost" href="#about">Request a quote</a>
            </div>
            <div className="hero-trust">
              <span><ShieldCheck/> Quality assured</span><span><Truck/> Pan-India delivery</span><span><Headphones/> Technical guidance</span>
            </div>
          </div>
          <div className="hero-card">
            <span className="live-dot"/> Supply desk online
            <strong>Need a formulation-ready ingredient?</strong>
            <p>Tell us your application. Weâ€™ll match the right grade and supplier.</p>
            <button onClick={() => openQuote()}>Start a requirement <ArrowRight/></button>
          </div>
        </div>
        <div className="scroll-cue"><span/> Scroll to discover</div>
      </section>

      <section className="metrics">
        <div className="container metric-grid">
          {[
            [Clock3, "25+", "Years of", "Experience"], [Handshake, "1000+", "Happy", "B2B Clients"],
            [PackageCheck, "500+", "Quality", "Products"], [Globe2, "Pan India", "Delivery", "Network"]
          ].map(([Icon,n,line1,line2]) => <div key={n} className="metric-item"><span className="metric-icon"><Icon/></span><span className="metric-copy"><strong>{n}</strong><small>{line1}<br/>{line2}</small></span></div>)}
        </div>
      </section>

      <section className="section product-section" id="products">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Our product categories</span><h2>High-quality ingredients<br/><em>for every industry.</em></h2></div>
            <div><p>Navigate a portfolio built around real production needsâ€”from texture and shelf life to indulgence and nutrition.</p>
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
          <div className="product-grid">
            {productGroups.slice(0,6).map((group, i) => {
              const Icon = group.icon;
              return <article className="product-card" key={group.name} style={{"--accent": group.accent, "--delay": `${i * 60}ms`}}>
                <div className="card-top"><span className="card-no">0{i+1}</span><span className="card-icon"><Icon/></span></div>
                <div className="category-photo"><img src="/ingredient-portfolio.png" alt="" style={{objectPosition: ["5% center","20% center","43% center","58% center","76% center","94% center"][i]}} /></div>
                <h3>{group.name}</h3><p>{group.blurb}</p>
                <button onClick={() => { setActiveGroup(i); setCatalogOpen(true); }}>View Products <ArrowRight size={15}/></button>
              </article>
            })}
          </div>
          <button className="btn outline center-btn" onClick={() => setCatalogOpen(true)}>View complete catalogue <ArrowRight size={16}/></button>
        </div>
      </section>

      <section className="section industries" id="industries">
        <div className="container">
          <span className="eyebrow light-text">Industries we serve</span>
          <div className="industry-intro"><h2>Ingredients That Power Diverse Industries</h2></div>
          <div className="industry-grid">
            {industries.map(([name, Icon], i) => <article key={name}><span>0{i+1}</span><Icon/><h3>{name}</h3><button onClick={() => openQuote(name)}>Discuss your application <ArrowRight size={14}/></button></article>)}
          </div>
          <button className="btn primary industry-cta" onClick={() => openQuote("Industry enquiry")}>View All Industries <ArrowRight size={16}/></button>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="lab-stage about-video-stage">
              <video src="/about-food-b2b.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Food ingredient applications and manufacturing"></video>
              <div className="about-video-shade"></div>
            </div>
            <div className="about-caption"><span>Since 2001</span><p>Built on dependable relationships, transparent trade and technical curiosity.</p></div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">Why choose Vikranth Chemical Corporation?</span>
            <h2>Distribution with a<br/><em>scientist's mindset.</em></h2>
            <p className="lead">We don't simply move materials. We help businesses find ingredients that perform, arrive on time and make commercial sense.</p>
            <div className="value-list">
              {[
                [ShieldCheck, "Quality without compromise", "Qualified sources and consistent global standards."],
                [Handshake, "Partnership over transactions", "Responsive, long-term support for growing businesses."],
                [PackageCheck, "Supply built for certainty", "A wide portfolio, distributed through a reliable India-wide network."],
                [Zap, "Faster answers", "Application-aware sourcing and quick commercial response."]
              ].map(([Icon,title,text]) => <div key={title}><span><Icon/></span><section><h3>{title}</h3><p>{text}</p></section></div>)}
            </div>
            <button className="btn dark" onClick={() => openQuote()}>Work with Vikranth <ArrowRight size={16}/></button>
          </div>
        </div>
      </section>

      <section className="supplier-section" id="suppliers">
        <div className="container">
          <div className="supplier-head"><div><span className="eyebrow">Trusted by leading brands</span><h2>Global manufacturers.<br/><em>One trusted partner.</em></h2></div><p>Access leading global and Indian ingredient manufacturers through a responsive local team that understands your commercial and technical requirements.</p></div>
          <div className="logo-marquee"><div className="logo-track">{[...associates,...associates].map((partner,i) => <div className="associate-logo" key={`${partner.name}-${i}`}>{partner.logo ? <img src={partner.logo} alt="" /> : <span className="anchor-mark">A</span>}<span><b>{partner.name}</b>{partner.detail && <small>{partner.detail}</small>}</span></div>)}</div></div>
          <div className="supplier-feature">
            <div><Globe2/><span>Worldwide sourcing</span><p>Access respected ingredient producers and specialized grades.</p></div>
            <div><Truck/><span>India-wide fulfillment</span><p>Commercial quantities delivered through an established network.</p></div>
            <div><Headphones/><span>Human support</span><p>One responsive team from product selection to repeat supply.</p></div>
          </div>
        </div>
      </section>

      <section className="testimonial-section" aria-labelledby="testimonial-title">
        <div className="container testimonial-inner">
          <span className="eyebrow">Customer testimonial</span>
          <div className="testimonial-quote">
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote id="testimonial-title">
              Their technical expertise and ingredient solutions have helped us
              formulate with greater confidence and consistency.
            </blockquote>
            <span className="quote-mark closing" aria-hidden="true">”</span>
          </div>
          <div className="testimonial-author">
            <span className="author-avatar" aria-hidden="true">RM</span>
            <div>
              <strong>Ravi Menon</strong>
              <span>Head of Product Development</span>
              <span className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</span>
            </div>
          </div>
          <div className="testimonial-grid">
            <article>
              <span className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <blockquote>
                “Vikranth consistently helps us identify the right ingredient
                grades while keeping supply timelines clear and dependable.”
              </blockquote>
              <footer>
                <span className="author-avatar" aria-hidden="true">AS</span>
                <div><strong>Anita Sharma</strong><span>Procurement Manager</span></div>
              </footer>
            </article>
            <article>
              <span className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <blockquote>
                “Their responsive team and application knowledge have made
                ingredient sourcing faster, simpler and more reliable for us.”
              </blockquote>
              <footer>
                <span className="author-avatar" aria-hidden="true">DK</span>
                <div><strong>Deepak Kumar</strong><span>Operations Director</span></div>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section className="section insights" id="insights">
        <div className="container">
          <div className="section-title-line"><div><span className="eyebrow">Technical resources</span><h2>Practical knowledge for<br/><em>better formulation.</em></h2></div><a href="#contact">View all insights <ArrowRight size={16}/></a></div>
          <div className="insight-grid">
            {[
              ["Texture systems", "How hydrocolloids shape stability, mouthfeel and shelf performance.", "06 min read", "01"],
              ["Bakery performance", "Choosing the right improver for softness, rise and production consistency.", "05 min read", "02"],
              ["Cocoa decisions", "Cocoa powder, mass or couverture? A practical sourcing guide.", "07 min read", "03"]
            ].map(([tag,title,time,no]) => <article key={no}><span className="article-no">{no}</span><small>{tag}</small><h3>{title}</h3><div><Clock3 size={14}/>{time}<button aria-label="Read article"><ArrowRight/></button></div></article>)}
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-heading">
        <div className="container faq-layout">
          <div className="faq-intro">
            <span className="eyebrow">Frequently asked questions</span>
            <h2 id="faq-heading">Answers to your<br/><em>formulation questions.</em></h2>
            <button className="text-link" onClick={() => openQuote("Technical guidance")}>
              Contact our technical team <ArrowRight size={16}/>
            </button>
          </div>
          <div className="faq-list">
            {[
              ["How do you support new product formulation?", "We help identify suitable ingredients, grades and suppliers based on your application, process and commercial requirements."],
              ["Can you help improve an existing formulation?", "Yes. Share the performance issue or target outcome and our team can suggest ingredient options for trials and evaluation."],
              ["Which industries and applications do you serve?", "We support bakery, confectionery, dairy, beverages, nutraceuticals, pharmaceuticals, food manufacturing and other industrial applications."],
              ["How can I request technical guidance or samples?", "Send us your application, required grade, approximate quantity and delivery city. Our team will confirm the most suitable next step."]
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div className="cta-bg"/><div className="container cta-inner">
          <span className="eyebrow light-text">Letâ€™s build your next product</span>
          <h2>Need bulk supply or<br/><em>a custom solution?</em></h2>
          <p>Share the application, grade, quantity and destination. Weâ€™ll take it from there.</p>
          <div><button className="btn gold" onClick={() => openQuote()}>Request a quote <ArrowRight size={17}/></button><a className="btn ghost" href="tel:+914442221314"><Phone size={16}/> +91 444 222 1314</a></div>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div><Logo light/><p>Leading importer, distributor and wholesaler of food ingredients and specialty chemicals for manufacturers across India.</p><span className="iso"><BadgeCheck/> ISO 9001:2015</span></div>
          <div><h4>Explore</h4><a href="#about">About</a><a href="#products">Products</a><a href="#industries">Industries</a><a href="#suppliers">Suppliers</a></div>
          <div><h4>Product families</h4>{productGroups.slice(0,5).map(g => <button key={g.name} onClick={() => setCatalogOpen(true)}>{g.name}</button>)}</div>
          <div><h4>Contact</h4><a href="tel:+914442221314">+91 444 222 1314</a><a href="mailto:sales@vikranthchem.com">sales@vikranthchem.com</a><p>No. 12, Chemical House,<br/>Guindy Industrial Estate,<br/>Chennai â€” 600032</p></div>
        </div>
        <div className="container footer-bottom"><span>Â© 2026 Vikranth Chemical Corporation</span><span>Quality ingredients. Stronger businesses.</span></div>
      </footer>

      <button className="whatsapp" onClick={() => openQuote("WhatsApp enquiry")} aria-label="Chat on WhatsApp"><MessageCircle/><span>Quick enquiry</span></button>

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
          <p>Share a few details and our team will confirm availability, suitable grade and next steps.</p>
          <QuoteForm selected={selectedProduct} onDone={() => setQuoteOpen(false)}/>
          <div className="drawer-contact"><Phone/><span><small>Prefer to talk?</small><b>+91 444 222 1314</b></span></div>
        </aside>
      </div>
    </main>
  );
}
