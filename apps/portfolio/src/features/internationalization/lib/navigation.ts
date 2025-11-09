import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/features/internationalization/lib/routing';

export { useLocale } from 'next-intl';
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
