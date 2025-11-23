import '@excalidraw/excalidraw/index.css';
import '@/features/blog/styles/excalidraw-remove.css';

export default function DrawingLayout({
  children,
}: LayoutProps<'/[locale]/blog/drawings/[...drawing]'>) {
  return children;
}
