import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, products, getIndustry, slugify, bakeryProductGroups, chocolateProductGroups, dairyProductGroups, beverageProductGroups, iceCreamProductGroups, fruitProductGroups, hydrocolloidProductGroups, sweetenerProductGroups, functionalProductGroups, nutraceuticalProductGroups, additiveProductGroups } from "../../data/catalog";
import { partnersForIndustry } from "../../data/partners";
import { DetailHeader, DetailFooter, PageCta, styles } from "../../components/DetailChrome";
import BakeryCategoryShowcase from "../../components/BakeryCategoryShowcase";

const siteUrl = "https://www.vikranthchem.com";

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};

  const title = `${industry.name} Supplier in Chennai | Vikranth`;
  const description = `Explore ${industry.name.toLowerCase()} from a Chennai B2B supplier. View relevant products and enquire for grades, samples, documents, bulk supply and India delivery.`;
  const canonical = `/industries/${industry.slug}`;

  return {
    title,
    description,
    keywords: [`${industry.name} supplier Chennai`, `${industry.name} distributor India`, `B2B ${industry.name.toLowerCase()}`, `bulk ${industry.name.toLowerCase()}`, "food ingredients supplier Chennai"],
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { type: "website", url: canonical, title, description, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: industry.image, alt: `${industry.name} supplied in Chennai` }] },
    twitter: { card: "summary_large_image", title, description, images: [industry.image] },
    other: { "geo.region": "IN-TN", "geo.placename": "Chennai" },
  };
}

export default async function IndustryPage({ params }) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();

  const items = industry.products.map((name) => products.find((product) => product.slug === slugify(name))).filter(Boolean);
  const relatedPartners = partnersForIndustry(industry.slug);
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
    "food-additives-preservatives": [additiveProductGroups, "Food additive & preservative"],
  };
  const [showcaseGroups, guideLabel] = groupMap[industry.slug] || [null, ""];
  const applications = ["Commercial production", "Hotels and central kitchens", "Manufacturing lines", "Product development", "Specialty formulations", "Food-service operations"];
  const canonicalUrl = `${siteUrl}/industries/${industry.slug}`;
  const faq = [
    [`What are ${industry.name.toLowerCase()} used for?`, `${industry.name} can support texture, stability, flavour, processing and production consistency across relevant finished-food applications. The exact function depends on the selected product and grade.`],
    [`Which ${industry.name.toLowerCase()} does Vikranth supply?`, `This page lists ${items.map((item) => item.name).join(", ")}. Current grade, pack size, stock and manufacturer availability are confirmed for each enquiry.`],
    [`Can I buy ${industry.name.toLowerCase()} in bulk in Chennai?`, "Vikranth accepts B2B enquiries in Chennai. Share the product, grade, quantity, delivery area and timeline so current supply details can be checked."],
    [`Can ${industry.name.toLowerCase()} be supplied across India?`, "Pan-India business enquiries are welcome. Delivery coverage, freight, lead time and minimum quantity depend on the product and destination and are confirmed before quotation."],
    ["Can I request product specifications, COA or a sample?", "Yes. State the product, application and trial quantity. Specific documents and samples remain subject to product and manufacturer availability."],
    ["Which ingredient is suitable for my application?", "Share the finished product, process, target performance, required grade, expected quantity and timeline so relevant available options can be reviewed and trialled."],
  ];

  const structuredData = [
    { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: `${industry.name} Supplier in Chennai`, description: industry.summary, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#organization` }, inLanguage: "en-IN" },
    { "@context": "https://schema.org", "@type": "ItemList", name: industry.name, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${siteUrl}/products/${item.slug}` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Industries", item: `${siteUrl}/industries` }, { "@type": "ListItem", position: 3, name: industry.name, item: canonicalUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
  ];

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <DetailHeader />
      <section className={styles.hero}><img className={styles.heroImage} src={industry.image} alt={`${industry.name} solutions for Chennai food businesses`} /><div className={styles.heroCopy}><div className={styles.crumbs}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span>{industry.name}</span></div><small>{industry.eyebrow}</small><h1>{industry.name}<br />Supplier in Chennai</h1><p>{industry.summary}</p><div className={styles.heroActions}><Link href="#industry-products">Explore products →</Link><Link href="/contact#enquiry">Request a quote</Link></div></div></section>

      <div className={styles.content}>
        <section className={styles.answer}><img src={industry.image} alt="" style={{ width: 120, height: 100, objectFit: "cover", borderRadius: 10 }} /><div><h2>{industry.name.toLowerCase()} for professional production</h2><p>{industry.summary} Vikranth supports Chennai and Pan-India business enquiries with product matching, documentation requests and sourcing coordination.</p></div></section>

        {showcaseGroups && <div className={styles.catalogIntro}><small className={styles.eyebrow}>{guideLabel} product guide</small><h2 id="industry-products">Choose what you make to find the ingredients used</h2><p>Each finished-product category below lists the relevant ingredients available from Vikranth. An ingredient may appear in more than one category when it has multiple applications.</p></div>}
        {!showcaseGroups && <h2 className={styles.sectionTitle} id="industry-products">Explore {industry.name}</h2>}
        {showcaseGroups ? <BakeryCategoryShowcase groups={showcaseGroups} products={items} categoryLabel={industry.name} fallbackImage={industry.image} /> : <section className={styles.productGrid}>{items.map((item) => <Link className={styles.productCard} href={`/products/${item.slug}`} key={item.slug}><img src={item.image} alt={`${item.name} in ${industry.name}`} /><div><h3>{item.name}</h3><p>View product →</p></div></Link>)}</section>}

        <small className={styles.eyebrow}>Where ingredients make a difference</small><h2 className={styles.sectionTitle}>Applications across {industry.name.toLowerCase()}</h2>
        <section className={styles.benefits}>{applications.slice(0, 5).map((item, index) => <article key={item}><span>0{index + 1}</span><strong>{item}</strong></article>)}</section>

        <small className={styles.eyebrow}>Plan your purchase</small><h2 className={styles.sectionTitle}>Buyer checklist before sourcing</h2>
        <section className={styles.checklist}>{["Finished product and process", "Required grade or brand", "Pack size and quantity", "Specification and COA documents", "Trial quantity and delivery timeline"].map((item, index) => <article key={item}><span>0{index + 1}</span><strong>{item}</strong></article>)}</section>

        <section className={styles.split}><img src={industry.image} alt={`${industry.name} production application`} style={{ width: "100%", height: "100%", minHeight: 300, objectFit: "cover", borderRadius: 12 }} /><div className={styles.panel}><small className={styles.eyebrow}>Chennai and Pan-India enquiries</small><h2>{industry.name} supply support</h2><p>Ask the team to confirm available products, grades, packs, documentation, samples, quantities, lead times and delivery coverage for your location.</p><Link className={styles.primary} href="/contact#enquiry">Request a quote →</Link></div></section>

        {relatedPartners.length > 0 && <><h2 className={styles.sectionTitle}>Relevant suppliers and partners</h2><section className={styles.partnerGrid}>{relatedPartners.map((partner) => <Link className={styles.partnerTile} href={`/associates/${partner.slug}`} key={partner.slug}><div>{partner.logo ? <img src={partner.logo} alt={`${partner.name} logo`} /> : <b>Anchor</b>}</div><h2>{partner.name}</h2><span>Explore partner →</span></Link>)}</section></>}

        <section className={styles.faq}><h2 className={styles.sectionTitle}>Frequently asked questions about {industry.name.toLowerCase()}</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      </div>
      <PageCta title={`Need help choosing a ${industry.name.toLowerCase()} product?`} product={industry.name} />
      <DetailFooter />
    </main>
  );
}

