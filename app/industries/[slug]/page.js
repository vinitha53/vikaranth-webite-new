import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, products, getIndustry, slugify } from "../../data/catalog";
import { partnersForIndustry } from "../../data/partners";
import { DetailHeader, DetailFooter, PageCta, styles } from "../../components/DetailChrome";

export function generateStaticParams(){return industries.map(({slug})=>({slug}));}
export async function generateMetadata({params}){const industry=getIndustry((await params).slug);if(!industry)return{};return{title:`${industry.name} Supplier Chennai | Vikranth Chemical Corporation`,description:`Ingredient solutions in Chennai for ${industry.name.toLowerCase()}. Explore relevant products, documentation support and bulk quotation options.`};}

export default async function IndustryPage({params}){
  const industry=getIndustry((await params).slug);if(!industry)notFound();
  const items=industry.products.map(name=>products.find(product=>product.slug===slugify(name))).filter(Boolean);
  const relatedPartners=partnersForIndustry(industry.slug);
  const applications=["Commercial production","Hotels & central kitchens","Manufacturing lines","Product development","Specialty formulations","Food-service operations"];
  const faq=[
    [`What are ${industry.name.toLowerCase()} used for?`,`${industry.name} support quality, texture, stability, flavour and production consistency across relevant finished-food applications.`],
    [`Can I buy ${industry.name.toLowerCase()} in bulk in Chennai?`,"Contact Vikranth to confirm current products, pack sizes, minimum quantities, stock status and delivery coverage."],
    ["Can I request product specifications or a sample?","Yes. State the product, application and trial quantity. Specific documents and samples remain subject to product and manufacturer availability."],
    ["Which ingredient is suitable for my application?","Share the finished product, process, target performance, required grade and timeline so the available options can be reviewed."]
  ];
  return <main className={styles.page}><DetailHeader/>
    <section className={styles.hero}><img className={styles.heroImage} src="/detail-assets/industry-detail-hero.webp" alt={`${industry.name} solutions for Chennai food businesses`}/><div className={styles.heroCopy}><div className={styles.crumbs}><Link href="/">Home</Link><span>/</span><Link href="/#industries">Industries</Link><span>/</span><span>{industry.name}</span></div><small>{industry.eyebrow}</small><h1>{industry.name}<br/>Solutions in Chennai</h1><p>{industry.summary}</p><div className={styles.heroActions}><Link href="#industry-products">Explore Products →</Link><Link href="/#contact">Request a Quote</Link></div></div></section>
    <div className={styles.content}><section className={styles.answer}><img src={industry.image} alt="" style={{width:120,height:100,objectFit:"cover",borderRadius:10}}/><div><h2>{industry.name.toLowerCase()} for consistent production</h2><p>{industry.summary} Vikranth supports businesses with product matching, documentation requests and commercial sourcing coordination.</p></div></section>
      <h2 className={styles.sectionTitle} id="industry-products">Explore {industry.name}</h2><section className={styles.productGrid}>{items.map(item=><Link className={styles.productCard} href={`/products/${item.slug}`} key={item.slug}><img src={item.image} alt=""/><div><h3>{item.name}</h3><p>View product →</p></div></Link>)}</section>
      <small className={styles.eyebrow}>Where our ingredients make a difference</small><h2 className={styles.sectionTitle}>Applications across {industry.name.toLowerCase()}</h2><section className={styles.benefits}>{applications.slice(0,5).map((item,i)=><article key={item}><span>0{i+1}</span><strong>{item}</strong></article>)}</section>
      <small className={styles.eyebrow}>Plan your purchase with confidence</small><h2 className={styles.sectionTitle}>Buyer checklist before sourcing</h2><section className={styles.checklist}>{["Finished product and process","Required grade or brand","Pack size and quantity","Specification and COA documents","Trial quantity and delivery timeline"].map((item,i)=><article key={item}><span>0{i+1}</span><strong>{item}</strong></article>)}</section>
      <section className={styles.split}><img src={industry.image} alt={`${industry.name} production application`} style={{width:"100%",height:"100%",minHeight:300,objectFit:"cover",borderRadius:12}}/><div className={styles.panel}><small className={styles.eyebrow}>Local presence, reliable supply</small><h2>{industry.name} supply in Chennai</h2><p>We understand the needs of Chennai food businesses. Our local supply network helps ensure timely availability and consistent quality ingredients, subject to verified stock and product requirements.</p><Link className={styles.primary} href="/#contact">Request a Quote →</Link></div></section>
      {relatedPartners.length>0&&<><h2 className={styles.sectionTitle}>Relevant suppliers and partners</h2><section className={styles.partnerGrid}>{relatedPartners.map(partner=><Link className={styles.partnerTile} href={`/associates/${partner.slug}`} key={partner.slug}><div>{partner.logo?<img src={partner.logo} alt=""/>:<b>Anchor</b>}</div><h2>{partner.name}</h2><span>Explore partner →</span></Link>)}</section></>}
      <section className={styles.faq}><h2 className={styles.sectionTitle}>Answers to common questions</h2>{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    </div><PageCta title={`Need help choosing a ${industry.name.toLowerCase()} product?`} product={industry.name}/><DetailFooter/>
  </main>;
}
