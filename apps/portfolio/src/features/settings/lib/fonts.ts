import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { FontType } from '../types/fonts';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const openDyslexic = localFont({
  src: [
    {
      path: '../assets/OpenDyslexic-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/OpenDyslexic-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-open-dyslexic',
  display: 'swap',
  preload: false,
});

export async function readFontFromCookies(): Promise<FontType> {
  const store = await cookies();
  return (store.get('font')?.value as FontType) || 'default';
}

export const fonts = `${GeistSans.variable} ${GeistMono.variable} ${openDyslexic.variable}`;
