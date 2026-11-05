import SectionTitle from '@/components/SectionTitle/SectionTitle';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import { projects } from '@/data/projects';
import styles from './Projects.module.scss';

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <SectionTitle index="02" label="Projects" title="Selected work" />

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}