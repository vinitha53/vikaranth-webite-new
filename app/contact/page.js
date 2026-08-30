import { ArrowRight, Building2, MapPin } from "lucide-react";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import ContactJourney from "./ContactJourney";
import ContactScrollEffects from "./ContactScrollEffects";
import CoreSeoContent from "../components/CoreSeoContent";
import { coreContent } from "../data/core-content";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Vikranth Chemical Corporation | Chennai",
  description: "Contact Vikranth in Chennai for food ingredient quotations, samples, product documents, bulk requirements and delivery enquiries.",
  alternates: { canonical: "/contact/" },
};

const directions = "https://www.google.com/maps/search/?api=1&query=Plot+No+2+Sri+Sai+Ram+Street+Jyothi+Nagar+Ponnimmanmedu+Chennai+600110";

export default function ContactPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "ContactPage", "@id": "https://www.vikranthchemicalcorporation.com/contact/#webpage", url: "https://www.vikranthchemicalcorporation.com/contact/", name: "Contact Vikranth for a Food Ingredient Quotation", description: metadata.description, about: { "@id": "https://www.vikranthchemicalcorporation.com/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.vikranthchemicalcorporation.com/" }, { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.vikranthchemicalcorporation.com/contact/" }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: coreContent.contact.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ContactScrollEffects />
      <DetailHeader />
      <ContactJourney />

      <section className={styles.officeSection} id="offices" data-contact-offices>
        <div className={styles.officeHeading} data-contact-office-heading><span className={styles.eyebrow}>Visit or write to us</span><h2>Our Chennai offices</h2></div>
        <div className={styles.officeGrid}>
          <article data-contact-office-card><Building2/><small>Sales office</small><h3>Vikranth Chemical Corporation</h3><p>Plot No. 2, Sri Sai Ram Street, 1st Floor, Jyothi Nagar, Ponnimmanmedu, Chennai 600110.</p><a href={directions} target="_blank" rel="noreferrer"><MapPin className={styles.directionPin} aria-hidden="true" />Get directions <ArrowRight className={styles.directionArrow} /></a></article>
          <article data-contact-office-card><MapPin/><small>Corporate enquiry address</small><h3>Saraswathy Enclave</h3><p>Perambur-Redhills High Road, Secretariat Colony Main Road, Lakshmipuram, Kolathur, Chennai 600099.</p><a href="https://www.google.com/maps/search/?api=1&query=Saraswathy+Enclave+Lakshmipuram+Kolathur+Chennai+600099" target="_blank" rel="noreferrer"><MapPin className={styles.directionPin} aria-hidden="true" />Get directions <ArrowRight className={styles.directionArrow} /></a></article>
        </div>
      </section>
      <CoreSeoContent content={coreContent.contact} />
      <DetailFooter />
    </main>
  );
}
