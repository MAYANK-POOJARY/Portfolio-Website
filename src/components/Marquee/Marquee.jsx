import styles from './Marquee.module.scss';

export default function Marquee({ words }) {
  return (
    // decorative only, so hidden from screen readers
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {/* Same list twice = seamless loop */}
        {[0, 1].map((set) => (
          <ul key={set} className={styles.group}>
            {words.map((word) => (
              <li key={word}>
                {word}
                <span>✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}