import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Layers, PackageCheck, ShieldCheck, Target } from "lucide-react";
import styles from "./detail.module.css";

const icons = [ClipboardCheck, PackageCheck, Layers, Target];

export default function IndustryApplicationGuide({ industry, content }) {
  return <section className={styles.compactApplications}>
    <div className={styles.compactApplicationsHead}>
      <div><span>02 - Application guide</span><h2>Built for These Applications</h2></div>
      <p>Start with the finished product and required function. Final ingredient and grade selection depends on formulation, process, trials, specifications and current availability.</p>
    </div>
    <div className={styles.compactApplicationGrid}>
      {content.applications.map(([name, description], index) => {
        const Icon = icons[index % icons.length];
        return <article key={name}><Icon /><div><h3>{name}</h3><p>{description}</p></div></article>;
      })}
    </div>
    <div className={styles.compactApplicationFoot}>
      <span><ShieldCheck />Application-led selection</span>
      <span><Check />Grade and document checks</span>
      <Link href="/contact/#enquiry">Discuss your application <ArrowRight size={17} /></Link>
    </div>
  </section>;
}