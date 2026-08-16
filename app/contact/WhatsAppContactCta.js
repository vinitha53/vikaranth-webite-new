"use client";

import { useRef } from "react";
import { ArrowRight, MessageCircle, Zap } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./contact.module.css";

gsap.registerPlugin(useGSAP);

const WHATSAPP_NUMBER = "918754442924";
const WHATSAPP_MESSAGE = "Hello Vikranth Chemical Corporation, I would like to enquire about your food ingredients and request product details.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsAppContactCta() {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const qrRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    const qr = qrRef.current;
    if (!section || !copy || !qr) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set([copy, qr], { clearProps: "all" });
      return undefined;
    }

    gsap.set(copy, { autoAlpha: 0, x: -42, y: 20 });
    gsap.set(qr, { autoAlpha: 0, x: 50, y: 18, scale: .92, rotation: 2.5, transformOrigin: "50% 50%" });

    let revealTimeline;
    const reveal = () => {
      revealTimeline = gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(copy, { autoAlpha: 1, x: 0, y: 0, duration: .82 })
        .to(qr, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: .78, ease: "back.out(1.35)" }, "-=.58");
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      reveal();
    }, { threshold: .18 });
    observer.observe(section);

    return () => {
      observer.disconnect();
      revealTimeline?.kill();
    };
  }, { scope: sectionRef });

  return (
    <section className={styles.whatsappCtaSection} ref={sectionRef} aria-labelledby="whatsapp-contact-title">
      <div className={styles.whatsappCtaInner}>
        <div className={styles.whatsappCtaCopy} ref={copyRef}>
          <span className={styles.whatsappCtaEyebrow}>Quick assistance</span>
          <h2 id="whatsapp-contact-title">Connect With Us on WhatsApp</h2>
          <p>Need help choosing the right food ingredient? Chat with the VCC team for product details, availability, quotations and business enquiries.</p>
          <a className={styles.whatsappCtaButton} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Vikranth Chemical Corporation on WhatsApp in a new tab">
            <img src="/whatsapp-branded.png" alt="" width="70" height="70" loading="lazy" decoding="async" aria-hidden="true" />
            <span>Chat With Us</span>
            <ArrowRight aria-hidden="true" />
          </a>
          <small className={styles.whatsappResponseNote}><Zap aria-hidden="true" /> Fast assistance for your product enquiries</small>
        </div>

        <a className={styles.whatsappQrCard} ref={qrRef} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Open a WhatsApp chat with Vikranth Chemical Corporation in a new tab">
          <img className={styles.whatsappQrImage} src="/contact/vcc-whatsapp-qr.png" alt="Scan to chat with Vikranth Chemical Corporation on WhatsApp" width="984" height="984" loading="lazy" decoding="async" />
          <span><MessageCircle aria-hidden="true" /> Scan to chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
