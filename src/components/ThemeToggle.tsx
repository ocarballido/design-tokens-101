'use client';

import { LaptopMinimal, Moon, SunDim, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';
import { Marker } from '@/components/Marker';
import { cx } from '@/lib/cx';
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

// Anatomía: docs/componentes-v1.md §4.5 y §4.10. Tres botones con aria-pressed (D07).
// - `light` y `dark` ponen data-theme en <html>; `system` lo quita y manda prefers-color-scheme (V10).
// - La elección se guarda en localStorage (V21). THEME_SCRIPT (src/lib/theme.ts) la aplica antes de pintar.

const OPTIONS: { value: Theme; icon: LucideIcon }[] = [
  { value: 'light', icon: SunDim },
  { value: 'dark', icon: Moon },
  { value: 'system', icon: LaptopMinimal },
];

const listeners = new Set<() => void>();

function readTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === 'light' || value === 'dark' ? value : 'system';
}

function setTheme(theme: Theme) {
  const root = document.documentElement;
  try {
    if (theme === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sin almacenamiento (modo privado o bloqueado): el tema se aplica solo a esta página.
  }
  if (theme === 'system') delete root.dataset.theme;
  else root.dataset.theme = theme;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function ThemeToggle() {
  const t = useTranslations('ThemeToggle');
  // En el servidor no se sabe el tema guardado: se pinta `system` y se corrige al hidratar.
  const current = useSyncExternalStore(subscribe, readTheme, () => 'system' as Theme);

  return (
    <div role="group" aria-label={t('label')} className="flex gap-100 rounded-300 bg-neutral-strong p-100">
      {OPTIONS.map(({ value, icon: Icon }) => {
        const isCurrent = value === current;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isCurrent}
            aria-label={t(value)}
            onClick={() => setTheme(value)}
            className={cx(
              'relative flex cursor-pointer items-center justify-center rounded-control p-150 focus-ring',
              isCurrent
                ? 'bg-neutral-default text-accent-default'
                : 'text-neutral-subtle hover:bg-neutral-hover hover:text-neutral-default active:bg-neutral-active active:text-neutral-default',
            )}
          >
            <Icon aria-hidden className="size-600" />
            {isCurrent ? <Marker /> : null}
          </button>
        );
      })}
    </div>
  );
}
