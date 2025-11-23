import '@excalidraw/excalidraw/index.css';
import '@/features/blog/styles/excalidraw-override.css';
import '@/features/blog/styles/katex.css';

export default function ArticleLayout({ children }: LayoutProps<'/[locale]/blog/[...article]'>) {
  return children;
}
