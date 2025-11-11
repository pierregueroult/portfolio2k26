import { Badge } from '@repo/ui/components/badge';

export default function Page() {
  return (
    <>
      <div className="bg-muted h-[25vh] flex justify-center items-center flex-col navigation-shadow">
        <div className="w-fit flex flex-col mt-6">
          <p className="flex flex-col">
            <span className="text-md font-medium">
              Lifting, automating, and studying to become a
            </span>
            <span className="text-8xl font-extrabold tracking-tighter -mt-2">
              Software engineer
            </span>{' '}
          </p>
          <p className="text-md text-right font-medium -mt-2">
            Currently working{' '}
            <a href="https://altelis.com" target="_blank" rel="noopener noreferrer">
              @ Altelis
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto relative bg-muted pb-2 px-4 gap-2 flex w-fit  navigation-shadow">
        <Badge variant="head">Typescript</Badge>
        <Badge variant="head">Typescript</Badge>
        <Badge variant="head">Typescript</Badge>
      </div>
      <div className="blog-container">
        <p className="mt-42 text-center">The rest of the website is coming soon !!!</p>
      </div>
    </>
  );
}
