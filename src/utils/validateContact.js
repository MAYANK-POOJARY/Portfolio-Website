const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Makes sure we only ever work with strings
const toStr = (value) => (typeof value === 'string' ? value : '');

export function validateContact(values) {
  const name = toStr(values?.name).trim();
  const email = toStr(values?.email).trim();
  const message = toStr(values?.message).trim();

  const errors = {};

  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (name.length > 100) errors.name = 'Name is too long (max 100 characters).';

  if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address.';
  else if (email.length > 200) errors.email = 'Email is too long.';

  if (message.length < 10) errors.message = 'Message should be at least 10 characters.';
  else if (message.length > 2000) errors.message = 'Message is too long (max 2000 characters).';

  return errors;
}