import type { Viewport } from 'next';
import type { Theme } from '../types/theme';

const THEME_COLORS = {
  light: '#f5f5f5',
  dark: '#262626',
} as const;

export function createViewportForTheme(theme: Theme | null): Viewport {
  if (!theme || theme === 'system') {
    return {
      themeColor: [
        { color: THEME_COLORS.light, media: '(prefers-color-scheme: light)' },
        { color: THEME_COLORS.dark, media: '(prefers-color-scheme: dark)' },
      ],
    };
  }

  const color = THEME_COLORS[theme];
  return {
    themeColor: [
      { color, media: '(prefers-color-scheme: light)' },
      { color, media: '(prefers-color-scheme: dark)' },
    ],
    colorScheme: theme,
  };
}
