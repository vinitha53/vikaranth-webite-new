"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FloatingCocoaGuide = dynamic(() => import("./FloatingCocoaGuide"), { ssr: false });
const FloatingIconDock = dynamic(() => import("./FloatingIconDock"), { ssr: false });

export default function DeferredGlobalWidgets() {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const isContactPage = pathname === "/contact" || pathname?.startsWith("/contact/");

  useEffect(() => {
    const reveal = () => setReady(true);
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(reveal, { timeout: 2500 })
      : window.setTimeout(reveal, 1800);
    window.addEventListener("pointerdown", reveal, { once: true, passive: true });
    window.addEventListener("keydown", reveal, { once: true });
    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      window.removeEventListener("pointerdown", reveal);
      window.removeEventListener("keydown", reveal);
    };
  }, []);

  return ready ? <>{!isContactPage && <FloatingCocoaGuide/>}<FloatingIconDock/></> : null;
}
