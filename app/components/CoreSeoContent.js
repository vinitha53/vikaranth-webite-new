import Link from "next/link";
import {
  ArrowRight,
  Beaker,
  Check,
  FileCheck2,
  FileText,
  PackageSearch,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import styles from "./core-seo-content.module.css";

const topicIcons = [Search, PackageSearch, Beaker, SlidersHorizontal, ShieldCheck, FileText];

export default function CoreSeoContent({ content, compact = false, hideFaq = false }) {
  return <section className={`${styles.wrap} ${compact ? styles.compact : ""}`} aria-labelledby={`core-content-${content.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>
    <div className={styles.heading}><span>{content.eyebrow}</span><h2 id={`core-content-${content.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>{content.title}</h2><p>{content.directAnswer}</p></div>
    <div className={styles.topicGrid}>{content.sections.map(([title, text], index) => {
      const TopicIcon = topicIcons[index % topicIcons.length];
      return <article key={title} style={{ "--card-index": index }}>
        <div className={styles.topicMeta}>
          <span className={styles.topicIcon}><TopicIcon aria-hidden="true" /></span>
          <span className={styles.topicNumber}>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3>{title}</h3><p>{text}</p>
        <i className={styles.cardGlow} aria-hidden="true" />
      </article>;
    })}</div>
    <div className={styles.process}><div><small>Procurement pathway</small><h2>How to move from enquiry to approval</h2></div><ol>{content.steps.map((step) => <li key={step}><Check aria-hidden="true"/><span>{step}</span></li>)}</ol></div>
    {!hideFaq && <div className={styles.faq}><div><FileCheck2 aria-hidden="true"/><small>Direct answers for buyers</small><h2>Frequently asked questions</h2></div><div>{content.faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>}
    <nav className={styles.links} aria-label="Related pages">{content.links.map(([label, href]) => <Link href={href} key={href}>{label}<ArrowRight aria-hidden="true"/></Link>)}</nav>
    <div className={styles.cta}><div><small>Start a precise enquiry</small><strong>{content.cta}</strong></div><Link href="/contact/#enquiry">Request a quotation <ArrowRight aria-hidden="true"/></Link></div>
  </section>;
}
