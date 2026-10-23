import type { ComponentPropsWithoutRef } from 'react';

// Sustituye a next/link fuera de Next.js (Claude Design no tiene su router): un enlace normal.
export default function Link(props: ComponentPropsWithoutRef<'a'>) {
  return <a {...props} />;
}
