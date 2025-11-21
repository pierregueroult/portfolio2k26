import type { Plugin } from 'unified';
import type { Root, Text, Link, PhrasingContent, Parent } from 'mdast';
import { visit, SKIP } from 'unist-util-visit';
import { slugifyPath } from './utils';

type Options = {
  prefix?: string;
};

type WikiLinkPart = {
  start: number;
  end: number;
  path: string;
  title?: string;
};

export const remarkWikiLinks: Plugin<[Options?], Root> = (options?: Options) => {
  const prefix = options?.prefix ?? '';
  const rx = /(?<!!)\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g;

  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || typeof index !== 'number') return;

      const value = node.value;
      let match: RegExpExecArray | null;
      const parts: WikiLinkPart[] = [];

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

        const rawPath = p.path.trim();
        const label = (p.title ?? rawPath).trim();

        if (rawPath.toLowerCase().endsWith('.pdf')) {
          newChildren.push({
            type: 'text',
            value: value,
          });
        } else {
          const url = prefix + encodeURI(slugifyPath(rawPath));

          const linkNode: Link = {
            type: 'link',
            url,
            title: null,
            children: [{ type: 'text', value: label }],
          };

          newChildren.push(linkNode);
        }
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
