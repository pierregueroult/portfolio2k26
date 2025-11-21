import { cn } from '@repo/ui/lib/utils';

type NotchSvgProps = {
  reverse: boolean;
};

export function NotchSvg({ reverse }: NotchSvgProps) {
  return (
    <svg
      viewBox="0 0 85 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-10 text-muted translate-x-px', reverse && 'rotate-y-180 -translate-x-px')}
    >
      <path
        d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

type NotchProps = {
  reverse: boolean;
  className?: string;
};

export function Notch({ reverse, className }: NotchProps) {
  return (
    <div className={cn('flex items-center justify-center', reverse && 'rotate-x-180', className)}>
      <NotchSvg reverse={false} />
      <div className="bg-muted gap-3 navigation-shadow h-10 flex justify-center items-start px-4 max-w-[calc(100%-220px)] w-sm"></div>
      <NotchSvg reverse={true} />
    </div>
  );
}
