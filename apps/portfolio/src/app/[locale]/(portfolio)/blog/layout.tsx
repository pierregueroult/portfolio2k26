export default function BlogLayout({ children }: LayoutProps<'/[locale]/blog'>) {
  return <div className="blog-container">{children}</div>;
}
