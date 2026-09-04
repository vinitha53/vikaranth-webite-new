import ContactFormPushAnimation from "./ContactFormPushAnimation";
import WhatsAppContactCta from "./WhatsAppContactCta";
import BrochureContactCta from "./BrochureContactCta";
import styles from "./contact.module.css";

export default function ContactJourney() {
  return (
    <section className={styles.contactJourney}>
      <div className={styles.journeySectionHeading}>
        <span>Contact Vikranth</span>
        <h1>Contact a Food Ingredients Supplier in Chennai</h1>
        <p>Request food ingredient availability, pricing and delivery support for Chennai, South India and pan-India requirements.</p>
        <i aria-hidden="true" />
      </div>

      <ContactFormPushAnimation />

      <WhatsAppContactCta />
      <BrochureContactCta />
    </section>
  );
}
