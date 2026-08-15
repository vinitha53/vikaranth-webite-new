"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ContactScrollEffects() {
  useGSAP(() => {
    const section = document.querySelector("[data-contact-offices]");
    const heading = section?.querySelector("[data-contact-office-heading]");
    const cards = section ? gsap.utils.toArray(section.querySelectorAll("[data-contact-office-card]")) : [];
    const icons = cards.map((card) => card.querySelector(":scope > svg")).filter(Boolean);
    if (!section || !heading || cards.length === 0) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([heading, ...cards, ...icons], { clearProps: "all" });
      return undefined;
    }

    gsap.set(heading, { autoAlpha: 0, y: 34 });
    gsap.set(cards, { autoAlpha: 0, y: 56, rotationX: 6, transformOrigin: "50% 100%" });
    gsap.set(icons, { scale: .72, rotation: -10, transformOrigin: "50% 50%" });

    let revealTimeline;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      revealTimeline = gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(heading, { autoAlpha: 1, y: 0, duration: .72 })
        .to(cards, { autoAlpha: 1, y: 0, rotationX: 0, duration: .85, stagger: .16 }, "-=.4")
        .to(icons, { scale: 1, rotation: 0, duration: .5, stagger: .12, ease: "back.out(1.7)" }, "-=.6");
    }, { threshold: .16 });

    observer.observe(section);
    return () => {
      observer.disconnect();
      revealTimeline?.kill();
    };
  }, []);

  return null;
}
