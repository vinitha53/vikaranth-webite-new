"use client";

import { useRef } from "react";
import { ArrowRight, Download, FileText } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./contact.module.css";

gsap.registerPlugin(useGSAP);

const BROCHURE_URL = "/brochure/";

export default function BrochureContactCta() {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const qrRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    const qr = qrRef.current;
    if (!section || !copy || !qr) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([copy, qr], { clearProps: "all" });
      return undefined;
    }

    gsap.set(copy, { autoAlpha: 0, y: 18 });
    gsap.set(qr, { autoAlpha: 0, scale: .97, transformOrigin: "50% 50%" });

    let revealTimeline;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      revealTimeline = gsap.timeline({ defaults: { ease: "power2.out" } })
        .to(copy, { autoAlpha: 1, y: 0, duration: .7 })
        .to(qr, { autoAlpha: 1, scale: 1, duration: .65 }, "-=.54");
    }, { threshold: .18 });
    observer.observe(section);

    return () => {
      observer.disconnect();
      revealTimeline?.kill();
    };
  }, { scope: sectionRef });

  return (
    <section className={`${styles.whatsappCtaSection} ${styles.brochureQrSection}`} ref={sectionRef} aria-labelledby="brochure-contact-title">
      <div className={styles.whatsappCtaInner}>
        <div className={styles.whatsappCtaCopy} ref={copyRef}>
          <span className={styles.whatsappCtaEyebrow}>Product brochure</span>
          <h2 id="brochure-contact-title">Explore the VCC Ingredient Brochure</h2>
          <p>Browse VCC&apos;s food, bakery, chocolate, confectionery and specialty ingredient portfolio in our interactive digital brochure.</p>
          <a className={styles.whatsappCtaButton} href={BROCHURE_URL} target="_blank" rel="noopener noreferrer" aria-label="Open the VCC ingredient brochure in a new tab">
            <span className={styles.brochureButtonIcon}><FileText aria-hidden="true" /></span>
            <span>Open Brochure</span>
            <ArrowRight aria-hidden="true" />
          </a>
          <small className={styles.whatsappResponseNote}><Download aria-hidden="true" /> Flip, search, zoom and download the complete portfolio</small>
        </div>

        <a className={`${styles.whatsappQrCard} ${styles.brochureQrCard}`} ref={qrRef} href={BROCHURE_URL} target="_blank" rel="noopener noreferrer" aria-label="Open the VCC ingredient brochure in a new tab">
          <img className={styles.whatsappQrImage} src="/contact/vcc-brochure-qr.png" alt="Scan to open the VCC ingredient brochure" width="984" height="984" />
          <span><FileText aria-hidden="true" /> Scan to view the VCC brochure</span>
        </a>
      </div>
    </section>
  );
}
