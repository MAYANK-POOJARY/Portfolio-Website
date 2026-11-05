'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navLinks } from '@/data/navLinks';
import Button from '../Button/Button';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Add background after scrolling a bit
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/#home" className={styles.logo} onClick={closeMenu}>
          YN<span>.</span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.links}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Button href="/#contact" variant="outline">
            Let&apos;s talk
          </Button>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className={`${styles.burger} ${open ? styles.open : ''}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <nav data-lenis-prevent className={`${styles.mobileMenu} ${open ? styles.menuOpen : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} className={styles.mobileLink} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}