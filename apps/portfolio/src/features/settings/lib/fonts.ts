import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { FontType } from '../types/fonts';

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
});

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
