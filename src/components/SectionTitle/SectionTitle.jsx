import Reveal from '@/components/Reveal/Reveal';
import styles from './SectionTitle.module.scss';

export default function SectionTitle({ index, label, title }) {
  return (
    <Reveal className={styles.wrapper}>
      <span className={styles.label}>
        <span className={styles.index}>{index}</span>
        {label}
      </span>
      <h2>{title}</h2>
    </Reveal>
  );
}