import type { NavigationList } from '../types/items';
import { ArrowUpRight } from 'lucide-react';

export const items: NavigationList = [
  [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Resume',
      href: '/resume',
      disabled: true,
    },
    {
      label: 'Blog',
      href: '/blog',
      disabled: true,
    },
  ],
  [
    {
      label: 'Contact me',
      href: 'mailto:contact@pierregueroult.dev',
      icon: {
        icon: ArrowUpRight,
        position: 'right',
      },
    },
  ],
];
