import { Html, Parent, PhrasingContent, Root, Text } from 'mdast';
import { Plugin } from 'unified';
import { SKIP, visit } from 'unist-util-visit';
import { slugifyPath } from './utils';

type Options = {
  prefix?: string;
};

type WikiDrawingPart = {
  start: number;
  end: number;
  path: string;
  title?: string;
};

const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', '.pdf'];

export const remarkWikiDrawing: Plugin<[Options?], Root> = (options?: Options) => {
  const prefix = options?.prefix ?? '';
  const rx = /!\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g;

  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || typeof index !== 'number') return;

      const value = node.value;
      let match: RegExpExecArray | null;
      const parts: WikiDrawingPart[] = [];

      while ((match = rx.exec(value))) {
        parts.push({
          start: match.index,
          end: match.index + match[0].length,
          path: match[1] ?? '',
          title: match[2],
        });
      }

      if (parts.length === 0) return;
      const newChildren: PhrasingContent[] = [];
      let cursor = 0;

      for (const p of parts) {
        if (p.start > cursor) {
          newChildren.push({
            type: 'text',
            value: value.slice(cursor, p.start),
          });
        }

        const rawPath = slugifyPath(p.path.trim());
        const lastDotIndex = rawPath.lastIndexOf('.');
        const ext = lastDotIndex >= 0 ? rawPath.slice(lastDotIndex + 1).toLowerCase() : '';

        const isDocument = extensions.includes(`.${ext}`);

        if (isDocument) {
          newChildren.push({
            type: 'text',
            value: value.slice(p.start, p.end),
          });
          cursor = p.end;
          continue;
        }

        const url = `${prefix}${rawPath}`;
        const title = p.title || 'Drawing integration';

        const iframeNode: Html = {
          type: 'html',
          value: `<iframe src="${url}" title="${title}" width="100%" height="500" class="border-foreground/10 border-4 rounded-2xl"></iframe>`,
        };

        newChildren.push(iframeNode);

        cursor = p.end;
      }

      if (cursor < value.length) {
        newChildren.push({
          type: 'text',
          value: value.slice(cursor),
        });
      }

      parent.children.splice(index, 1, ...newChildren);

      return [SKIP, index + newChildren.length] as const;
    });
  };
};
