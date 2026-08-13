"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react";
import styles from "./contact.module.css";

const TOTAL_PAGES = 28;
const pageImage = (page) => `/brochures/imported-pages/imported-page-${String(page).padStart(2, "0")}.webp`;

export default function ContactBrochureFlipbook() {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState("next");
  const go = useCallback((step) => {
    setDirection(step > 0 ? "next" : "prev");
    setPage((current) => Math.max(1, Math.min(TOTAL_PAGES, current + step)));
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const label = `Page ${page} of ${TOTAL_PAGES}`;

  return (
    <div className={styles.contactFlipbook} aria-label="Interactive imported ingredients brochure">
      <div className={styles.contactFlipTopbar}>
        <span><b>Imported Ingredients Brochure</b><small>Use the arrows to turn pages</small></span>
        <strong>{label}</strong>
      </div>

      <div className={styles.contactBookStage}>
        <button type="button" className={`${styles.contactBookArrow} ${styles.contactBookPrev}`} onClick={() => go(-1)} disabled={page === 1} aria-label="Previous brochure page"><ChevronLeft /></button>
        <div className={`${styles.contactBook} ${direction === "next" ? styles.turnNext : styles.turnPrev}`} key={page}>
          <figure className={`${styles.contactBookPage} ${styles.contactSinglePage}`}>
            <img src={pageImage(page)} alt={`Imported ingredients brochure page ${page}`} draggable="false" />
            <figcaption>{page}</figcaption>
          </figure>
        </div>
        <button type="button" className={`${styles.contactBookArrow} ${styles.contactBookNext}`} onClick={() => go(1)} disabled={page === TOTAL_PAGES} aria-label="Next brochure page"><ChevronRight /></button>
      </div>

      <div className={styles.contactFlipFooter}>
        <div className={styles.contactFlipProgress}><i style={{ transform: `scaleX(${page / TOTAL_PAGES})` }} /></div>
        <div className={styles.contactFlipControls}>
          <button type="button" onClick={() => go(-1)} disabled={page === 1}><ChevronLeft /> Previous</button>
          <span>{label}</span>
          <button type="button" onClick={() => go(1)} disabled={page === TOTAL_PAGES}>Next <ChevronRight /></button>
        </div>
        <div className={styles.contactFlipLinks}>
          <a href="/brochures/imported-brochure.pdf" target="_blank" rel="noreferrer"><ExternalLink /> Open PDF</a>
          <a href="/brochures/imported-brochure.pdf" download><Download /> Download</a>
        </div>
      </div>
    </div>
  );
}
