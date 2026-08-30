import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, FileCheck2, MapPin, PackageCheck, SearchCheck, ShieldCheck, Truck } from "lucide-react";
import { partners, getPartner } from "../../data/partners";
import { getProduct, getIndustry, slugify } from "../../data/catalog";
import { getAssociateContent } from "../../data/associate-content";
import { productsForRangeSupplier } from "../../data/catalog-ranges";
import { whatsappNumberForSupplier } from "../../data/whatsapp";
import { DetailHeader, DetailFooter } from "../../components/DetailChrome";
import AssociateMotion from "./AssociateMotion";
import AssociateEnquiryForm from "./AssociateEnquiryForm";
import RangeCatalog from "../../components/RangeCatalog";
import styles from "./associate-detail.module.css";
import stickyFix from "./associate-sticky-fix.module.css";
import heroFix from "./associate-hero-fix.module.css";

const siteUrl = "https://www.vikranthchemicalcorporation.com";

export function generateStaticParams() { return partners.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const partner = getPartner((await params).slug);
  if (!partner) return {};
  const content = getAssociateContent(partner.slug, partner);
  const canonical = `/associates/${partner.slug}/`;
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { type: "website", url: canonical, title: content.title, description: content.description, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: partner.image, alt: `${partner.name} ${content.category.toLowerCase()}` }] },
    twitter: { card: "summary_large_image", title: content.title, description: content.description, images: [partner.image] },
    other: { "geo.region": "IN-TN", "geo.placename": "Chennai" },
  };
}

export default async function PartnerPage({ params }) {
  const partner = getPartner((await params).slug);
  if (!partner) notFound();
  const content = getAssociateContent(partner.slug, partner);
  const baseProductLinks = partner.products.map((name) => getProduct(slugify(name))).filter(Boolean);
  const rangeProductLinks = productsForRangeSupplier(partner.slug).map((item) => getProduct(slugify(item.name))).filter(Boolean);
  const productLinks = [...new Map([...baseProductLinks, ...rangeProductLinks].map((item) => [item.slug, item])).values()];
  const hasApprovedRange = partner.slug === "campco" || partner.slug === "delta-nutritives";
  const industryLinks = partner.industries.map(getIndustry).filter(Boolean);
  const canonicalUrl = `${siteUrl}/associates/${partner.slug}/`;
  const productNames = productLinks.map((product) => product.name).join(", ");
  const applicationNames = content.applications.join(", ");
  const faq = [
    [`Can I buy ${partner.name} ingredients through Vikranth in Chennai?`, `Vikranth accepts B2B enquiries in Chennai for selected ${partner.name} products. Availability depends on the current supply arrangement, product, grade, pack size, MOQ and delivery location. Share your company, application, quantity and timeline so the team can confirm the appropriate next step.`],
    [`Which ${partner.name} products are available for enquiry?`, `The current page covers ${productNames}. The range can change. Vikranth confirms the exact grade, format, pack and commercial availability against current supplier information before quotation.`],
    [`Which applications use ${partner.name} ingredients?`, `The listed range is relevant to ${applicationNames}. Suitability depends on the selected product and grade, formulation, process conditions, regulatory requirements and finished-product target.`],
    [`Can I request ${partner.name} specifications, COA, SDS or samples?`, `You can request available technical and quality documents for a named ${partner.name} product. Specification, COA, SDS, allergen or certificate availability and sample conditions depend on the product, manufacturer documentation, grade and trial quantity.`],
    [`What are the MOQ and lead time for ${partner.name} products?`, `MOQ and lead time vary by product, pack, stock or indent status, quantity and destination. Vikranth confirms these details in the quotation rather than publishing one value for the entire brand.`],
    [`Does Vikranth supply ${partner.name} products across India?`, `Vikranth accepts B2B enquiries from Chennai and other Indian locations. Delivery coverage, freight, cold-chain needs where relevant and lead time are confirmed for the specific product, quantity and destination.`],
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: content.h1, description: content.description, about: { "@type": "Brand", name: partner.name }, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en-IN" },
      { "@type": "Brand", "@id": `${canonicalUrl}#brand`, name: partner.name, description: content.about, logo: `${siteUrl}${partner.logo}`, url: canonicalUrl },
      { "@type": "ItemList", name: `${partner.name} products available for enquiry`, numberOfItems: productLinks.length, itemListElement: productLinks.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name, url: `${siteUrl}/products/${product.slug}/` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Ingredient Partners", item: `${siteUrl}/associates/` }, { "@type": "ListItem", position: 3, name: partner.name, item: canonicalUrl }] },
      { "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ],
  };

  return (
    <main className={styles.page} data-associate-page>
      <AssociateMotion />
      <div className={styles.readingProgress} data-associate-progress aria-hidden="true" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <DetailHeader />

      <section className={`${styles.hero} ${heroFix.heroBoundary}`}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/associates">Associates</Link><span>/</span><span>{partner.name}</span></nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy} data-associate-reveal="left">
              <span className={styles.eyebrow}>{content.category}</span>
              <h1>{content.h1}</h1>
              <p>Explore selected {partner.name} {content.category.toLowerCase()} through Vikranth Chemical Corporation in Chennai. Share your application, required grade, quantity, delivery city and document needs so our team can confirm the relevant option.</p>
              <div className={styles.heroActions}><Link className={styles.primaryButton} href="#products">View products <ArrowRight /></Link><Link className={styles.secondaryButton} href="#enquiry">Request sample or quote <ArrowRight /></Link></div>
              <div className={styles.heroTrust}><span><BadgeCheck /> B2B enquiries</span><span><MapPin /> Chennai coordination</span><span><Truck /> Pan-India enquiries</span></div>
            </div>
            <div className={styles.visual} data-associate-reveal="right">
              <div className={styles.visualFrame}><img src={partner.image} alt={`${partner.name} ${content.category.toLowerCase()} for professional applications`} fetchPriority="high" data-associate-hero-image /><div className={styles.visualTag}><small>Supplier portfolio</small><strong>{content.category}</strong></div></div>
              <div className={styles.logoPlate}><img src={partner.logo} alt={`${partner.name} logo`} /></div>
            </div>
          </div>
        </div>
      </section>



      <section className={`${styles.section} ${styles.productsSection}`} id="products"><div className={styles.wrap}>
        <header className={styles.enquiryRangeHeader} data-associate-reveal="up"><div><span className={styles.eyebrow}>Current enquiry range</span><h2>{partner.name} products available for enquiry</h2><p>Compare available products and open each product page for grade, format, pack and documentation details.</p></div><a href="#enquiry">Discuss your requirement</a></header>
        {hasApprovedRange ? <RangeCatalog products={productLinks} indianNames={partner.slug === "campco" ? productLinks.map((item) => item.name) : []} supplierMode categoryField={partner.slug === "delta-nutritives" ? "brochureDisplayCategory" : "usageCategory"} mec3Catalog={partner.slug === "delta-nutritives"} /> : <div className={`${styles.productGrid} ${partner.slug === "anchor" ? styles.anchorProductGrid : ""}`} data-associate-stagger>{productLinks.map((product) => <Link className={styles.productCard} href={`/products/${product.slug}`} key={product.slug}><img src={partner.productImages?.[product.name] || product.image} alt={`${partner.name} ${product.name} ingredient`} loading="lazy" /><div className={styles.productCardContent}><small>{content.category}</small><h3>{product.name}</h3>{content.productDescriptions?.[product.name] ? <p>{content.productDescriptions[product.name]}</p> : null}<span>View product details <ArrowRight /></span></div></Link>)}</div>}
              <div className={styles.productsAssurance} data-associate-reveal="up"><ShieldCheck/><span>Exact grade, source, format, pack, MOQ and availability are confirmed for each enquiry.</span><b><em>01</em> — {String(productLinks.length).padStart(2,"0")}</b></div>
</div></section>

      <section className={`${styles.section} ${styles.sectionCream}`} id="about"><div className={styles.wrap}><div className={styles.aboutFeatureGrid}><div className={styles.aboutFeatureCopy} data-associate-reveal="left"><span className={styles.eyebrow}>About the supplier</span><h2>Ingredients engineered for the right application.</h2><p>{content.about}</p><div className={styles.aboutSupplierLogo}><img src={partner.logo} alt={`${partner.name} logo`} /></div><a className={styles.aboutProfileLink} href="#products">View supplier profile <ArrowRight /></a></div><div className={styles.applicationFeatureGrid} data-associate-stagger>{content.applications.slice(0,4).map((application,index)=>{const applicationImage=Object.values(partner.productImages||{})[index]||partner.image;return <article className={styles.applicationFeatureCard} key={application}><img src={applicationImage} alt={`${partner.name} ${application}`} loading="lazy"/><div><h3>{application}</h3><p>{content.category} for professional applications.</p></div></article>})}</div></div><div className={styles.aboutAssurance} data-associate-reveal="up"><ShieldCheck/><span>Grade, source, specification and documentation are confirmed before quotation.</span><a href="#enquiry">Discuss your application <ArrowRight /></a></div></div></section>
      <aside className={styles.section}><div className={styles.wrap}><div className={styles.technicalNote}><ShieldCheck /><div><strong>Relationship and trademark note</strong><p>{partner.name} names and logos belong to their respective owner. This portfolio page supports product identification and enquiry; it does not by itself claim an exclusive or authorised relationship. Current relationship, territory, grade and availability are confirmed before quotation.</p></div></div></div></aside>
      <section className={`${styles.section} ${styles.sectionCream}`} id="applications"><div className={styles.wrap}>
        <header className={styles.sectionHead} data-associate-reveal="up"><span className={styles.eyebrow}>Application-led selection</span><h2>Where are {partner.name} ingredients used?</h2><p>Relevant applications are shown as starting points. Final suitability depends on the selected product and grade, formulation, process conditions, regulatory requirements and finished-product target.</p></header>
        <div className={styles.applicationGrid} data-associate-stagger>{content.applications.map((application, index) => { const industry = industryLinks[index % Math.max(industryLinks.length, 1)]; return industry ? <Link className={styles.applicationCard} href={`/industries/${industry.slug}`} key={application}><span>0{index + 1}</span><strong>{application}</strong><ArrowRight /></Link> : <article className={styles.applicationCard} key={application}><span>0{index + 1}</span><strong>{application}</strong></article>; })}</div>
      </div></section>






      <section className={styles.section} id="faq"><div className={styles.wrap}><header className={styles.sectionHead} data-associate-reveal="up"><span className={styles.eyebrow}>Buyer questions</span><h2>Frequently asked questions about {partner.name}</h2></header><div className={styles.faqList} data-associate-stagger>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

      <section className={`${styles.section} ${styles.enquirySection}`} id="enquiry"><div className={`${styles.wrap} ${styles.enquiryGrid}`}>
        <div className={`${styles.enquiryIntro} ${stickyFix.notSticky}`} data-associate-reveal="left"><span className={styles.eyebrow}>Supplier-specific enquiry</span><h2>Need help selecting a {partner.name} product?</h2><p>Share your application, grade, quantity, delivery city and document needs. Request a quotation or ask about sample availability.</p><ul><li><Check /> Your entered details stay intact between steps</li><li><Check /> Supplier context is included automatically</li><li><Check /> Continue securely through WhatsApp</li></ul></div>
        <AssociateEnquiryForm supplier={partner.name} products={productLinks.map((product) => product.name)} whatsappNumber={whatsappNumberForSupplier(partner.slug)} />
      </div></section>

      <DetailFooter />
    </main>
  );
}
