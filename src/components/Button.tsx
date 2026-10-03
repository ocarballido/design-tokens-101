import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/cx';

// Anatomía: docs/componentes-v1.md §2.2. Con `href` es un enlace; sin él, un <button> (D15).
// Sin disabled ni loading en v1 (D14).

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  /** Icono opcional, al final. */
  icon?: LucideIcon;
  href?: string;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

const VARIANTS = {
  primary:
    'bg-accent-strong-default text-on-accent hover:bg-accent-strong-hover active:bg-accent-strong-active',
  secondary:
    'border-(length:--t101-border-width-100) border-neutral-strong text-neutral-default hover:bg-neutral-hover active:bg-neutral-active',
};

export function Button({ variant = 'primary', children, icon: Icon, href, className, type = 'button', ...props }: ButtonProps) {
  const classes = cx(
    'inline-flex cursor-pointer items-center justify-center gap-200 rounded-control py-200 type-label-default focus-ring',
    Icon ? 'ps-400 pe-300' : 'px-400',
    VARIANTS[variant],
    className,
  );
  const content = (
    <>
      {children}
      {Icon ? <Icon aria-hidden className="size-600 shrink-0" /> : null}
    </>
  );

  if (href) {
    return href.startsWith('/') ? (
      <Link href={href} className={classes}>
        {content}
      </Link>
    ) : (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
