"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AssociateMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector("[data-associate-page]");
    if (!root) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = root.querySelector("[data-3d-scene]");
    const sceneObserver = scene ? new IntersectionObserver(([entry]) => scene.toggleAttribute("data-active", entry.isIntersecting), { rootMargin: "100px" }) : null;
    if (scene && sceneObserver) sceneObserver.observe(scene);

    const pointerMove = (event) => {
      if (!scene || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
      const box = scene.getBoundingClientRect();
      const rx = ((event.clientY - box.top) / box.height - 0.5) * -8;
      const ry = ((event.clientX - box.left) / box.width - 0.5) * 8;
      gsap.to(scene, { rotateX: rx, rotateY: ry, duration: 0.45, ease: "power2.out" });
    };
    const pointerLeave = () => scene && gsap.to(scene, { rotateX: 0, rotateY: 0, duration: 0.65, ease: "elastic.out(1,.6)" });
    scene?.addEventListener("pointermove", pointerMove);
    scene?.addEventListener("pointerleave", pointerLeave);

    if (reduced) {
      return () => {
        scene?.removeEventListener("pointermove", pointerMove);
        scene?.removeEventListener("pointerleave", pointerLeave);
        sceneObserver?.disconnect();
      };
    }

    const sections = [...root.querySelectorAll("section")];
    const hero = sections[0];
    const heroCopy = hero?.querySelector("[class*='heroCopy']");
    const heroVisual = hero?.querySelector("[class*='visual']");

    const context = gsap.context(() => {
      if (heroCopy) gsap.from(heroCopy.children, { y: 28, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.12 });
      if (heroVisual) {
        gsap.from(heroVisual, { y: 35, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
        gsap.to(heroVisual.querySelector("img"), { yPercent: 8, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      }

      sections.slice(1).forEach((section) => {
        const content = section.querySelector(".wrap") || section;
        const heading = content.querySelector("header, [class*='aboutFeatureCopy']");
        const cards = content.querySelectorAll("article, [class*='productCard'], [class*='applicationFeatureCard'], [class*='faqList'] details, [class*='enquiryForm']");
        if (heading) gsap.from(heading, { y: 42, opacity: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
        if (cards.length) gsap.from(cards, { y: 34, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 78%", once: true } });
        else if (!heading) gsap.from(content, { y: 35, opacity: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
      });
    }, root);

    return () => {
      context.revert();
      scene?.removeEventListener("pointermove", pointerMove);
      scene?.removeEventListener("pointerleave", pointerLeave);
      sceneObserver?.disconnect();
      gsap.killTweensOf(scene);
    };
  }, []);

  return null;
}