export const profile = {
  name: 'Mayank Poojary',
  initials: 'MP',
  role: 'Full Stack Developer',
  tagline: 'Building ideas into experiences that matter.',
  location: 'Mumbai, India',
  email: 'poojary.mayank@gmail.com',
  available: true, // shows the "Available for work" badge
  resumeUrl: '/resume.pdf',
  profileImg: '/profileImg.png',

  // About section: each string becomes one paragraph
  bio: [
    'Hi, I am a developer who loves turning ideas into clean, fast and good-looking web products.',
    'I work across the stack with React, Next.js and Node.js, and I care a lot about details, performance and user experience.',
    'When I am not coding, I am exploring new tools, reading about design, or building side projects.',
  ],

  // About section principles, based on the bio above
  principles: [
    {
      title: 'Across the stack',
      description: 'I work with React, Next.js and Node.js, from interface to server.',
    },
    {
      title: 'Details matter',
      description: 'I care about thoughtful design and the small choices that shape the experience.',
    },
    {
      title: 'Fast by design',
      description: 'I keep performance and responsiveness in mind while building.',
    },
  ],
};
