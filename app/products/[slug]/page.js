import Link from "next/link";
import { buyerFaq } from "../../data/business";
import { notFound } from "next/navigation";
import { ArrowDown, BadgeCheck, Check, FileCheck2, FlaskConical, MapPin, MessageCircle, PackageCheck, SearchCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { products, getProduct, getIndustry } from "../../data/catalog";
import { DetailHeader, DetailFooter } from "../../components/DetailChrome";
import ProductQuoteForm from "../../components/ProductQuoteForm";
import { buildProductFaqs } from "../../data/product-faqs";
import { getPartner, partnersForProduct } from "../../data/partners";
import { brandLogos } from "../../data/brand-logos";
import { whatsappNumberForProduct, whatsappUrl } from "../../data/whatsapp";
import { getProductApplications } from "../../data/product-applications";
import ProductMotion from "./ProductMotion";
import styles from "./product-landing.module.css";

const siteUrl = "https://www.vikranthchemicalcorporation.com";
const cakeGelFaq = [
  buyerFaq,
  ["What is cake gel commonly evaluated for?", "Cake gel is commonly evaluated for batter stability, volume, texture and batch consistency in commercial cakes and other aerated bakery products."],
  ["Is Vikranth a cake gel wholesaler in Chennai?", "Vikranth supports wholesale and commercial cake gel enquiries. Share the monthly quantity, preferred pack, required documents and application for current options."],
  ["Can cake gel be supplied outside Chennai?", "South India and India enquiries are reviewed according to product availability, quantity, pack, freight and delivery serviceability."],
  ["How do I select the right cake gel grade?", "Share the cake type, batter process, required volume, texture target and batch size. The final grade should be reviewed against current product documents and validated in a controlled bakery trial."],
  ["Which documents can I request for cake gel?", "Current specifications and other supporting documents may be requested for the selected cake gel product and grade, subject to manufacturer availability."],
  ["What cake gel pack size and minimum quantity are available?", "Pack size and minimum order quantity are confirmed per enquiry. Share your trial quantity, regular requirement and delivery city for the relevant commercial option."],
  ["Can I request a cake gel sample?", "Sample requests are reviewed according to availability, intended bakery application and delivery location. Buyers should validate performance in their own formulation and process."],
  ["How are cake gel pricing and availability confirmed?", "Cake gel pricing and availability depend on the selected product, pack, quantity and delivery location. Submit these details for a current quotation."],
];
export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const industry = getIndustry(product.industrySlug);
  const canonical = `${siteUrl}/products/${product.slug}/`;
  const title = `${product.name} Supplier in Chennai | Vikranth`;
  const description = product.slug === "cake-gel" ? "Source cake gel for commercial cakes and sponge production from a Chennai B2B supplier supporting wholesale enquiries across South India and India." : `Source ${product.name} for ${industry.name.toLowerCase()} through a Chennai B2B supplier supporting wholesale enquiries across South India and India.`;
  return {
    title, description,
    alternates: { canonical },
    openGraph: { type: "website", url: canonical, title, description, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: product.image, alt: product.name }] },
    twitter: { card: "summary_large_image", title, description, images: [product.image] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

export default async function ProductPage({ params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const industry = getIndustry(product.industrySlug);
  const isCakeGel = product.slug === "cake-gel";
  const applicationDetails = getProductApplications(product);
  const applications = applicationDetails.map(({ title }) => title);
  const faq = isCakeGel ? cakeGelFaq : buildProductFaqs(product, industry, applications);
  const mappedPartners = partnersForProduct(product.name);
  const catalogSupplier = product.range === "imported" ? getPartner("delta-nutritives") : product.range === "indian" ? getPartner("campco") : null;
  const productPartners = mappedPartners.length ? mappedPartners : catalogSupplier ? [catalogSupplier] : [];
  const relatedProducts = products.filter((item) => item.slug !== product.slug && item.industrySlug === product.industrySlug).sort((a, b) => { const relevance = item => (product.brand && item.brand === product.brand ? 2 : 0) + (product.usageCategory && item.usageCategory === product.usageCategory ? 1 : 0); return relevance(b) - relevance(a); }).slice(0, 4);
  const showProductBrand = product.brand && !productPartners.some((partner) => partner.name.toLowerCase() === product.brand.toLowerCase());
  const whatsappNumber = whatsappNumberForProduct(product, productPartners.map((partner) => partner.slug));
  const whatsapp = whatsappUrl(whatsappNumber, `Hi, I need a quotation for ${product.name}.`);
  const canonicalUrl = `${siteUrl}/products/${product.slug}/`;
  const pageDescription = `${product.name} for ${industry.name.toLowerCase()}, supplied from Chennai by Vikranth Chemical Corporation for wholesale, small-business and personal purchase enquiries across India.`;
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Product", "@id": `${canonicalUrl}#product`, name: product.name, url: canonicalUrl, image: `${siteUrl}${product.image}`, description: product.description, category: product.category, ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}), mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` } },
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: `${product.name} Supplier in Chennai`, description: pageDescription, mainEntity: { "@id": `${canonicalUrl}#product` }, publisher: { "@id": `${siteUrl}/#organization` }, isPartOf: { "@id": `${siteUrl}/#website` }, inLanguage: "en-IN" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products/` }, { "@type": "ListItem", position: 3, name: product.name, item: canonicalUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${canonicalUrl}#faq`, mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
  ];
  const evaluationCards = applicationDetails.map(({ title, description }, index) => ({
    icon: [PackageCheck, SearchCheck, FlaskConical, Truck][index],
    title,
    copy: description,
  }));
  const heroCopy = isCakeGel ? "Source cake gel for commercial cakes, sponge products and other aerated bakery applications. Vikranth helps buyers confirm the available product, pack, documents, sample options and commercial quotation." : `Source ${product.name} for ${applications.slice(0, 3).join(", ").toLowerCase()}. Vikranth supports professional buyers with product, grade, pack, document and current commercial-availability confirmation.`;
  const proofPoints = isCakeGel ? ["Commercial bakery supply", "Documents on request", "India enquiries reviewed"] : ["B2B supply enquiry", "Documents on request", "India enquiries reviewed"];
  const technicalNote = isCakeGel ? "Dosage, composition, storage, shelf life and performance depend on the selected product and grade. Review the current specification and validate the ingredient in a controlled formulation trial." : "Performance depends on the exact grade, supplier specification, formulation and process. Review current product documents and validate suitability through the buyer's own technical and quality process.";
  const regionalCopy = isCakeGel ? "Vikranth handles wholesale cake gel enquiries from Chennai for bakeries and food businesses across South India and India. Pack, minimum quantity, availability, freight and serviceability are confirmed before quotation." : `Vikranth handles ${product.name} wholesale and commercial enquiries from Chennai for buyers across South India and India. Availability, pack, minimum quantity, freight and serviceability are confirmed before quotation.`;

  return <main className={styles.page} data-product-page data-whatsapp-number={whatsappNumber}>
    <ProductMotion /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><DetailHeader />
    <div className={styles.readingProgress} data-reading-progress aria-hidden="true" />
    <section className={styles.hero} data-hero><div className={styles.heroGlow} data-depth /><div className={styles.wrap}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products/">Products</Link><span>/</span><span>{product.name}</span></nav>
      <div className={styles.heroGrid}><div className={styles.heroCopy} data-hero-copy>
        <span className={styles.eyebrow}>{product.brochureDisplayCategory || product.category}</span>
        <span className={styles.heroSupplyLabel}>{isCakeGel ? "Commercial bakery supply" : "Commercial ingredient supply"}</span>
        <h1><span>{product.name}</span><em>Supplier<br/>in Chennai</em></h1>
        <p>{heroCopy}</p><p className={styles.buyerNote}>Wholesale supply across South India and pan-India. Small-business and personal enquiries are welcome; packs and minimum quantities vary by product.</p>
        <div className={styles.heroHighlights}>{applications.slice(0, 3).map((application) => <span key={application}><Check />{application}</span>)}</div>
        <div className={styles.actions}><a className={styles.whatsappButton} href="#quote">Request a Quote <ArrowDown /></a><a className={styles.callButton} href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle /> Ask on WhatsApp</a></div>
        <div className={styles.trust}>{proofPoints.map((point, index) => { const Icon = [FileCheck2, Truck, BadgeCheck][index]; return <span key={point}><Icon /> {point}</span>; })}</div>
      </div><div className={styles.visualColumn}><div className={styles.productVisual} data-product-stage><span className={styles.visualWord} aria-hidden="true">{product.name}</span><img data-product-image src={product.image} alt={product.name} width="900" height="900" loading="eager" fetchPriority="high" decoding="async" /><span className={styles.bulkBadge}><PackageCheck /> Bulk enquiry</span><div className={styles.imageLabel}><FlaskConical /><small>Commercial sourcing</small><strong>{product.name}</strong></div></div>
      <div className={`${styles.partnerPanel} ${showProductBrand ? styles.partnerPanelWithBrand : ""}`} data-partner-badge><span>{showProductBrand ? "Product brand & supplier" : productPartners.length ? "Verified product partner" : "Sourcing contact"}</span><div className={styles.partnerLogos}>
        {showProductBrand && <div className={styles.productBrandCard}>
          {brandLogos[product.brand] && <img src={brandLogos[product.brand]} alt={`${product.brand} logo`} width="100" height="44" loading="lazy" decoding="async" />}
          <strong><small>Brand</small>{product.brand}</strong>
        </div>}
        {productPartners.length ? productPartners.map((partner) => <Link href={`/associates/${partner.slug}/`} key={partner.slug}><img src={partner.logo} alt="" width="180" height="72" loading="lazy" decoding="async" /><strong>{partner.name}</strong></Link>) : <div className={styles.vccPartner}><img src="/logo-vikranth.webp" alt="Vikranth Chemical Corporation" width="156" height="73" loading="lazy" decoding="async" /><strong>Vikranth</strong></div>}</div></div></div></div>
      <a href="#uses" className={styles.scrollCue} data-scroll-cue><span>Applications</span><ArrowDown /></a>
    </div></section>

    <section className={styles.uses} id="uses" aria-labelledby="uses-title"><div className={styles.wrap}>
      <header className={styles.evaluationHeading} data-heading><div><span className={styles.eyebrow}>{product.name} &nbsp;•&nbsp; Product Applications</span><h2 id="uses-title">Applications for <em>{product.name}</em></h2><p>Four practical ways to use this product in commercial food and beverage production.</p></div><div><a href="#quote">Request a Sample</a><a href={whatsapp} target="_blank" rel="noopener noreferrer">Talk to a Supplier</a></div></header>
      <div className={styles.evaluationFramework} data-stagger>
        {evaluationCards.map(({ icon: Icon, title, copy }, index) => <article className={styles.evaluationCard} key={title}><span className={styles.evaluationIcon}><Icon aria-hidden="true"/></span><div><h3>{title}</h3><p>{copy}</p><a href="#quote">Discuss this application <ArrowDown /></a></div><b>0{index + 1}</b></article>)}
        <div className={styles.evaluationCore}><small>Product application guide</small><strong>{product.name}</strong><i aria-hidden="true"/><span>4 practical uses</span><a href="#quote">Start Your Enquiry <ArrowDown /></a></div>
      </div>
      <div className={styles.applicationRail}><h3>Choose your application</h3><div>{applications.map((application, index) => <a className={index === 0 ? styles.activeApplication : undefined} href="#quote" key={application}>{application}<ArrowDown /></a>)}</div></div>
      <div className={styles.buyerSupport}>
        <article><ShieldCheck aria-hidden="true"/><div><small>Application guidance</small><h3>Confirm Suitability for Your Recipe</h3><p>{technicalNote}</p><a href="#quote">Request Product Documents <ArrowDown /></a></div></article>
        <article><MapPin aria-hidden="true"/><div><small>Application enquiry</small><h3>Discuss Your Production Need</h3><p>Tell us which {product.name} application you selected, your finished product, process and required result.</p><p>{regionalCopy}</p><div><a href="#quote">Request a Quote</a><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle/> WhatsApp</a></div></div></article>
      </div>
    </div></section>

    <section className={styles.faqSection} aria-labelledby="faq-title"><div className={styles.wrap}>
      <header className={styles.faqHeading} data-heading><div><span className={styles.eyebrow}>Product questions</span><h2 id="faq-title">Frequently Asked Questions <em>About {product.name}</em></h2></div><p>Clear sourcing answers for professional buyers evaluating {product.name}, from grade selection and documents to samples, quotation and delivery.</p></header>
      <div className={styles.faqList} data-reveal>{faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span><b>{question}</b><i aria-hidden="true"/></summary><p>{answer}</p></details>)}</div>
      <div className={styles.faqCta}><div><small>Need a product-specific answer?</small><strong>Share your application, quantity and delivery city.</strong></div><a href="#quote">Send an Enquiry <ArrowDown/></a><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle/> Ask on WhatsApp</a></div>
    </div></section>

    <section className={styles.relatedSection}><div className={styles.wrap}><header className={styles.sectionHeading}><span className={styles.eyebrow}>Continue sourcing</span><h2>Related Products and Industry</h2></header><div className={styles.relatedLinks}><Link href={`/industries/${industry.slug}/`}><strong>{industry.name}</strong><small>View the complete industry range</small></Link>{relatedProducts.map((item) => <Link href={`/products/${item.slug}/`} key={item.slug}><strong>{item.name}</strong><small>{item.usageCategory || item.category}</small></Link>)}</div></div></section>

    <section className={styles.quoteSection} id="quote" aria-labelledby="quote-title"><div className={styles.wrap} data-reveal><div className={styles.quoteIntro}><span className={styles.eyebrow}>Request a quotation</span><h2 id="quote-title">Request {product.name} Price and Availability</h2><p>Share the application, required grade, quantity, documents and delivery city for current sourcing options.</p><ul><li><Check /> Product-specific enquiry</li><li><Check /> Specifications and documents where available</li><li><Check /> Freight and serviceability confirmed per quotation</li></ul></div><ProductQuoteForm product={product.name} applications={applications} whatsappNumber={whatsappNumber} /></div></section>
    <a className={styles.floatWhatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${product.name} on WhatsApp`}><MessageCircle /></a><DetailFooter />
  </main>;
}
