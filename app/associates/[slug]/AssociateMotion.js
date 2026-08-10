"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function AssociateMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-associate-page]");
    if (!root) return undefined;
    const scene = root.querySelector("[data-3d-scene]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sceneObserver = scene ? new IntersectionObserver(([entry]) => scene.toggleAttribute("data-active", entry.isIntersecting), { rootMargin: "100px" }) : null;
    if (scene && sceneObserver) sceneObserver.observe(scene);
    if (reduced) return () => sceneObserver?.disconnect();

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
      scene?.removeEventListener("pointermove", pointerMove);
      scene?.removeEventListener("pointerleave", pointerLeave);
      sceneObserver?.disconnect();
      gsap.killTweensOf(scene);
    };
  }, []);

  return null;
}
