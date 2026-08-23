import Link from "next/link";
import { ArrowRight, Download, FileCheck2 } from "lucide-react";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import CoreSeoContent from "../components/CoreSeoContent";
import { coreContent } from "../data/core-content";
import ContactBrochureFlipbook from "../contact/ContactBrochureFlipbook";
import styles from "./brochure.module.css";

export const metadata = {
  title: "Food Ingredient Product Brochure | Vikranth Chennai",
  description: "View or download Vikranth's food ingredient brochure, then request current availability, product documents and a B2B quotation.",
  alternates: { canonical: "/brochure/" },
  robots: { index: true, follow: true },
};

export default function BrochurePage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://www.vikranthchem.com/brochure/#webpage", url: "https://www.vikranthchem.com/brochure/", name: "Vikranth Food Ingredient Product Brochure", description: metadata.description, about: { "@id": "https://www.vikranthchem.com/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.vikranthchem.com/" }, { "@type": "ListItem", position: 2, name: "Brochure", item: "https://www.vikranthchem.com/brochure/" }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: coreContent.brochure.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <DetailHeader />
    <section className={styles.intro}>
      <div><span>Food ingredient portfolio · Chennai</span><h1>Vikranth Food Ingredient Product Brochure</h1><p>Explore ingredient categories and portfolio information, then confirm the exact product, manufacturer, grade, documents, quantity and commercial terms before purchase.</p><div className={styles.actions}><a href="/brochures/vcc-product-brochure.pdf" download><Download/>Download brochure PDF</a><Link href="/contact/#enquiry"><FileCheck2/>Request current availability</Link></div></div>
      <aside><small>Brochure file reviewed</small><strong>18 August 2026</strong><p>GSTIN 33AADFV9327N1ZO</p></aside>
    </section>
    <section className={styles.viewerWrap} aria-label="Interactive food ingredient brochure"><ContactBrochureFlipbook standalone /></section>
    <CoreSeoContent content={coreContent.brochure}/>
    <section className={styles.finalCta}><div><span>Need a current product check?</span><h2>Request availability for the exact ingredient and grade.</h2></div><Link href="/contact/#enquiry">Start an enquiry <ArrowRight/></Link></section>
    <DetailFooter />
  </main>;
}
