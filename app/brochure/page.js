import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import styles from "./brochure.module.css";

export const metadata = {
  title: "VCC Product Brochure | Vikranth Chemical Corporation",
  description: "View and download the Vikranth Chemical Corporation food ingredients and principal brands brochure.",
  alternates: { canonical: "/brochure/" },
};

export default function BrochurePage() {
  return (
    <main className={styles.page}>
      <DetailHeader />
      <section className={styles.heading}>
        <div>
          <Link href="/contact"><ArrowLeft /> Back to contact</Link>
          <span>VCC product brochure</span>
          <h1>View our ingredient portfolio.</h1>
          <p>Four pages covering principal brands, Anchor products, food ingredients and additive categories.</p>
        </div>
        <div className={styles.actions}>
          <a href="/brochures/vcc-product-brochure.pdf" target="_blank" rel="noreferrer">Open PDF <ExternalLink /></a>
          <a href="/brochures/vcc-product-brochure.pdf" download>Download PDF <Download /></a>
        </div>
      </section>
      <section className={styles.viewer}>
        <iframe src="/brochures/vcc-product-brochure.pdf#view=FitH" title="Vikranth Chemical Corporation product brochure" />
        <p>If the brochure does not appear, <a href="/brochures/vcc-product-brochure.pdf" target="_blank" rel="noreferrer">open the PDF in a new tab</a>.</p>
      </section>
      <DetailFooter />
    </main>
  );
}