import Link from "next/link";
import { ArrowRight, Check, FileText, PackageCheck, Truck } from "lucide-react";
import { industries } from "./data/catalog";
import { hubContent } from "./data/industry-content";
import { DetailHeader, DetailFooter, PageCta, styles } from "./components/DetailChrome";

const siteUrl = "https://www.vikranthchemicalcorporation.com";
const industryOrder = ["chocolate-confectionery","bakery-ingredients","beverage-ingredients","ice-cream-ingredients","functional-ingredients","nutraceutical-pharma","dairy-ingredients","food-additives-preservatives","hydrocolloids-stabilizers","fruit-processing","sweeteners-syrups-starches"];
const orderedIndustries = industryOrder.map((slug) => industries.find((industry) => industry.slug === slug)).filter(Boolean);
const industryLabel = (industry) => industry.slug === "ice-cream-ingredients" ? "Ice Cream & Frozen Desserts" : industry.name;

export const metadata = {
  title: hubContent.title,
  description: hubContent.description,
  alternates: { canonical: `${siteUrl}/industries/` },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: `${siteUrl}/industries/`, title: hubContent.title, description: hubContent.description, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: industries[0].image, alt: "Food ingredient solutions for commercial production" }] }
};

export default function IndustriesPage() {
  const pageUrl = `${siteUrl}/industries/`;
  const schema = [
    { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: hubContent.h1, description: hubContent.summary, about: { "@id": `${siteUrl}/#organization` }, mainEntity: { "@id": `${pageUrl}#industries` } },
    { "@context": "https://schema.org", "@type": "ItemList", "@id": `${pageUrl}#industries`, name: "Industries supplied by Vikranth Chemical Corporation", numberOfItems: orderedIndustries.length, itemListElement: orderedIndustries.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: industryLabel(item), url: `${siteUrl}/industries/${item.slug}/` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Industries", item: pageUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: hubContent.faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
  ];

  return <main className={`${styles.page} ${styles.industryPage}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <DetailHeader />
    <section className={`${styles.industryHero} ${styles.hubHero}`}>
      <div className={styles.hubMosaic}>{orderedIndustries.slice(0, 4).map((item) => <img key={item.slug} src={item.image} alt="" />)}</div>
      <div className={styles.industryHeroShade} />
      <div className={styles.industryHeroInner}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Industries</span></nav>
        <div className={styles.industryHeroGrid}>
          <div><span className={styles.heroKicker}>{hubContent.eyebrow}</span><h1>{hubContent.h1}</h1><p>{hubContent.summary}</p><div className={styles.heroActions}><Link href="#industry-directory">Explore Industries <ArrowRight size={16} /></Link><Link href="/contact/#enquiry">Send Your Requirement</Link></div></div>
          <aside className={styles.heroProof}><span>B2B procurement support</span><ul><li><PackageCheck /><b>11 industry sectors</b><small>Organised around production needs</small></li><li><FileText /><b>Grade and document checks</b><small>Specification-led enquiries</small></li><li><Truck /><b>Regional coordination</b><small>Subject to availability and serviceability</small></li></ul></aside>
        </div>
      </div>
    </section>

    <div className={styles.industryContent}>
      <section className={styles.decisionIntro}><div><span className={styles.sectionNumber}>01</span><small className={styles.eyebrow}>Industry-focused sourcing</small><h2>Choose Your Industry</h2></div><div><p>{hubContent.introduction}</p><div className={styles.trustLine}><Check /> Commercial sourcing <Check /> Product and grade matching <Check /> Regional enquiry coordination</div></div></section>

      <section className={styles.directorySection} id="industry-directory"><div className={styles.sectionHeading}><div><span className={styles.sectionNumber}>02</span><small className={styles.eyebrow}>Industry directory</small><h2>Ingredients Organised Around What You Make</h2></div><p>Select an industry to view its existing product catalogue, application labels, sourcing guidance and enquiry path.</p></div><div className={styles.industryDirectory}>{orderedIndustries.map((item, i) => <Link href={`/industries/${item.slug}`} key={item.slug}><div className={styles.directoryImage}><img src={item.image} alt={`${item.name} ingredients for commercial production`} loading={i < 3 ? "eager" : "lazy"} /><span>{String(i + 1).padStart(2, "0")}</span></div><div><small>B2B ingredient solutions</small><h3>{industryLabel(item)}</h3><p>{item.summary}</p><b>Explore {industryLabel(item)} <ArrowRight size={15} /></b></div></Link>)}</div></section>

      <section className={styles.buyerSupportSection}><div><span className={styles.sectionNumber}>03</span><small className={styles.eyebrow}>Buyer support</small><h2>{hubContent.buyerSupportTitle}</h2><p>{hubContent.buyerSupportCopy}</p><Link href="/contact/#enquiry">Send your requirement <ArrowRight size={16} /></Link></div><div>{hubContent.benefits.map((benefit) => <article key={benefit}><Check /><strong>{benefit}</strong></article>)}</div></section>

      <section className={styles.faqSection}><div className={styles.faqIntro}><span className={styles.sectionNumber}>04</span><small className={styles.eyebrow}>Procurement essentials</small><h2>Frequently Asked Questions</h2><p>Clear answers for manufacturers and professional buyers planning an ingredient enquiry.</p></div><div className={styles.faqList}>{hubContent.faq.map(([q, a], i) => <details key={q} open={i === 0}><summary><span>0{i + 1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div></section>
    </div>

    <PageCta title={hubContent.ctaHeading} copy={hubContent.ctaCopy} product="Food ingredient requirement" />
    <DetailFooter />
  </main>;
}