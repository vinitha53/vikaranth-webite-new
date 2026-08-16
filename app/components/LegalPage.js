import Link from "next/link";
import { ArrowRight, FileCheck2, ShieldCheck } from "lucide-react";
import { DetailFooter, DetailHeader } from "./DetailChrome";
import styles from "./legal-page.module.css";

export default function LegalPage({ eyebrow, title, introduction, updated, sections }) {
  return (
    <main className={styles.page}>
      <DetailHeader />
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.breadcrumbs}><Link href="/">Home</Link><span>/</span><span>{title}</span></div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{introduction}</p>
          <div className={styles.updated}><FileCheck2 aria-hidden="true" /> Last updated: {updated}</div>
        </div>
      </section>
      <section className={styles.content}>
        <aside className={styles.summary}>
          <ShieldCheck aria-hidden="true" />
          <h2>Clear and transparent</h2>
          <p>This page explains how Vikranth Chemical Corporation handles website use and business enquiries.</p>
          <Link href="/contact#enquiry">Contact our team <ArrowRight aria-hidden="true" /></Link>
        </aside>
        <article className={styles.article}>
          {sections.map((section, index) => (
            <section key={section.heading} id={`section-${index + 1}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h2>{section.heading}</h2>{section.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </section>
          ))}
        </article>
      </section>
      <section className={styles.contactCta}>
        <div><span>Need clarification?</span><h2>Speak with the Vikranth team.</h2><p>Contact us if you have questions about these policies or your information.</p></div>
        <Link href="/contact#enquiry">Contact Us <ArrowRight aria-hidden="true" /></Link>
      </section>
      <DetailFooter />
    </main>
  );
}