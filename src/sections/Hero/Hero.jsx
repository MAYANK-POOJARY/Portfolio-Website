import { profile } from '@/data/profile';
import Button from '@/components/Button/Button';
import styles from './Hero.module.scss';

export default function Hero() {
  // Split "Full Stack Developer" -> "Full Stack" + "Developer" (last word gets the accent color)
  const words = profile.role.split(' ');
  const lastWord = words.pop();
  const firstWords = words.join(' ');

  return (
    <section id="home" className={styles.hero}>
      {/* Background effects */}
      <div className={styles.grid} />
      <div className={styles.glow} />
      <div className={styles.orbit} aria-hidden="true"><span /><span /><i /><b>CREATIVE<br />DEVELOPMENT</b></div>

      <div className={styles.inner}>
        {profile.available && (
          <span className={`${styles.badge} ${styles.reveal}`} style={{ '--delay': '0.1s' }}>
            <span className={styles.dot} />
            Available for work
          </span>
        )}

        <p className={`${styles.intro} ${styles.reveal}`} style={{ '--delay': '0.2s' }}>
          Hi, I&apos;m {profile.name}
        </p>

        <h1 className={styles.reveal} style={{ '--delay': '0.3s' }}>
          {firstWords} <br />
          <span className={styles.accent}>{lastWord}<i aria-hidden="true">/ 01</i></span>
        </h1>

        <p className={`${styles.tagline} ${styles.reveal}`} style={{ '--delay': '0.5s' }}>
          {profile.tagline}
        </p>

        <div className={`${styles.buttons} ${styles.reveal}`} style={{ '--delay': '0.7s' }}>
          <Button href="/#projects" arrow>
            View my work
          </Button>
          <Button href="/#contact" variant="outline">
            Contact me
          </Button>
        </div>
      </div>

      {/* Bottom row */}
      <div className={`${styles.bottom} ${styles.reveal}`} style={{ '--delay': '0.9s' }}>
        <span>{profile.location}</span>
        <span className={styles.coordinates}>INDEPENDENT DIGITAL PRACTICE&nbsp; · &nbsp;{profile.role}</span>
        <span className={styles.scroll}>
          Scroll <i />
        </span>
      </div>
    </section>
  );
}
