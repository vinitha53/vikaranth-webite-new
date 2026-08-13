"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Clock3, MapPin } from "lucide-react";
import MascotCharacter from "./MascotCharacter";
import ContactForm from "./ContactForm";
import ContactBrochureFlipbook from "./ContactBrochureFlipbook";
import styles from "./contact.module.css";

export default function ContactJourney() {
  const storyRef = useRef(null);
  const mascotWrapRef = useRef(null);
  const headingRef = useRef(null);
  const mascotMotionRef = useRef(null);
  const brochureRef = useRef(null);
  const progressRef = useRef(null);
  const [mascotState, setMascotState] = useState("idle");
  const [formMessage, setFormMessage] = useState("Hey there! Let's get your ingredient enquiry sorted.");
  const [scrollMessage, setScrollMessage] = useState("");
  const [formActive, setFormActive] = useState(false);

  const react = (state, text) => {
    setFormActive(true);
    setMascotState(state);
    if (text) setFormMessage(text);
    window.clearTimeout(window.__vccJourneyTimer);
    window.__vccJourneyTimer = window.setTimeout(() => setFormActive(false), 2200);
  };

  useEffect(() => {
    const story = storyRef.current;
    const mascot = mascotWrapRef.current;
    const heading = headingRef.current;
    const mascotMotion = mascotMotionRef.current;
    const brochure = brochureRef.current;
    if (!story || !heading || !mascot || !mascotMotion || !brochure) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      const desktop = window.innerWidth > 820;
      const enter = Math.min(1, progress / .18);
      const transfer = Math.max(0, Math.min(1, (progress - .43) / .25));
      const eased = transfer * transfer * (3 - 2 * transfer);

      if (desktop) {
        const baseTop = heading.offsetTop + heading.offsetHeight + 28;
        const storyTop = window.scrollY + rect.top;
        const maxTop = Math.max(baseTop, story.offsetHeight - mascot.offsetHeight - 135);
        const followTop = Math.max(baseTop, Math.min(maxTop, window.scrollY - storyTop + baseTop));
        const followY = followTop - baseTop;
        mascot.style.top = `${baseTop}px`;
        mascot.style.width = "48%";
        mascot.style.height = `${Math.max(560, window.innerHeight - 260)}px`;
        const availableX = Math.max(0, story.clientWidth * .53);
        const floatY = reduced ? 0 : Math.sin(progress * Math.PI * 7) * 5;
        mascot.style.transform = "none";
        mascotMotion.style.transform = `translate3d(${availableX * eased}px, ${followY + floatY}px, 0) scaleX(${transfer > .52 ? -1 : 1})`;
        mascotMotion.style.opacity = "1";
        brochure.style.transform = `translate3d(${(1 - eased) * -95}px, 0, 0)`;
        brochure.style.opacity = String(.12 + eased * .88);
      } else {
        const startTop = heading.offsetTop + heading.offsetHeight + 24;
        const brochureTop = brochure.parentElement.offsetTop + 45;
        mascot.style.top = `${startTop}px`;
        mascot.style.width = "100%";
        mascot.style.height = window.innerWidth <= 520 ? "335px" : "390px";
        mascot.style.transform = "none";
        mascotMotion.style.transform = `translate3d(0, ${(brochureTop - startTop) * eased + (reduced ? 0 : (1 - enter) * -120)}px, 0)`;
        mascotMotion.style.opacity = "1";
        brochure.style.transform = "none";
        brochure.style.opacity = "1";
      }

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      if (!formActive) {
        if (progress < .22) { setMascotState("idle"); setScrollMessage(""); }
        else if (progress < .48) { setMascotState("approved"); setScrollMessage("Great - keep scrolling and I'll show you our portfolio."); }
        else { setMascotState("listening"); setScrollMessage("Here's our ingredient brochure. Have a look!"); }
      }
    };

    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(window.__vccJourneyTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [formActive]);

  return (
    <section className={styles.contactJourney} ref={storyRef}>
      <div className={styles.journeyProgress}><i ref={progressRef} /></div>
      <header className={styles.journeySectionHeading} ref={headingRef}>
        <span>Contact Vikranth</span>
        <h1>Fill me in</h1>
        <p>Share a few details and we&apos;ll route your message to the right person.</p>
        <i aria-hidden="true" />
      </header>
      <div className={styles.journeyMascotLayer} style={{ position: "absolute", inset: 0, height: "100%", zIndex: 8, pointerEvents: "none" }}>
        <div className={styles.journeyMascotWrap} ref={mascotWrapRef} style={{ position: "absolute", top: 230, left: 0, width: "48%", height: 700 }}>
          <div className={styles.journeyCharacterFrame} aria-hidden="true" />

          <div className={styles.journeyCharacterMover} ref={mascotMotionRef}><MascotCharacter state={mascotState} /></div>
        </div>
      </div>

      <div className={`${styles.journeyPanel} ${styles.formJourneyPanel}`}>
        <div className={styles.journeyForm}><ContactForm onMascotState={react} /></div>
      </div>

      <div className={`${styles.journeyPanel} ${styles.brochureJourneyPanel}`} id="brochure">
        <div className={styles.journeyBrochure} ref={brochureRef}>
          <ContactBrochureFlipbook />
        </div>
        <div className={styles.brochureMascotFrame} aria-hidden="true"><span>YOUR INGREDIENT GUIDE</span><i /></div>
        <div className={styles.brochureTrust}>
          <span><Clock3 /><b>Quick response</b><small>Business-hour support</small></span>
          <span><MapPin /><b>India-wide supply</b><small>Coordinated from Chennai</small></span>
        </div>
      </div>
    </section>
  );
}





