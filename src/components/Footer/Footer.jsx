import Link from 'next/link';
import { profile } from '@/data/profile';
import { navLinks } from '@/data/navLinks';
import { socials } from '@/data/socials';
import styles from './Footer.module.scss';

async function getYear() {
  'use cache';
  return new Date().getFullYear();
}


export default async function Footer() {
  const year = await getYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Big call to action */}
        <div className={styles.cta}>
          <h2>
            Let&apos;s build something <span className={styles.accent}>great</span> together.
          </h2>
          <a href={`mailto:${profile.email}`} className={styles.email}>
            {profile.email}
          </a>
        </div>

        {/* Columns */}
        <div className={styles.columns}>
          <div>
            <h4 className={styles.colTitle}>{profile.name}</h4>
            <p>{profile.tagline}</p>
          </div>

          <div>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.list}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.listLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Socials</h4>
            <ul className={styles.list}>
              {socials.map((social) => {
                const isMail = social.url.startsWith('mailto:');
                return (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      className={styles.listLink}
                      {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {social.label} ↗
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
          <span>Built with Next.js &amp; SCSS</span>
        </div>
      </div>
    </footer>
  );
}