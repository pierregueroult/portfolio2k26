import { ChatSidebar } from '@/features/chat/components/sidebar';
import { ChatStoreProvider } from '@/features/chat/stores/chat-store';
import { GridPattern } from '@/features/navigation/components/background';
import { NavigationBar } from '@/features/navigation/components/bar';
import { PageTransition } from '@/features/navigation/components/page-transition';

export default function PortfolioLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <div className="flex">
      <ChatStoreProvider>
        <div className="flex-1">
          <NavigationBar />
          <main className="pt-24 md:pt-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <GridPattern className="mask-oval -z-10" />
        </div>
        <ChatSidebar />
      </ChatStoreProvider>
    </div>
  );
}
