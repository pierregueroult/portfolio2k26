import { HandFistIcon, LaptopIcon, SquareCheckIcon } from 'lucide-react';
import Image from 'next/image';

const elements = [
  { label: 'Lifting', icon: <HandFistIcon /> },
  { label: 'Engineering', icon: <LaptopIcon /> },
  { label: 'Coding', icon: <SquareCheckIcon /> },
  { label: 'Driving', icon: <SquareCheckIcon /> },
];

export default function Page() {
  return (
    <>
      <div className="bg-muted h-[25vh] flex justify-center items-center flex-col navigation-shadow">
        <div className="w-fit flex flex-col mt-4">
          <p className="flex flex-col">
            <span className="text-md font-medium">
              Lifting, automating, and studying to become a
            </span>
            <span className="text-8xl font-extrabold tracking-tighter -mt-2">
              Software engineer
            </span>{' '}
          </p>
          <p className="text-md text-right font-medium -mt-2">
            Currently working at{' '}
            <a
              href="https://altelis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative after:absolute bottom-0 w-full h-px bg-foreground left-0"
            >
              <Image
                src="/logos/altelis.png"
                alt="Logo de l'entreprise Altelis"
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
          className="h-10 text-muted translate-x-px"
        >
          <path
            d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="bg-muted gap-3 navigation-shadow h-10 flex justify-center items-start px-4">
          {elements.map((element, index) => (
            <span
              key={index}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 border bg-background shadow-xs h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
            >
              {element.icon}
              {element.label}
            </span>
          ))}
        </div>
        <svg
          viewBox="0 0 85 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 -scale-x-100 -translate-x-px text-muted"
        >
          <path
            d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div className="blog-container">
        <p className="mt-42 text-center">The rest of the website is coming soon !!!</p>
      </div>
    </>
  );
}
