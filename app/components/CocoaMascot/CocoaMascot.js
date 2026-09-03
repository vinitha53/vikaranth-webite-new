"use client";

import { useEffect, useState } from "react";
import styles from "./CocoaMascot.module.css";

const FRAMES = {
  open: "/mascot/cocoa-logo-open.webp",
  half: "/mascot/cocoa-logo-half.webp",
  closed: "/mascot/cocoa-logo-closed.webp",
};

const randomBlinkDelay = () => 3200 + Math.random() * 3000;

export default function CocoaMascot({ variant = "logo" }) {
  const [frame, setFrame] = useState("open");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let timer;

    Object.values(FRAMES).slice(1).forEach((source) => {
      const image = new Image();
      image.decoding = "async";
      image.src = source;
    });

    const clearTimer = () => window.clearTimeout(timer);

    const scheduleBlink = () => {
      clearTimer();
      if (!active || document.hidden || reducedMotion.matches) return;
      timer = window.setTimeout(runBlink, randomBlinkDelay());
    };

    const runBlink = () => {
      if (!active || document.hidden || reducedMotion.matches) return;
      setFrame("half");
      timer = window.setTimeout(() => {
        setFrame("closed");
        timer = window.setTimeout(() => {
          setFrame("half");
          timer = window.setTimeout(() => {
            setFrame("open");
            scheduleBlink();
          }, 65);
        }, 75);
      }, 65);
    };

    const resetMotion = () => {
      clearTimer();
      setFrame("open");
      if (!document.hidden && !reducedMotion.matches) scheduleBlink();
    };

    scheduleBlink();
    document.addEventListener("visibilitychange", resetMotion);
    reducedMotion.addEventListener?.("change", resetMotion);

    return () => {
      active = false;
      clearTimer();
      document.removeEventListener("visibilitychange", resetMotion);
      reducedMotion.removeEventListener?.("change", resetMotion);
    };
  }, []);

  return (
    <span className={`${styles.mascot} ${variant === "floating" ? styles.floating : ""}`} aria-hidden="true">
      <span className={styles.frame} style={{ backgroundImage: `url(${FRAMES[frame]})` }} />
    </span>
  );
}
