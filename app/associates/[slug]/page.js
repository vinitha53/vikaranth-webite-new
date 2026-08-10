import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, FileCheck2, MapPin, PackageCheck, SearchCheck, Truck } from "lucide-react";
import { partners, getPartner } from "../../data/partners";
import { getProduct, getIndustry, slugify } from "../../data/catalog";
import { getAssociateContent } from "../../data/associate-content";
import { DetailHeader, DetailFooter } from "../../components/DetailChrome";
import AssociateMotion from "./AssociateMotion";
import AssociateEnquiryForm from "./AssociateEnquiryForm";
import styles from "./associate-detail.module.css";
import stickyFix from "./associate-sticky-fix.module.css";
import heroFix from "./associate-hero-fix.module.css";

const siteUrl = "https://www.vikranthchem.com";

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
  const productLinks = partner.products.map((name) => getProduct(slugify(name))).filter(Boolean);
  const industryLinks = partner.industries.map(getIndustry).filter(Boolean);
  const canonicalUrl = `${siteUrl}/associates/${partner.slug}/`;
  const productNames = partner.products.join(", ");
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
      { "@type": "Service", "@id": `${canonicalUrl}#service`, name: `${partner.name} ingredient enquiry and supply coordination`, provider: { "@id": `${siteUrl}/#organization` }, areaServed: [{ "@type": "City", name: "Chennai" }, { "@type": "Country", name: "India" }], serviceType: "B2B food ingredient sourcing", url: canonicalUrl },
      { "@type": "ItemList", name: `${partner.name} products available for enquiry`, numberOfItems: productLinks.length, itemListElement: productLinks.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name, url: `${siteUrl}/products/${product.slug}/` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Ingredient Partners", item: `${siteUrl}/associates/` }, { "@type": "ListItem", position: 3, name: partner.name, item: canonicalUrl }] },
      { "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ],
  };

  return (
    <main className={styles.page} data-associate-page>
      <AssociateMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <DetailHeader />

      <section className={`${styles.hero} ${heroFix.heroBoundary}`}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/associates">Associates</Link><span>/</span><span>{partner.name}</span></nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{content.category}</span>
              <h1>{content.h1}</h1>
              <p>Explore selected {partner.name} {content.category.toLowerCase()} through Vikranth Chemical Corporation in Chennai. Share your application, required grade, quantity, delivery city and document needs so our team can confirm the relevant option.</p>
              <div className={styles.heroActions}><Link className={styles.primaryButton} href="#products">View products <ArrowRight /></Link><Link className={styles.secondaryButton} href="#enquiry">Request sample or quote <ArrowRight /></Link></div>
              <div className={styles.heroTrust}><span><BadgeCheck /> B2B enquiries</span><span><MapPin /> Chennai coordination</span><span><Truck /> Pan-India enquiries</span></div>
            </div>
            <div className={styles.visual}>
              <div className={styles.visualFrame}><img src={partner.image} alt={`${partner.name} ${content.category.toLowerCase()} for professional applications`} fetchPriority="high" /><div className={styles.visualTag}><small>Supplier portfolio</small><strong>{content.category}</strong></div></div>
              <div className={styles.logoPlate}><img src={partner.logo} alt={`${partner.name} logo`} /></div>
            </div>
          </div>
        </div>
      </section>

      <nav className={styles.subnav} aria-label="Supplier page sections"><div className={styles.wrap}><a href="#about">About</a><a href="#products">Products</a><a href="#applications">Applications</a><a href="#procurement">How enquiry works</a><a href="#documents">Documents</a><a href="#faq">FAQ</a><a href="#enquiry">Enquire</a></div></nav>

      <section className={`${styles.section} ${styles.sectionCream}`} id="about"><div className={`${styles.wrap} ${styles.aboutGrid}`}>
        <article className={styles.answerCard}><span className={styles.eyebrow}>About the supplier</span><h2>What does {partner.name} offer?</h2><p>{content.about}</p><div className={styles.answerNote}><SearchCheck /> Product, grade and relationship details are confirmed before quotation.</div></article>
        <div className={styles.ecosystem} aria-label={`${partner.name} application ecosystem`}><div className={styles.scene} data-3d-scene><div className={styles.sceneRing} /><div className={styles.sceneRing} /><div className={styles.sceneLogo}><img src={partner.logo} alt="" /></div>{content.applications.slice(0, 4).map((application) => <span className={styles.sceneLabel} key={application}>{application}</span>)}</div></div>
      </div></section>

      <section className={styles.section} id="products"><div className={styles.wrap}>
        <header className={styles.sectionHead}><span className={styles.eyebrow}>Current enquiry range</span><h2>{partner.name} products available for enquiry</h2><p>Product cards link to individual product pages. Exact grade, format, pack, MOQ and current commercial availability are confirmed for each requirement.</p></header>
        <div className={styles.productGrid}>{productLinks.map((product) => <Link className={styles.productCard} href={`/products/${product.slug}`} key={product.slug}><img src={partner.productImages?.[product.name] || product.image} alt={`${partner.name} ${product.name} ingredient`} loading="lazy" /><div className={styles.productCardContent}><small>{content.category}</small><h3>{product.name}</h3><span>View product details <ArrowRight /></span></div></Link>)}</div>
      </div></section>

      <section className={`${styles.section} ${styles.sectionCream}`} id="applications"><div className={styles.wrap}>
        <header className={styles.sectionHead}><span className={styles.eyebrow}>Application-led selection</span><h2>Where are {partner.name} ingredients used?</h2><p>Relevant applications are shown as starting points. Final suitability depends on the selected product and grade, formulation, process conditions, regulatory requirements and finished-product target.</p></header>
        <div className={styles.applicationGrid}>{content.applications.map((application, index) => { const industry = industryLinks[index % Math.max(industryLinks.length, 1)]; return industry ? <Link className={styles.applicationCard} href={`/industries/${industry.slug}`} key={application}><span>0{index + 1}</span><strong>{application}</strong><ArrowRight /></Link> : <article className={styles.applicationCard} key={application}><span>0{index + 1}</span><strong>{application}</strong></article>; })}</div>
      </div></section>

      <section className={`${styles.section} ${styles.sectionDark}`} id="procurement"><div className={styles.wrap}>
        <header className={styles.sectionHead}><span className={styles.eyebrow}>Procurement process</span><h2>From requirement to delivery planning</h2><p>Share the exact product, application, preferred grade or performance target, required quantity, delivery city and timeline.</p></header>
        <div className={styles.process}><div className={styles.processLine} />{[["01","Enquiry","Product, application and quantity"],["02","Technical review","Grade and suitability check"],["03","Sample & documents","Subject to availability"],["04","Quotation","Pack, MOQ, freight and lead time"],["05","Delivery planning","Confirmed for your destination"]].map(([number,title,text]) => <article className={styles.processStep} key={number}><span>{number}</span><strong>{title}</strong><p>{text}</p></article>)}</div>
      </div></section>

      <section className={`${styles.section} ${styles.sectionCream}`} id="documents"><div className={styles.wrap}>
        <header className={styles.sectionHead}><span className={styles.eyebrow}>Quality and documentation</span><h2>Request the information your team needs</h2></header>
        <div className={styles.documentGrid}><article className={styles.documentCard}><FileCheck2 /><h3>Technical and quality documents</h3><p>Request available specifications, COA, SDS where applicable, allergen information, origin, storage, shelf life and relevant certificates for a named product.</p></article><article className={styles.documentCard}><PackageCheck /><h3>Commercial and logistics details</h3><p>Vikranth confirms pack size, MOQ, stock or indent status, sample policy, lead time, freight terms and delivery coverage before quotation.</p></article></div>
      </div></section>


      <section className={styles.section} id="faq"><div className={styles.wrap}><header className={styles.sectionHead}><span className={styles.eyebrow}>Buyer questions</span><h2>Frequently asked questions about {partner.name}</h2></header><div className={styles.faqList}>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

      <section className={`${styles.section} ${styles.enquirySection}`} id="enquiry"><div className={`${styles.wrap} ${styles.enquiryGrid}`}>
        <div className={`${styles.enquiryIntro} ${stickyFix.notSticky}`}><span className={styles.eyebrow}>Supplier-specific enquiry</span><h2>Need help selecting a {partner.name} product?</h2><p>Share your application, grade, quantity, delivery city and document needs. Request a quotation or ask about sample availability.</p><ul><li><Check /> Your entered details stay intact between steps</li><li><Check /> Supplier context is included automatically</li><li><Check /> Continue securely through WhatsApp</li></ul></div>
        <AssociateEnquiryForm supplier={partner.name} products={productLinks.map((product) => product.name)} />
      </div></section>

      <DetailFooter />
    </main>
  );
}
