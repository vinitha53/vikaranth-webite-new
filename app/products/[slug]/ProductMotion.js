"use client";

import { useEffect } from "react";

export default function ProductMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-product-page]");
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = navigator.connection?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const navLinks = [...root.querySelectorAll('nav[aria-label="Product page sections"] a')];
    const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.toggleAttribute("data-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-28% 0px -62%" });
    sections.forEach((section) => sectionObserver.observe(section));

    if (reduced) return () => sectionObserver.disconnect();

    let context;
    let gsapApi;
    let stage;
    let canTilt = false;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      gsapApi = gsap;

      context = gsap.context(() => {
        gsap.from("[data-hero-copy] > *", { y: 26, opacity: 0, duration: 0.72, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity" });
        gsap.from("[data-product-stage]", { clipPath: "inset(0 0 100% 0 round 30px)", scale: 1.035, duration: 0.95, ease: "power3.out", clearProps: "clipPath,transform" });
        gsap.from("[data-partner-badge]", { x: 18, opacity: 0, duration: 0.55, delay: 0.42, ease: "power2.out", clearProps: "transform,opacity" });
        gsap.to("[data-reading-progress]", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.25 } });

        if (!lowPower && window.innerWidth > 760) {
          gsap.to("[data-product-image]", { yPercent: 7, scale: 1.06, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.65 } });
          gsap.to("[data-depth]", { y: 28, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.9 } });
        }

        gsap.utils.toArray("[data-heading]").forEach((heading) => {
          gsap.from(heading.children, { y: 22, opacity: 0, duration: 0.58, stagger: 0.09, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: heading, start: "top 88%", once: true } });
          gsap.fromTo(heading, { "--heading-line-scale": 0 }, { "--heading-line-scale": 1, duration: 0.62, delay: 0.12, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 88%", once: true } });
        });
        gsap.utils.toArray("[data-reveal]").forEach((element) => gsap.from(element, { y: 22, opacity: 0, duration: 0.58, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: element, start: "top 88%", once: true } }));
        gsap.utils.toArray("[data-stagger]").forEach((group) => gsap.from(group.children, { y: 18, opacity: 0, duration: 0.5, stagger: 0.075, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: group, start: "top 87%", once: true } }));
      }, root);

      stage = root.querySelector("[data-product-stage]");
      canTilt = !lowPower && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (stage && canTilt) {
        stage.addEventListener("pointermove", onMove);
        stage.addEventListener("pointerleave", onLeave);
      }
    });

    function onMove(event) {
      if (!stage || !gsapApi) return;
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsapApi.to(stage, { rotateY: x * 8, rotateX: y * -7, x: x * 4, y: y * 4, duration: 0.38, ease: "power2.out" });
    }

    function onLeave() {
      if (stage && gsapApi) gsapApi.to(stage, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 0.62, ease: "elastic.out(1,.6)" });
    }

    return () => {
      cancelled = true;
      sectionObserver.disconnect();
      if (stage && canTilt) {
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", onLeave);
      }
      context?.revert();
    };
  }, []);

  return null;
}