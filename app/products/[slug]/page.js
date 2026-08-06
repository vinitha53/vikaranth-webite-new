import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, MapPin, MessageCircle, Phone } from "lucide-react";
import { products, getProduct, getIndustry } from "../../data/catalog";
import { DetailHeader, DetailFooter } from "../../components/DetailChrome";
import ProductQuoteForm from "../../components/ProductQuoteForm";
import { buildProductFaqs } from "../../data/product-faqs";
import styles from "./product-landing.module.css";

const siteUrl = "https://www.vikranthchem.com";

const applicationsByIndustry = {
  "bakery-ingredients": ["Commercial cakes and sponges", "Bread and baked goods", "Bakery fillings and desserts", "Industrial bakery production"],
  "chocolate-confectionery": ["Chocolate and confectionery", "Cakes and bakery products", "Desserts and fillings", "Professional food production"],
  "dairy-ingredients": ["Dairy formulations", "Cakes and desserts", "Beverage applications", "Professional food production"],
  "beverage-ingredients": ["Hot and cold beverages", "Flavoured drinks", "Food-service beverages", "Commercial beverage production"],
  "ice-cream-ingredients": ["Ice cream and gelato", "Frozen yogurt products", "Frozen desserts", "Food-service desserts"],
  "fruit-processing": ["Fruit preparations", "Bakery and dessert fillings", "Beverages and dairy products", "Commercial food processing"],
  "hydrocolloids-stabilizers": ["Texture and viscosity control", "Product stabilization", "Moisture and suspension systems", "Commercial food formulations"],
  "sweeteners-syrups-starches": ["Bakery and confectionery", "Beverages and desserts", "Body and solids adjustment", "Commercial food processing"],
  "functional-ingredients": ["Texture and structure", "Emulsification and stability", "Protein and nutrition systems", "Commercial food production"],
  "nutraceutical-pharma": ["Nutraceutical formulations", "Wellness and nutrition products", "Protein and mineral systems", "Professional product development"],
  "food-additives-preservatives": ["Shelf-life management", "Acidity and process control", "Bakery and beverage production", "Commercial food manufacturing"],
};

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const product = getProduct((await params).slug);
  if (!product) return {};

  const title = `${product.name} Supplier in Chennai | Vikranth`;
  const description = `Buy ${product.name} from a B2B food ingredients supplier in Chennai. Enquire for available grades, pack sizes, samples, documents and bulk pricing.`;
  const canonical = `/products/${product.slug}`;

  return {
    title,
    description,
    keywords: [
      `${product.name} supplier in Chennai`,
      `${product.name} distributor Chennai`,
      `buy ${product.name} in Chennai`,
      `bulk ${product.name} supplier`,
      `${product.name} B2B supplier India`,
      `${product.category} supplier Chennai`,
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Vikranth Chemical Corporation",
      locale: "en_IN",
      images: [{ url: product.image, alt: `${product.name} supplied in Chennai` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [product.image] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    other: {
      "geo.region": "IN-TN",
      "geo.placename": "Chennai",    },
  };
}

export default async function ProductPage({ params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const industry = getIndustry(product.industrySlug);
  const applications = applicationsByIndustry[product.industrySlug] || ["Professional food production", "Product formulation", "Process development", "Commercial manufacturing"];
  const faq = buildProductFaqs(product, industry, applications);
  const canonicalUrl = `${siteUrl}/products/${product.slug}`;
  const description = `${product.name} for ${industry.name.toLowerCase()} and professional food production. Vikranth Chemical Corporation supports B2B enquiries from Chennai for available grades, pack sizes, samples, documents and bulk quotations.`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      name: product.name,
      image: `${siteUrl}${product.image}`,
      description,
      category: product.category,
      sku: product.slug,
      url: canonicalUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
        { "@type": "ListItem", position: 3, name: product.name, item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: `${product.name} Supplier in Chennai`,
      description,
      about: { "@id": `${canonicalUrl}#product` },
      isPartOf: { "@id": `${siteUrl}/#website` },
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faq.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    },
  ];

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <DetailHeader />

      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span>{product.name}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{product.category}</span>
              <h1>{product.name} supplier in Chennai</h1>
              <p>{product.name} for {industry.name.toLowerCase()} and professional food production. Tell us your application, required grade and quantity so our B2B team can confirm a suitable available option.</p>
              <div className={styles.actions}>
                <a className={styles.whatsappButton} href={`https://wa.me/918754442924?text=${encodeURIComponent(`Hi, I need a quotation for ${product.name}.`)}`} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp for price</a>
                <a className={styles.callButton} href="tel:+918754442924"><Phone /> Call +91 87544 42924</a>
              </div>
              <div className={styles.trust}><span><BadgeCheck /> B2B ingredient supply</span><span><MapPin /> Chennai, Tamil Nadu</span></div>
            </div>
            <div className={styles.productVisual}>
              <img src={product.image} alt={`${product.name} food ingredient supplied by Vikranth in Chennai`} />
              <span>Bulk enquiry</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.facts} aria-labelledby="quick-details">
        <div className={styles.wrap}>
          <h2 id="quick-details">Quick details</h2>
          <div className={styles.factGrid}>
            <div><small>Product</small><strong>{product.name}</strong></div>
            <div><small>Category</small><strong>{product.category}</strong></div>
            <div><small>Pack & grade</small><strong>Confirm availability</strong></div>
            <div><small>Supply location</small><strong>Chennai, India</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.uses} aria-labelledby="uses-title">
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Application guidance</span>
          <h2 id="uses-title">Common uses of {product.name}</h2>
          <p className={styles.answer}>{product.description} Final suitability depends on the selected grade, recipe, process, dosage and finished-product requirements. Validate the ingredient in your own formulation.</p>
          <div className={styles.useList}>
            {applications.map((application) => <div key={application}><span /><strong>{application}</strong></div>)}
          </div>
        </div>
      </section>

      <section className={styles.steps} aria-labelledby="order-title">
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Simple B2B process</span>
          <h2 id="order-title">How to order {product.name}</h2>
          <div className={styles.stepList}>
            <article><span>1</span><p><strong>Send an enquiry</strong> on WhatsApp or use the quotation form below.</p></article>
            <article><span>2</span><p><strong>Share your application</strong>, preferred grade or brand, quantity and delivery city.</p></article>
            <article><span>3</span><p><strong>Review the available option</strong>, pack details, documents, sample status and lead time.</p></article>
            <article><span>4</span><p><strong>Confirm the quotation</strong> and coordinate your B2B order with our Chennai team.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Product questions</span>
          <h2 id="faq-title">Frequently asked questions about {product.name}</h2>
          <div className={styles.faqList}>
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.quoteSection} id="quote" aria-labelledby="quote-title">
        <div className={styles.wrap}>
          <div className={styles.quoteIntro}>
            <span className={styles.eyebrow}>Request a quotation</span>
            <h2 id="quote-title">Get {product.name} price and availability</h2>
            <p>Share your requirement and continue directly on WhatsApp. We can discuss the application, available grade, pack size, sample and supporting documents.</p>
            <ul><li><Check /> Bulk B2B requirements</li><li><Check /> Product specifications and COA on request</li><li><Check /> Sample availability subject to product and manufacturer</li></ul>
          </div>
          <ProductQuoteForm product={product.name} />
        </div>
      </section>

      <a className={styles.floatWhatsapp} href={`https://wa.me/918754442924?text=${encodeURIComponent(`Hi, I need a quotation for ${product.name}.`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${product.name} on WhatsApp`}><MessageCircle /></a>
      <DetailFooter />
    </main>
  );
}





