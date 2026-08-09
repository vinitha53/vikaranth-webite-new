import Link from "next/link";
import { notFound } from "next/navigation";
import { partners, getPartner } from "../../data/partners";
import { getProduct, getIndustry, slugify } from "../../data/catalog";
import { DetailHeader, DetailFooter, PageCta, styles } from "../../components/DetailChrome";

const siteUrl = "https://www.vikranthchem.com";

export function generateStaticParams() {
  return partners.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const partner = getPartner((await params).slug);
  if (!partner) return {};

  const category = partner.summary.replace(/^./, (letter) => letter.toLowerCase());
  const title = `${partner.name} Supplier in Chennai & Pan India | Vikranth Chemical Corporation`;
  const description = `Buy ${partner.name} ${category} in Chennai through Vikranth. Supplying manufacturers across India. Request samples and pricing.`;
  const canonical = `${siteUrl}/associates/${partner.slug}/`;

  return {
    title,
    description,
    keywords: [`${partner.name} Chennai`, `${partner.name} supplier Chennai`, `${partner.name} food ingredients`, `${partner.name} distributor India`, `${partner.name} products`, `${partner.name} bulk supplier`],
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { type: "website", url: canonical, title, description, siteName: "Vikranth Chemical Corporation", locale: "en_IN", images: [{ url: partner.image, alt: `${partner.name} ingredient products` }] },
    twitter: { card: "summary_large_image", title, description, images: [partner.image] },
    other: { "geo.region": "IN-TN", "geo.placename": "Chennai" },
  };
}

export default async function PartnerPage({ params }) {
  const partner = getPartner((await params).slug);
  if (!partner) notFound();

  const productLinks = partner.products.map((name) => getProduct(slugify(name))).filter(Boolean);
  const industryLinks = partner.industries.map(getIndustry).filter(Boolean);
  const canonicalUrl = `${siteUrl}/associates/${partner.slug}`;
  const productNames = partner.products.join(", ");
  const industryNames = industryLinks.map((industry) => industry.name).join(", ");

  const faq = [
    [`Which ${partner.name} products can I enquire about through Vikranth?`, `Current enquiry categories include ${productNames}. Exact catalogue, grade, pack size and commercial availability are confirmed against the current supplier information before quotation.`],
    [`Which applications use ${partner.name} ingredients?`, `The listed range is relevant to ${industryNames || "professional food production"}. Product suitability depends on the selected grade, formulation, process and finished-product target.`],
    [`Can I request ${partner.name} specifications, COA or samples?`, `Specifications, certificate of analysis and sample availability can be requested for a named product. Availability depends on the product, grade, manufacturer documentation and trial quantity.`],
    [`Are ${partner.name} products available for bulk supply in Chennai and across India?`, `Vikranth accepts B2B enquiries from Chennai and other Indian locations. Stock, minimum quantity, pack size, freight, lead time and delivery coverage are confirmed before quotation.`],
    [`What details are needed for a ${partner.name} product quotation?`, `Share the exact product, application, preferred grade, required quantity, delivery city, timeline and documents needed. This helps the team check the most relevant available option.`],
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: titleForSchema(partner.name),
      description: `A Vikranth enquiry page for ${partner.name} ingredient products, applications, documents and B2B supply coordination.`,
      about: { "@type": "Organization", name: partner.name },
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${partner.name} ingredient enquiry and supply coordination`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: [{ "@type": "City", name: "Chennai" }, { "@type": "Country", name: "India" }],
      serviceType: "B2B food ingredient sourcing",
      url: canonicalUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "Brand",
      name: partner.name,
      description: partner.summary,
      url: canonicalUrl,
      logo: partner.logo ? `${siteUrl}${partner.logo}` : `${siteUrl}/logo-vikranth.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${partner.name} ingredient products`,
      itemListElement: productLinks.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name, url: `${siteUrl}/products/${product.slug}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Ingredient Partners", item: `${siteUrl}/associates` },
        { "@type": "ListItem", position: 3, name: partner.name, item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
    },
  ];

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <DetailHeader />
      <section className={`${styles.hero} ${styles.partnerHero}`}>
        <img className={styles.heroImage} src={partner.image} alt={`${partner.name} ingredient applications`} />
        <div className={styles.heroCopy}>
          <div className={styles.crumbs}><Link href="/">Home</Link><span>/</span><Link href="/associates">Associates</Link><span>/</span><span>{partner.name}</span></div>
          <small>Partner ingredient solutions</small>
          <h1>{partner.name}<br />Food Ingredients<br />in Chennai</h1>
          <p>Explore {partner.name} ingredient options through Vikranth Chemical Corporation. Share your application, required product or grade, quantity, delivery city and document needs.</p>
          <div className={styles.heroActions}><Link href="#partner-products">View relevant products →</Link><Link href="/contact#enquiry">Request a quote</Link></div>
          {partner.logo && <div className={styles.partnerLogo}><img src={partner.logo} alt={`${partner.name} logo`} /></div>}
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.facts}><div><small>Location</small><b>Chennai, India</b></div><div><small>Selection</small><b>Application-led</b></div><div><small>Supply</small><b>Subject to confirmation</b></div><div><small>Documents</small><b>On request</b></div></section>
        <section className={styles.answer}><div className={styles.answerIcon}>◎</div><div><h2>About {partner.name}</h2><p>{partner.about}</p></div></section>

        <h2 className={styles.sectionTitle} id="partner-products">{partner.name} products available for enquiry</h2>
        <section className={styles.productGrid}>{productLinks.map((product) => <Link className={styles.productCard} href={`/products/${product.slug}`} key={product.slug}><img src={partner.productImages?.[product.name] || product.image} alt={`${partner.name} ${product.name}`} /><div><h3>{product.name}</h3><p>View product details →</p></div></Link>)}</section>

        <h2 className={styles.sectionTitle}>Applications for {partner.name} ingredients</h2>
        <section className={styles.benefits}>{industryLinks.slice(0, 5).map((industry, index) => <Link className={styles.linkTile} href={`/industries/${industry.slug}`} key={industry.slug}><span>0{index + 1}</span><strong>{industry.name}</strong></Link>)}</section>

        <section className={styles.split}><img src={partner.image} alt={`${partner.name} food ingredient supply enquiry`} style={{ width: "100%", height: "100%", minHeight: 300, objectFit: "cover", borderRadius: 12 }} /><div className={styles.panel}><small className={styles.eyebrow}>Chennai and Pan-India enquiries</small><h2>Product matching and sourcing support</h2><p>Ask Vikranth to confirm the current range, grade, pack size, documents, sample availability, order quantity, lead time and delivery coverage for your location.</p><Link className={styles.primary} href="/contact#enquiry">Request products or documents →</Link></div></section>

        <section className={styles.faq}><h2 className={styles.sectionTitle}>Frequently asked questions about {partner.name}</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      </div>
      <PageCta title={`Need help with a ${partner.name} ingredient?`} product={partner.name} />
      <DetailFooter />
    </main>
  );
}

function titleForSchema(partnerName) {
  return `${partnerName} Food Ingredients through Vikranth Chennai`;
}

