import { site } from '@/data/site';
import { projects } from '@/data/projects';

export default function sitemap() {
  return [
    { url: site.url, priority: 1 },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      priority: 0.7,
    })),
  ];
}