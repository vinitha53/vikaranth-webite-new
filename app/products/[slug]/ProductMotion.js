"use client";

import { useEffect } from "react";

export default function ProductMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-product-page]");
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
    const revealNodes = [...root.querySelectorAll("[data-heading], [data-reveal], [data-stagger] > *, [data-product-stage], [data-partner-badge]")];

    // Show content immediately on touch and compact devices. This removes the
    // observer and continuous scroll work from the mobile rendering path.
    if (reduced || compact || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("motion-visible"));
      return;
    }
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("motion-visible"); revealObserver.unobserve(entry.target); }
    }), { rootMargin: "0px 0px -8%", threshold: 0.08 });
    if (reduced) revealNodes.forEach((node) => node.classList.add("motion-visible")); else revealNodes.forEach((node, index) => { node.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 55}ms`); revealObserver.observe(node); });


    let scheduled = false;
    const updateProgress = () => {
      scheduled = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      root.querySelector("[data-reading-progress]")?.style.setProperty("transform", `scaleX(${max > 0 ? scrollY / max : 0})`);
    };
    const onScroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } };
    addEventListener("scroll", onScroll, { passive: true }); updateProgress();
    return () => { revealObserver.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);
  return null;
}
