"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MascotCharacter from "./MascotCharacter";
import ContactForm from "./ContactForm";
import WhatsAppContactCta from "./WhatsAppContactCta";
import BrochureContactCta from "./BrochureContactCta";
import styles from "./contact.module.css";

gsap.registerPlugin(useGSAP);

const CHARACTER_ASSETS = [
  "/contact/cocoa-bean-side-walk-sprite.png",
  "/contact/cocoa-bean-three-quarter.png",
  "/cocoa-bean-character.png",
  "/contact/cocoa-bean-front-blink.png",
];

// Rightmost visible point of the presenting hand in the square front-pose asset.
const PRESENTING_HAND_EDGE = 1104 / 1254;
const WALK_SEQUENCE = [0, 1, 2, 3, 2, 1, 4, 5, 6, 7, 6, 5];

let activeContactTimelines = 0;

const preloadCharacterAssets = () => Promise.all(CHARACTER_ASSETS.map((src) => new Promise((resolve, reject) => {
  const image = new Image();
  let settled = false;
  const complete = async () => {
    if (settled) return;
    settled = true;
    try { await image.decode?.(); } catch { /* onload confirms the safe fallback */ }
    resolve(src);
  };
  image.onload = complete;
  image.onerror = () => {
    if (settled) return;
    settled = true;
    reject(new Error(`Failed to decode character asset: ${src}`));
  };
  image.src = src;
  if (image.complete && image.naturalWidth > 0) complete();
})));

export default function ContactJourney() {
  const stageRef = useRef(null);
  const mascotRef = useRef(null);
  const formRef = useRef(null);
  const bubbleRef = useRef(null);
  const shadowRef = useRef(null);
  const timelineRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [mascotState, setMascotState] = useState("idle");
  const [formMessage, setFormMessage] = useState("Fill me! Tell us what you need.");
  const [formActive, setFormActive] = useState(false);

  useEffect(() => setMounted(true), []);

  const react = (state, text) => {
    setFormActive(true);
    setMascotState(state);
    if (text) setFormMessage(text);
    window.clearTimeout(window.__vccContactFormTimer);
    window.__vccContactFormTimer = window.setTimeout(() => {
      setFormActive(false);
      setFormMessage("Fill me! Tell us what you need.");
    }, 2200);
  };

  useGSAP(() => {
    const stage = stageRef.current;
    const mascot = mascotRef.current;
    const form = formRef.current;
    const bubble = bubbleRef.current;
    const shadow = shadowRef.current;
    if (!stage || !mascot || !form || !bubble || !shadow) return undefined;

    const beanWalk = mascot.querySelector("[data-cocoa-walk]");
    const beanThreeQuarter = mascot.querySelector("[data-cocoa-three-quarter]");
    const beanFront = mascot.querySelector("[data-cocoa-front]");
    const beanBlink = mascot.querySelector("[data-cocoa-blink]");
    if (!beanWalk || !beanThreeQuarter || !beanFront || !beanBlink) return undefined;

    let cancelled = false;
    let observer;
    let finalStateTimer;
    let hasPlayed = false;
    let countedTimeline = false;
    const walkFrame = { value: 0 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paintWalkFrame = () => {
      const frame = WALK_SEQUENCE[Math.floor(walkFrame.value) % WALK_SEQUENCE.length];
      beanWalk.style.backgroundPosition = `${((frame % 4) / 3) * 100}% ${Math.floor(frame / 4) * 100}%`;
    };

    const getPositions = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        return { finalMascotX: 0, startMascotX: -38, startFormX: 38 };
      }
      const stageBox = stage.getBoundingClientRect();
      const mascotBox = mascot.getBoundingClientRect();
      const formBox = form.getBoundingClientRect();
      const formLeft = formBox.left - stageBox.left;
      const renderedPoseSize = Math.min(mascotBox.width, mascotBox.height);
      const renderedPoseLeft = mascotBox.left - stageBox.left + (mascotBox.width - renderedPoseSize) / 2;
      const presentingHand = renderedPoseLeft + renderedPoseSize * PRESENTING_HAND_EDGE;
      const finalMascotX = Math.round(formLeft - presentingHand - 8);
      const startFormX = Math.round(20 - formLeft);
      return { finalMascotX, startFormX, startMascotX: finalMascotX + startFormX };
    };

    const { finalMascotX, startMascotX, startFormX } = getPositions();

    // The natural final layout is the safe first paint; loading can never strand it off-screen.
    gsap.set(mascot, { x: finalMascotX, y: 0, rotation: 0, scale: 1, opacity: 1, transformOrigin: "50% 100%" });
    gsap.set(form, { x: 0, y: 0, scale: 1, opacity: 1, transformOrigin: "50% 50%" });
    gsap.set(shadow, { x: 0, opacity: .2 });
    gsap.set([beanWalk, beanThreeQuarter, beanBlink], { opacity: 0, scale: 1, transformOrigin: "50% 100%" });
    gsap.set(beanFront, { opacity: 1, scale: 1, transformOrigin: "50% 100%" });
    gsap.set(bubble, { opacity: 1, y: 0, scale: 1, transformOrigin: "30% 100%" });
    paintWalkFrame();

    const showFinalState = () => {
      gsap.set(mascot, { x: finalMascotX, y: 0, rotation: 0, scale: 1, opacity: 1 });
      gsap.set(form, { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set(shadow, { x: 0, opacity: .2 });
      gsap.set([beanWalk, beanThreeQuarter, beanBlink], { opacity: 0 });
      gsap.set(beanFront, { opacity: 1, scale: 1 });
      gsap.set(bubble, { opacity: 1, y: 0, scale: 1 });
    };

    const captureInvariant = (label, initial) => {
      const formBox = form.getBoundingClientRect();
      const mascotBox = mascot.getBoundingClientRect();
      const values = { formWidth: formBox.width, formHeight: formBox.height, mascotWidth: mascotBox.width, mascotHeight: mascotBox.height };
      if (!initial) return values;
      stage.dataset.lastAnimationCheckpoint = label;
      stage.dataset.formSizeStable = String(Math.abs(values.formWidth - initial.formWidth) < .5 && Math.abs(values.formHeight - initial.formHeight) < .5);
      stage.dataset.characterSizeStable = String(Math.abs(values.mascotWidth - initial.mascotWidth) < .5 && Math.abs(values.mascotHeight - initial.mascotHeight) < .5);
      return values;
    };

    const buildAndPlay = () => {
      if (cancelled || hasPlayed) return;
      hasPlayed = true;

      finalStateTimer = window.setTimeout(showFinalState, 5200);

      gsap.set(mascot, { x: startMascotX, y: 0, rotation: 1.2, scale: 1, opacity: 1 });
      gsap.set(form, { x: startFormX, y: 0, scale: 1, opacity: 1 });
      gsap.set(shadow, { x: startFormX, opacity: .12 });
      gsap.set(beanWalk, { opacity: 1 });
      gsap.set([beanThreeQuarter, beanFront, beanBlink], { opacity: 0 });
      gsap.set(bubble, { opacity: 0, y: 8, scale: 1 });

      const initialMetrics = captureInvariant("0.0s");
      mascot.style.willChange = "transform";
      form.style.willChange = "transform";
      beanWalk.style.willChange = "background-position, opacity";

      activeContactTimelines += 1;
      countedTimeline = true;
      stage.dataset.activeTimelineCount = String(activeContactTimelines);

      const timeline = gsap.timeline({
        paused: true,
        defaults: { force3D: true },
        onComplete: () => {
          window.clearTimeout(finalStateTimer);
          showFinalState();
          mascot.style.willChange = "";
          form.style.willChange = "";
          beanWalk.style.willChange = "";
          captureInvariant("5.0s", initialMetrics);
        },
      });
      timelineRef.current = timeline;

      timeline
        .set(mascot, { opacity: 1 }, 0)
        .set(shadow, { opacity: .12 }, 0)
        .to(mascot, { x: finalMascotX + Math.round(startFormX * .08), duration: 3.1, ease: "none" }, .1)
        .to(form, { x: Math.round(startFormX * .08), duration: 3.1, ease: "none" }, .1)
        .to(shadow, { x: Math.round(startFormX * .08), opacity: .2, duration: 3.1, ease: "none" }, .1)
        .to(walkFrame, { value: 32, duration: 3.1, ease: "steps(32)", onUpdate: paintWalkFrame }, .1)
        .to(mascot, { y: -3, duration: .19375, repeat: 15, yoyo: true, ease: "sine.inOut" }, .1)
        .call(() => { walkFrame.value = 1; paintWalkFrame(); }, null, 3.2)
        .to(mascot, { x: finalMascotX, y: 0, rotation: 0, duration: .4, ease: "power2.out" }, 3.2)
        .to(form, { x: 0, duration: .4, ease: "power2.out" }, 3.2)
        .to(shadow, { x: 0, duration: .4, ease: "power2.out" }, 3.2)
        .call(() => captureInvariant("3.2s", initialMetrics), null, 3.2)
        .to(beanWalk, { opacity: 0, duration: .3, ease: "power1.inOut" }, 3.6)
        .to(beanThreeQuarter, { opacity: 1, duration: .3, ease: "power1.inOut" }, 3.6)
        .to(beanThreeQuarter, { opacity: 0, duration: .3, ease: "power1.inOut" }, 3.9)
        .to(beanFront, { opacity: 1, duration: .3, ease: "power1.inOut" }, 3.9)
        .call(() => captureInvariant("4.2s", initialMetrics), null, 4.2)
        .to(mascot, { y: -2, duration: .2, ease: "sine.out" }, 4.2)
        .to(mascot, { y: 0, duration: .2, ease: "sine.inOut" }, 4.4)
        .to(bubble, { opacity: 1, y: 0, duration: .35, ease: "power2.out" }, 4.3)
        .to(beanFront, { opacity: 0, duration: .06, ease: "none" }, 4.58)
        .to(beanBlink, { opacity: 1, duration: .06, ease: "none" }, 4.58)
        .to(beanBlink, { opacity: 0, duration: .06, ease: "none" }, 4.72)
        .to(beanFront, { opacity: 1, duration: .06, ease: "none" }, 4.72)
        .to({}, { duration: .22 }, 4.78);

      if (Math.abs(timeline.totalDuration() - 5) >= .001) timeline.duration(5);
      stage.dataset.timelineDuration = timeline.totalDuration().toFixed(1);
      timeline.play(0);
    };

    const prepare = async () => {
      try {
        const fontReady = document.fonts?.ready || Promise.resolve();
        const fontSafetyTimeout = new Promise((resolve) => window.setTimeout(resolve, 350));
        const assetSafetyTimeout = new Promise((resolve) => window.setTimeout(resolve, 900));
        await Promise.all([Promise.race([preloadCharacterAssets(), assetSafetyTimeout]), Promise.race([fontReady, fontSafetyTimeout])]);
      } catch {
        if (!cancelled) {
          stage.dataset.characterAssetStatus = "fallback";
          showFinalState();
        }
        return;
      }
      if (cancelled) return;
      if (reduced) { showFinalState(); return; }

      const box = stage.getBoundingClientRect();
      const visible = box.top < window.innerHeight && box.bottom > 0;
      if (visible) buildAndPlay();
      else {
        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            buildAndPlay();
          }
        }, { threshold: .08 });
        observer.observe(stage);
      }
    };

    prepare();

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.clearTimeout(finalStateTimer);
      timelineRef.current?.kill();
      timelineRef.current = null;
      if (countedTimeline) activeContactTimelines = Math.max(0, activeContactTimelines - 1);
      window.clearTimeout(window.__vccContactFormTimer);
    };
  }, { scope: stageRef, dependencies: [mounted], revertOnUpdate: true });

  if (!mounted) {
    return <section className={`${styles.contactJourney} ${styles.contactJourneyLoading}`} aria-busy="true" aria-label="Loading contact form" />;
  }

  return (
    <section className={styles.contactJourney}>
      <div className={styles.journeySectionHeading}>
        <span>Contact Vikranth</span>
        <h1>Fill me in</h1>
        <p>Share a few details and we&apos;ll route your message to the right person.</p>
        <i aria-hidden="true" />
      </div>

      <div className={styles.enquiryAnimationStage} ref={stageRef}>
        <div className={styles.sharedGroundShadow} ref={shadowRef} aria-hidden="true" />
        <div className={styles.mascotEntranceColumn}>
          <div className={styles.mascotStageSurface} aria-hidden="true" />
          <div className={styles.entranceSpeechBubble} ref={bubbleRef} aria-hidden="true">
            {formActive ? formMessage : "Fill me! Tell us what you need."}
          </div>
          <div className={`${styles.journeyCharacterMover} ${styles.mascotEntranceMover}`} ref={mascotRef}>
            <MascotCharacter state={mascotState} />
          </div>
        </div>

        <div className={styles.journeyForm} ref={formRef}>
          <ContactForm onMascotState={react} />
        </div>
      </div>

      <WhatsAppContactCta />
      <BrochureContactCta />
    </section>
  );
}
