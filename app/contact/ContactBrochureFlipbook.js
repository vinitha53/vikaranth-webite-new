"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Download, Expand, Grid2X2, Minimize2, RotateCcw, Search, Volume2, VolumeX, X, ZoomIn, ZoomOut } from "lucide-react";
import { brochureSearchIndex } from "./brochureSearchIndex";
import styles from "./ContactBrochureFlipbook.module.css";

const TOTAL_PAGES = 4;
const PDF_URL = "/brochures/vcc-product-brochure.pdf";
const pageImage = (page) => `/brochures/pages/vcc-page-${page}.webp`;

const BookPage = forwardRef(function BookPage({ page, onError }, ref) {
  const isCover = page === 1 || page === TOTAL_PAGES;
  return (
    <div ref={ref} className={`${styles.page} ${isCover ? styles.hardPage : ""}`} data-density={isCover ? "hard" : "soft"}>
      <img src={pageImage(page)} alt={`VCC product brochure page ${page}`} loading={page <= 3 ? "eager" : "lazy"} decoding="async" draggable="false" onError={onError} />
      <span aria-hidden="true">{page}</span>
    </div>
  );
});

export default function ContactBrochureFlipbook({ standalone = false }) {
  const bookRef = useRef(null);
  const viewerRef = useRef(null);
  const fullscreenButtonRef = useRef(null);
  const [page, setPage] = useState(1);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [turning, setTurning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [thumbsOpen, setThumbsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [announcement, setAnnouncement] = useState("Brochure cover ready");
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const requested = Number(new URL(window.location.href).searchParams.get("brochurePage"));
    if (requested >= 1 && requested <= TOTAL_PAGES) window.setTimeout(() => bookRef.current?.pageFlip()?.turnToPage(requested - 1), 100);
    if (localStorage.getItem("vcc-brochure-muted") === "true") setMuted(true);
  }, []);

  useEffect(() => {
    const onFullscreen = () => {
      const active = document.fullscreenElement === viewerRef.current;
      setFullscreen(active);
      if (!active) fullscreenButtonRef.current?.focus();
      window.setTimeout(() => bookRef.current?.pageFlip()?.update?.(), 80);
    };
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = fallbackFullscreen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [fallbackFullscreen]);

  const playTurn = useCallback(() => {
    if (muted || reducedMotion.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const length = Math.floor(ctx.sampleRate * .11);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    filter.type = "bandpass"; filter.frequency.value = 900; gain.gain.value = .035;
    source.buffer = buffer; source.connect(filter).connect(gain).connect(ctx.destination); source.start();
    source.addEventListener("ended", () => ctx.close());
  }, [muted]);

  const updateUrl = useCallback((nextPage) => {
    const url = new URL(window.location.href);
    url.searchParams.set("brochurePage", String(nextPage));
    window.history.replaceState({ ...window.history.state, brochurePage: nextPage }, "", url);
  }, []);

  const goTo = useCallback((target, animate = false) => {
    const api = bookRef.current?.pageFlip();
    if (!api) return;
    const safe = Math.max(0, Math.min(TOTAL_PAGES - 1, target - 1));
    if (animate) api.flip(safe, "top"); else api.turnToPage(safe);
  }, []);

  useEffect(() => {
    const restorePage = () => {
      const requested = Number(new URL(window.location.href).searchParams.get("brochurePage"));
      if (requested >= 1 && requested <= TOTAL_PAGES) goTo(requested);
    };
    window.addEventListener("popstate", restorePage);
    return () => window.removeEventListener("popstate", restorePage);
  }, [goTo]);

  const next = () => { if (!turning) bookRef.current?.pageFlip()?.flipNext("top"); };
  const previous = () => { if (!turning) bookRef.current?.pageFlip()?.flipPrev("top"); };

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term.length < 2 ? [] : brochureSearchIndex.filter((item) => item.text.toLowerCase().includes(term));
  }, [query]);

  const toggleFullscreen = async () => {
    if (fallbackFullscreen) { setFallbackFullscreen(false); setFullscreen(false); return; }
    if (document.fullscreenElement) { await document.exitFullscreen(); return; }
    if (viewerRef.current?.requestFullscreen) {
      try { await viewerRef.current.requestFullscreen(); return; } catch { /* use modal fallback */ }
    }
    setFallbackFullscreen(true); setFullscreen(true);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      if (searchOpen || thumbsOpen || zoom > 1) { setSearchOpen(false); setThumbsOpen(false); setZoom(1); }
      else if (fallbackFullscreen) toggleFullscreen();
      return;
    }
    if (["INPUT", "BUTTON", "A"].includes(event.target.tagName)) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") { event.preventDefault(); next(); }
    if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); previous(); }
    if (event.key === "Home") { event.preventDefault(); goTo(1); }
    if (event.key === "End") { event.preventDefault(); goTo(TOTAL_PAGES); }
  };

  const toggleSound = () => setMuted((value) => { localStorage.setItem("vcc-brochure-muted", String(!value)); return !value; });

  return (
    <section id="product-brochure" className={`${styles.viewer} ${standalone ? styles.standalone : ""} ${fallbackFullscreen ? styles.fallbackFullscreen : ""}`} ref={viewerRef} tabIndex="0" onKeyDown={onKeyDown} aria-label="Interactive VCC product brochure">
      <div className={styles.toolbar} role="toolbar" aria-label="Brochure tools">
        <button type="button" onClick={previous} disabled={page === 1 || turning} title="Previous page" aria-label="Previous page"><ChevronLeft /></button>
        <strong aria-label={`Page ${page} of ${TOTAL_PAGES}`}>{page} / {TOTAL_PAGES}</strong>
        <button type="button" onClick={next} disabled={page === TOTAL_PAGES || turning} title="Next page" aria-label="Next page"><ChevronRight /></button>
        <i />
        <button type="button" className={searchOpen ? styles.active : ""} onClick={() => { setSearchOpen((v) => !v); setThumbsOpen(false); }} title="Search brochure" aria-label="Search brochure"><Search /></button>
        <button type="button" onClick={() => setZoom((v) => Math.min(3, +(v + .25).toFixed(2)))} disabled={zoom >= 3} title="Zoom in" aria-label="Zoom in"><ZoomIn /></button>
        <button type="button" onClick={() => setZoom((v) => Math.max(1, +(v - .25).toFixed(2)))} disabled={zoom <= 1} title="Zoom out" aria-label="Zoom out"><ZoomOut /></button>
        <button type="button" onClick={() => setZoom(1)} disabled={zoom === 1} title="Reset zoom" aria-label="Reset zoom"><RotateCcw /></button>
        <button type="button" className={thumbsOpen ? styles.active : ""} onClick={() => { setThumbsOpen((v) => !v); setSearchOpen(false); }} title="Page thumbnails" aria-label="Open page thumbnails"><Grid2X2 /></button>
        <button type="button" onClick={toggleSound} title={muted ? "Turn page sound on" : "Mute page sound"} aria-label={muted ? "Turn page sound on" : "Mute page sound"}>{muted ? <VolumeX /> : <Volume2 />}</button>
        <button ref={fullscreenButtonRef} type="button" onClick={toggleFullscreen} title={fullscreen ? "Exit fullscreen" : "Maximise viewer"} aria-label={fullscreen ? "Exit fullscreen" : "Maximise viewer"}>{fullscreen ? <Minimize2 /> : <Expand />}</button>
        <a href={PDF_URL} download title="Download PDF" aria-label="Download brochure PDF"><Download /></a>
      </div>

      {searchOpen && <div className={styles.panel} role="search">
        <div className={styles.panelTitle}><b>Search brochure</b><button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button></div>
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try chocolate, fruit, bakery…" aria-label="Search brochure text" />
        <div className={styles.searchResults}>
          {query.trim().length < 2 && <p>Enter at least two characters.</p>}
          {query.trim().length >= 2 && !results.length && <p>No matching pages found.</p>}
          {results.map((result) => <button type="button" key={result.page} onClick={() => { goTo(result.page); setSearchOpen(false); }}><b>Page {result.page}</b><span>{result.text.slice(0, 150)}…</span></button>)}
        </div>
      </div>}

      {thumbsOpen && <div className={`${styles.panel} ${styles.thumbsPanel}`} aria-label="Brochure thumbnails">
        <div className={styles.panelTitle}><b>All pages</b><button type="button" onClick={() => setThumbsOpen(false)} aria-label="Close thumbnails"><X /></button></div>
        <div className={styles.thumbs}>{Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((number) => <button type="button" key={number} className={number === page ? styles.currentThumb : ""} onClick={() => { goTo(number); if (window.innerWidth < 760) setThumbsOpen(false); }} aria-label={`Open page ${number}`}><img src={pageImage(number)} alt="" loading="lazy" /><span>Page {number}</span></button>)}</div>
      </div>}

      <div className={styles.stage}>
        {!ready && !failed && <div className={styles.skeleton}><span />Loading brochure…</div>}
        {failed ? <div className={styles.error}><b>We couldn’t load the brochure.</b><p>Please retry or open the PDF directly.</p><button type="button" onClick={() => window.location.reload()}>Retry</button><a href={PDF_URL}>Open PDF</a></div> :
          <div className={`${styles.panArea} ${zoom > 1 ? styles.zoomed : ""}`} onWheel={(event) => { if (event.ctrlKey || event.metaKey) { event.preventDefault(); setZoom((v) => Math.max(1, Math.min(3, +(v + (event.deltaY < 0 ? .25 : -.25)).toFixed(2)))); } }}>
            <div className={styles.bookScale} style={{ margin: `${(zoom - 1) * 375}px ${(zoom - 1) * 530}px`, transform: `scale(${zoom})` }}>
              <HTMLFlipBook ref={bookRef} width={530} height={750} size="stretch" minWidth={275} maxWidth={530} minHeight={389} maxHeight={750} showCover usePortrait autoSize drawShadow maxShadowOpacity={0.4} flippingTime={reducedMotion.current ? 180 : 1150} useMouseEvents showPageCorners swipeDistance={25} mobileScrollSupport startPage={0}
                onInit={(event) => { setReady(true); setPage(event.data.page + 1); }}
                onFlip={(event) => { const nextPage = event.data + 1; setPage(nextPage); setAnnouncement(`Page ${nextPage} of ${TOTAL_PAGES}`); updateUrl(nextPage); playTurn(); }}
                onChangeState={(event) => setTurning(event.data === "flipping")}>
                {Array.from({ length: TOTAL_PAGES }, (_, i) => <BookPage key={i + 1} page={i + 1} onError={() => setFailed(true)} />)}
              </HTMLFlipBook>
            </div>
          </div>}
        <button type="button" className={`${styles.edgeArrow} ${styles.leftArrow}`} onClick={previous} disabled={page === 1 || turning} aria-label="Previous brochure page"><ChevronLeft /></button>
        <button type="button" className={`${styles.edgeArrow} ${styles.rightArrow}`} onClick={next} disabled={page === TOTAL_PAGES || turning} aria-label="Next brochure page"><ChevronRight /></button>
      </div>

      <div className={styles.progressRow}>
        <label htmlFor="brochure-progress">Page {page} of {TOTAL_PAGES}</label>
        <input id="brochure-progress" type="range" min="1" max={TOTAL_PAGES} value={page} onChange={(e) => goTo(Number(e.target.value))} aria-label="Choose brochure page" />
        <span>{Math.round(zoom * 100)}%</span>
      </div>
      <div className={styles.srOnly} aria-live="polite">{announcement}</div>
    </section>
  );
}
