"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function sessionId() {
  const key = "rani_tours_session";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const send = () => {
      if (cancelled) return;

      const payload = {
        path: pathname,
        sessionId: sessionId(),
        referrer: document.referrer,
      };
      const body = JSON.stringify(payload);

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/analytics/view",
          new Blob([body], { type: "application/json" }),
        );
      } else {
        fetch("/api/analytics/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    };

    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof browserWindow.requestIdleCallback === "function") {
      idleId = browserWindow.requestIdleCallback(send, { timeout: 1500 });
    } else {
      timerId = setTimeout(send, 400);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) browserWindow.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [pathname]);

  return null;
}
