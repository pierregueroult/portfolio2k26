import type { NavigationList } from '../types/items';
import { ArrowUpRight } from 'lucide-react';

export const items: NavigationList = [
  [
    {
      key: 'home',
      href: '/',
    },
    {
      key: 'resume',
      href: '/resume',
      disabled: true,
    },
    {
      key: 'blog',
      href: '/blog',
    },
  ],
  [
    {
      key: 'contact',
      href: 'mailto:contact@pierregueroult.dev',
      icon: {
        icon: ArrowUpRight,
        position: 'right',
      },
    },
  ],
];
