'use client';

import { useState } from 'react';
import Button from '@/components/Button/Button';
import { validateContact } from '@/utils/validateContact';
import styles from './ContactForm.module.scss';

const initialValues = { name: '', email: '', message: '', website: '' };

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // clear that field's error as soon as the user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Check in the browser first (instant feedback)
    const found = validateContact(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) setErrors(data.errors);
        setStatus('error');
        return;
      }

      setValues(initialValues);
      setErrors({});
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.error}>
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className={styles.error}>
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me about your project or idea..."
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className={styles.error}>
            {errors.message}
          </span>
        )}
      </div>

      {/* Honeypot: hidden from people, bots tend to fill it */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" arrow disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </Button>

        {/* Screen-reader friendly status messages */}
        <div role="status" aria-live="polite">
          {status === 'success' && (
            <p className={styles.success}>Message sent! I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className={styles.failure}>
              Something went wrong. Please try again, or email me directly.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}