import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ClipboardCheck,
  FileText,
  Layers,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import styles from "./detail.module.css";

const icons = [ClipboardCheck, PackageCheck, Layers, Target, ClipboardCheck, Boxes];

export default function IndustryApplicationGuide({ content }) {
  const applications = content.applications;

  return <section className={styles.applicationJourney} aria-labelledby="application-guide-title">
    <div className={styles.applicationJourneyHead}>
      <span>02 — Application Guide</span>
      <h2 id="application-guide-title">Choose the Format. <em>We’ll Shape the Solution.</em></h2>
      <p>Explore ingredient solutions designed around texture, flavour, stability and production performance.</p>
      <i aria-hidden="true"><b /></i>
    </div>

    <div className={styles.applicationJourneyPanel}>
      <div className={styles.applicationJourneyProgress} aria-label={`${applications.length} applications`}>
        <span>01 / {String(applications.length).padStart(2, "0")}</span>
        <i>{applications.map((_, index) => <b className={index === 0 ? styles.applicationJourneyProgressActive : ""} key={index} />)}</i>
      </div>

      <div className={styles.applicationJourneyViewport}>
        <div className={styles.applicationJourneyTrack} style={{ "--application-count": applications.length }}>
          {applications.map(([name, description], index) => {
            const Icon = icons[index % icons.length];
            return <article className={styles.applicationJourneyItem} key={name}>
              <span className={styles.applicationJourneyConnector} aria-hidden="true" />
              <div className={styles.applicationJourneyNode}>
                <Icon aria-hidden="true" />
                <small>{String(index + 1).padStart(2, "0")}</small>
              </div>
              <div className={styles.applicationJourneyCard}>
                <h3>{name}</h3>
                <p>{description}</p>
                {index === 0 && <div><span>Format</span><span>Function</span><span>Process</span></div>}
              </div>
            </article>;
          })}
        </div>
      </div>

      <Link className={styles.applicationJourneyCta} href="/contact/#enquiry">
        <Sparkles aria-hidden="true" />
        <strong>Select an application to explore ingredient recommendations</strong>
        <ArrowRight aria-hidden="true" />
      </Link>
    </div>

    <div className={styles.applicationJourneyBenefits}>
      <span><ShieldCheck />Application-led selection</span>
      <span><FileText />Technical documentation</span>
      <span><Boxes />Reliable sourcing</span>
    </div>
  </section>;
}
