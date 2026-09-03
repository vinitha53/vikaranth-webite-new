"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FloatingCocoaGuide.module.css";

const FRAMES = {
  idle: "/mascot/cocoa-main-idle.webp",
  closed: "/mascot/cocoa-main-closed.webp",
  greet: "/mascot/cocoa-main-greet.webp",
  jump: "/mascot/cocoa-main-jump.webp",
};

export default function FloatingCocoaGuide() {
  const guideRef = useRef(null);
  const busyRef = useRef(false);
  const timersRef = useRef(new Set());
  const [pose, setPose] = useState("idle");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;

    Object.values(FRAMES).slice(1).forEach((source) => {
      const image = new Image();
      image.decoding = "async";
      image.src = source;
    });

    const later = (callback, delay) => {
      const timer = window.setTimeout(() => {
        timersRef.current.delete(timer);
        if (active) callback();
      }, delay);
      timersRef.current.add(timer);
      return timer;
    };

    const scheduleBlink = () => later(() => {
      if (!busyRef.current && !document.hidden && !reducedMotion.matches) {
        setPose("closed");
        later(() => {
          if (!busyRef.current) setPose("idle");
        }, 135);
      }
      scheduleBlink();
    }, 3200 + Math.random() * 3100);

    const scheduleGreeting = () => later(() => {
      if (!busyRef.current && !document.hidden && !reducedMotion.matches && window.innerWidth > 600) {
        busyRef.current = true;
        setPose("greet");
        later(() => {
          busyRef.current = false;
          setPose("idle");
        }, 1450);
      }
      scheduleGreeting();
    }, 9000 + Math.random() * 5000);

    scheduleBlink();
    scheduleGreeting();

    return () => {
      active = false;
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const jump = () => {
    const guide = guideRef.current;
    if (!guide || busyRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    busyRef.current = true;
    guide.dataset.jumping = "false";
    void guide.offsetWidth;
    guide.dataset.jumping = "true";
    setPose("jump");

    const timer = window.setTimeout(() => {
      timersRef.current.delete(timer);
      guide.dataset.jumping = "false";
      busyRef.current = false;
      setPose("idle");
    }, 760);
    timersRef.current.add(timer);
  };

  return (
    <aside ref={guideRef} className={styles.guide} data-jumping="false">
      <span className={styles.greeting} aria-hidden="true">Hi!</span>
      <button className={styles.button} type="button" onClick={jump} aria-label="Make the Cocoa Bean Chef jump">
        <img className={styles.mascot} src={FRAMES[pose]} alt="" width="300" height="300" draggable="false" />
      </button>
    </aside>
  );
}
