"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Lenis smooth scrolling for wheel and trackpad; touch scrolling stays native. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
      allowNestedScroll: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
