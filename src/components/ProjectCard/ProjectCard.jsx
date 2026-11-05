import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectCard.module.scss';
import Reveal from '../Reveal/Reveal';

export default function ProjectCard({ project, index }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <Reveal className={styles.cell} delay={(index % 2) * 0.12}>
      <article className={styles.card} style={{ '--project-color': project.color }}>
        {/* Preview area */}
        <div className={styles.preview}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={styles.image}
            />
          ) : (
            <span className={styles.number}>{number}</span>
          )}
        </div>

        {/* Details */}
        <div className={styles.body}>
          <div className={styles.meta}>
            <span>{project.year}</span>
            <span>{project.role}</span>
          </div>

          <h3>
            <Link href={`/projects/${project.slug}`} className={styles.titleLink}>
              {project.title}
            </Link>
          </h3>

          <p>{project.shortDescription}</p>

          <ul className={styles.tags}>
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className={styles.links}>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live ↗
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}