"use client";

import { useEffect } from "react";

export default function ProductMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-product-page]");
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = [...root.querySelectorAll("[data-heading], [data-reveal], [data-stagger] > *, [data-product-stage], [data-partner-badge]")];
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("motion-visible"); revealObserver.unobserve(entry.target); }
    }), { rootMargin: "0px 0px -8%", threshold: 0.08 });
    if (reduced) revealNodes.forEach((node) => node.classList.add("motion-visible")); else revealNodes.forEach((node, index) => { node.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 55}ms`); revealObserver.observe(node); });

    const navLinks = [...root.querySelectorAll('nav[aria-label="Product page sections"] a')];
    const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) navLinks.forEach((link) => link.toggleAttribute("data-active", link.getAttribute("href") === `#${entry.target.id}`));
    }), { rootMargin: "-28% 0px -62%" });
    sections.forEach((section) => sectionObserver.observe(section));

    let scheduled = false;
    const updateProgress = () => {
      scheduled = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      root.querySelector("[data-reading-progress]")?.style.setProperty("transform", `scaleX(${max > 0 ? scrollY / max : 0})`);
    };
    const onScroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } };
    addEventListener("scroll", onScroll, { passive: true }); updateProgress();
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);
  return null;
}