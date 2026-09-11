"use client";

import { useState } from "react";
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
  const [activeApplication, setActiveApplication] = useState(0);

  const updateActiveApplication = (event) => {
    const viewport = event.currentTarget;
    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    const slides = [...viewport.querySelectorAll("[data-application-slide]")];
    let nextIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        nextIndex = index;
      }
    });

    setActiveApplication((current) => current === nextIndex ? current : nextIndex);
  };

  return <section className={styles.applicationJourney} aria-labelledby="application-guide-title">
    <div className={styles.applicationJourneyHead}>
        <span>Application Guide</span>
      <h2 id="application-guide-title">Choose Your Application. <em>We’ll Shape the Solution.</em></h2>
      <p>Explore ingredient solutions designed around texture, flavour, stability and production performance.</p>
      <i aria-hidden="true"><b /></i>
    </div>

    <div className={styles.applicationJourneyPanel}>
      <div className={styles.applicationJourneyProgress} aria-label={`Application ${activeApplication + 1} of ${applications.length}`}>
        <span>{String(activeApplication + 1).padStart(2, "0")} / {String(applications.length).padStart(2, "0")}</span>
        <i>{applications.map((_, index) => <b className={index === activeApplication ? styles.applicationJourneyProgressActive : ""} key={index} />)}</i>
      </div>

      <div className={styles.applicationJourneyViewport} onScroll={updateActiveApplication}>
        <div className={styles.applicationJourneyTrack} style={{ "--application-count": applications.length }}>
          {applications.map(([name, description], index) => {
            const Icon = icons[index % icons.length];
            return <article className={styles.applicationJourneyItem} data-application-slide key={name}>
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
