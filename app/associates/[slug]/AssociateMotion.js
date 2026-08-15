"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function AssociateMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-associate-page]");
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = root.querySelector("[data-3d-scene]");
    const progress = root.querySelector("[data-associate-progress]");
    const hero = root.querySelector("section");
    const heroImage = root.querySelector("[data-associate-hero-image]");
    const revealItems = gsap.utils.toArray(root.querySelectorAll("[data-associate-reveal]"));
    const staggerGroups = gsap.utils.toArray(root.querySelectorAll("[data-associate-stagger]"));
    const observers = [];

    const sceneObserver = scene ? new IntersectionObserver(([entry]) => {
      scene.toggleAttribute("data-active", entry.isIntersecting);
    }, { rootMargin: "100px" }) : null;
    if (scene && sceneObserver) sceneObserver.observe(scene);

    if (reduced) {
      gsap.set([...revealItems, ...staggerGroups.flatMap((group) => [...group.children])], { clearProps: "all" });
      return () => sceneObserver?.disconnect();
    }

    const horizontalDistance = window.innerWidth < 700 ? 24 : 48;
    revealItems.forEach((item) => {
      const direction = item.dataset.associateReveal;
      gsap.set(item, {
        autoAlpha: 0,
        x: direction === "left" ? -horizontalDistance : direction === "right" ? horizontalDistance : 0,
        y: direction === "up" ? 44 : 18,
        scale: direction === "up" ? .985 : 1,
        willChange: "transform, opacity",
      });

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        gsap.to(item, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: .86,
          ease: "power3.out",
          clearProps: "transform,willChange",
        });
      }, { threshold: .14, rootMargin: "0px 0px -8% 0px" });
      observer.observe(item);
      observers.push(observer);
    });

    staggerGroups.forEach((group) => {
      const children = [...group.children];
      if (children.length === 0) return;
      gsap.set(children, {
        autoAlpha: 0,
        y: 46,
        scale: .965,
        rotationX: 5,
        transformOrigin: "50% 100%",
        willChange: "transform, opacity",
      });

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        gsap.to(children, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: .78,
          stagger: .09,
          ease: "power3.out",
          clearProps: "transform,willChange",
        });
      }, { threshold: .1, rootMargin: "0px 0px -7% 0px" });
      observer.observe(group);
      observers.push(observer);
    });

    const setProgress = progress ? gsap.quickSetter(progress, "scaleX") : null;
    const moveHeroImage = heroImage ? gsap.quickTo(heroImage, "yPercent", { duration: .55, ease: "power2.out" }) : null;
    let scrollFrame = 0;
    const updateScrollEffects = () => {
      scrollFrame = 0;
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress?.(Math.min(window.scrollY / scrollRange, 1));
      if (hero && heroImage) {
        const heroBox = hero.getBoundingClientRect();
        if (heroBox.bottom > 0 && heroBox.top < window.innerHeight) {
          moveHeroImage?.(Math.min(window.scrollY / Math.max(hero.offsetHeight, 1), 1) * 7);
        }
      }
    };
    const requestScrollUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScrollEffects);
    };
    updateScrollEffects();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);

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

    return () => {
      observers.forEach((observer) => observer.disconnect());
      sceneObserver?.disconnect();
      scene?.removeEventListener("pointermove", pointerMove);
      scene?.removeEventListener("pointerleave", pointerLeave);
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      gsap.killTweensOf([scene, heroImage, ...revealItems, ...staggerGroups.flatMap((group) => [...group.children])].filter(Boolean));
    };
  }, []);

  return null;
}
