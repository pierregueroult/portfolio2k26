import { Html, Parent, Root, Text } from 'mdast';
import { Plugin } from 'unified';
import { SKIP, visit } from 'unist-util-visit';
import { slugifyPath } from './slugify-path';

type Options = {
  prefix?: string;
};

type WikiPdfPart = {
  start: number;
  end: number;
  path: string;
  title?: string;
};

export const remarkWikiPdf: Plugin<[Options?], Root> = (options?: Options) => {
  const prefix = options?.prefix || '';
  const rx = /(?<!!)\[\[([^|\]]+\.pdf)(?:\|([^\]]+))?\]\]/g;

  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || typeof index !== 'number') return;

      const value = node.value;
      let match: RegExpExecArray | null;
      const parts: WikiPdfPart[] = [];

      while ((match = rx.exec(value))) {
        parts.push({
          start: match.index,
          end: match.index + match[0].length,
          path: match[1] ?? '',
          title: match[2],
        });
      }

      if (parts.length === 0) return;

      const newNodes: (Text | Html)[] = [];
      let cursor = 0;

      for (const p of parts) {
        if (p.start > cursor) {
          newNodes.push({
            type: 'text',
            value: value.slice(cursor, p.start),
          });
        }

        const rawPath = p.path.trim();
        const title = p.title?.trim() ?? 'Integrated Document';
        const url = prefix + encodeURI(slugifyPath(rawPath));

        const iframeNode: Html = {
          type: 'html',
          value: `<iframe src="${url}" title="${title}" width="100%" height="650"></iframe>`,
        };

        newNodes.push(iframeNode);
        cursor = p.end;
      }

      if (cursor < value.length) {
        newNodes.push({
          type: 'text',
          value: value.slice(cursor),
        });
      }

      parent.children.splice(index, 1, ...newNodes);
      return [SKIP, index + newNodes.length] as const;
    });
  };
};
