import { useEffect } from "react";

export function useSheetOpen(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    root.style.setProperty("--recede-y", `${window.scrollY + window.innerHeight / 2}px`);
    root.classList.add("sheet-open");

    return () => root.classList.remove("sheet-open");
  }, [isOpen]);
}