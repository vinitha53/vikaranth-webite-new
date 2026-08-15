import { ArrowRight, Building2, MapPin } from "lucide-react";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import ContactJourney from "./ContactJourney";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Vikranth Chemical Corporation | Chennai",
  description: "Contact Vikranth Chemical Corporation in Chennai for food ingredient quotations, samples, product documents and supply enquiries.",
  alternates: { canonical: "/contact/" },
};

const directions = "https://www.google.com/maps/search/?api=1&query=Plot+No+2+Sri+Sai+Ram+Street+Jyothi+Nagar+Ponnimmanmedu+Chennai+600110";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <DetailHeader />
      <ContactJourney />

      <section className={styles.officeSection} id="offices">
        <div className={styles.officeHeading}><span className={styles.eyebrow}>Visit or write to us</span><h2>Our Chennai offices</h2></div>
        <div className={styles.officeGrid}>
          <article><Building2/><small>Sales office</small><h3>Vikranth Chemical Corporation</h3><p>Plot No. 2, Sri Sai Ram Street, 1st Floor, Jyothi Nagar, Ponnimmanmedu, Chennai 600110.</p><a href={directions} target="_blank" rel="noreferrer"><MapPin className={styles.directionPin} aria-hidden="true" />Get directions <ArrowRight className={styles.directionArrow} /></a></article>
          <article><MapPin/><small>Corporate enquiry address</small><h3>Saraswathy Enclave</h3><p>Perambur-Redhills High Road, Secretariat Colony Main Road, Lakshmipuram, Kolathur, Chennai 600099.</p><a href="https://www.google.com/maps/search/?api=1&query=Saraswathy+Enclave+Lakshmipuram+Kolathur+Chennai+600099" target="_blank" rel="noreferrer"><MapPin className={styles.directionPin} aria-hidden="true" />Get directions <ArrowRight className={styles.directionArrow} /></a></article>
        </div>
      </section>
      <DetailFooter />
    </main>
  );
}
