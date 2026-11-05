import Button from '@/components/Button/Button';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.inner}>
        <span className={`${styles.tag} ${styles.reveal}`} style={{ '--delay': '0.1s' }}>
          Error 404
        </span>

        {/* Decorative number, so screen readers skip it */}
        <div className={`${styles.codeWrap} ${styles.reveal}`} style={{ '--delay': '0.2s' }}>
          <span className={styles.code} aria-hidden="true">
            404
          </span>
        </div>

        <h1 className={`${styles.title} ${styles.reveal}`} style={{ '--delay': '0.35s' }}>
          Page not found
        </h1>

        <p className={styles.reveal} style={{ '--delay': '0.45s' }}>
          The page you are looking for does not exist, has been moved, or never existed in the
          first place.
        </p>

        <div className={`${styles.buttons} ${styles.reveal}`} style={{ '--delay': '0.6s' }}>
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/#projects" variant="outline">
            View projects
          </Button>
        </div>
      </div>
    </main>
  );
}