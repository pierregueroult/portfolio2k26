import { GridPattern } from '@/components/ui/grid-pattern';
import { NavigationBar } from '../../../features/navigation/components/bar';

export default function PortfolioLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <div>
      <NavigationBar />
      <main className="pt-24 md:pt-0">{children}</main>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="mask-oval -z-10"
      />
    </div>
  );
}
