import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, FileText, MapPin, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { industries, products, getIndustry, bakeryProductGroups, chocolateProductGroups, dairyProductGroups, beverageProductGroups, iceCreamProductGroups, fruitProductGroups, hydrocolloidProductGroups, sweetenerProductGroups, functionalProductGroups, nutraceuticalProductGroups, additiveProductGroups } from "../data/catalog";
import { industryContent } from "../data/industry-content";
import { partnersForIndustry } from "../data/partners";
import { DetailHeader, DetailFooter, PageCta, styles } from "./DetailChrome";
import IndustryApplicationGuide from "./IndustryApplicationGuide";
import RangeCatalog from "./RangeCatalog";

const siteUrl = "https://www.vikranthchemicalcorporation.com";
const proofPointMap = {
  "bakery-ingredients": ["Commercial packs", "Document support", "Application-led sourcing"],
  "chocolate-confectionery": ["Indian and imported ranges", "Commercial quantities", "Grade confirmation"],
  "beverage-ingredients": ["Formulation-relevant options", "Commercial packs", "Document requests"],
  "ice-cream-ingredients": ["Bases to toppings", "Texture support", "Commercial sourcing"],
  "functional-ingredients": ["Function-led selection", "Grade checks", "Technical documents"],
  "nutraceutical-pharma": ["Specification checks", "Document coordination", "Commercial pack guidance"],
  "dairy-ingredients": ["Dairy powder options", "Commercial packs", "Delivery coordination"],
  "food-additives-preservatives": ["Grade confirmation", "Document support", "Commercial quantities"],
  "hydrocolloids-stabilizers": ["Function-led sourcing", "Multiple gum families", "Document support"],
  "fruit-processing": ["Fruit and finishing range", "Commercial packs", "Format confirmation"],
  "sweeteners-syrups-starches": ["Liquid and dry options", "Commercial packs", "Cross-category sourcing"]
};
export function generateStaticParams() { return industries.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const industry = getIndustry((await params).slug);
  const content = industry && industryContent[industry.slug];
  if (!industry || !content) return {};
  const canonical = `${siteUrl}/industries/${industry.slug}/`;
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { type: "website", url: canonical, title: content.title, description: content.description, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: industry.image, alt: content.h1 }] },
    twitter: { card: "summary_large_image", title: content.title, description: content.description, images: [industry.image] },
    other: { "geo.region": "IN-TN", "geo.placename": "Chennai" }
  };
}

const groupMap = {
  "bakery-ingredients": [bakeryProductGroups, "Bakery"],
  "chocolate-confectionery": [chocolateProductGroups, "Chocolate & confectionery"],
  "dairy-ingredients": [dairyProductGroups, "Dairy"],
  "beverage-ingredients": [beverageProductGroups, "Beverage"],
  "ice-cream-ingredients": [iceCreamProductGroups, "Ice cream"],
  "fruit-processing": [fruitProductGroups, "Fruit processing"],
  "hydrocolloids-stabilizers": [hydrocolloidProductGroups, "Hydrocolloid & stabilizer"],
  "sweeteners-syrups-starches": [sweetenerProductGroups, "Sweetener, syrup & starch"],
  "functional-ingredients": [functionalProductGroups, "Functional ingredient"],
  "nutraceutical-pharma": [nutraceuticalProductGroups, "Nutraceutical & pharma"],
  "food-additives-preservatives": [additiveProductGroups, "Food additive & preservative"]
};

export default async function IndustryPage({ params }) {
  const industry = getIndustry((await params).slug);
  const content = industry && industryContent[industry.slug];
  if (!industry || !content) notFound();
  const [groups, guideLabel] = groupMap[industry.slug] || [null, ""];
  const items = industry.products.map((name) => {
    const product = products.find((item) => item.name === name);
    const industryGroup = groups?.find((group) => group.ingredients.includes(name));
    return product ? { ...product, usageCategory: industryGroup?.name || product.usageCategory } : null;
  }).filter(Boolean);
  const partners = partnersForIndustry(industry.slug);
  const relatedIndustries = content.related.map((slug) => getIndustry(slug)).filter(Boolean);
  const canonicalUrl = `${siteUrl}/industries/${industry.slug}/`;
  const schema = [
    { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: content.h1, description: content.summary, inLanguage: "en-IN", about: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, mainEntity: { "@id": `${canonicalUrl}#products` } },
    { "@context": "https://schema.org", "@type": "ItemList", "@id": `${canonicalUrl}#products`, name: `${industry.name} available for B2B enquiry`, description: content.summary, numberOfItems: items.length, itemListOrder: "https://schema.org/ItemListOrderAscending", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: `${siteUrl}/products/${item.slug}/` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Industries", item: `${siteUrl}/industries/` }, { "@type": "ListItem", position: 3, name: industry.name, item: canonicalUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: content.faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
  ];

  return <main className={`${styles.page} ${styles.industryPage}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <DetailHeader />
    <section className={styles.industryHero}>
      <img className={styles.industryHeroImage} src={industry.image} alt={`${industry.name} ingredients for commercial food production`} />
      <div className={styles.industryHeroShade} />
      <div className={styles.industryHeroInner}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span>{industry.name}</span></nav>
        <div className={styles.industryHeroGrid}>
          <div><span className={styles.heroKicker}>{content.eyebrow}</span><h1>{content.h1}</h1><p>{content.summary}</p><div className={styles.heroActions}><Link href="#industry-products">Explore Product Range <ArrowRight size={16} /></Link><Link href="/contact/#enquiry">Discuss Your Requirement</Link></div></div>
          <aside className={styles.heroProof}><span>Procurement support</span><ul>{proofPointMap[industry.slug].map((point, index) => { const Icon = [PackageCheck, FileText, Truck][index]; return <li key={point}><Icon /><b>{point}</b></li>; })}</ul></aside>
        </div>
      </div>
    </section>

    <div className={styles.industryContent}>
      <section className={styles.productSection} id="industry-products" data-range-section={items.some((item) => item.range) ? "true" : undefined}>
        <div id="catalog-browser" className={styles.catalogBrowser}>
          <RangeCatalog products={items} indianNames={items.filter((item) => !item.range || item.range === "indian").map((item) => item.name)} categoryField="brochureDisplayCategory" collectionTitle={guideLabel.toLowerCase().includes("ingredient") ? guideLabel : `${guideLabel} Ingredient`} mec3Catalog={items.some((item) => item.brand === "MEC3")} />
        </div>
      </section>

      <IndustryApplicationGuide industry={industry} content={content} />

      <section className={styles.regionalSupport}>
        <div className={styles.regionalSupportCopy}><span className={styles.sectionNumber}>03</span><small className={styles.eyebrow}>Regional B2B sourcing</small><h2>{content.regionalHeading}</h2><p>{content.regionalCopy}</p><Link href="/contact/#enquiry">Discuss supply requirements <ArrowRight size={16} /></Link></div>
        <div className={styles.sourceBenefits}><small>Why source through Vikranth?</small>{content.benefits.map((benefit) => <article key={benefit}><Check /><span>{benefit}</span></article>)}</div>
      </section>

      {partners.length > 0 && <section className={styles.partnerSection}><Heading number="04" eyebrow="Supplier network" title="Relevant Suppliers and Partners" text="Explore relevant manufacturer portfolios and submit a requirement for current commercial availability." /><div className={styles.partnerGrid}>{partners.map((partner) => <Link className={styles.partnerTile} href={`/associates/${partner.slug}`} key={partner.slug}><div>{partner.logo ? <img src={partner.logo} alt={`${partner.name} supplier logo`} /> : <b>{partner.name}</b>}</div><h3>{partner.name}</h3><span>Explore {partner.name} <ArrowRight size={14} /></span></Link>)}</div></section>}

      <section className={styles.faqSection}><div className={styles.faqIntro}><span className={styles.sectionNumber}>{partners.length > 0 ? "05" : "04"}</span><small className={styles.eyebrow}>Buyer questions, answered</small><h2>Frequently Asked Questions</h2><p>Concise answers for professional buyers sourcing {industry.name.toLowerCase()}.</p></div><div className={styles.faqList}>{content.faq.map(([q, a], i) => <details key={q} open={i === 0}><summary><span>0{i + 1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div></section>

      <section className={styles.relatedIndustries}><Heading number="06" eyebrow="Related applications" title="Explore Related Industries" text="Continue into adjacent ingredient ranges already available on the website." /><div>{relatedIndustries.map((related) => <Link href={`/industries/${related.slug}`} key={related.slug}><img src={related.image} alt={`${related.name} ingredient applications`} loading="lazy" /><span><strong>Explore {related.name}</strong><small>{related.summary}</small></span><ArrowRight /></Link>)}</div></section>
    </div>

    <PageCta title={content.ctaHeading} copy={content.ctaCopy} product={industry.name} />
    <DetailFooter />
  </main>;
}

function Heading({ number, eyebrow, title, text }) {
  return <div className={styles.sectionHeading}><div><span className={styles.sectionNumber}>{number}</span><small className={styles.eyebrow}>{eyebrow}</small><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}
