import Image from 'next/image';
import { CodeXmlIcon, LandPlotIcon, LaptopIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@repo/ui/lib/utils';

const elements = [
  { label: 'lifting', icon: <LandPlotIcon /> },
  { label: 'engineering', icon: <LaptopIcon /> },
  { label: 'coding', icon: <CodeXmlIcon /> },
] as const;

export function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  return (
    <header>
      <div className="bg-muted h-[25vh] flex justify-center items-center flex-col">
        <div className="w-fit flex flex-col mt-4">
          <p className="flex flex-col">
            <span className="text-md font-medium">{t('titlePart1')}</span>
            <span className="text-8xl font-extrabold tracking-tighter -mt-2">
              {t('titlePart2')}
            </span>{' '}
          </p>
          <p className={cn('text-md text-right font-medium -mt-2', locale === 'fr' && 'mt-0')}>
            {t('workingAt')}
            <a
              href="https://altelis.com?source=pierregueroult.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="relative after:absolute after:-bottom-px after:w-19/20 after:h-px after:bg-foreground after:left-1/40"
            >
              <Image
                src="/logos/altelis.png"
                alt={t('workLabel')}
                width={24}
                height={24}
                className="inline rounded-sm size-4 mb-1 mr-0.5"
              />
              Altelis.
            </a>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <svg
          viewBox="0 0 85 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 text-muted translate-x-px overflow-visible relative"
        >
          <path
            d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="bg-muted h-10 flex justify-center items-start gap-3 px-4">
          {elements.map((element, index) => (
            <span
              key={index}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 border bg-background shadow-xs h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
            >
              {element.icon}
              {t(element.label)}
            </span>
          ))}
        </div>
        <svg
          viewBox="0 0 85 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 -scale-x-100 -translate-x-px text-muted overflow-visible"
        >
          <path
            d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </header>
  );
}
