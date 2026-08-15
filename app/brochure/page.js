import Link from "next/link";
import Image from "next/image";
import ContactBrochureFlipbook from "../contact/ContactBrochureFlipbook";
import styles from "./brochure.module.css";

export const metadata = {
  title: "VCC Product Brochure | Vikranth Chemical Corporation",
  description: "Explore the Vikranth Chemical Corporation food ingredients and principal brands brochure in an interactive flipbook.",
  alternates: { canonical: "/brochure/" },
};

export default function BrochurePage() {
  return (
    <main className={styles.page}>
      <Link className={styles.homeLogo} href="/" aria-label="Return to Vikranth Chemical Corporation home page">
        <Image src="/logo-vikranth.png" width={92} height={42} priority alt="Vikranth Chemical Corporation" />
        <span>Home</span>
      </Link>
      <h1 className={styles.srOnly}>Vikranth Chemical Corporation interactive product brochure</h1>
      <section className={styles.viewerWrap} aria-label="Full-page brochure viewer">
        <ContactBrochureFlipbook standalone />
      </section>
    </main>
  );
}
