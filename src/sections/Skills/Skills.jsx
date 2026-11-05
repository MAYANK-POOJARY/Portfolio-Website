import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { skills } from "@/data/skills";
import styles from "./Skills.module.scss";
import Reveal from "@/components/Reveal/Reveal";

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.inner}>
        <SectionTitle index="03" label="Skills" title="What I work with" />

        <div className={styles.grid}>
          {skills.map((group, i) => (
            <Reveal
              key={group.category}
              className={styles.card}
              delay={(i % 2) * 0.1}
            >
              <div className={styles.cardHeader}>
                <h3>{group.category}</h3>
                <span className={styles.index}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <ul className={styles.chips}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
