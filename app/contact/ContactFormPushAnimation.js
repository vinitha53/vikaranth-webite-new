"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

const START_DELAY = 50;
const PUSH_DURATION = 6000;
const SETTLE_DURATION = 650;
const DESKTOP_QUERY = "(min-width: 1281px)";

export default function ContactFormPushAnimation() {
  const [phase, setPhase] = useState("initial");
  const stageRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    [
      "/contact/cocoa-bean-side-walk-sprite-transparent.webp",
      "/contact/cocoa-bean-front-blink.webp",
    ].forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const form = formRef.current;
    if (!stage || !form) return undefined;

    const measure = () => {
      const group = stage.querySelector(`.${styles.contactPushGroup}`);
      const formHeight = form.getBoundingClientRect().height;
      const viewportWidth = window.innerWidth;
      let mascotHeight;
      if (viewportWidth <= 1024) mascotHeight = viewportWidth <= 520 ? 170 : 190;
      else if (viewportWidth <= 1280) mascotHeight = Math.min(360, Math.max(280, formHeight * 0.6));
      else mascotHeight = Math.min(430, Math.max(320, formHeight * 0.65));

      const laneWidth = viewportWidth <= 1280
        ? Math.min(270, mascotHeight * 0.78)
        : Math.min(320, mascotHeight * 0.8);
      const stageRect = stage.getBoundingClientRect();
      const finalLeft = group
        ? group.getBoundingClientRect().left - stageRect.left
        : 140;
      const walkClearance = finalLeft + laneWidth - mascotHeight * 0.75 - 20;
      const walkDistance = Math.max(40, Math.min(80, walkClearance));

      stage.style.setProperty("--mascot-height", `${Math.round(mascotHeight)}px`);
      stage.style.setProperty("--mascot-lane", `${Math.round(laneWidth)}px`);
      stage.style.setProperty("--walk-distance", `${Math.round(walkDistance)}px`);
      const formLeft = finalLeft + laneWidth;
      stage.style.setProperty("--form-entry-distance", `${Math.ceil(form.offsetWidth + formLeft + 4)}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(form);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = [];

    const start = () => {
      if (!desktop.matches || reducedMotion.matches) {
        setPhase("settled");
        return;
      }
      setPhase("initial");
      timers.push(window.setTimeout(() => setPhase("beanWalking"), START_DELAY));
      timers.push(window.setTimeout(() => setPhase("settling"), START_DELAY + PUSH_DURATION));
      timers.push(window.setTimeout(() => setPhase("settled"), START_DELAY + PUSH_DURATION + SETTLE_DURATION));
    };

    const settleForAccessibility = () => {
      if (desktop.matches && !reducedMotion.matches) return;
      timers.forEach((timer) => window.clearTimeout(timer));
      setPhase("settled");
    };

    start();
    desktop.addEventListener?.("change", settleForAccessibility);
    reducedMotion.addEventListener?.("change", settleForAccessibility);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      desktop.removeEventListener?.("change", settleForAccessibility);
      reducedMotion.removeEventListener?.("change", settleForAccessibility);
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.contactPushStage} data-phase={phase}>
      <div className={styles.contactPushGroup}>
        <div className={styles.contactPushMascot} aria-hidden="true">
          <span className={styles.contactBeanSprite} />
        </div>
        <div ref={formRef} className={styles.contactPushForm}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
