import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Layers, PackageCheck, ShieldCheck, Target } from "lucide-react";
import styles from "./detail.module.css";

const icons = [ClipboardCheck, PackageCheck, Layers, Target];

function tagsFrom(description) {
  return description
    .split(/,| and | for /i)
    .map((item) => item.replace(/\b(selected|suitable|commercial|permitted|subject to current availability)\b/gi, "").trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default function IndustryApplicationGuide({ industry, content }) {
  return <section className={styles.applicationShowcase}>
    <div className={styles.applicationIntro}>
      <span>02 - Application & selection guide</span>
      <h2>Match the ingredient to what you make.</h2>
      <p>Start with the finished product to narrow the right ingredient family. Grade, process fit, documentation and availability are confirmed during technical review.</p>
      <Link href="/contact#enquiry">Discuss your application <ArrowRight size={17} /></Link>
      <div className={styles.applicationChecklist}>
        <small>Selection considers</small>
        <b><Check size={18} />Finished-product target</b>
        <b><Check size={18} />Production method</b>
        <b><Check size={18} />Batch size</b>
        <b><Check size={18} />Required documents</b>
      </div>
    </div>
    <div className={styles.applicationCards}>
      {content.applications.map(([name, description], index) => {
        const Icon = icons[index % icons.length];
        const tags = tagsFrom(description);
        return <article key={name} className={styles.applicationCard}>
          <div className={styles.applicationCardTop}><span>{String(index + 1).padStart(2, "0")}</span><small>Explore</small></div>
          <Icon />
          <h3>{name}</h3>
          <p>{description}</p>
          <div>{tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
          <ArrowRight className={styles.applicationArrow} size={28} />
        </article>;
      })}
    </div>
    <div className={styles.applicationAssurance}>
      <ShieldCheck />
      <p>Final ingredient and grade selection depends on recipe, process, batch size, target result and current availability.</p>
      <Link href="#industry-products">View {industry.name.toLowerCase()} <ArrowRight size={21} /></Link>
    </div>
  </section>;
}