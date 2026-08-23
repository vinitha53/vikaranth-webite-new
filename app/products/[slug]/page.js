import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, BadgeCheck, Check, Clock3, FileCheck2, FlaskConical, Layers3, MapPin, MessageCircle, PackageCheck, SearchCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { products, getProduct, getIndustry } from "../../data/catalog";
import { DetailHeader, DetailFooter } from "../../components/DetailChrome";
import ProductQuoteForm from "../../components/ProductQuoteForm";
import { buildProductFaqs } from "../../data/product-faqs";
import { getPartner, partnersForProduct } from "../../data/partners";
import ProductMotion from "./ProductMotion";
import styles from "./product-landing.module.css";

const siteUrl = "https://www.vikranthchem.com";
const supplierOverviewByProduct = {
  "Cake Gel": "Vikranth supports bakeries, cake manufacturers and food businesses sourcing cake gel in Chennai and across India. Cake gel is commonly evaluated as an emulsifying aid for sponge cakes, cupcakes and other aerated bakery products where batter stability, volume, texture and batch consistency are important. Share your recipe, process, required pack size, monthly quantity and delivery location so the team can confirm the available grade, documents, sample options and commercial quotation.",
};
const benefitsByIndustry = {
  "bakery-ingredients": ["Batch consistency", "Texture and structure support", "Process-fit selection", "Commercial bakery scale"],
  "chocolate-confectionery": ["Flavour and colour selection", "Texture and flow support", "Application-fit formats", "Repeatable production"],
  "dairy-ingredients": ["Body and creaminess", "Protein or dairy solids", "Texture support", "Production consistency"],
  "beverage-ingredients": ["Flavour delivery", "Body and mouthfeel", "Suspension support", "Process compatibility"],
  "ice-cream-ingredients": ["Body and creaminess", "Texture stability", "Melt-profile support", "Batch consistency"],
  "fruit-processing": ["Fruit character", "Texture and filling control", "Application flexibility", "Production consistency"],
  "hydrocolloids-stabilizers": ["Viscosity control", "Suspension support", "Texture management", "Process stability"],
  "sweeteners-syrups-starches": ["Sweetness and solids", "Body and bulking", "Texture contribution", "Processing performance"],
  "functional-ingredients": ["Structure support", "Emulsification", "Process consistency", "Application-fit performance"],
  "nutraceutical-pharma": ["Format compatibility", "Nutrition-system support", "Document-led selection", "Controlled formulation"],
  "food-additives-preservatives": ["Process control", "Shelf-life system support", "Acidity or leavening", "Application-fit selection"],
};

const applicationsByIndustry = {
  "bakery-ingredients": ["Commercial cakes and sponges", "Bread and baked goods", "Bakery fillings and desserts", "Industrial bakery production"],
  "chocolate-confectionery": ["Chocolate and confectionery", "Cakes and bakery products", "Desserts and fillings", "Professional food production"],
  "dairy-ingredients": ["Dairy formulations", "Cakes and desserts", "Beverage applications", "Professional food production"],
  "beverage-ingredients": ["Hot and cold beverages", "Flavoured drinks", "Food-service beverages", "Commercial beverage production"],
  "ice-cream-ingredients": ["Ice cream and gelato", "Frozen yogurt products", "Frozen desserts", "Food-service desserts"],
  "fruit-processing": ["Fruit preparations", "Bakery and dessert fillings", "Beverages and dairy products", "Commercial food processing"],
  "hydrocolloids-stabilizers": ["Texture and viscosity control", "Product stabilization", "Moisture and suspension systems", "Commercial food formulations"],
  "sweeteners-syrups-starches": ["Bakery and confectionery", "Beverages and desserts", "Body and solids adjustment", "Commercial food processing"],
  "functional-ingredients": ["Texture and structure", "Emulsification and stability", "Protein and nutrition systems", "Commercial food production"],
  "nutraceutical-pharma": ["Nutraceutical formulations", "Wellness and nutrition products", "Protein and mineral systems", "Professional product development"],
  "food-additives-preservatives": ["Shelf-life management", "Acidity and process control", "Bakery and beverage production", "Commercial food manufacturing"],
};

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const title = `${product.name} Supplier in Chennai and Pan India | Vikranth`;
  const description = `${product.name} supplier in Chennai for Pan-India B2B requirements. Enquire for available grades, pack sizes, samples, documents, delivery and bulk pricing.`;
  const canonical = `/products/${product.slug}/`;
  return {
    title, description,
    keywords: [`${product.name} supplier in Chennai`, `${product.name} distributor Chennai`, `buy ${product.name} in Chennai`, `bulk ${product.name} supplier`, `${product.name} B2B supplier India`, `${product.category} supplier Chennai`],
    alternates: { canonical },
    openGraph: { type: "website", url: canonical, title, description, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: product.image, alt: `${product.name} supplied in Chennai` }] },
    twitter: { card: "summary_large_image", title, description, images: [product.image] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    other: { "geo.region": "IN-TN", "geo.placename": "Chennai" },
  };
}

export default async function ProductPage({ params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const industry = getIndustry(product.industrySlug);
  const applications = applicationsByIndustry[product.industrySlug] || ["Professional food production", "Product formulation", "Process development", "Commercial manufacturing"];
  const benefits = benefitsByIndustry[product.industrySlug] || ["Application-fit selection", "Process support", "Consistent sourcing", "Technical coordination"];
  const faq = buildProductFaqs(product, industry, applications);
  const mappedPartners = partnersForProduct(product.name);
  const catalogSupplier = product.range === "imported" ? getPartner("delta-nutritives") : product.range === "indian" ? getPartner("campco") : null;
  const productPartners = mappedPartners.length ? mappedPartners : catalogSupplier ? [catalogSupplier] : [];
  const supplierOverview = supplierOverviewByProduct[product.name] || `Vikranth supports professional buyers sourcing ${product.name} in Chennai and across India. Share your application, required function, grade, pack size, quantity, documentation needs and delivery location so the team can confirm a suitable available option, current lead time and commercial quotation.`;
  const canonicalUrl = `${siteUrl}/products/${product.slug}/`;
  const description = `${product.name} for ${industry.name.toLowerCase()} and professional food production. Vikranth Chemical Corporation supports B2B enquiries from Chennai for available grades, pack sizes, samples, documents and bulk quotations.`;
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Product", "@id": `${canonicalUrl}#product`, name: product.name, image: `${siteUrl}${product.image}`, description, category: product.category, ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}), url: canonicalUrl },
    { "@context": "https://schema.org", "@type": "Service", "@id": `${canonicalUrl}#service`, name: `${product.name} B2B sourcing and enquiry support`, image: `${siteUrl}${product.image}`, description, ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}), serviceType: "B2B food ingredient sourcing", areaServed: { "@type": "Country", name: "India" }, provider: { "@id": `${siteUrl}/#organization` }, url: canonicalUrl },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: canonicalUrl },
    ] },
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: `${product.name} Supplier in Chennai and Pan India`, description, about: { "@id": `${canonicalUrl}#product` }, isPartOf: { "@id": `${siteUrl}/#website` }, inLanguage: "en-IN" },
    { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${canonicalUrl}#faq`, mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
  ];
  const whatsapp = `https://wa.me/918754442924?text=${encodeURIComponent(`Hi, I need a quotation for ${product.name}.`)}`;

  return (
    <main className={styles.page} data-product-page>
      <ProductMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <DetailHeader />
      <div className={styles.readingProgress} data-reading-progress aria-hidden="true" />
      <section className={styles.hero} data-hero>
        <div className={styles.heroGlow} data-depth />
        <div className={styles.wrap}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span>{product.name}</span></nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy} data-hero-copy>
              <span className={styles.eyebrow}>{product.brand ? `${product.brand} · ${product.category}` : product.category}</span>
              <h1>{product.name} <em>supplier</em> in Chennai and across India</h1>
              <p>{product.name} for {industry.name.toLowerCase()} and professional food production. Tell us your application, required grade and quantity so our B2B team can confirm a suitable available option.</p>
              <div className={styles.actions}>
                <a className={styles.whatsappButton} href="#quote"><MessageCircle /> Request a quote</a>
                <a className={styles.callButton} href={whatsapp} target="_blank" rel="noopener noreferrer"><FlaskConical /> Request a sample</a>
              </div>
              <div className={styles.trust}><span><BadgeCheck /> B2B supply</span><span><FileCheck2 /> Documents on request</span><span><MapPin /> Chennai contact</span><span><Truck /> India enquiries</span></div>
            </div>
            <div className={styles.visualColumn}>
              <div className={styles.productVisual} data-product-stage>
                <div className={styles.orbit} data-orbit><i /><i /><i /></div>
                <img data-product-image src={product.image} alt={`${product.name} food ingredient supplied by Vikranth in Chennai`} />
                <span className={styles.bulkBadge}><PackageCheck /> Bulk enquiry</span>
                <div className={styles.imageLabel}><Sparkles /><small>Application-ready sourcing</small><strong>{product.name}</strong></div>
              </div>
              <div className={styles.partnerPanel} data-partner-badge>
                <span>{productPartners.length ? (productPartners.length > 1 ? "Available partner brands" : "Product partner") : "Supplied by"}</span>
                <div className={styles.partnerLogos}>
                  {productPartners.length ? productPartners.map((partner) => <Link href={`/associates/${partner.slug}`} key={partner.slug} title={`View ${partner.name}`}><img src={partner.logo} alt={`${partner.name} supplier logo`} /><strong>{product.brand && product.brand !== partner.name ? <><span className={styles.principalBrand}>{product.brand}</span><small>via {partner.name}</small></> : partner.name}</strong></Link>) : <div className={styles.vccPartner}><img src="/logo-vikranth.png" alt="Vikranth Chemical Corporation" /><strong>Vikranth sourced</strong></div>}
                </div>
              </div>
            </div>
          </div>
          <a href="#uses-title" className={styles.scrollCue} data-scroll-cue><span>Scroll to explore</span><ArrowDown /></a>
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label="Product page sections"><div className={styles.wrap}><a href="#uses-title">Benefits & applications</a><a href="#faq-title">FAQs</a><a href="#quote">Enquire</a></div></nav>
      <section className={styles.uses} aria-labelledby="uses-title"><div className={styles.wrap}>
        <header className={styles.sectionHeading} data-heading><span className={styles.eyebrow}>Benefits and applications</span><h2 id="uses-title">Evaluate <em>{product.name}</em> for your formulation</h2></header>
        <p className={styles.answer} data-reveal>{product.description} Final suitability depends on the selected grade, recipe, process, dosage and finished-product requirements. Validate the ingredient in your own formulation.</p>
        <aside className={styles.technicalNote} data-reveal><MapPin /><div><strong>{product.name} supply from Chennai to Pan India</strong><p>{supplierOverview}</p></div></aside>
        <div className={styles.benefitGrid} data-stagger>{benefits.map((benefit, index) => <article key={benefit}><span>0{index + 1}</span><strong>{benefit}</strong><p>Confirm this function against the selected grade and manufacturer documentation.</p></article>)}</div>
        <h3 className={styles.applicationTitle}>Common application starting points</h3><div className={styles.useList} data-stagger>{applications.map((application) => <div key={application}><span /><strong>{application}</strong></div>)}</div>
        <aside className={styles.technicalNote}><ShieldCheck /><div><strong>Technical buyer note</strong><p>Dosage, storage, shelf life, composition and performance are manufacturer- and grade-specific. Request the current specification and validate the ingredient in a controlled formulation trial before scale-up.</p></div></aside>
      </div></section>
      <section className={styles.faqSection} aria-labelledby="faq-title"><div className={styles.wrap}>
        <header className={styles.sectionHeading} data-heading><span className={styles.eyebrow}>Product questions</span><h2 id="faq-title">Frequently asked questions about <em>{product.name}</em></h2></header>
        <div className={styles.faqList} data-reveal>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div></section>

      <section className={styles.quoteSection} id="quote" aria-labelledby="quote-title"><div className={styles.wrap} data-reveal>
        <div className={styles.quoteIntro}><span className={styles.eyebrow}>Request a quotation</span><h2 id="quote-title">Get {product.name} price and availability</h2><p>Share your requirement and continue directly on WhatsApp. We can discuss the application, available grade, pack size, sample and supporting documents.</p><ul><li><Check /> Bulk B2B requirements</li><li><Check /> Product specifications and COA on request</li><li><Check /> Sample availability subject to product and manufacturer</li></ul></div>
        <ProductQuoteForm product={product.name} applications={applications} />
      </div></section>

      <a className={styles.floatWhatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${product.name} on WhatsApp`}><MessageCircle /></a>
      <DetailFooter />
    </main>
  );
}
