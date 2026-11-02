import { useEffect, useState, type RefObject } from "react";

export function useCanScrollDown(targetRef: RefObject<HTMLElement | null>) {
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    function check() {
      if (!target) return;
      const remaining = target.scrollHeight - target.scrollTop - target.clientHeight;
      setCanScrollDown(remaining > 8);
    }

    check();
    target.addEventListener("scroll", check);

    // Re-check when the window resizes or projects finish loading
    const resizeObserver = new ResizeObserver(check);
    resizeObserver.observe(target);
    const mutationObserver = new MutationObserver(check);
    mutationObserver.observe(target, { childList: true, subtree: true });

    return () => {
      target.removeEventListener("scroll", check);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [targetRef]);

  return canScrollDown;
}