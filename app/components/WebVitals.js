"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
    if (!endpoint || !navigator.sendBeacon) return;
    const payload = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      route: window.location.pathname,
      device: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1100 ? "tablet" : "desktop",
      connection: navigator.connection?.effectiveType,
    });
    navigator.sendBeacon(endpoint, new Blob([payload], { type: "application/json" }));
  });
  return null;
}