"use client";

import { useEffect } from "react";
import InstallPrompt from "@/components/pwa/InstallPrompt";

export default function ClientLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("[ClientLayout] Service worker registration failed:", error);
      });
    }
  }, []);

  return (
    <>
      <InstallPrompt />
      {children}
    </>
  );
}
