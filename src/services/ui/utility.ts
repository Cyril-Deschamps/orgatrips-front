import { useEffect, useRef } from "react";

export function useScrollTo(x: number = 0, y: number = 0): void {
  useEffect(() => {
    window.scroll(x, y);
  }, [x, y]);
}

export function useMemoCompare<T>(
  next: T,
  compare: (prev: T, next: T) => boolean,
): T {
  // Ref for storing previous value
  const previousRef = useRef<T>();
  const previous = previousRef.current;

  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = previous !== undefined && compare(previous, next);

  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  // Finally, if equal then return the previous value
  return isEqual ? (previous as T) : next;
}

export function useNonNullableReference<T>(reference: T | null): T {
  return useMemoCompare(
    reference,
    (prev, next) => next === null && prev !== null,
  ) as T;
}
