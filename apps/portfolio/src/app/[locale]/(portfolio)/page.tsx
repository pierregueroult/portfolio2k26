import { generateAlternates } from '@/features/search-engines/lib/generate-alternates';
import { Notch, NotchSvg } from '@/features/themes/components/notch-svg';
import { CodeXmlIcon, HandFistIcon, LaptopIcon } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

const elements = [
  { label: 'Lifting', icon: <HandFistIcon /> },
  { label: 'Engineering', icon: <LaptopIcon /> },
  { label: 'Coding', icon: <CodeXmlIcon /> },
];

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  return {
    alternates: generateAlternates('/'),
  };
}

export default function Page() {
  return (
    <>
      <Notch reverse={true} className="flex md:hidden" />
      <div className="bg-muted h-[15vh] md:h-[20vh] lg:h-[23vh] flex justify-center items-center flex-col navigation-shadow px-4">
        <div className="w-fit flex flex-col">
          <p className="flex flex-col">
            <span className="text-sm md:text-base font-medium">
              Lifting, automating, and studying to become a
            </span>
            <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter lg:-mt-2 lg:text-8xl">
              Software engineer
            </span>{' '}
          </p>
          <p className="text-sm md:text-base text-right font-medium lg:-mt-2">
            Currently working at{' '}
            <a
              href="https://altelis.com?source=pierregueroult.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="relative after:absolute after:-bottom-px after:w-19/20 after:h-px after:bg-foreground after:left-1/40"
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
      <Notch reverse={false} />
      <div className="blog-container">
        <p className="mt-42 text-center">The rest of the website is coming soon !!!</p>
      </div>
    </>
  );
}
