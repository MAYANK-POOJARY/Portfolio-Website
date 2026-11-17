'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navLinks } from '@/data/navLinks';
import { profile } from '@/data/profile';
import Button from '../Button/Button';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  // Add background after scrolling a bit
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.split('#')[1]))
      .filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .15, .4, .7] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
          {profile.initials}<span>.</span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.links}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} aria-current={active === link.href.split('#')[1] ? 'location' : undefined} className={`${styles.link} ${active === link.href.split('#')[1] ? styles.active : ''}`}>
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
          <Link key={link.label} href={link.href} aria-current={active === link.href.split('#')[1] ? 'location' : undefined} className={styles.mobileLink} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
