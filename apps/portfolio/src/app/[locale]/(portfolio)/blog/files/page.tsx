import { getBlogTree } from '@/features/blog/services/content';
import { TreeNode } from '@repo/database/dtos/blog/tree';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible';
import { ChevronRight, FileIcon, FolderIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { generateAlternates } from '@/features/search-engines/lib/generate-alternates';
import { slugifyPath } from '@/features/blog/lib/utils';
import { Link } from '@/features/internationalization/lib/navigation';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = await assertValidLocaleFromParams(params);
  const t = await getTranslations({ locale: locale.slug, namespace: 'BlogPage.metadata' });

  return {
    title: `${t('title')} - Files`,
    alternates: generateAlternates('/blog/files'),
  };
}

function FileNode({ node }: { node: TreeNode }) {
  if (node.type === 'file') {
    const isMarkdown = node.name.endsWith('.md') || node.name.endsWith('.mdx');
    const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(node.name);
    const isPdf = /\.(pdf)$/i.test(node.name);

    const content = (
      <div className="flex items-center gap-2 py-1.5 px-2 text-sm text-foreground/80 hover:bg-muted/50 rounded-md transition-colors cursor-pointer">
        <FileIcon className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{node.name}</span>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {(node.size / 1024).toFixed(1)} KB
        </span>
      </div>
    );

    if (isMarkdown) {
      return <Link href={`/blog/${slugifyPath(node.id).replace(/\.mdx?$/, '')}`}>{content}</Link>;
    }

    if (isImage) {
      return (
        <Link
          href={`/blog/image/${slugifyPath(node.id)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }

    if (isPdf) {
      return (
        <Link
          href={`/blog/documents/${slugifyPath(node.id)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }

    return content;
  }

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="group flex w-full items-center gap-2 py-1.5 px-2 text-sm font-medium hover:bg-muted/50 rounded-md text-left transition-colors">
        <FolderIcon className="size-4 shrink-0 fill-muted-foreground/20 text-muted-foreground" />
        <span className="truncate">{node.name}</span>
        <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-4 border-l border-border pl-2 my-1">
          {node.children.map((child) => (
            <FileNode key={child.id} node={child} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default async function FilePage() {
  const tree = await getBlogTree();

  return (
    <div className="container py-12 md:py-16 max-w-3xl space-y-8">
      <div className="rounded-lg border border-border bg-card p-4">
        {tree.map((node) => (
          <FileNode key={node.id} node={node} />
        ))}
        {tree.length === 0 && (
          <p className="text-muted-foreground text-center py-8">No files found.</p>
        )}
      </div>
    </div>
  );
}
