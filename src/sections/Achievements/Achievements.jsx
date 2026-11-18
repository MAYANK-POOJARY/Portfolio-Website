import SectionTitle from '@/components/SectionTitle/SectionTitle';
import Reveal from '@/components/Reveal/Reveal';
import { achievements } from '@/data/achievement';
import styles from './Achievements.module.scss';
import Image from 'next/image';

export default function Achievements() {
  return (
    <section id="achievements" className={styles.achievements}>
      <div className={styles.inner}>
        <SectionTitle index="05" label="Recognition" title="Proof of play" />
        <div className={styles.list}>
          {achievements.map((item, index) => (
            <Reveal key={item.id} className={styles.item} delay={index * 0.1}>
              <div className={styles.visual} aria-label={item.image ? undefined : 'Hackathon image placeholder'}>
                {item.image ? <Image src={item.image} alt={`${item.event} hackathon`} fill sizes="(min-width: 768px) 40vw, 100vw" /> : <span>WIN<br />/ 01</span>}
                <i aria-hidden="true" />
              </div>
              <div className={styles.copy}>
                <span className={styles.kicker}>{item.type} · {item.year}</span>
                <h3>{item.title}</h3>
                <p className={styles.event}>{item.event}</p>
                <p>{item.description}</p>
              </div>
              {/* <span className={styles.serial}>0{index + 1}</span> */}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
