"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Beaker, Building2, CakeSlice, ChevronDown, ChevronRight, CircleGauge, FlaskConical, Handshake, Headphones, HeartPulse, IceCreamBowl, Leaf, Mail, MapPin, Menu, Milk, Phone, Search, ShieldCheck, Sparkles, Wheat, X } from "lucide-react";
import CocoaMascot from "./CocoaMascot/CocoaMascot";
import styles from "./detail.module.css";

import { partners, partnerSpecialties } from "../data/partners";

const GlobalSearch = dynamic(() => import("./GlobalSearch"), { ssr: false });

const categories = [
  ["bakery-ingredients", "Bakery Ingredients"],
  ["chocolate-confectionery", "Chocolate & Confectionery"],
  ["dairy-ingredients", "Dairy Ingredients"],
  ["beverage-ingredients", "Beverage Ingredients"],
  ["ice-cream-ingredients", "Ice Cream Ingredients"],
  ["fruit-processing", "Fruit Processing"],
  ["hydrocolloids-stabilizers", "Hydrocolloids & Stabilizers"],
  ["sweeteners-syrups-starches", "Sweeteners, Syrups & Starches"],
  ["functional-ingredients", "Functional Ingredients"],
  ["nutraceutical-pharma", "Nutraceutical & Pharma"],
  ["food-additives-preservatives", "Food Additives & Preservatives"],
].map(([slug, name]) => ({ slug, name, href: `/industries/${slug}`, image: `/products/${slug}-v1.webp`, summary: `Explore ${name.toLowerCase()} for commercial food production.` }));
const industryIcons = [CakeSlice, Sparkles, Milk, FlaskConical, IceCreamBowl, Leaf, Beaker, Wheat, CircleGauge, HeartPulse, ShieldCheck];

const UtilitySet = ({ hidden = false }) => <div className={styles.utilitySet} aria-hidden={hidden || undefined}><span><BadgeCheck/> Food Ingredients</span><span><MapPin/> Chennai</span><span>Chennai · India</span><a href="tel:+918754442924"><Phone/> +91 87544 42924</a><a href="mailto:vikranth.chemicals@gmail.com"><Mail/> vikranth.chemicals@gmail.com</a></div>;

export default function DetailHeaderClient() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [industryMegaOpen, setIndustryMegaOpen] = useState(false);
  const [supplierMegaOpen, setSupplierMegaOpen] = useState(false);
  const [supplierQuery, setSupplierQuery] = useState("");
  const filteredSuppliers = partners.filter((partner) => partner.name.toLowerCase().includes(supplierQuery.trim().toLowerCase()));
  const [activeCategory, setActiveCategory] = useState(categories[1] || categories[0]);
  const headerRef = useRef(null);
  useEffect(() => {
    if (!open && !megaOpen && !industryMegaOpen && !supplierMegaOpen) return;
    const close = (event) => { if (!headerRef.current?.contains(event.target)) { setMegaOpen(false); setIndustryMegaOpen(false); setSupplierMegaOpen(false); } };
    const escape = (event) => { if (event.key === "Escape") { setOpen(false); setMegaOpen(false); setIndustryMegaOpen(false); setSupplierMegaOpen(false); } };
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [open, megaOpen, industryMegaOpen, supplierMegaOpen]);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    const closeAtDesktop = () => { if (window.innerWidth > 1100) setOpen(false); };
    window.addEventListener("resize", closeAtDesktop);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("resize", closeAtDesktop); };
  }, [open]);
  const closeMenus = () => { setOpen(false); setMegaOpen(false); setIndustryMegaOpen(false); setSupplierMegaOpen(false); };
  const isCurrent = (section) => {
    if (section === "home") return pathname === "/";
    if (section === "products") return pathname === "/products" || pathname.startsWith("/products/");
    if (section === "industries") return pathname === "/industries" || pathname.startsWith("/industries/");
    if (section === "suppliers") return pathname === "/associates" || pathname.startsWith("/associates/");
    return pathname === `/${section}` || pathname.startsWith(`/${section}/`);
  };
  return <>
    <div className={styles.utility}><div className={styles.utilityViewport}><div className={styles.utilityTrack}><UtilitySet/><UtilitySet hidden/></div></div></div>
    <header className={styles.header} ref={headerRef}><div className={styles.headerInner}>
      <Link className={styles.brand} href="/"><CocoaMascot/><Image src="/logo-vikranth.webp" width={190} height={72} alt="Vikranth Chemical Corporation"/></Link>
      <nav id="detail-primary-navigation" className={open ? styles.navOpen : ""} aria-label="Primary navigation"><Link aria-current={isCurrent("home") ? "page" : undefined} href="/" onClick={closeMenus}>Home</Link><Link aria-current={isCurrent("about") ? "page" : undefined} href="/about" onClick={closeMenus}>About</Link><button suppressHydrationWarning className={styles.productsTrigger} aria-current={isCurrent("products") ? "page" : undefined} onClick={() => { setMegaOpen(value => !value); setIndustryMegaOpen(false); setSupplierMegaOpen(false); }} aria-expanded={megaOpen} aria-controls="site-products-mega-menu">Products <ChevronDown/></button><Link className={styles.mobileProductsLink} aria-current={isCurrent("products") ? "page" : undefined} href="/products" onClick={closeMenus}>Products</Link><button suppressHydrationWarning className={`${styles.productsTrigger} ${styles.mobileIndustryTrigger}`} aria-current={isCurrent("industries") ? "page" : undefined} onClick={() => { setIndustryMegaOpen(value => !value); setMegaOpen(false); setSupplierMegaOpen(false); }} aria-expanded={industryMegaOpen} aria-controls="site-industries-mega-menu detail-mobile-industries">Industries <ChevronDown/></button><Link className={`${styles.mobileProductsLink} ${styles.mobileIndustryLink}`} aria-current={isCurrent("industries") ? "page" : undefined} href="/industries" onClick={closeMenus}>Industries</Link><div id="detail-mobile-industries" className={`${styles.mobileIndustriesList} ${industryMegaOpen ? styles.mobileIndustriesListOpen : ""}`}>{categories.map((industry) => <Link key={industry.slug} href={industry.href} onClick={closeMenus}>{industry.name}<ArrowRight/></Link>)}<Link className={styles.mobileIndustriesAll} href="/industries" onClick={closeMenus}>View All Industries <ArrowRight/></Link></div><button suppressHydrationWarning className={`${styles.productsTrigger} ${styles.mobileSupplierTrigger}`} aria-current={isCurrent("suppliers") ? "page" : undefined} onClick={() => { setSupplierMegaOpen(value => !value); setMegaOpen(false); setIndustryMegaOpen(false); }} aria-expanded={supplierMegaOpen} aria-controls="site-suppliers-mega-menu detail-mobile-suppliers">Suppliers <ChevronDown/></button><Link className={`${styles.mobileProductsLink} ${styles.mobileSupplierLink}`} aria-current={isCurrent("suppliers") ? "page" : undefined} href="/associates" onClick={closeMenus}>Suppliers</Link><div id="detail-mobile-suppliers" className={`${styles.mobileSuppliersList} ${supplierMegaOpen ? styles.mobileSuppliersListOpen : ""}`}>{partners.map((partner) => <Link key={partner.slug} href={`/associates/${partner.slug}`} onClick={closeMenus}><span><img src={partner.logo} alt="" width="150" height="60" loading="lazy" decoding="async"/>{partner.name}</span><ArrowRight/></Link>)}<Link className={styles.mobileSuppliersAll} href="/associates" onClick={closeMenus}>View All Suppliers <ArrowRight/></Link></div><Link aria-current={isCurrent("contact") ? "page" : undefined} href="/contact" onClick={closeMenus}>Contact</Link></nav>
      <GlobalSearch onOpen={closeMenus}/><Link className={styles.quote} href="/contact#enquiry">Request a Quote <ArrowRight/></Link><button suppressHydrationWarning className={styles.menuButton} onClick={() => setOpen(value => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="detail-primary-navigation">{open ? <X/> : <Menu/>}</button>
    </div><div id="site-products-mega-menu" className={`${styles.megaMenu} ${megaOpen ? styles.megaMenuOpen : ""}`} aria-hidden={!megaOpen}><span className={styles.megaPointer} aria-hidden="true"/><div className={styles.megaSurface}><aside className={styles.megaCategoryNav} aria-label="Product categories"><div><Wheat/><section><span>Product Categories</span><small>{categories.length} industries</small></section><p>Ingredients organised by industry.</p></div>{categories.map((category, index) => <button key={category.slug} className={activeCategory.slug === category.slug ? styles.megaCategoryActive : ""} onMouseEnter={() => setActiveCategory(category)} onFocus={() => setActiveCategory(category)} onClick={() => setActiveCategory(category)}><small aria-hidden="true">{String(index + 1).padStart(2, "0")}</small><span>{category.name}</span><ChevronRight/></button>)}</aside><section className={styles.megaProductPanel} aria-live="polite"><div className={styles.megaProductHeading}><div><span>Ingredients for</span><h2>{activeCategory.name}</h2><p>{activeCategory.summary}</p></div><Link href={activeCategory.href} onClick={closeMenus}>Explore category <ArrowRight/></Link></div><div className={styles.megaProductGroups}><div className={styles.megaProductGroup}><h3>Browse the catalogue</h3><div><Link href={activeCategory.href} onClick={closeMenus}><span>View {activeCategory.name}</span><ArrowRight/></Link><Link href="/products" onClick={closeMenus}><span>View all products</span><ArrowRight/></Link></div></div></div></section></div></div><div id="site-industries-mega-menu" className={`${styles.megaMenu} ${styles.industriesShowcaseMenu} ${industryMegaOpen ? styles.megaMenuOpen : ""}`} aria-hidden={!industryMegaOpen}><span className={`${styles.megaPointer} ${styles.industryMegaPointer}`} aria-hidden="true"/><div className={styles.industriesShowcaseSurface}><aside className={styles.industriesShowcaseIntro}><div><span>Solutions by industry</span><p>Find ingredients selected for your production needs.</p></div><img src="/industries/chocolate-confectionery.webp" alt="Chocolate, bakery and dessert ingredient applications" width="420" height="560"/><Link href="/industries" onClick={closeMenus}>View All Industries <ArrowRight/></Link></aside><section className={styles.industriesShowcaseContent}><div className={styles.industriesShowcaseHeading}><span>Industries We Serve</span><small>{categories.length} specialist categories</small></div><div className={styles.industriesShowcaseGrid} aria-label="Industries">{categories.map((industry, index) => { const IndustryIcon = industryIcons[index] || Building2; return <Link key={industry.slug} className={index === 1 ? styles.industriesShowcaseFeatured : ""} href={industry.href} onClick={closeMenus}><IndustryIcon className={styles.industryShowcaseIcon}/><strong>{industry.name}</strong><p>{industry.summary}</p><ArrowRight className={styles.industryShowcaseArrow}/></Link>; })}</div><div className={styles.industriesShowcaseHelp}><span><Headphones/></span><strong>Not sure which solution fits your application?</strong><Link href="/contact#enquiry" onClick={closeMenus}>Speak to an Ingredient Specialist <ArrowRight/></Link></div></section></div></div><div id="site-suppliers-mega-menu" className={`${styles.megaMenu} ${styles.supplierShowcaseMenu} ${supplierMegaOpen ? styles.megaMenuOpen : ""}`} aria-hidden={!supplierMegaOpen}><span className={`${styles.megaPointer} ${styles.supplierMegaPointer}`} aria-hidden="true"/><div className={styles.supplierShowcaseSurface}><aside className={styles.supplierShowcaseIntro}><div><span>Our supplier network</span><p>Explore trusted ingredient manufacturers and specialist partners.</p></div><img src="/industries/bakery-ingredients.webp" alt="Food ingredients supplied by our specialist partner network" width="420" height="560"/><Link href="/associates" onClick={closeMenus}>View All Suppliers <ArrowRight/></Link></aside><section className={styles.supplierShowcaseContent}><div className={styles.supplierShowcaseHeading}><strong>Explore by Supplier</strong><label><Search/><input type="search" value={supplierQuery} onChange={(event) => setSupplierQuery(event.target.value)} placeholder="Search supplier name" aria-label="Search supplier name"/></label></div><div className={styles.supplierShowcaseGrid} aria-label="Suppliers">{filteredSuppliers.map((partner) => <Link key={partner.slug} className={partner.slug === "roquette" ? styles.supplierShowcaseFeatured : ""} href={`/associates/${partner.slug}`} onClick={closeMenus}><img src={partner.logo} alt="" width="150" height="60" loading="lazy" decoding="async"/><span><strong>{partner.name}</strong><small>{partnerSpecialties[partner.slug]}</small></span><ArrowRight/></Link>)}{!filteredSuppliers.length && <p className={styles.supplierSearchEmpty}>No suppliers match your search.</p>}</div><div className={styles.supplierShowcaseHelp}><span><Headphones/></span><strong>Need help sourcing a specific ingredient?</strong><Link href="/contact#enquiry" onClick={closeMenus}>Ask Our Sourcing Team <ArrowRight/></Link></div></section></div></div></header>
    <div className={styles.chromeSpacer} aria-hidden="true"/>
  </>;
}
