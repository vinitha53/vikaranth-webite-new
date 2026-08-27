"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Building2, ChevronDown, ChevronRight, Handshake, Mail, MapPin, Menu, Phone, Wheat, X } from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import styles from "./detail.module.css";
import { getProductHref, industries, productMenuGroupsByIndustrySlug } from "../data/catalog";
import { partners } from "../data/partners";

const categories = industries.map((industry) => ({ ...industry, href: `/industries/${industry.slug}`, image: `/products/${industry.slug}-v1.webp` }));

const UtilitySet = ({ hidden = false }) => <div className={styles.utilitySet} aria-hidden={hidden || undefined}><span><BadgeCheck/> B2B Food Ingredient Supplier</span><span><MapPin/> Chennai</span><span>Serving businesses across India</span><a href="tel:+918754442924"><Phone/> +91 87544 42924</a><a href="mailto:vikranth.chemicals@gmail.com"><Mail/> vikranth.chemicals@gmail.com</a></div>;

export default function DetailHeaderClient() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [industryMegaOpen, setIndustryMegaOpen] = useState(false);
  const [supplierMegaOpen, setSupplierMegaOpen] = useState(false);
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
  const activeGroups = productMenuGroupsByIndustrySlug[activeCategory.slug] || [{ name: "Ingredients", ingredients: activeCategory.products }];
  return <>
    <div className={styles.utility}><div className={styles.utilityViewport}><div className={styles.utilityTrack}><UtilitySet/><UtilitySet hidden/></div></div></div>
    <header className={styles.header} ref={headerRef}><div className={styles.headerInner}>
      <Link className={styles.brand} href="/"><Image src="/logo-vikranth.png" width={190} height={72} alt="Vikranth Chemical Corporation"/></Link>
      <nav id="detail-primary-navigation" className={open ? styles.navOpen : ""} aria-label="Primary navigation"><Link href="/" onClick={closeMenus}>Home</Link><Link href="/about" onClick={closeMenus}>About</Link><button className={styles.productsTrigger} onClick={() => { setMegaOpen(value => !value); setIndustryMegaOpen(false); setSupplierMegaOpen(false); }} aria-expanded={megaOpen} aria-controls="site-products-mega-menu">Products <ChevronDown/></button><Link className={styles.mobileProductsLink} href="/products" onClick={closeMenus}>Products</Link><button className={styles.productsTrigger} onClick={() => { setIndustryMegaOpen(value => !value); setMegaOpen(false); setSupplierMegaOpen(false); }} aria-expanded={industryMegaOpen} aria-controls="site-industries-mega-menu">Industries <ChevronDown/></button><Link className={styles.mobileProductsLink} href="/industries" onClick={closeMenus}>Industries</Link><button className={styles.productsTrigger} onClick={() => { setSupplierMegaOpen(value => !value); setMegaOpen(false); setIndustryMegaOpen(false); }} aria-expanded={supplierMegaOpen} aria-controls="site-suppliers-mega-menu">Suppliers <ChevronDown/></button><Link className={styles.mobileProductsLink} href="/associates" onClick={closeMenus}>Suppliers</Link><Link href="/#insights" onClick={closeMenus}>Blog</Link><Link href="/contact" onClick={closeMenus}>Contact</Link></nav>
      <GlobalSearch onOpen={closeMenus}/><Link className={styles.quote} href="/contact#enquiry">Request a Quote <ArrowRight/></Link><button suppressHydrationWarning className={styles.menuButton} onClick={() => setOpen(value => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="detail-primary-navigation">{open ? <X/> : <Menu/>}</button>
    </div><div id="site-products-mega-menu" className={`${styles.megaMenu} ${megaOpen ? styles.megaMenuOpen : ""}`} aria-hidden={!megaOpen}><span className={styles.megaPointer} aria-hidden="true"/><div className={styles.megaSurface}><aside className={styles.megaCategoryNav} aria-label="Product categories"><div><Wheat/><section><span>Product Categories</span><small>{categories.length} industries</small></section><p>Ingredients organised by industry.</p></div>{categories.map((category, index) => <button key={category.slug} className={activeCategory.slug === category.slug ? styles.megaCategoryActive : ""} onMouseEnter={() => setActiveCategory(category)} onFocus={() => setActiveCategory(category)} onClick={() => setActiveCategory(category)}><small aria-hidden="true">{String(index + 1).padStart(2, "0")}</small><span>{category.name}</span><ChevronRight/></button>)}</aside><section className={styles.megaProductPanel} aria-live="polite"><div className={styles.megaProductHeading}><div><span>Ingredients for</span><h2>{activeCategory.name}</h2><p>{activeCategory.summary}</p></div><Link href={activeCategory.href} onClick={closeMenus}>Explore category <ArrowRight/></Link></div><div className={styles.megaProductGroups}>{activeGroups.map(group => <div className={styles.megaProductGroup} key={group.name}><h3>{group.name}</h3><div>{group.ingredients.map(product => <Link key={`${group.name}-${product}`} href={getProductHref(product)} onClick={closeMenus}><span>{product}</span><ArrowRight/></Link>)}</div></div>)}</div></section></div></div><div id="site-industries-mega-menu" className={`${styles.megaMenu} ${industryMegaOpen ? styles.megaMenuOpen : ""}`} aria-hidden={!industryMegaOpen}><span className={`${styles.megaPointer} ${styles.industryMegaPointer}`} aria-hidden="true"/><div className={styles.industryMenuSurface}><div className={styles.industryMenuHead}><Building2/><div><span>Industries We Serve</span><h2>Explore by industry</h2></div><small>{categories.length} industries</small></div><div className={styles.industryMenuGrid} aria-label="Industries">{categories.map((industry) => <Link key={industry.slug} href={industry.href} onClick={closeMenus}><span>{industry.name}</span><ArrowRight/></Link>)}<Link className={styles.industryMenuAll} href="/industries" onClick={closeMenus}><Building2/><span>View all industries</span><ArrowRight/></Link></div></div></div><div id="site-suppliers-mega-menu" className={`${styles.megaMenu} ${supplierMegaOpen ? styles.megaMenuOpen : ""}`} aria-hidden={!supplierMegaOpen}><span className={`${styles.megaPointer} ${styles.supplierMegaPointer}`} aria-hidden="true"/><div className={`${styles.industryMenuSurface} ${styles.supplierMenuSurface}`}><div className={styles.industryMenuHead}><Handshake/><div><span>Supplier Network</span><h2>Explore by supplier</h2></div><small>{partners.length} suppliers</small></div><div className={styles.industryMenuGrid} aria-label="Suppliers">{partners.map((partner) => <Link key={partner.slug} href={`/associates/${partner.slug}`} onClick={closeMenus}><img className={styles.supplierItemLogo} src={partner.logo} alt="" loading="lazy" decoding="async"/><span>{partner.name}</span><ArrowRight/></Link>)}<Link className={styles.industryMenuAll} href="/associates" onClick={closeMenus}><Handshake/><span>View all suppliers</span><ArrowRight/></Link></div></div></div></header>
  </>;
}
