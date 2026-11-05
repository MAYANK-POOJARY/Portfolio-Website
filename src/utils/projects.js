import { projects } from '@/data/projects';

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}

// Position of a project in the list + the project that comes after it (loops back to the first)
export function getProjectPosition(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return { index, next };
}