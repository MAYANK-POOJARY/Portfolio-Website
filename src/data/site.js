import { profile } from './profile';

// SITE_URL = your public address. Locally it falls back to localhost.
// On Vercel, Vercel's own production-URL variable is used if you haven't set SITE_URL.
const baseUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const site = {
  url: baseUrl.replace(/\/$/, ''), // no trailing slash
  siteName: `${profile.name} | Portfolio`,
  title: `${profile.name} | ${profile.role}`,
  description: `Portfolio of ${profile.name}, a ${profile.role} building fast, polished web experiences with Next.js, React and Node.js.`,
  keywords: [
    profile.name,
    'portfolio',
    'web developer',
    'full stack developer',
    'Next.js',
    'React',
    'Node.js',
  ],
  locale: 'en_US',
};