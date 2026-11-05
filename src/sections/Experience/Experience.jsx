import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { experience } from '@/data/experience';
import styles from './Experience.module.scss';
import Reveal from '@/components/Reveal/Reveal';

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.inner}>
        <SectionTitle index="04" label="Experience" title="Where I've worked & studied" />

        <ol className={styles.timeline}>
          {experience.map((item) => (
            <Reveal as="li" key={item.id} className={styles.item}>
              <span className={styles.period}>{item.period}</span>

              <div className={styles.content}>
                <span className={styles.type}>
                  {item.type === 'work' ? 'Work' : 'Education'}
                </span>
                <h3>{item.role}</h3>
                <p className={styles.org}>{item.organization}</p>

                <ul className={styles.points}>
                  {item.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}