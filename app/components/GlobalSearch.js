"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import {
  additiveProductGroups,
  bakeryProductGroups,
  beverageProductGroups,
  chocolateProductGroups,
  dairyProductGroups,
  fruitProductGroups,
  functionalProductGroups,
  hydrocolloidProductGroups,
  iceCreamProductGroups,
  getProductHref,
  industries,
  nutraceuticalProductGroups,
  products,
  sweetenerProductGroups,
} from "../data/catalog";
import { partners } from "../data/partners";
import styles from "./global-search.module.css";

const industryGroups = [
  ["bakery-ingredients", bakeryProductGroups],
  ["chocolate-confectionery", chocolateProductGroups],
  ["dairy-ingredients", dairyProductGroups],
  ["beverage-ingredients", beverageProductGroups],
  ["ice-cream-ingredients", iceCreamProductGroups],
  ["fruit-processing", fruitProductGroups],
  ["hydrocolloids-stabilizers", hydrocolloidProductGroups],
  ["sweeteners-syrups-starches", sweetenerProductGroups],
  ["functional-ingredients", functionalProductGroups],
  ["nutraceutical-pharma", nutraceuticalProductGroups],
  ["food-additives-preservatives", additiveProductGroups],
];

export const normalizeSearchText = (value = "") => value
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9]+/g, " ")
  .trim()
  .replace(/\s+/g, " ");

const singular = (word) => word.endsWith("ies") ? `${word.slice(0, -3)}y` : word.endsWith("es") ? word.slice(0, -2) : word.endsWith("s") && word.length > 3 ? word.slice(0, -1) : word;
const tokenMatches = (haystack, token) => haystack.includes(token) || haystack.includes(singular(token));
const clean = (value) => normalizeSearchText(Array.isArray(value) ? value.join(" ") : value);

const productAliases = (name) => {
  const normalized = normalizeSearchText(name);
  const aliases = [];
  if (normalized.includes("chips")) aliases.push("choco chips", "chocolate chips");
  if (normalized.includes("calcium propionate")) aliases.push("cp", "bakery preservative");
  if (normalized.includes("sodium cmc")) aliases.push("cmc", "carboxymethyl cellulose");
  if (normalized.includes("distilled monoglycerides")) aliases.push("dmg");
  if (normalized.includes("propylene glycol monostearate")) aliases.push("pgms");
  if (normalized.includes("potassium metabisulphite")) aliases.push("kms");
  if (normalized.includes("sodium acid pyrophosphate")) aliases.push("sapp");
  return aliases;
};

const searchIndex = (() => {
  const applicationRecords = industryGroups.flatMap(([industrySlug, groups]) => groups.map((group) => ({ industrySlug, ...group })));

  const productEntries = products.map((product) => {
    const relatedIndustries = industries.filter((industry) => industry.products.includes(product.name));
    const relatedApplications = applicationRecords.filter((group) => group.ingredients.includes(product.name));
    const relatedBrands = partners.filter((partner) => partner.products.includes(product.name));
    const aliases = productAliases(product.name);
    const fields = {
      name: clean(product.name),
      alias: clean(aliases),
      brand: clean(relatedBrands.map((partner) => partner.name)),
      category: clean([product.category, ...relatedApplications.map((group) => group.name)]),
      application: clean(relatedApplications.map((group) => group.description)),
      industry: clean(relatedIndustries.map((industry) => `${industry.name} ${industry.eyebrow}`)),
      description: clean(`${product.summary} ${product.description}`),
    };
    return {
      id: `product-${product.slug}`,
      type: "Product",
      name: product.name,
      context: relatedBrands.length ? `${product.category} · ${relatedBrands.map((brand) => brand.name).join(", ")}` : product.category,
      href: `/products/${product.slug}`,
      image: product.image,
      fields,
      searchText: clean(Object.values(fields)),
    };
  });

  const categoryEntries = industries.map((industry) => {
    const groups = applicationRecords.filter((group) => group.industrySlug === industry.slug);
    const fields = {
      name: clean(industry.name),
      alias: "",
      brand: "",
      category: clean(`${industry.name} ${industry.eyebrow} ${groups.map((group) => group.name).join(" ")}`),
      application: clean(groups.map((group) => group.description)),
      industry: clean(industry.name),
      description: clean(`${industry.summary} ${industry.products.join(" ")}`),
    };
    return { id: `category-${industry.slug}`, type: "Category", name: industry.name, context: industry.summary, href: `/industries/${industry.slug}`, image: industry.image, fields, searchText: clean(Object.values(fields)) };
  });

  const brandEntries = partners.map((partner) => {
    const brandIndustries = partner.industries.map((slug) => industries.find((industry) => industry.slug === slug)?.name).filter(Boolean);
    const fields = {
      name: clean(partner.name), alias: "", brand: clean(partner.name), category: "",
      application: clean(partner.summary), industry: clean(brandIndustries), description: clean(`${partner.about} ${partner.products.join(" ")}`),
    };
    return { id: `brand-${partner.slug}`, type: "Brand", name: partner.name, context: partner.summary, href: `/associates/${partner.slug}`, image: partner.logo || null, fields, searchText: clean(Object.values(fields)) };
  });

  const applicationEntries = applicationRecords.map((group) => {
    const industry = industries.find((item) => item.slug === group.industrySlug);
    const fields = {
      name: clean(group.name), alias: "", brand: "", category: clean(industry?.name), application: clean(`${group.name} ${group.description}`),
      industry: clean(industry?.name), description: clean(group.ingredients),
    };
    return { id: `application-${group.industrySlug}-${normalizeSearchText(group.name).replace(/\s+/g, "-")}`, type: "Application", name: group.name, context: `${industry?.name || "Ingredient application"} · ${group.description}`, href: `/industries/${group.industrySlug}#industry-products`, image: null, fields, searchText: clean(Object.values(fields)) };
  });

  return [...productEntries, ...categoryEntries, ...brandEntries, ...applicationEntries];
})();

export const rankSearchResults = (rawQuery) => {
  const query = normalizeSearchText(rawQuery).slice(0, 80);
  if (!query) return [];
  const tokens = query.split(" ");

  return searchIndex
    .filter((entry) => tokens.every((token) => tokenMatches(entry.searchText, token)))
    .map((entry) => {
      const { fields } = entry;
      let score = fields.name === query ? 1000
        : fields.name.startsWith(query) ? 900
        : fields.name.includes(query) ? 800
        : fields.alias.includes(query) ? 700
        : fields.brand.includes(query) ? 600
        : fields.category.includes(query) ? 500
        : fields.application.includes(query) || fields.industry.includes(query) ? 400
        : 300;
      if (entry.type === "Product") score += 25;
      return { ...entry, score };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
};

const popularSearches = [
  ["Bakery Ingredients", "/industries/bakery-ingredients"],
  ["Chocolate & Confectionery", "/industries/chocolate-confectionery"],
  ["Cocoa Powder", getProductHref("Cocoa Powder")],
  ["Dark Choco Chips", getProductHref("Dark Chips")],
  ["Cake Gel", getProductHref("Cake Gel")],
  ["Baking Powder", getProductHref("Baking Powder")],
  ["Calcium Propionate", getProductHref("Calcium Propionate (CP)")],
  ["Beverage Ingredients", "/industries/beverage-ingredients"],
  ["Dairy Ingredients", "/industries/dairy-ingredients"],
  ["Request a Quote", "/contact#enquiry"],
].filter(([, href]) => href && !href.endsWith("undefined"));

function Highlight({ text, query }) {
  const value = query.trim();
  if (!value) return text;
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "ig"));
  return parts.map((part, index) => part.toLowerCase() === value.toLowerCase() ? <mark key={`${part}-${index}`}>{part}</mark> : part);
}

export default function GlobalSearch({ onOpen }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const results = useMemo(() => rankSearchResults(debouncedQuery), [debouncedQuery]);
  const visibleResults = results.slice(0, 12);
  const searchPending = normalizeSearchText(query) !== normalizeSearchText(debouncedQuery);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 180);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => { if (open) setOpen(false); }, [pathname]);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("search")?.slice(0, 80).trim();
    if (initialQuery) { setQuery(initialQuery); setDebouncedQuery(initialQuery); setOpen(true); }
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeSearch();
      if (event.key !== "Tab") return;
      const focusable = [...panelRef.current.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const openSearch = () => { onOpen?.(); setOpen(true); };
  const closeSearch = (restoreFocus = true) => {
    setOpen(false);
    setActiveIndex(-1);
    if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  };
  const openResult = (result) => { closeSearch(false); router.push(result.href); };
  const onInputKeyDown = (event) => {
    if (!visibleResults.length) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => (index + 1) % visibleResults.length); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => index <= 0 ? visibleResults.length - 1 : index - 1); }
    if (event.key === "Enter" && activeIndex >= 0) { event.preventDefault(); openResult(visibleResults[activeIndex]); }
  };

  return <>
    <button suppressHydrationWarning ref={triggerRef} className={styles.trigger} type="button" onClick={openSearch} aria-label="Search the Vikranth website" aria-expanded={open} aria-controls="global-search-dialog">
      <Search aria-hidden="true"/><span>Search products…</span>
    </button>
    {open && <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) closeSearch(); }}>
      <section ref={panelRef} id="global-search-dialog" className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="global-search-title">
        <div className={styles.panelHead}>
          <div><span>Vikranth global search</span><h2 id="global-search-title">Find the right ingredient</h2></div>
          <button type="button" className={styles.close} onClick={() => closeSearch()} aria-label="Close search"><X/></button>
        </div>
        <div className={styles.field} role="search">
          <Search aria-hidden="true"/>
          <input ref={inputRef} value={query} maxLength={80} onChange={(event) => { setQuery(event.target.value); setActiveIndex(-1); }} onKeyDown={onInputKeyDown} placeholder="Search products, ingredients, brands and applications" aria-label="Search products, ingredients, brands and applications" aria-autocomplete="list" aria-controls="global-search-results" aria-activedescendant={activeIndex >= 0 ? visibleResults[activeIndex]?.id : undefined}/>
          {query && <button type="button" onClick={() => { setQuery(""); setDebouncedQuery(""); inputRef.current?.focus(); }} aria-label="Clear search"><X/></button>}
        </div>
        <div className={styles.content}>
          {!query.trim() ? <div className={styles.popular}>
            <h3>Popular Searches</h3>
            <div>{popularSearches.map(([label, href]) => <Link key={label} href={href} onClick={() => closeSearch(false)}>{label}<ArrowRight aria-hidden="true"/></Link>)}</div>
          </div> : searchPending ? <div className={styles.loading} role="status"><span/>Searching…</div> : <>
            <p className={styles.count} aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"} for “{debouncedQuery.trim()}”</p>
            {visibleResults.length ? <div id="global-search-results" className={styles.results} role="listbox" aria-label="Search results">
              {visibleResults.map((result, index) => <Link id={result.id} role="option" aria-selected={activeIndex === index} className={activeIndex === index ? styles.resultActive : styles.result} href={result.href} key={result.id} onClick={() => closeSearch(false)} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)}>
                {result.image && <img src={result.image} alt="" loading="lazy"/>}
                <span className={styles.resultCopy}><small>{result.type}</small><strong><Highlight text={result.name} query={debouncedQuery}/></strong><span>{result.context}</span></span>
                <ArrowRight aria-hidden="true"/>
              </Link>)}
            </div> : <div className={styles.empty}>
              <Search aria-hidden="true"/><h3>No products found for ‘{query.trim()}’.</h3><p>Try a product, ingredient, category, brand, application, grade, or abbreviation.</p>
              <div><Link href="/products" onClick={() => closeSearch(false)}>Browse All Products</Link><Link href={`/contact?product=${encodeURIComponent(query.trim())}#enquiry`} onClick={() => closeSearch(false)}>Send Enquiry</Link></div>
            </div>}
          </>}
        </div>
      </section>
    </div>}
  </>;
}
