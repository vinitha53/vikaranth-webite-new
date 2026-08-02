import Link from "next/link";
import Image from "next/image";
import styles from "./detail.module.css";

export function DetailHeader() {
  return <><div className={styles.utility}><span>Serving businesses across India</span><span>B2B Food Ingredient Supplier</span><span>Chennai</span></div><header className={styles.header}><Link href="/"><Image src="/logo-vikranth.png" width={150} height={58} alt="Vikranth Chemical Corporation"/></Link><nav><Link href="/">Home</Link><Link href="/#about">About</Link><Link href="/products">Products</Link><Link href="/industries">Industries</Link><Link href="/associates">Suppliers</Link><Link href="/#contact">Contact</Link></nav><Link className={styles.quote} href="/#contact">Request a Quote →</Link></header></>;
}

export function DetailFooter() {
  return <footer className={styles.footer}><div><Image src="/logo-vikranth.png" width={145} height={56} alt="Vikranth Chemical Corporation"/><p>Trusted B2B ingredient sourcing and application-focused support for food businesses across India.</p></div><div><b>Quick links</b><Link href="/">Home</Link><Link href="/products">Products</Link><Link href="/industries">Industries</Link><Link href="/associates">Suppliers</Link><Link href="/#contact">Contact</Link></div><div><b>Support</b><Link href="/#contact">Request a Quote</Link><Link href="/#contact">Ask for a Sample</Link><Link href="/#quality">Documentation Support</Link></div></footer>;
}

export function PageCta({ title, product }) {
  return <section className={styles.finalCta}><div><small>Final enquiry</small><h2>{title}</h2><p>Share your application, required grade, quantity and documentation needs.</p></div><div><Link href={`/?product=${encodeURIComponent(product)}#contact`}>Request a Quote →</Link><Link href={`/?sample=${encodeURIComponent(product)}#contact`}>Ask for a Sample</Link></div></section>;
}

export { styles };
