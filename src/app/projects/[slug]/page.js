import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';
import { notFound } from 'next/navigation';
import Button from '@/components/Button/Button';
import Reveal from '@/components/Reveal/Reveal';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { getProjectBySlug, getProjectPosition } from '@/utils/projects';
import styles from './page.module.scss';

// Tells Next.js which pages to build: one per project
export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Page title + description for each project (shows in the browser tab and in search results)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: 'Project not found' };

  const title = `${project.title} | ${profile.name}`;

  return {
    title: project.title, // the layout template adds " | Your Name"
    description: project.shortDescription,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: 'website',
      siteName: site.siteName,
      title,
      description: project.shortDescription,
      url: `/projects/${slug}`,
      locale: site.locale,
      images: ['/opengraph-image'], // reuses the site-wide card from step 4
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.shortDescription,
    },
  };
}

export default function ProjectPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className={styles.page}>
          <div className={styles.inner}>
            <p role="status">Loading case study…</p>
          </div>
        </main>
      }
    >
      <ProjectPageContent params={params} />
    </Suspense>
  );
}

async function ProjectPageContent({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { index, next } = getProjectPosition(slug);
  const number = String(index + 1).padStart(2, '0');

  return (
    <main className={styles.page} style={{ '--project-color': project.color }}>
      <div className={styles.inner}>
        <Link href="/#projects" className={styles.back}>
          ← All projects
        </Link>

        {/* Header */}
        <Reveal className={styles.header}>
          <div className={styles.meta}>
            <span>{project.year}</span>
            <span>{project.role}</span>
          </div>

          <h1>{project.title}</h1>
          <p className={styles.lead}>{project.shortDescription}</p>

          {(project.liveUrl && !project.liveUrl.includes('example.com')) || (project.githubUrl && !project.githubUrl.includes('yourusername')) ? (
            <div className={styles.buttons}>
              {project.liveUrl && !project.liveUrl.includes('example.com') && <Button href={project.liveUrl} arrow>Visit live site</Button>}
              {project.githubUrl && !project.githubUrl.includes('yourusername') && <Button href={project.githubUrl} variant="outline">View code</Button>}
            </div>
          ) : null}
        </Reveal>

        {/* Big visual */}
        <Reveal className={styles.visual} delay={0.1}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1400px) 1300px, 100vw"
              className={styles.image}
            />
          ) : (
            <span className={styles.number}>{number}</span>
          )}
        </Reveal>

        {/* Overview + sidebar */}
        <div className={styles.content}>
          <Reveal className={styles.overview}>
            <h3>Overview</h3>
            <p>{project.description}</p>

            {project.features?.length > 0 && (
              <>
                <h3>Key features</h3>
                <ul className={styles.features}>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          <Reveal as="aside" className={styles.sidebar} delay={0.15}>
            <dl className={styles.details}>
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Tech stack</dt>
                <dd>
                  <ul className={styles.tags}>
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Next project */}
        <Reveal>
          <Link href={`/projects/${next.slug}`} className={styles.next}>
            <span className={styles.nextLabel}>
              <span>Next project</span>
              <span className={styles.nextArrow} aria-hidden="true">→</span>
            </span>
            <span className={styles.nextTitle}>
              {next.title}
            </span>
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
