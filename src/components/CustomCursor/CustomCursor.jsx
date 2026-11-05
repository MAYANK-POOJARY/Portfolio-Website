'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only for devices with a real mouse
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let first = true;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // On the first move, start the ring right under the mouse (no flying in from the corner)
      if (first) {
        ringX = mouseX;
        ringY = mouseY;
        first = false;
      }

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      dot.classList.add(styles.visible);
      ring.classList.add(styles.visible);
    };

    const onOver = (e) => {
      const interactive = e.target instanceof Element && e.target.closest('a, button, [data-cursor]');
      ring.classList.toggle(styles.active, Boolean(interactive));
    };

    const onLeave = () => {
      dot.classList.remove(styles.visible);
      ring.classList.remove(styles.visible);
    };

    // The ring chases the mouse with a little lag
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring}>
        <span />
      </div>
      <div ref={dotRef} className={styles.dot}>
        <span />
      </div>
    </>
  );
}