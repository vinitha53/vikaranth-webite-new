"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, ExternalLink, Maximize2, Minimize2, RotateCcw, Share2, Volume2, VolumeX, ZoomIn, ZoomOut } from "lucide-react";
import styles from "./brochure.module.css";

const pages = [1, 2, 3, 4].map((page) => `/brochures/pages/vcc-page-${page}.webp`);

export default function Flipbook() {
  const viewerRef = useRef(null);
  const [view, setView] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [shared, setShared] = useState(false);
  const maxView = mobile ? 3 : 2;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => {
      setMobile(media.matches);
      setView((current) => Math.min(current, media.matches ? 3 : 2));
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const playTurn = useCallback(() => {
    if (muted) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(125, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(58, context.currentTime + 0.12);
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.13);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.14);
    oscillator.addEventListener("ended", () => context.close());
  }, [muted]);

  const go = useCallback((direction) => {
    setView((current) => {
      const next = Math.max(0, Math.min(maxView, current + direction));
      if (next !== current) playTurn();
      return next;
    });
  }, [maxView, playTurn]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Escape" && document.fullscreenElement) document.exitFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await viewerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  };

  const share = async () => {
    const url = `${window.location.origin}/brochure`;
    if (navigator.share) await navigator.share({ title: "VCC Product Brochure", url });
    else await navigator.clipboard?.writeText(url);
    setShared(true);
    window.setTimeout(() => setShared(false), 1600);
  };

  const desktopLabel = view === 0 ? "Cover - Page 1 of 4" : view === 1 ? "Pages 2-3 of 4" : "Back - Page 4 of 4";
  const label = mobile ? `Page ${view + 1} of 4` : desktopLabel;

  return (
    <section className={styles.flipbookViewer} ref={viewerRef} style={{ "--book-zoom": zoom }} aria-label="Interactive VCC product brochure">
      <div className={styles.viewerTopbar}>
        <div><span className={styles.brandMark}>VCC</span><span><b>Product Brochure</b><small>Food ingredients &amp; supply solutions</small></span></div>
        <div className={styles.topTools}>
          <button type="button" onClick={() => setZoom((value) => Math.max(.8, +(value - .1).toFixed(1)))} aria-label="Zoom out"><ZoomOut /></button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => setZoom((value) => Math.min(1.4, +(value + .1).toFixed(1)))} aria-label="Zoom in"><ZoomIn /></button>
          <button type="button" onClick={() => setZoom(1)} aria-label="Reset zoom"><RotateCcw /></button>
          <button type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Turn page sound on" : "Mute page sound"}>{muted ? <VolumeX /> : <Volume2 />}</button>
          <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}>{fullscreen ? <Minimize2 /> : <Maximize2 />}</button>
        </div>
      </div>

      <div className={styles.bookArea}>
        <button className={`${styles.pageArrow} ${styles.prevArrow}`} type="button" onClick={() => go(-1)} disabled={view === 0} aria-label="Previous page"><ChevronLeft /></button>
        <div className={styles.bookScaler}>
          <div className={styles.book}>
            <div className={`${styles.sheet} ${styles.sheetOne} ${!mobile && view >= 1 ? styles.flipped : ""}`}>
              <div className={styles.pageFront}><img src={pages[0]} alt="VCC brochure cover, page 1" draggable="false" /></div>
              <div className={styles.pageBack}><img src={pages[1]} alt="VCC brochure page 2" draggable="false" /></div>
            </div>
            <div className={`${styles.sheet} ${styles.sheetTwo} ${!mobile && view >= 2 ? styles.flipped : ""}`}>
              <div className={styles.pageFront}><img src={pages[2]} alt="VCC brochure page 3" draggable="false" /></div>
              <div className={styles.pageBack}><img src={pages[3]} alt="VCC brochure page 4" draggable="false" /></div>
            </div>
            <div className={styles.mobilePage} key={view}><img src={pages[view]} alt={`VCC brochure page ${view + 1}`} draggable="false" /></div>
          </div>
        </div>
        <button className={`${styles.pageArrow} ${styles.nextArrow}`} type="button" onClick={() => go(1)} disabled={view === maxView} aria-label="Next page"><ChevronRight /></button>
      </div>

      <div className={styles.viewerBottom}>
        <div className={styles.pageProgress}>
          {Array.from({ length: maxView + 1 }, (_, index) => <button key={index} type="button" onClick={() => setView(index)} className={view === index ? styles.activeDot : ""} aria-label={`Open brochure view ${index + 1}`} />)}
        </div>
        <strong>{label}</strong>
        <div className={styles.viewerLinks}>
          <button type="button" onClick={share}><Share2 /> {shared ? "Copied" : "Share"}</button>
          <a href="/brochures/vcc-product-brochure.pdf" target="_blank" rel="noreferrer"><ExternalLink /> PDF</a>
          <a href="/brochures/vcc-product-brochure.pdf" download><Download /> Download</a>
        </div>
      </div>
    </section>
  );
}

