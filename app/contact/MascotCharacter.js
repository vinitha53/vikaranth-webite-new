"use client";

import styles from "./contact.module.css";

export default function MascotCharacter({ state = "idle" }) {
  return (
    <div className={styles.cocoaBeanMascot} data-state={state} aria-hidden="true">
      <div className={styles.cocoaBeanWalkSprite} data-cocoa-walk="true" />
      <img
        src="/contact/cocoa-bean-three-quarter.webp"
        alt=""
        width="379"
        height="694"
        draggable="false"
        className={`${styles.cocoaBeanPose} ${styles.cocoaBeanThreeQuarter}`}
        data-cocoa-three-quarter="true"
      />
      <img
        src="/cocoa-bean-character.webp"
        alt=""
        width="1254"
        height="1254"
        draggable="false"
        className={`${styles.cocoaBeanPose} ${styles.cocoaBeanFront}`}
        data-cocoa-front="true"
      />
      <img
        src="/contact/cocoa-bean-front-blink.webp"
        alt=""
        width="1254"
        height="1254"
        draggable="false"
        className={`${styles.cocoaBeanPose} ${styles.cocoaBeanBlink}`}
        data-cocoa-blink="true"
      />
    </div>
  );
}
