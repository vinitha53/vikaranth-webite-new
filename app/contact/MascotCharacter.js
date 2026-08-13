"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./contact.module.css";

export default function MascotCharacter({ state = "idle" }) {
  const root = useRef(null);
  const character = useRef(null);
  const pupils = useRef([]);
  const check = useRef(null);
  const confetti = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const xTo = gsap.quickTo(character.current, "x", { duration: .35, ease: "power2.out" });
    const yTo = gsap.quickTo(character.current, "y", { duration: .35, ease: "power2.out" });
    const rotateTo = gsap.quickTo(character.current, "rotation", { duration: .4, ease: "power2.out" });
    const pupilX = pupils.current.map((pupil) => gsap.quickTo(pupil, "x", { duration: .18, ease: "power2.out" }));
    const pupilY = pupils.current.map((pupil) => gsap.quickTo(pupil, "y", { duration: .18, ease: "power2.out" }));

    // Pointer movement subtly guides the mascot's eyes and posture.
    const track = (event) => {
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      xTo(x * 8); yTo(y * 5); rotateTo(x * 1.8);
      pupilX.forEach((move) => move(x * 8));
      pupilY.forEach((move) => move(y * 6));
    };
    window.addEventListener("pointermove", track, { passive: true });

    // Gentle float keeps the guide alive without exaggerated motion.
    const idle = gsap.to(character.current, { y: "-=7", duration: 2.3, repeat: -1, yoyo: true, ease: "power1.inOut" });
    return () => { window.removeEventListener("pointermove", track); idle.kill(); };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf([character.current, check.current, confetti.current]);
    gsap.set(check.current, { opacity: 0, rotationY: -90, transformOrigin: "center" });
    gsap.set(confetti.current, { opacity: 0 });
    if (reduced) {
      if (state === "success") gsap.set(check.current, { opacity: 1, rotationY: 0 });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    if (state === "name") timeline.to(character.current, { rotation: -2, scale: 1.015, duration: .28 }).to(character.current, { rotation: 0, scale: 1, duration: .28 });
    if (state === "trackingLeft") timeline.to(character.current, { rotation: -1.5, duration: .24 });
    if (state === "trackingRight") timeline.to(character.current, { rotation: 1.5, duration: .24 });
    if (state === "listening") timeline.to(character.current, { rotation: -3, y: 6, duration: .35 });
    if (state === "approved") timeline.to(character.current, { y: -11, scale: 1.02, duration: .2 }).to(character.current, { y: 0, scale: 1, duration: .25 });
    if (state === "error") timeline.to(character.current, { x: -6, rotation: -3, duration: .1, repeat: 3, yoyo: true }).to(character.current, { x: 0, rotation: 0, duration: .2 });
    if (state === "thinking") timeline.to(character.current, { rotation: -2, y: 5, duration: .4, repeat: -1, yoyo: true, ease: "power1.inOut" });
    if (state === "success") {
      timeline.to(character.current, { y: -27, scale: 1.04, duration: .28 }).to(character.current, { y: 0, scale: 1, duration: .35, ease: "power1.inOut" }).to(check.current, { opacity: 1, rotationY: 0, duration: .42 }, .12).to(confetti.current, { opacity: 1, duration: .1 }, .12);
      gsap.fromTo("[data-confetti]", { y: 0, x: 0, rotation: 0, opacity: 1 }, { y: 80, x: (index) => (index - 5) * 15, rotation: (index) => index * 55, opacity: 0, duration: 1.15, stagger: .025, ease: "power1.out", delay: .15 });
    }
  }, [state]);

  return (
    <div ref={root} className={styles.chocolateMascot} aria-hidden="true">
      <div ref={character} className={styles.chocolateCharacter}>
        <img src="/chocolate-contact-mascot.png" alt="" />
        <i ref={(node) => { pupils.current[0] = node; }} className={`${styles.trackingPupil} ${styles.leftPupil}`} />
        <i ref={(node) => { pupils.current[1] = node; }} className={`${styles.trackingPupil} ${styles.rightPupil}`} />
        <div ref={check} className={styles.clipboardCheck}>{"✓"}</div>
      </div>
      <div ref={confetti} className={styles.tastefulConfetti}>{Array.from({ length: 11 }, (_, index) => <i key={index} data-confetti="true" />)}</div>
    </div>
  );
}

