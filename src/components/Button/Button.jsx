import Link from 'next/link';
import styles from './Button.module.scss';

export default function Button({
  children,
  href,
  variant = 'primary', // 'primary' | 'outline'
  arrow = false,
  type = 'button',
  onClick,
  disabled = false,
  download = false,
}) {
  const className = `${styles.button} ${styles[variant]}`;

  const content = (
    <>
      {children}
      {arrow && <span className={styles.arrow}>↗</span>}
    </>
  );

  if (download) {
    return <a href={href} className={className} download>{content}</a>;
  }

  // External link (opens in a new tab)
  if (href && href.startsWith('http')) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  // Internal link
  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  // Normal button (forms, click handlers)
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
