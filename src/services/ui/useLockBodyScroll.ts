import { useLayoutEffect } from "react";

export default function useLockBodyScroll(): void {
  useLayoutEffect(() => {
    document.body.classList.add("modal-open");

    return () => document.body.classList.remove("modal-open");
  }, []);
}
