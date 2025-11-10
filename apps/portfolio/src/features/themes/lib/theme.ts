import { cookies } from 'next/headers';
import { Theme } from '../types/theme';

export async function readThemeFromCookies(): Promise<Theme> {
  const store = await cookies();
  return (store.get('font')?.value as Theme) || 'system';
}
