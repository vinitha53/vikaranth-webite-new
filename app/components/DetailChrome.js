import Link from "next/link";
import { business } from "../data/business";
import Image from "next/image";
import DetailHeaderClient from "./DetailHeaderClient";
import { WHATSAPP_NUMBERS } from "../data/whatsapp";
import { industries } from "../data/catalog";
import styles from "./detail.module.css";

export function DetailHeader() {
  return <DetailHeaderClient/>;
}

export function DetailFooter() {
  return <>

    <footer className={styles.footer}>
      <div><Image src="/logo-vikranth.webp" width={156} height={73} alt="Vikranth Chemical Corporation"/><p>{business.description}</p></div>
      <div><b>Explore</b><Link href="/about/">About</Link><Link href="/products">Products</Link><Link href="/industries">Industries</Link><Link href="/associates">Suppliers</Link><Link href="/faq/">Resources</Link><Link href="/brochure">Brochure</Link><Link href="/contact">Contact</Link></div>
      <div><b>Industries</b>{industries.map((industry) => <Link key={industry.slug} href={`/industries/${industry.slug}`}>{industry.name}</Link>)}</div>
      <div className={styles.footerContact}><b>Contact</b><a className={styles.footerContactNumber} href={"https://wa.me/" + WHATSAPP_NUMBERS.general} target="_blank" rel="noreferrer"><strong>General Enquiry</strong><span>+91 98409 92985</span></a><a className={styles.footerContactNumber} href={"https://wa.me/" + WHATSAPP_NUMBERS.anchor} target="_blank" rel="noreferrer"><strong>Anchor</strong><span>+91 87544 29922</span></a><a className={styles.footerContactNumber} href={"https://wa.me/" + WHATSAPP_NUMBERS.delta} target="_blank" rel="noreferrer"><strong>Delta</strong><span>+91 98410 68559</span></a><a className={styles.footerContactNumber} href={"https://wa.me/" + WHATSAPP_NUMBERS.supplierBrands} target="_blank" rel="noreferrer"><strong>Campco, Roquette, Nitta Gelatin, Fine Organics, CP Kelco, Calpro</strong><span>+91 87544 42924</span></a><a href="mailto:vikranth.chemicals@gmail.com">vikranth.chemicals@gmail.com</a><p>GSTIN: 33AADFV9327N1ZO</p></div>
      <div className={styles.footerBottom}>© 2026 Vikranth Chemical Corporation · <Link href="/site-map">Sitemap</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></div>
    </footer>
  </>;
}

export function PageCta({ title, copy = "Share your application, required grade, quantity and documentation needs.", product = "Food ingredients" }) {
  return <section className={styles.finalCta}><div><small>Final enquiry</small><h2>{title}</h2><p>{copy}</p></div><div><Link href={`/contact/?product=${encodeURIComponent(product)}#enquiry`}>Send Your Requirement →</Link><Link href={`/contact/?sample=${encodeURIComponent(product)}#enquiry`}>Ask for a Sample</Link></div></section>;
}
export { styles };
