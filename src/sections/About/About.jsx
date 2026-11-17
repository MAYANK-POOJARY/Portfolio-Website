import SectionTitle from '@/components/SectionTitle/SectionTitle';
import Button from '@/components/Button/Button';
import { profile } from '@/data/profile';
import styles from './About.module.scss';
import Reveal from '@/components/Reveal/Reveal';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <SectionTitle index="01" label="About" title="A little about me" />

        <div className={styles.grid}>
          <Reveal className={styles.text}>
            {profile.bio.map((text, i) => (
              <p key={i} className={i === 0 ? styles.lead : ''}>
                {text}
              </p>
            ))}
            <Button href="/#contact" arrow>
              Get in touch
            </Button>
          </Reveal>

          <Reveal className={styles.photo} delay={0.15}>
            <span>{profile.initials}</span>
          </Reveal>
        </div>

        <ul className={styles.principles} aria-label="How I work">
          {profile.principles.map((principle, i) => (
            <Reveal as="li" key={principle.title} delay={i * 0.1}>
              <span className={styles.principleIndex}>0{i + 1}</span>
              <strong>{principle.title}</strong>
              <span className={styles.principleDescription}>{principle.description}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
