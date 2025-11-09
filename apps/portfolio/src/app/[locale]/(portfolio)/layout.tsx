import { NavigationBar } from '../../../features/navigation/components/bar';

export default function PortfolioLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <div>
      <NavigationBar />
      <main className="blog-container mx-auto pt-24 md:pt-0">{children}</main>
    </div>
  );
}
