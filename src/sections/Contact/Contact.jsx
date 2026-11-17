import SectionTitle from '@/components/SectionTitle/SectionTitle';
import ContactForm from '@/components/ContactForm/ContactForm';
import { profile } from '@/data/profile';
import { socials } from '@/data/socials';
import styles from './Contact.module.scss';
import Reveal from '@/components/Reveal/Reveal';

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <SectionTitle index="06" label="Contact" title="Let's work together" />

        <div className={styles.grid}>
          <Reveal className={styles.info}>
            <p className={styles.lead}>
              Have a project in mind, a question, or just want to say hi? Send me a message and
              I&apos;ll get back to you.
            </p>

            <a href={`mailto:${profile.email}`} className={styles.email}>
              {profile.email}
            </a>

            <ul className={styles.socials}>
              {socials
                .filter((social) => !social.url.startsWith('mailto:') && !social.url.includes('yourusername'))
                .map((social) => (
                  <li key={social.label}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {social.label} ↗
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
