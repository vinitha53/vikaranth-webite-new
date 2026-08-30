"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createMascotController, MASCOT_STATES } from "./CocoaController";
import styles from "./CocoaMascot.module.css";

const messages = [
  { until: 0.15, text: "Hi! Welcome 👋" },
  { until: 0.48, text: "Tiny bean, big ingredient ideas ✨" },
  { until: 0.74, text: "Let’s create something delicious!" },
  { until: 1, text: "Need us? Contact details are just ahead →" },
];

const delay = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export default function CocoaMascot({
  followCursor = true,
  reactToScroll = true,
  enableWalking = true,
  enableIdleAnimations = true,
  enableProductInteractions = true,
}) {
  const rootRef = useRef(null);
  const characterRef = useRef(null);
  const pathname = usePathname();
  const [message, setMessage] = useState(messages[0].text);

  useEffect(() => {
    const root = rootRef.current;
    const character = characterRef.current;
    if (!root || !character) return undefined;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const reducedMotion = reducedMotionQuery.matches;
    const coarsePointer = coarsePointerQuery.matches;
    const controller = createMascotController(root, { reducedMotion });
    const cleanups = [];
    let alive = true;
    let pointerFrame = 0;
    let blinkTimer = 0;
    let idleTimer = 0;
    let hoverCooldownUntil = 0;
    let scrollCooldownUntil = 0;
    let lastScrollY = window.scrollY;
    let accumulatedScroll = 0;
    let currentMessage = messages[0].text;
    let targetLookX = 0;
    let targetLookY = 0;
    let renderedLookX = 0;
    let renderedLookY = 0;

    root.dataset.renderer = "image-fallback";
    root.dataset.state = MASCOT_STATES.IDLE;
    root.dataset.blinking = "false";
    root.dataset.paused = String(document.hidden);

    const listen = (target, event, handler, options) => {
      target.addEventListener(event, handler, options);
      cleanups.push(() => target.removeEventListener(event, handler, options));
    };

    const runSequence = async (steps) => {
      for (const [state, duration] of steps) {
        if (!alive || document.hidden) return;
        const completed = await controller.play(state, duration);
        if (!completed) return;
      }
    };

    const scheduleBlink = () => {
      window.clearTimeout(blinkTimer);
      if (!enableIdleAnimations || reducedMotion || document.hidden) return;
      blinkTimer = window.setTimeout(() => {
        root.dataset.blinking = "true";
        window.setTimeout(() => {
          if (!alive) return;
          root.dataset.blinking = "false";
          scheduleBlink();
        }, 145);
      }, 3000 + Math.random() * 4000);
    };

    const scheduleIdlePersonality = () => {
      window.clearTimeout(idleTimer);
      if (!enableIdleAnimations || reducedMotion || document.hidden) return;
      idleTimer = window.setTimeout(async () => {
        if (controller.state === MASCOT_STATES.IDLE) {
          const direction = Math.random() > 0.5 ? 0.72 : -0.72;
          controller.lookAt(direction, -0.08);
          await controller.play(MASCOT_STATES.LOOKING, 850);
          await delay(280);
          controller.lookAt(direction * -0.55, 0.05);
          await controller.play(MASCOT_STATES.LOOKING, 650);
          controller.lookAt(0, 0);
        }
        scheduleIdlePersonality();
      }, 8000 + Math.random() * 12000);
    };

    const renderPointer = () => {
      renderedLookX += (targetLookX - renderedLookX) * 0.16;
      renderedLookY += (targetLookY - renderedLookY) * 0.16;
      controller.lookAt(renderedLookX, renderedLookY);
      if (Math.abs(targetLookX - renderedLookX) > 0.005 || Math.abs(targetLookY - renderedLookY) > 0.005) {
        pointerFrame = window.requestAnimationFrame(renderPointer);
      } else {
        pointerFrame = 0;
      }
    };

    const handlePointerMove = (event) => {
      if (!followCursor || coarsePointer || document.hidden) return;
      const rect = character.getBoundingClientRect();
      targetLookX = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth * .42)));
      targetLookY = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight * .55)));
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
    };

    const handlePointerEnter = async () => {
      if (Date.now() < hoverCooldownUntil || reducedMotion) return;
      hoverCooldownUntil = Date.now() + 9000;
      root.dataset.engaged = "true";
      await runSequence([[MASCOT_STATES.HOVERED, 380], [MASCOT_STATES.WAVING, 950]]);
      if (alive) root.dataset.engaged = "false";
    };

    const handlePointerLeave = () => {
      root.dataset.engaged = "false";
      if (controller.state === MASCOT_STATES.HOVERED) controller.returnHome();
    };

    const handleClick = async () => {
      root.dataset.engaged = "true";
      await runSequence([[MASCOT_STATES.CLICKED, 220], [MASCOT_STATES.JUMPING, 780], [MASCOT_STATES.RETURNING, 420]]);
      if (alive) root.dataset.engaged = "false";
    };

    const updateProgressMessage = () => {
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollRange));
      const nextMessage = messages.find((item) => progress <= item.until)?.text || messages.at(-1).text;
      root.style.setProperty("--page-progress", progress.toFixed(3));
      if (nextMessage !== currentMessage) {
        currentMessage = nextMessage;
        setMessage(nextMessage);
      }
    };

    const handleScroll = () => {
      updateProgressMessage();
      if (!reactToScroll || reducedMotion || document.hidden) return;
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      accumulatedScroll += Math.abs(delta);
      if (accumulatedScroll < 240 || Date.now() < scrollCooldownUntil || controller.state !== MASCOT_STATES.IDLE) return;
      accumulatedScroll = 0;
      scrollCooldownUntil = Date.now() + 6500;
      const direction = Math.sign(delta) || 1;
      controller.lookAt(direction * .72, direction * .12);
      if (coarsePointer || !enableWalking) {
        runSequence([[MASCOT_STATES.LOOKING, 600], [MASCOT_STATES.RETURNING, 450]]);
      } else {
        // The current asset is flattened, so this is an intentional turn/weight
        // shift rather than a fake sliding walk. CocoaModel can supply locomotion.
        runSequence([[MASCOT_STATES.TURNING, 520], [MASCOT_STATES.LOOKING, 650], [MASCOT_STATES.RETURNING, 520]]);
      }
    };

    const pointToward = async (element) => {
      if (!element || reducedMotion || controller.state !== MASCOT_STATES.IDLE) return;
      const target = element.getBoundingClientRect();
      const source = character.getBoundingClientRect();
      const x = Math.sign((target.left + target.width / 2) - (source.left + source.width / 2));
      const y = Math.sign((target.top + target.height / 2) - (source.top + source.height / 2)) * .35;
      controller.lookAt(x, y);
      await runSequence([[MASCOT_STATES.TURNING, 430], [MASCOT_STATES.POINTING, 1150], [MASCOT_STATES.RETURNING, 520]]);
      controller.lookAt(0, 0);
    };

    if (followCursor && !coarsePointer) listen(window, "pointermove", handlePointerMove, { passive: true });
    listen(character, "pointerenter", handlePointerEnter);
    listen(character, "pointerleave", handlePointerLeave);
    listen(character, "click", handleClick);
    listen(window, "scroll", handleScroll, { passive: true });

    if (enableProductInteractions && !coarsePointer) {
      const cards = [...document.querySelectorAll(".product-card")];
      cards.forEach((card) => {
        let productTimer = 0;
        const enter = () => {
          if (!/chocolate|cocoa|confectionery/i.test(card.textContent || "")) return;
          productTimer = window.setTimeout(() => pointToward(card), 500);
        };
        const leave = () => window.clearTimeout(productTimer);
        listen(card, "pointerenter", enter);
        listen(card, "pointerleave", leave);
      });
    }

    const quoteTimer = window.setTimeout(() => {
      const quote = document.querySelector(".header-quote, .desktop-quote, a[href='/contact/#enquiry']");
      pointToward(quote);
    }, 24000);

    const handleVisibility = () => {
      controller.pause(document.hidden);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(idleTimer);
      if (!document.hidden) {
        scheduleBlink();
        scheduleIdlePersonality();
      }
    };
    listen(document, "visibilitychange", handleVisibility);

    updateProgressMessage();
    scheduleBlink();
    scheduleIdlePersonality();

    return () => {
      alive = false;
      controller.destroy();
      cleanups.forEach((cleanup) => cleanup());
      window.cancelAnimationFrame(pointerFrame);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(idleTimer);
      window.clearTimeout(quoteTimer);
    };
  }, [pathname, followCursor, reactToScroll, enableWalking, enableIdleAnimations, enableProductInteractions]);

  return (
    <aside className={styles.guide} ref={rootRef} aria-label="Vikranth cocoa guide">
      <div className={styles.message} aria-live="polite">{message}</div>
      <button className={styles.character} ref={characterRef} type="button" aria-label="Make the cocoa guide react">
        <span className={styles.poseStage}>
          <img className={`${styles.pose} ${styles.threeQuarter}`} src="/contact/cocoa-bean-three-quarter.webp" alt="" draggable="false" />
          <img className={`${styles.pose} ${styles.front}`} src="/cocoa-bean-character.webp" alt="" draggable="false" />
          <img className={`${styles.pose} ${styles.blink}`} src="/contact/cocoa-bean-front-blink.webp" alt="" draggable="false" />
          <i className={`${styles.pupil} ${styles.pupilLeft}`} aria-hidden="true" />
          <i className={`${styles.pupil} ${styles.pupilRight}`} aria-hidden="true" />
          <i className={styles.waveTrail} aria-hidden="true" />
          <i className={`${styles.spark} ${styles.sparkOne}`} aria-hidden="true">✦</i>
          <i className={`${styles.spark} ${styles.sparkTwo}`} aria-hidden="true">•</i>
        </span>
        <span className={styles.shadow} aria-hidden="true" />
      </button>
      <div className={styles.progress} aria-hidden="true"><i /></div>
    </aside>
  );
}
