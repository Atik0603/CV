import { useEffect, type RefObject } from "react";

export function useWheelForwarding(targetRef: RefObject<HTMLElement | null>,  enabled = true ) {
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      const target = targetRef.current;
      if (!target) return;

      const origin = e.target as Element;

      // Already over the projects column → browser scrolls it natively
      if (target.contains(origin)) return;

      // Elements that handle their own scrolling (e.g. expanded card)
      if (origin.closest("[data-own-scroll]")) return;

      e.preventDefault();

      // Firefox sometimes reports in "lines" instead of pixels
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      target.scrollBy({ top: delta });
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [targetRef, enabled]);
}