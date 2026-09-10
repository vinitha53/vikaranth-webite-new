"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, PackageOpen, Search, SlidersHorizontal, X } from "lucide-react";
import styles from "./range-catalog.module.css";
import Mec3CatalogNav from "./Mec3CatalogNav";
import { mec3ProductCount } from "../data/mec3-catalog";
import { brandLogos } from "../data/brand-logos";

const MEC3_FILTER = "__mec3_catalog__";
const RANGE_QUERY_PARAM = "catalogRange";
const CATEGORY_QUERY_PARAM = "catalogCategory";
const BRAND_QUERY_PARAM = "catalogBrand";



const brandEyebrows = {
  Callebaut: "Belgian chocolate",
  "Cacao Barry": "French couverture & cocoa",
  "Mona Lisa": "Chocolate decorations",
  "Molino Dallagiovanna": "Italian professional flour",
  "DLA Naturals": "Fruit fillings",
  "Elle & Vire Professionnel": "Professional dairy",
  Corman: "Professional dairy",
  DIRA: "Frozen fruits & purees",
  Switz: "Frozen bakery",
  "CSM / Ulmer Spatz": "European bakery",
  ARYZTA: "Frozen bakery",
  Sosa: "Modern gastronomy",
  "Les Vergers Boiron": "Fruit purees",
  Celebre: "Indian bakery & dessert range",
};

export default function RangeCatalog({ products, indianNames = [], supplierMode = false, supplierLogo, supplierName, categoryField = "usageCategory", mec3Catalog = false, brandDrilldown = false, collectionTitle = "Ingredient" }) {
  const categoryFor = (product) => product[categoryField] || product.usageCategory || product.category;
  const collectionMode = supplierMode || categoryField === "brochureDisplayCategory";
  const normalized = useMemo(() => products.map((product) => ({ ...product, range: product.range || (indianNames.includes(product.name) ? "indian" : "imported") })), [products, indianNames]);
  const ranges = ["indian", "imported"].filter((range) => normalized.some((product) => product.range === range));
  const initialRange = ranges[0] || "indian";
  const allBrands = [...new Set(normalized.map((product) => product.brand).filter(Boolean))];
  const initialBrand = brandDrilldown ? allBrands[0] || null : null;
  const initialProduct = brandDrilldown
    ? normalized.find((product) => product.brand === initialBrand && categoryFor(product))
    : normalized.find((product) => product.range === initialRange && categoryFor(product));
  const initialCategory = collectionMode ? categoryFor(initialProduct || {}) || "all" : "all";
  const [active, setActive] = useState(initialRange);
  const [activeBrand, setActiveBrand] = useState(initialBrand);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [openGroups, setOpenGroups] = useState({});
  const [catalogStateReady, setCatalogStateReady] = useState(false);
  const productFinderRef = useRef(null);
  const collectionContentRef = useRef(null);
  const categoryNavRef = useRef(null);
  const [canScrollCategories, setCanScrollCategories] = useState(false);
  const updateCategoryScroll = () => {
    const nav = categoryNavRef.current;
    setCanScrollCategories(Boolean(nav && nav.scrollHeight - nav.clientHeight - nav.scrollTop > 2));
  };
  const inRange = brandDrilldown ? normalized : normalized.filter((product) => product.range === active);
  const brands = [...new Set(inRange.map((product) => product.brand).filter(Boolean))];
  const hasBrandDirectory = brands.length > 0;
  const selectedBrandProducts = activeBrand ? inRange.filter((product) => product.brand === activeBrand) : [];
  const brandCategories = [...new Set(selectedBrandProducts.map(categoryFor).filter(Boolean))];
  const categories = brandDrilldown ? brandCategories : [...new Set(inRange.map(categoryFor).filter(Boolean))];
  const defaultIndustryCategory = categories[0] || "all";
  const selectedCollectionName = activeCategory === "all" ? "All Products" : activeCategory;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const productScope = brandDrilldown ? selectedBrandProducts : inRange;
  const categoryFilteredProducts = activeCategory === "all" ? productScope : productScope.filter((product) => categoryFor(product) === activeCategory);
  const selectedCollectionProducts = normalizedQuery
    ? categoryFilteredProducts.filter((product) => Object.values(product).map((value) => Array.isArray(value) ? value.join(" ") : typeof value === "object" && value ? JSON.stringify(value) : String(value ?? "")).join(" ").toLowerCase().includes(normalizedQuery))
    : categoryFilteredProducts;
  const collectionHeading = normalizedQuery && activeCategory === "all"
    ? "Search Results"
    : brandDrilldown && activeBrand
      ? `${activeBrand} · ${selectedCollectionName}`
      : selectedCollectionName;
  const visibleGroups = hasBrandDirectory
    ? !activeBrand
      ? categories.map((category) => ({ category, products: inRange.filter((product) => categoryFor(product) === category) }))
      : activeBrand !== "MEC3" && activeCategory && activeCategory !== "all"
        ? [{ category: activeCategory, products: selectedBrandProducts.filter((product) => categoryFor(product) === activeCategory) }]
        : []
    : (activeCategory === "all"
      ? categories.map((category) => ({ category, products: inRange.filter((product) => categoryFor(product) === category) }))
      : [{ category: activeCategory, products: inRange.filter((product) => categoryFor(product) === activeCategory) }]);

  useEffect(() => {
    const nav = categoryNavRef.current;
    if (!nav) return;
    nav.scrollTop = 0;
    updateCategoryScroll();
    const observer = new ResizeObserver(updateCategoryScroll);
    observer.observe(nav);
    for (const child of nav.children) observer.observe(child);
    return () => observer.disconnect();
  }, [active, collectionMode, products]);

  useEffect(() => {
    if (!collectionMode) return;

    const restoreCatalogState = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedRange = params.get(RANGE_QUERY_PARAM);
      const availableRanges = ["indian", "imported"].filter((range) => normalized.some((product) => product.range === range));
      const restoredRange = availableRanges.includes(requestedRange) ? requestedRange : initialRange;
      const availableProducts = brandDrilldown ? normalized : normalized.filter((product) => product.range === restoredRange);
      const availableBrands = [...new Set(availableProducts.map((product) => product.brand).filter(Boolean))];
      const requestedBrand = params.get(BRAND_QUERY_PARAM);
      const restoredBrand = brandDrilldown
        ? availableBrands.includes(requestedBrand) ? requestedBrand : availableBrands[0] || null
        : null;
      const restoredCategories = [...new Set(availableProducts
        .filter((product) => !restoredBrand || product.brand === restoredBrand)
        .map((product) => product[categoryField] || product.usageCategory || product.category)
        .filter(Boolean))];
      const requestedCategory = params.get(CATEGORY_QUERY_PARAM);
      const restoredCategory = restoredCategories.includes(requestedCategory)
        ? requestedCategory
        : restoredCategories[0] || "all";

      setActive(restoredRange);
      setActiveBrand(restoredBrand);
      setActiveCategory(restoredCategory);
      setSearchQuery("");
      setOpenGroups({});
      setCatalogStateReady(true);
    };

    restoreCatalogState();
    window.addEventListener("popstate", restoreCatalogState);
    return () => window.removeEventListener("popstate", restoreCatalogState);
  }, [brandDrilldown, categoryField, collectionMode, initialRange, normalized]);

  useEffect(() => {
    if (!collectionMode || !catalogStateReady) return;

    const url = new URL(window.location.href);
    if (brandDrilldown) {
      url.searchParams.delete(RANGE_QUERY_PARAM);
      if (activeBrand) url.searchParams.set(BRAND_QUERY_PARAM, activeBrand);
    } else {
      url.searchParams.set(RANGE_QUERY_PARAM, active);
      url.searchParams.delete(BRAND_QUERY_PARAM);
    }
    url.searchParams.set(CATEGORY_QUERY_PARAM, activeCategory || "all");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }, [active, activeBrand, activeCategory, brandDrilldown, catalogStateReady, collectionMode]);

  const selectRange = (range) => {
    setActive(range);
    setActiveBrand(null);
    const firstProduct = normalized.find((product) => product.range === range && categoryFor(product));
    setActiveCategory(collectionMode ? categoryFor(firstProduct || {}) || "all" : "all");
    setSearchQuery("");
    setOpenGroups({});
  };
  const selectBrand = (brand) => {
    if (brandDrilldown) {
      const firstProduct = normalized.find((product) => product.brand === brand && categoryFor(product));
      setActiveBrand(brand);
      setActiveCategory(categoryFor(firstProduct || {}) || "all");
      setSearchQuery("");
      setOpenGroups({});
      return;
    }
    setActiveBrand(brand);
    setActiveCategory(brand === "MEC3" ? MEC3_FILTER : null);
    setOpenGroups({});
  };
  const selectBrandCategory = (category) => {
    setActiveCategory(category);
    setOpenGroups({});
  };
  const selectIndustryCategory = (category) => {
    setActiveCategory(category);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const finder = productFinderRef.current;
      const firstRow = collectionContentRef.current;
      if (!finder || !firstRow) return;
      const stickyTop = Number.parseFloat(getComputedStyle(finder).top) || 0;
      const targetTop = window.scrollY + firstRow.getBoundingClientRect().top - stickyTop - finder.offsetHeight - 12;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: reducedMotion ? "auto" : "smooth" });
    }));
  };
  const rangeLabel = active === "indian" ? "Indian" : "Imported";
  const catalogContext = supplierMode ? "supplier catalogue" : "industry";
  const collapseInPlace = (event, groupKey) => {
    const section = event.currentTarget.closest("section");
    const viewportAnchor = section?.nextElementSibling || section;
    const anchorTop = viewportAnchor?.getBoundingClientRect().top;
    flushSync(() => setOpenGroups((current) => ({ ...current, [groupKey]: false })));
    if (viewportAnchor && Number.isFinite(anchorTop)) {
      const positionChange = viewportAnchor.getBoundingClientRect().top - anchorTop;
      if (positionChange) window.scrollBy({ top: positionChange, behavior: "auto" });
    }
  };

  if (!ranges.length) return null;

  return <div className={styles.catalog} data-range-catalog>
    {!brandDrilldown && ranges.length === 2 && <div className={styles.tabs} role="tablist" aria-label="Product origin range">
      <button type="button" role="tab" aria-selected={active === "indian"} onClick={() => selectRange("indian")}>Indian Range</button>
      <button type="button" role="tab" aria-selected={active === "imported"} onClick={() => selectRange("imported")}>Imported Range <small>International brands</small></button>
    </div>}

    {collectionMode && <section ref={productFinderRef} className={styles.productFinder} aria-label="Search and filter products">
      <div className={styles.productSearch}>
        <Search aria-hidden="true" />
        <input type="search" value={searchQuery} onChange={(event) => {
          const nextQuery = event.target.value;
          if (!searchQuery.trim() && nextQuery.trim()) setActiveCategory("all");
          if (searchQuery.trim() && !nextQuery.trim()) setActiveCategory(defaultIndustryCategory);
          setSearchQuery(nextQuery);
        }} placeholder={`Search all products in this ${catalogContext}...`} aria-label={`Search all ${rangeLabel.toLowerCase()} products in this ${catalogContext}`} />
        {searchQuery && <button type="button" onClick={() => { setSearchQuery(""); setActiveCategory(defaultIndustryCategory); }} aria-label="Clear product search"><X aria-hidden="true" /></button>}
      </div>
      <label className={styles.productFilter}>
        <span className={styles.filterIcon}><SlidersHorizontal aria-hidden="true" /></span>
        <span className={styles.filterControl}>
          <span className={styles.filterPrompt}>
            <strong>Choose Category</strong>
            <small>{categories.length} {categories.length === 1 ? "category" : "categories"} available</small>
          </span>
          <select value={activeCategory} onChange={(event) => selectIndustryCategory(event.target.value)} aria-label="Choose a product category">
            <option value="all">All categories</option>
            {categories.map((category) => <option value={category} key={category}>{category}</option>)}
          </select>
        </span>
      </label>
      <div className={styles.finderSummary} aria-live="polite">
        <strong>{selectedCollectionProducts.length}</strong>
        <span>{selectedCollectionProducts.length === 1 ? "matching product" : "matching products"}</span>
        {(searchQuery || activeCategory !== defaultIndustryCategory) && <button type="button" onClick={() => { setSearchQuery(""); setActiveCategory(defaultIndustryCategory); }}>Reset filters</button>}
      </div>
    </section>}

    {collectionMode ? <section className={styles.collectionBrowser} aria-label={`${collectionTitle} collections`}>
      <div className={styles.collectionShell}>
        <div className={styles.collectionSidebar}>
        <nav ref={categoryNavRef} onScroll={updateCategoryScroll} className={`${styles.collectionTabs} ${brandDrilldown ? styles.brandDrilldownTabs : ""}`} aria-label={brandDrilldown ? "Delta brands and categories" : `${collectionTitle} categories`}>
          {brandDrilldown ? brands.map((brand) => {
            const logo = brandLogos[brand];
            const isSelected = activeBrand === brand;
            const productCount = inRange.filter((product) => product.brand === brand).length;
            return <div className={styles.drilldownBrand} key={brand}>
              <button className={styles.drilldownBrandButton} type="button" aria-expanded={isSelected} onClick={() => selectBrand(brand)}>
                <span className={styles.drilldownBrandLogo}>{logo ? <img src={logo} alt="" width="92" height="40" loading="lazy" /> : <b>{brand}</b>}</span>
                <span><strong>{brand}</strong><small>{productCount} {productCount === 1 ? "product" : "products"}</small></span>
                <ArrowRight aria-hidden="true" />
              </button>
              {isSelected && <div className={styles.drilldownCategories}>
                {brandCategories.map((category) => <button type="button" aria-pressed={selectedCollectionName === category} onClick={() => selectIndustryCategory(category)} key={category}>
                  <strong>{category}</strong><ArrowRight aria-hidden="true" />
                </button>)}
              </div>}
            </div>;
          }) : <>
            {supplierMode && <button type="button" aria-pressed={activeCategory === "all"} onClick={() => selectIndustryCategory("all")}><strong>All products</strong><ArrowRight aria-hidden="true" /></button>}
            {categories.map((category) => <button type="button" aria-pressed={selectedCollectionName === category} onClick={() => selectIndustryCategory(category)} key={category}>
              <strong>{category}</strong><ArrowRight aria-hidden="true" />
            </button>)}
          </>}
        </nav>
        <div className={styles.categoryScrollFooter}>
          {canScrollCategories && <button type="button" className={styles.categoryScrollHint} onClick={() => {
            const nav = categoryNavRef.current;
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            nav?.scrollBy({ top: nav.clientHeight * 0.7, behavior: reducedMotion ? "auto" : "smooth" });
          }}>Scroll down <ArrowDown aria-hidden="true" /></button>}
        </div>
        </div>
        <section className={styles.collectionPanel} aria-labelledby="selected-collection-title">
          <div className={styles.collectionPanelHeading}>
            <span className={styles.collectionHeadingIcon}><PackageOpen aria-hidden="true" /></span>
            <strong id="selected-collection-title">{collectionHeading}</strong>
            <span className={styles.collectionCount}>{selectedCollectionProducts.length} {selectedCollectionProducts.length === 1 ? "product" : "products"}</span>
          </div>
          <div ref={collectionContentRef} className={styles.collectionContent}>
            {selectedCollectionProducts.length ? <div className={styles.collectionGrid}>{selectedCollectionProducts.map((product) => <Link prefetch={false} className={styles.collectionCard} href={`/products/${product.slug}`} key={product.slug}>
              <span className={styles.collectionImage}>
                <img src={product.image} alt={`${product.displayName || product.name} ingredient`} width="520" height="360" loading="lazy" />
                {(brandLogos[product.brand] || product.supplierLogo || (!product.brand && supplierLogo)) ? <span className={styles.collectionBrandBadge}>
                  <img src={brandLogos[product.brand] || product.supplierLogo || supplierLogo} alt={`${product.brand || product.supplierName || supplierName} logo`} width="100" height="44" loading="lazy" />
                </span> : product.brand ? <span className={styles.collectionBrandBadge}>{product.brand}</span> : null}
              </span>
              <span className={styles.collectionCardCopy}><strong>{product.displayName || product.name}</strong><small>{product.brandOnImageOnly ? product.usageCategory || selectedCollectionName : product.brand || product.usageCategory || selectedCollectionName}</small>{supplierMode && product.supplierDescription && <small>{product.supplierDescription}</small>}<ArrowRight aria-hidden="true" /></span>
            </Link>)}</div> : <div className={styles.noProducts}><Search aria-hidden="true" /><strong>No matching products</strong><p>Try another product name, brand, application or category.</p><button type="button" onClick={() => { setSearchQuery(""); setActiveCategory(defaultIndustryCategory); }}>Clear search</button></div>}
          </div>
        </section>
      </div>
    </section> : hasBrandDirectory ? <>
      {!activeBrand && <section className={styles.brandDirectory} aria-labelledby={`brand-directory-${active}`}>
        <div className={styles.brandDirectoryHeading}>
          <div><small>Browse by brand</small><h3 id={`brand-directory-${active}`}>Explore {rangeLabel.toLowerCase()} ingredient brands</h3></div>
          <p>All products are listed below. Select a brand to narrow the catalogue to that supplier.</p>
        </div>
        <div className={styles.brandGrid}>
          {brands.map((brand) => {
            const count = inRange.filter((product) => product.brand === brand).length;
            const logo = brandLogos[brand];
            return <button type="button" onClick={() => selectBrand(brand)} key={brand}>
              <span className={styles.brandLogo}>{logo ? <img src={logo} alt={`${brand} logo`} width="180" height="72" loading="lazy" /> : <strong>{brand}</strong>}</span>
              <span><small>{brandEyebrows[brand] || "Professional ingredients"}</small><strong>{brand}</strong><em>{brand === "MEC3" ? mec3ProductCount : count} products</em></span>
              <ArrowRight aria-hidden="true" />
            </button>;
          })}
        </div>
      </section>}

      {activeBrand && <button className={styles.backToBrands} type="button" onClick={() => { setActiveBrand(null); setActiveCategory("all"); }}><ArrowLeft /> Back to all brands</button>}

      {activeBrand === "MEC3" && mec3Catalog && <Mec3CatalogNav />}

      {activeBrand && activeBrand !== "MEC3" && <section className={styles.brandNavigator} aria-labelledby="selected-brand-title">
        <div className={styles.brandNavigatorHead}>
          <span className={styles.brandNavigatorLogo}>{brandLogos[activeBrand] ? <img src={brandLogos[activeBrand]} alt={`${activeBrand} logo`} width="180" height="72" /> : <strong>{activeBrand}</strong>}</span>
          <div><small>{brandEyebrows[activeBrand] || "Professional ingredient portfolio"}</small><h3 id="selected-brand-title">Explore the {activeBrand} catalogue</h3><p>Select a range to view its products, pack information and sourcing details.</p></div>
          <span className={styles.brandTotal}><strong>{selectedBrandProducts.length}</strong> catalogue products</span>
        </div>
        <nav className={styles.brandRangeGrid} aria-label={`${activeBrand} product ranges`}>
          {brandCategories.map((category, index) => {
            const count = selectedBrandProducts.filter((product) => categoryFor(product) === category).length;
            return <button type="button" aria-pressed={activeCategory === category} onClick={() => selectBrandCategory(category)} key={category}>
              <span className={styles.brandRangeNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span><small>Ingredient collection</small><strong>{category}</strong><em>{count} {count === 1 ? "product" : "products"}</em></span>
              <ArrowRight aria-hidden="true" />
            </button>;
          })}
        </nav>
      </section>}
    </> : null}

    {!collectionMode && <div className={styles.groups} key={`${active}-${activeBrand}-${activeCategory}`}>{visibleGroups.map((group, groupIndex) => {
      const headingId = `range-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      const contentId = `${headingId}-products`;
      const groupKey = `${active}:${activeBrand || "all"}:${group.category}`;
      const isOpen = openGroups[groupKey] ?? false;
      return <section className={styles.group} key={group.category} aria-labelledby={headingId}>
        <button className={styles.groupHeading} type="button" aria-expanded={isOpen} aria-controls={contentId} onClick={() => setOpenGroups(isOpen ? {} : { [groupKey]: true })}>
          <span className={styles.groupTitle}><i aria-hidden="true">{String(groupIndex + 1).padStart(2, "0")}</i><span><small>Ingredient collection</small><strong id={headingId}>{group.category}</strong></span></span>
          <span className={styles.groupMeta}><span><b>{group.products.length}</b> {group.products.length === 1 ? "product" : "products"}</span><i className={styles.groupChevron} aria-hidden="true" /></span>
        </button>
        {isOpen && <div className={styles.groupContent} id={contentId}>
          <p className={styles.groupIntroduction}>Explore {group.products.length} professional {group.category.toLowerCase()} {group.products.length === 1 ? "ingredient" : "ingredients"}. Open a product for sourcing, pack, specification and enquiry details.</p>
          <div className={styles.grid}>{group.products.map((product, productIndex) => <Link prefetch={false} className={styles.card} href={`/products/${product.slug}`} key={product.slug}>
            <div className={styles.image}>
              <img src={product.image} alt={`${product.name} by ${product.brand || "Vikranth"}`} width="640" height="640" loading="lazy" />
              {brandLogos[product.brand] || product.supplierLogo
                ? <span className={styles.brandLogoBadge} title={product.brand || product.supplierName} style={{ "--brand-float-delay": `${(productIndex % 6) * -0.32}s` }}><img src={brandLogos[product.brand] || product.supplierLogo} alt={`${product.brand || product.supplierName} logo`} width="160" height="64" loading="lazy" /></span>
                : <span>{product.brand || (active === "indian" ? "Indian range" : "Imported range")}</span>}
            </div>
            <div><small>{categoryFor(product)}</small><h3>{product.name}</h3>{product.cocoaPercentage && <p>{product.cocoaPercentage}</p>}{product.packs && <p>{product.packs}</p>}<b>Explore product <i>→</i></b></div>
          </Link>)}</div>
          <button className={styles.collapseButton} type="button" onClick={(event) => collapseInPlace(event, groupKey)}>Collapse {group.category}<span aria-hidden="true">↑</span></button>
        </div>}
      </section>;
    })}</div>}
  </div>;
}
