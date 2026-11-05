import Hero from '@/sections/Hero/Hero';
import Marquee from '@/components/Marquee/Marquee';
import About from '@/sections/About/About';
import Projects from '@/sections/Projects/Projects';
import Skills from '@/sections/Skills/Skills';
import Experience from '@/sections/Experience/Experience';
import Contact from '@/sections/Contact/Contact';
import { marqueeWords } from '@/data/skills';
import { profile } from '@/data/profile';
import { socials } from '@/data/socials';
import { site } from '@/data/site';

export const metadata = {
  alternates: { canonical: '/' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  description: profile.tagline,
  url: site.url,
  sameAs: socials.filter((s) => !s.url.startsWith('mailto:')).map((s) => s.url),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // escape "<" so the data can never break out of the script tag
          __html: JSON.stringify(personSchema).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <Marquee words={marqueeWords} />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}