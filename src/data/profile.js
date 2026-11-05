export const profile = {
  name: 'Your Name',
  initials: 'YN',
  role: 'Full Stack Developer',
  tagline: 'I build fast, polished and memorable web experiences.',
  location: 'Mumbai, India',
  email: 'hello@yourname.dev',
  available: true, // shows the "Available for work" badge
  resumeUrl: '/resume.pdf', // put your file in /public/resume.pdf later

  // About section: each string becomes one paragraph
  bio: [
    'Hi, I am a developer who loves turning ideas into clean, fast and good-looking web products.',
    'I work across the stack with React, Next.js and Node.js, and I care a lot about details, performance and user experience.',
    'When I am not coding, I am exploring new tools, reading about design, or building side projects.',
  ],

  // Small stat boxes in the About section
  stats: [
    { label: 'Years of experience', value: '2+' },
    { label: 'Projects completed', value: '15+' },
    { label: 'Technologies used', value: '20+' },
  ],
};