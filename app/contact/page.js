import Link from "next/link";
import { ArrowRight, Building2, Download, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Vikranth Chemical Corporation | Chennai",
  description: "Contact Vikranth Chemical Corporation in Chennai for food ingredient quotations, samples, product documents and supply enquiries. View or download the VCC product brochure.",
  alternates: { canonical: "/contact/" },
};

const directions = "https://www.google.com/maps/search/?api=1&query=Plot+No+2+Sri+Sai+Ram+Street+Jyothi+Nagar+Ponnimmanmedu+Chennai+600110";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <DetailHeader />
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <div className={styles.breadcrumbs}><Link href="/">Home</Link><span>/</span><span>Contact</span></div>
          <span className={styles.eyebrow}>Let&apos;s talk ingredients</span>
          <h1>We&apos;d love to<br/><em>hear from you.</em></h1>
          <p>Speak with the Vikranth team about product availability, application fit, samples, documentation, quantities and delivery across India.</p>
          <div className={styles.heroActions}>
            <a href="#enquiry">Send an enquiry <ArrowRight /></a>
            <a href="https://wa.me/918754442924" target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactIntro}>
          <span className={styles.eyebrow}>Get in touch</span>
          <h2>A direct route to the right ingredient conversation.</h2>
          <p>For faster support, include the ingredient or application, required grade, estimated quantity, delivery city and documents needed.</p>
          <div className={styles.contactCards}>
            <a href="tel:+918754442924"><Phone/><span><small>Call our team</small><b>+91 87544 42924</b><b>+91 97909 20252</b></span></a>
            <a href="mailto:vikranth.chemicals@gmail.com"><Mail/><span><small>General enquiries</small><b>vikranth.chemicals@gmail.com</b></span></a>
            <a href="mailto:vikranthsales22@gmail.com"><Mail/><span><small>Sales enquiries</small><b>vikranthsales22@gmail.com</b></span></a>
          </div>
        </div>
        <ContactForm />
      </section>

      <section className={styles.brochureSection}>
        <div className={styles.brochureCopy}>
          <span className={styles.eyebrow}>Company brochure</span>
          <h2>Explore the VCC ingredient portfolio.</h2>
          <p>Browse four pages covering our principal brands, industries served, Anchor products and food additive categories.</p>
          <div className={styles.brochureActions}>
            <Link href="/brochure">View brochure <ArrowRight /></Link>
            <a href="/brochures/vcc-product-brochure.pdf" download>Download PDF <Download /></a>
          </div>
        </div>
        <Link className={styles.brochureCover} href="/brochure" aria-label="View the VCC product brochure">
          <img src="/brochures/vcc-brochure-cover.png" alt="Cover of the Vikranth Chemical Corporation product brochure" />
          <span>View all 4 pages <ArrowRight /></span>
        </Link>
      </section>

      <section className={styles.officeSection}>
        <div className={styles.officeHeading}><span className={styles.eyebrow}>Visit or write to us</span><h2>Our Chennai offices</h2></div>
        <div className={styles.officeGrid}>
          <article><Building2/><small>Sales office</small><h3>Vikranth Chemical Corporation</h3><p>Plot No. 2, Sri Sai Ram Street, 1st Floor, Jyothi Nagar, Ponnimmanmedu, Chennai 600110.</p><a href={directions} target="_blank" rel="noreferrer">Get directions <ArrowRight /></a></article>
          <article><MapPin/><small>Corporate enquiry address</small><h3>Saraswathy Enclave</h3><p>Perambur-Redhills High Road, Secretariat Colony Main Road, Lakshmipuram, Kolathur, Chennai 600099.</p><a href="https://www.google.com/maps/search/?api=1&query=Saraswathy+Enclave+Lakshmipuram+Kolathur+Chennai+600099" target="_blank" rel="noreferrer">Get directions <ArrowRight /></a></article>
        </div>
      </section>
      <DetailFooter />
    </main>
  );
}