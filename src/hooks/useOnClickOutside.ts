import { useEffect, useRef } from "react";

interface IOnClickOutside<T> {
  ref: React.RefObject<T>;
}

export const useOnClickOutside = <T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
): IOnClickOutside<T> => {
  const ref = useRef<T>(null);

  useEffect((): (() => void) => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref || !ref.current || ref.current.contains(<Node>event.target)) return;

      handler(event);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler]);

  return { ref };
};
