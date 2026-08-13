import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import Flipbook from "./Flipbook";
import styles from "./brochure.module.css";

export const metadata = {
  title: "VCC Product Brochure | Vikranth Chemical Corporation",
  description: "Explore the Vikranth Chemical Corporation food ingredients and principal brands brochure in an interactive flipbook.",
  alternates: { canonical: "/brochure/" },
};

export default function BrochurePage() {
  return (
    <main className={styles.page}>
      <DetailHeader />
      <section className={styles.heading}>
        <div>
          <Link href="/contact"><ArrowLeft /> Back to contact</Link>
          <span>Interactive company brochure</span>
          <h1>Turn the page on better ingredients.</h1>
          <p>Explore our principal brands, Anchor products, food ingredients and additive categories. Use the on-screen arrows or your keyboard arrow keys to turn the pages.</p>
        </div>
        <div className={styles.headingNote}><b>04</b><span>Brochure pages<small>Optimized for desktop &amp; mobile</small></span></div>
      </section>
      <div className={styles.viewerWrap}><Flipbook /></div>
      <DetailFooter />
    </main>
  );
}
