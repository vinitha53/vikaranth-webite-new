import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, getIndustry } from "../../data/catalog";
import { partnersForProduct } from "../../data/partners";
import { DetailHeader, DetailFooter, PageCta, styles } from "../../components/DetailChrome";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name} Supplier in Chennai | Vikranth Chemical Corporation`, description: `Source ${product.name} in Chennai for professional food production. Request current grades, pack sizes, documents, sample availability and a bulk quotation.` };
}

export default async function ProductPage({ params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const industry = getIndustry(product.industrySlug);
  const related = products.filter((item) => item.industrySlug === product.industrySlug && item.slug !== product.slug).slice(0, 4);
  const relatedPartners = partnersForProduct(product.name);
  const benefits = ["Repeatable production", "Application-fit selection", "Reliable sourcing", "Document support", "Responsive quotations"];
  const checks = ["Finished product and process", "Required grade or brand", "Pack size and quantity", "Specification and COA", "Trial quantity and timeline"];
  const faq = [
    [`What is ${product.name} used for?`, `${product.name} is commonly evaluated for ${industry.name.toLowerCase()} and related professional food applications. Final suitability depends on the selected grade, recipe, process and formulation trials.`],
    [`Can I buy ${product.name} in bulk in Chennai?`, "Ask Vikranth Chemical Corporation to confirm current pack sizes, minimum quantity, stock, lead time and delivery coverage for your Chennai location."],
    [`Can I request a ${product.name} sample?`, "State your application and trial quantity when enquiring. Sample availability depends on the product and manufacturer."],
    ["What documents are available?", "Specifications, COA, allergen, regulatory and certification documents can be requested subject to supplier availability."],
    ["What information is needed for a quotation?", "Share your application, required grade, quantity, delivery location, timeline and documentation requirements."]
  ];
  const schema = { "@context":"https://schema.org", "@type":"Product", name:product.name, description:product.description, brand:{"@type":"Brand",name:"Vikranth Chemical Corporation"}, category:product.category };
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <DetailHeader/>
    <section className={styles.hero}><img className={styles.heroImage} src="/detail-assets/product-detail-hero.webp" alt={`${product.name} food ingredient supplied in Chennai`}/><div className={styles.heroCopy}><div className={styles.crumbs}><Link href="/">Home</Link><span>/</span><Link href="/#products">Products</Link><span>/</span><span>{product.name}</span></div><small>{product.category}</small><h1>{product.name}</h1><p>{product.summary}. Application suitability and availability are confirmed against your production requirements.</p><div className={styles.heroActions}><Link href={`/?product=${encodeURIComponent(product.name)}#contact`}>Request a Quote →</Link><Link href={`/?sample=${encodeURIComponent(product.name)}#contact`}>Ask for a Sample</Link></div></div></section>
    <div className={styles.content}>
      <section className={styles.facts}><div><small>Category</small><b>{product.category}</b></div><div><small>Applications</small><b>Professional food production</b></div><div><small>Supply</small><b>Chennai</b></div><div><small>Documentation</small><b>On request</b></div></section>
      <section className={styles.answer}><div className={styles.answerIcon}>◎</div><div><h2>What is {product.name}?</h2><p>{product.description} Suitability depends on the grade, recipe, processing conditions, finished-product target and applicable food regulations; validate the selected product in your own process.</p></div></section>
      <h2 className={styles.sectionTitle}>Benefits and formulation role</h2><section className={styles.benefits}>{benefits.map((item,i)=><article key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong></article>)}</section>
      <h2 className={styles.sectionTitle}>What to confirm before ordering</h2><section className={styles.checklist}>{checks.map((item,i)=><article key={item}><span>0{i+1}</span><strong>{item}</strong></article>)}</section>
      <section className={styles.split}><div className={styles.panel}><h3>Specifications</h3><ul><li>Grade: confirm availability</li><li>Pack size: confirm availability</li><li>Specification: available on request</li><li>COA: available on request</li></ul></div><div className={styles.panel}><h3>Documents & sample support</h3><ul><li>Product specification sheet</li><li>COA request</li><li>Handling and storage guidance</li><li>Sample availability</li></ul></div></section>
      <h2 className={styles.sectionTitle}>{product.name} supply in Chennai</h2><section className={styles.panel}><p>A local supply conversation can simplify product matching, document collection, sampling and replenishment planning. Vikranth can help compare available grades or brands, confirm pack and stock status, and coordinate a quotation for Chennai and verified service areas.</p></section>
      <h2 className={styles.sectionTitle}>Related products</h2><section className={styles.productGrid}>{related.map(item=><Link className={styles.productCard} href={`/products/${item.slug}`} key={item.slug}><img src={item.image} alt=""/><div><h3>{item.name}</h3><p>View product →</p></div></Link>)}</section>
      {relatedPartners.length>0&&<><h2 className={styles.sectionTitle}>Related suppliers and partners</h2><section className={styles.partnerGrid}>{relatedPartners.map(partner=><Link className={styles.partnerTile} href={`/associates/${partner.slug}`} key={partner.slug}><div>{partner.logo?<img src={partner.logo} alt=""/>:<b>Anchor</b>}</div><h2>{partner.name}</h2><span>View partner →</span></Link>)}</section></>}
      <section className={styles.faq}><h2 className={styles.sectionTitle}>Frequently asked questions</h2>{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    </div>
    <PageCta title={`Need the right ${product.name} option?`} product={product.name}/><DetailFooter/>
  </main>;
}
