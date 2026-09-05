import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Box, Check, ClipboardList, FileCheck, FileText, Handshake, MapPin, PackageCheck, ShieldCheck, SlidersHorizontal, Truck } from "lucide-react";
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
const regionalBenefitIcons = [Box, SlidersHorizontal, FileCheck, Handshake];

function buildIndustryFaqs(industry, content) {
  const category = industry.name.toLowerCase();
  return [
    ...content.faq.slice(0, 2),
    [
      `Is Vikranth a ${category} wholesaler, distributor and supplier in Chennai?`,
      `Yes. Vikranth Chemical Corporation supports B2B ${category} enquiries as a Chennai-based supplier, distributor and wholesaler. Product, brand, grade, pack size, MOQ and current availability are confirmed for each requirement.`,
    ],
    [
      `Can I order ${category} in bulk for delivery across South India and India?`,
      `Yes. Vikranth reviews bulk and wholesale ${category} requirements for Chennai, South India and other Indian locations. Delivery depends on product availability, commercial quantity, pack format and freight serviceability.`,
    ],
    [
      `How can I get a quotation from a ${category} supplier?`,
      `Share the required product or application, preferred brand or grade, approximate quantity, pack preference and delivery city. Vikranth will review suitable options and confirm current pricing, MOQ, documents and supply availability.`,
    ],
  ];
}
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
  const industryFaqs = buildIndustryFaqs(industry, content);
  const canonicalUrl = `${siteUrl}/industries/${industry.slug}/`;
  const schema = [
    { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: content.h1, description: content.summary, inLanguage: "en-IN", about: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, mainEntity: { "@id": `${canonicalUrl}#products` } },
    { "@context": "https://schema.org", "@type": "ItemList", "@id": `${canonicalUrl}#products`, name: `${industry.name} available for B2B enquiry`, description: content.summary, numberOfItems: items.length, itemListOrder: "https://schema.org/ItemListOrderAscending", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: `${siteUrl}/products/${item.slug}/` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Industries", item: `${siteUrl}/industries/` }, { "@type": "ListItem", position: 3, name: industry.name, item: canonicalUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: industryFaqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
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

      {partners.length > 0 && <section className={styles.partnerSection}>
        <div className={styles.partnerOverviewHeading}>
          <span>Supplier Network</span>
          <h2>Relevant Suppliers <em>and Partners</em></h2>
          <p>Explore relevant manufacturer portfolios and submit a requirement for current commercial availability.</p>
          <i aria-hidden="true"><b /></i>
        </div>
        <div className={styles.partnerGrid}>{partners.map((partner) => <Link className={styles.partnerTile} href={`/associates/${partner.slug}`} key={partner.slug}><div>{partner.logo ? <img src={partner.logo} alt={`${partner.name} supplier logo`} /> : <b>{partner.name}</b>}</div><h3>{partner.name}</h3><span>Explore {partner.name} <ArrowRight size={14} /></span></Link>)}</div>
      </section>}

      <IndustryApplicationGuide industry={industry} content={content} />

      <section className={styles.regionalSupport} aria-labelledby="regional-sourcing-title">
        <div className={styles.regionalSupportBody}>
          <div className={styles.regionalSupportCopy}>
            <div className={styles.regionalSupportEyebrow}><span>03 — Regional B2B sourcing</span><i /></div>
            <h2 id="regional-sourcing-title">{content.regionalHeading}</h2>
            <p>{content.regionalCopy}</p>
            <div className={styles.regionalCoverageSteps} aria-label="Supply coverage">
              <span className={styles.regionalCoverageActive}><i />Chennai Hub</span>
              <span><i />South India</span>
              <span><i />Pan-India Supply</span>
            </div>
            <Link href="/contact/#enquiry">Discuss Supply Requirements <ArrowRight /></Link>
          </div>

          <div className={styles.regionalSupportMap}>
            <div className={styles.regionalMapHeader}><strong>Why source through Vikranth?</strong><i /><span><b />B2B enquiries · <em>Active</em></span></div>
            <div className={styles.regionalMapContent}>
              <div className={styles.regionalBenefitColumn}>{content.benefits.slice(0, 2).map((benefit, index) => { const Icon = regionalBenefitIcons[index]; return <article key={benefit}><Icon /><span>{benefit}</span></article>; })}</div>
              <div className={styles.regionalMapGraphic} aria-label="Supply support from Chennai across South India and India">
                <i className={styles.regionalMapOrbit} aria-hidden="true" />
                <div className={styles.indiaMap} aria-hidden="true">
                  <img src="/india-outline.svg" width="667" height="777" alt="" />
                  <span className={`${styles.indiaMapPoint} ${styles.indiaMapPointNorth}`} />
                  <span className={`${styles.indiaMapPoint} ${styles.indiaMapPointWest}`} />
                  <span className={`${styles.indiaMapPoint} ${styles.indiaMapPointEast}`} />
                  <span className={`${styles.indiaMapRoute} ${styles.indiaMapRouteNorth}`} />
                  <span className={`${styles.indiaMapRoute} ${styles.indiaMapRouteWest}`} />
                  <span className={`${styles.indiaMapRoute} ${styles.indiaMapRouteEast}`} />
                  <span className={styles.regionalMapIndia}>Pan-India</span>
                  <span className={styles.regionalMapSouth}>South India</span>
                  <span className={styles.regionalMapChennai}><b />Chennai</span>
                </div>
              </div>
              <div className={styles.regionalBenefitColumn}>{content.benefits.slice(2, 4).map((benefit, index) => { const Icon = regionalBenefitIcons[index + 2]; return <article key={benefit}><Icon /><span>{benefit}</span></article>; })}</div>
            </div>
            <div className={styles.regionalMapFooter}><MapPin />Chennai sourcing hub <span>13.0827° N, 80.2707° E</span></div>
          </div>
        </div>

        <div className={styles.regionalAssurances}>
          <span><ClipboardList />Product-fit guidance</span>
          <span><FileCheck />MOQ checks</span>
          <span><PackageCheck />Availability review</span>
          <span><Truck />Freight coordination</span>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqOverviewHeading}>
          <span>Buyer Questions, Answered</span>
          <h2>Frequently Asked <em>Questions</em></h2>
          <p>Concise answers for professional buyers sourcing {industry.name.toLowerCase()}.</p>
          <i aria-hidden="true"><b /></i>
        </div>
        <div className={styles.faqList}>{industryFaqs.map(([q, a], i) => <details key={q} open={i === 0}><summary><span>0{i + 1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div>
      </section>

      <section className={styles.relatedIndustries}>
        <div className={styles.relatedOverviewHeading}>
          <span>Related Applications</span>
          <h2>Explore Related <em>Industries</em></h2>
          <p>Continue into adjacent ingredient ranges already available on the website.</p>
          <i aria-hidden="true"><b /></i>
        </div>
        <div>{relatedIndustries.map((related) => <Link href={`/industries/${related.slug}`} key={related.slug}><img src={related.image} alt={`${related.name} ingredient applications`} loading="lazy" /><span><strong>Explore {related.name}</strong><small>{related.summary}</small></span><ArrowRight /></Link>)}</div>
      </section>
    </div>

    <PageCta title={content.ctaHeading} copy={content.ctaCopy} product={industry.name} />
    <DetailFooter />
  </main>;
}

function Heading({ number, eyebrow, title, text }) {
  return <div className={styles.sectionHeading}><div><span className={styles.sectionNumber}>{number}</span><small className={styles.eyebrow}>{eyebrow}</small><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}
