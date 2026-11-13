/**
 * Single source of scroll for the whole site.
 * - Lenis drives smooth scrolling (one rAF loop, `autoRaf`).
 * - Scroll-linked effects subscribe via `onScroll` and run inside Lenis's own
 *   frame, so they never add a second rAF loop or fight the smoothing.
 * - With reduced motion, Lenis is off and we fall back to a passive native listener.
 */
import Lenis from 'lenis';

type ScrollCallback = (scrollY: number) => void;

export const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
const callbacks = new Set<ScrollCallback>();

export function initScroll() {
  if (lenis || reduceMotion) return lenis;
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.075,
    smoothWheel: true,
    wheelMultiplier: 0.75,
    touchMultiplier: 1,
    anchors: { offset: -24 },
  });
  lenis.on('scroll', ({ scroll }: { scroll: number }) => callbacks.forEach((cb) => cb(scroll)));
  return lenis;
}

/** Subscribe to (smoothed) scroll. Returns an unsubscribe function. */
export function onScroll(cb: ScrollCallback): () => void {
  initScroll(); // idempotent — safe whichever script runs first
  callbacks.add(cb);
  let native: (() => void) | null = null;
  if (!lenis) {
    let ticking = false;
    native = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        cb(window.scrollY);
      });
    };
    window.addEventListener('scroll', native, { passive: true });
  }
  cb(lenis ? lenis.scroll : window.scrollY);
  return () => {
    callbacks.delete(cb);
    if (native) window.removeEventListener('scroll', native);
  };
}

export const getLenis = () => lenis;
