import Link from "next/link";
import { ArrowRight, Scale, Check, ClipboardCheck, Info, ShieldCheck } from "lucide-react";
import styles from "./detail.module.css";

const outcomes = {
  "bakery-ingredients": ["Volume", "Texture", "Shelf life"],
  "chocolate-confectionery": ["Flavour", "Flow", "Finish"],
  "dairy-ingredients": ["Creaminess", "Solids", "Stability"],
  "beverage-ingredients": ["Flavour", "Mouthfeel", "Stability"],
  "ice-cream-ingredients": ["Overrun", "Texture", "Melt"],
  "fruit-processing": ["Brix", "Texture", "Storage"],
  "hydrocolloids-stabilizers": ["Viscosity", "Gel", "Stability"],
  "sweeteners-syrups-starches": ["Sweetness", "Body", "Process"],
  "functional-ingredients": ["Structure", "Function", "Consistency"],
  "nutraceutical-pharma": ["Identity", "Purity", "Compliance"],
  "food-additives-preservatives": ["Function", "Process", "Compliance"],
};

export default function IndustrySelectionPath({ industry, content }) {
  const metrics = outcomes[industry.slug] || ["Function", "Grade", "Performance"];
  return <section className={styles.selectionPath}>
    <div className={styles.selectionCard}><small>01 - Application-first sourcing</small><h2>Source for performance, not just a product name.</h2><p>Begin with the finished product, process and target result. Then narrow the suitable ingredient and grade for technical review.</p><div className={styles.selectionMetrics}>{metrics.map((item) => <span key={item}><i />{item}</span>)}</div><Link href="/contact#enquiry">Discuss your {industry.name.toLowerCase()} application <ArrowRight size={17} /></Link></div>
    <div className={styles.selectionProcess}><small>A practical selection path</small><h2>From requirement to controlled trial</h2><ol><li><b>01</b><ClipboardCheck /><div><strong>Define the finished product</strong><p>Clarify recipe, production method, batch size and performance target.</p></div><em>Input</em></li><li><b>02</b><Scale /><div><strong>Compare suitable grades</strong><p>Review function, source, manufacturer guidance and documents.</p></div><em>Review</em></li><li><b>03</b><ShieldCheck /><div><strong>Validate through a trial</strong><p>Confirm dosage, handling and finished-product performance.</p></div><em>Confirm</em></li></ol><div className={styles.selectionChecks}><span><Check />Grade-specific checks</span><span><Check />Trial-led selection</span><span><Check />Documentation support</span></div></div>
    <div className={styles.selectionNote}><Info /><p>{content.introduction}</p></div>
  </section>;
}
