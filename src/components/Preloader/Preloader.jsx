'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/data/profile';
import styles from './Preloader.module.scss';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // Count up in random jumps (feels more natural than a steady count)
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let current = 0;
    let timeout;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;

      if (current >= 100) {
        clearInterval(interval);
        setCount(100);
        timeout = setTimeout(() => setDone(true), 400);
      } else {
        setCount(current);
      }
    }, 90);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      document.body.style.overflow = '';
    };
  }, []);

  // When finished: unlock scroll and tell the page it can start animating
  useEffect(() => {
    if (done) {
      document.body.style.overflow = '';
      document.documentElement.dataset.loaded = 'true';
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={styles.preloader}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className={styles.top}>
            <span>{profile.name}</span>
            <span>{profile.role}</span>
          </div>

          <div className={styles.counter}>
            {count}
            <small>%</small>
          </div>

          <div className={styles.bar}>
            <span style={{ transform: `scaleX(${count / 100})` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}