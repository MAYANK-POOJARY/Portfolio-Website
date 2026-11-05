'use client';

import { motion } from 'framer-motion';

export default function Reveal({
  children,
  as = 'div', // any HTML tag: 'div', 'li', 'section'...
  delay = 0,
  y = 40,
  className,
  ...rest
}) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}