import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import DetailHeaderClient from "./DetailHeaderClient";
import { WHATSAPP_NUMBERS } from "../data/whatsapp";
import styles from "./detail.module.css";

export function DetailHeader() {
  return <DetailHeaderClient/>;
}

export function DetailFooter() {
  return <>
    <section className={styles.contactStrip}>
      <div><span>Start your ingredient enquiry</span><h2>Vikranth Chemical Corporation</h2></div>
      <a href="tel:+918754442924"><Phone/><span><small>Phone</small><b>+91 87544 42924</b></span></a>
      <a href="mailto:vikranth.chemicals@gmail.com"><Mail/><span><small>Email</small><b>vikranth.chemicals@gmail.com</b></span></a>
      <a href="https://www.google.com/maps/search/?api=1&query=Vikranth+Chemical+Corporation+Chennai"><MapPin/><span><small>Location</small><b>Kolathur, Chennai 600099</b></span></a>
    </section>
    <footer className={styles.footer}>
      <div><Image src="/logo-vikranth.webp" width={160} height={62} alt="Vikranth Chemical Corporation"/><p>Vikranth Chemical Corporation supplies bakery, chocolate, dairy, beverage and specialty food ingredients to manufacturers and professional buyers from Chennai, India.</p></div>
      <div><b>Explore</b><Link href="/#about">About</Link><Link href="/products">Products</Link><Link href="/industries">Industries</Link><Link href="/associates">Suppliers</Link><Link href="/#insights">Resources</Link><Link href="/brochure">Brochure</Link><Link href="/contact">Contact</Link></div>
      <div><b>Product families</b><Link href="/industries/bakery-ingredients">Bakery Ingredients</Link><Link href="/industries/chocolate-confectionery">Chocolate & Confectionery</Link><Link href="/industries/dairy-ingredients">Dairy Ingredients</Link><Link href="/industries/beverage-ingredients">Beverage Ingredients</Link><Link href="/industries/ice-cream-ingredients">Ice Cream Ingredients</Link></div>
      <div className={styles.footerContact}><b>Contact</b><a className={styles.footerContactNumber} href={"https://wa.me/" + WHATSAPP_NUMBERS.general} target="_blank" rel="noreferrer"><strong>General Enquiries</strong><span>+91 87544 42924</span></a><a className={styles.footerContactNumber} href={"https://wa.me/" + WHATSAPP_NUMBERS.anchor} target="_blank" rel="noreferrer"><strong>Anchor Products</strong><span>+91 87544 29922</span></a><a className={styles.footerContactNumber} href={"https://wa.me/" + WHATSAPP_NUMBERS.delta} target="_blank" rel="noreferrer"><strong>Delta Nutritives</strong><span>+91 98410 68559</span></a><a href="mailto:vikranth.chemicals@gmail.com">vikranth.chemicals@gmail.com</a><p>Saraswathy Enclave, Lakshmipuram, Kolathur, Chennai - 600099.</p><p>GSTIN: 33AADFV9327N1ZO</p></div>
      <div className={styles.footerBottom}>© 2026 Vikranth Chemical Corporation · <Link href="/site-map">Sitemap</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></div>
    </footer>
  </>;
}

export function PageCta({ title, product }) {
  return <section className={styles.finalCta}><div><small>Final enquiry</small><h2>{title}</h2><p>Share your application, required grade, quantity and documentation needs.</p></div><div><Link href={`/contact/?product=${encodeURIComponent(product)}#enquiry`}>Request a Quote →</Link><Link href={`/contact/?sample=${encodeURIComponent(product)}#enquiry`}>Ask for a Sample</Link></div></section>;
}

export { styles };
