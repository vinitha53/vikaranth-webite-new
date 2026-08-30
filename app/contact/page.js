import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, MapPin, PackageSearch, Truck } from "lucide-react";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import ContactJourney from "./ContactJourney";
import ContactScrollEffects from "./ContactScrollEffects";
import CoreSeoContent from "../components/CoreSeoContent";
import { coreContent } from "../data/core-content";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Food Ingredients Supplier Chennai | Vikranth",
  description: "Contact Vikranth for bakery, chocolate, dairy, beverage and specialty food ingredient enquiries in Chennai, South India and across India.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact a Food Ingredients Supplier in Chennai",
    description: "Request food ingredient pricing, availability and delivery support from Vikranth Chemical Corporation.",
    url: "/contact/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact a Food Ingredients Supplier in Chennai",
    description: "Request food ingredient pricing, availability and delivery support from Vikranth Chemical Corporation.",
  },
  robots: { index: true, follow: true },
};

const directions = "https://www.google.com/maps/search/?api=1&query=Plot+No+2+Sri+Sai+Ram+Street+Jyothi+Nagar+Ponnimmanmedu+Chennai+600110";

export default function ContactPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "ContactPage", "@id": "https://www.vikranthchemicalcorporation.com/contact/#webpage", url: "https://www.vikranthchemicalcorporation.com/contact/", name: "Contact a Food Ingredients Supplier in Chennai", description: metadata.description, about: { "@id": "https://www.vikranthchemicalcorporation.com/#organization" }, inLanguage: "en-IN" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.vikranthchemicalcorporation.com/" }, { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.vikranthchemicalcorporation.com/contact/" }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: coreContent.contact.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    { "@context": "https://schema.org", "@type": "Service", "@id": "https://www.vikranthchemicalcorporation.com/contact/#food-ingredient-enquiries", name: "B2B food ingredient supply enquiries", serviceType: "Food ingredient quotation, availability and delivery support", provider: { "@id": "https://www.vikranthchemicalcorporation.com/#organization" }, areaServed: [{ "@type": "City", name: "Chennai" }, { "@type": "AdministrativeArea", name: "Tamil Nadu" }, { "@type": "Country", name: "India" }], url: "https://www.vikranthchemicalcorporation.com/contact/" },
  ];
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ContactScrollEffects />
      <DetailHeader />
      <ContactJourney />

      <section className={styles.searchIntentSection} aria-labelledby="food-ingredient-contact-heading">
        <div className={styles.searchIntentIntro}>
          <span className={styles.eyebrow}>B2B ingredient enquiries</span>
          <h2 id="food-ingredient-contact-heading">Food ingredient supply support from Chennai</h2>
          <p><strong>Vikranth Chemical Corporation is a Chennai-based food ingredients supplier and distributor</strong> supporting bakery, chocolate and confectionery, dairy, beverage, ice cream, fruit processing and other food manufacturing requirements. Buyers can enquire about supply to Chennai, Tamil Nadu, South India and other serviceable locations across India.</p>
          <div className={styles.searchIntentLinks}>
            <Link href="/products/">Browse ingredients <ArrowRight aria-hidden="true" /></Link>
            <Link href="/industries/">Choose by industry <ArrowRight aria-hidden="true" /></Link>
            <Link href="/suppliers/">View suppliers <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className={styles.enquiryGuide}>
          <span><PackageSearch aria-hidden="true" /></span>
          <div><small>For a useful response</small><h3>Tell us exactly what you need</h3></div>
          <ul>
            <li><CheckCircle2 aria-hidden="true" />Ingredient, application or required specification</li>
            <li><CheckCircle2 aria-hidden="true" />Quantity, preferred pack size and delivery PIN code</li>
            <li><CheckCircle2 aria-hidden="true" />Required date and any COA, TDS, SDS or sample request</li>
          </ul>
          <p><Truck aria-hidden="true" />Product availability and delivery serviceability are confirmed for each enquiry.</p>
        </div>
      </section>

      <section className={styles.officeSection} id="offices" data-contact-offices>
        <div className={styles.officeHeading} data-contact-office-heading><span className={styles.eyebrow}>Visit or write to us</span><h2>Our Chennai office</h2></div>
        <div className={styles.officeGrid}>
          <article data-contact-office-card><Building2/><small>Sales office</small><h3>Vikranth Chemical Corporation</h3><p>Plot No. 2, Sri Sai Ram Street, 1st Floor, Jyothi Nagar, Ponnimmanmedu, Chennai 600110.</p><a href={directions} target="_blank" rel="noreferrer"><MapPin className={styles.directionPin} aria-hidden="true" />Get directions <ArrowRight className={styles.directionArrow} /></a></article>
        </div>
      </section>
      <CoreSeoContent content={coreContent.contact} hideOverview hideProcess />
      <DetailFooter />
    </main>
  );
}
