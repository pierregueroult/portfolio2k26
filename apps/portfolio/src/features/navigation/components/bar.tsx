import { MenuIcon, MessageCircleCodeIcon, Settings2Icon } from 'lucide-react';

import { Separator } from '@repo/ui/components/separator';
import { Button, buttonVariants } from '@repo/ui/components/button';

import { items } from '@/features/navigation/content/items';
import { NavigationNode } from '@/features/navigation/components/node';
import { renderBlurProps } from '@/features/navigation/lib/blur';
import { SettingsPopover } from '@/features/settings/components/settings';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { ChatTrigger } from '@/features/chat/components/trigger';
import { NavigationHeader } from './header';

export function NavigationBar() {
  const t = useTranslations('NavigationBar');
  return (
    <NavigationHeader>
      <div className="container flex items-center justify-center md:justify-between flex-wrap px-8">
        <div {...renderBlurProps('hidden md:flex')}>
          <SettingsPopover>
            <Button size="icon" variant="outline">
              <Settings2Icon />
            </Button>
          </SettingsPopover>
        </div>
        <ul
          {...renderBlurProps(
            'flex-col items-center @min-[570px]/header:flex-row w-[calc(100%-4rem)] @min-[406px]/header:w-auto',
          )}
        >
          <li className="self-stretch flex items-center gap-2 justify-between @min-[406px]/header:justify-center">
            <p className="mx-1.5">pierregueroult.dev</p>
            <label
              className="flex @min-[406px]/header:hidden"
              role="button"
              htmlFor="mobile-menu"
              aria-label={t('menu')}
            >
              <span
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'icon-sm' }),
                  'cursor-pointer',
                )}
              >
                <MenuIcon />
              </span>
            </label>
            <Separator orientation="vertical" className="hidden @min-[570px]:block" />
          </li>
          <input type="checkbox" id="mobile-menu" className="peer sr-only" name="mobile-menu" />
          <NavigationNode
            node={items}
            depth={0}
            className="@min-[406px]/header:flex peer-checked:flex hidden"
          />
        </ul>
        <div {...renderBlurProps('hidden md:flex')}>
          <ChatTrigger size="icon" variant="outline">
            <MessageCircleCodeIcon />
          </ChatTrigger>
        </div>
      </div>
    </NavigationHeader>
  );
}
