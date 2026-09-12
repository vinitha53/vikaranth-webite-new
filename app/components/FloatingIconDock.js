"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_NUMBERS } from "../data/whatsapp";

export default function FloatingIconDock() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.02 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`floating-site-dock floating-site-dock-right${footerVisible ? " floating-site-dock-hidden" : ""}`}
      role="navigation"
      aria-label="Social media and quick contact"
      aria-hidden={footerVisible || undefined}
      inert={footerVisible || undefined}
    >
      <a className="floating-site-button" href="https://www.instagram.com/explore/search/keyword/?q=vikranth%20chemical%20corporation" target="_blank" rel="noreferrer" aria-label="Find Vikranth Chemical Corporation on Instagram"><img src="/floating-icons/instagram.webp" alt="" width="70" height="70" decoding="async" /></a>
      <a className="floating-site-button" href="https://www.facebook.com/search/top?q=Vikranth%20Chemical%20Corporation" target="_blank" rel="noreferrer" aria-label="Find Vikranth Chemical Corporation on Facebook"><img src="/floating-icons/facebook.webp" alt="" width="70" height="70" decoding="async" /></a>
      <a className="floating-site-button" href="https://in.linkedin.com/company/vikranth-chemical-corporation" target="_blank" rel="noreferrer" aria-label="Visit Vikranth Chemical Corporation on LinkedIn"><img src="/floating-icons/linkedin.webp" alt="" width="70" height="70" decoding="async" /></a>
      <a className="floating-site-button" href="tel:+919840992985" aria-label="Call Vikranth Chemical Corporation"><img src="/floating-icons/phone.webp" alt="" width="70" height="70" decoding="async" /></a>
      <a className="floating-site-button" href={"https://wa.me/" + WHATSAPP_NUMBERS.anchor} target="_blank" rel="noreferrer" aria-label="Chat with Vikranth on WhatsApp at +91 87544 29922"><img src="/whatsapp-branded-seo.webp" alt="" width="70" height="70" decoding="async" /></a>
    </div>
  );
}
