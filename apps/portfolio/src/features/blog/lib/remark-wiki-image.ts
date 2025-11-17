import type { Plugin } from 'unified';
import type { Root, Text, Image, PhrasingContent, Parent } from 'mdast';
import { visit, SKIP } from 'unist-util-visit';
import { slugifyPath } from './slugify-path';

type Options = {
  prefix?: string;
  dictionary: {
    [key: string]: string;
  };
};

type WikiImagePart = {
  start: number;
  end: number;
  path: string;
  alt?: string;
};

const imagesExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export const remarkWikiImage: Plugin<[Options?], Root> = (options?: Options) => {
  const prefix = options?.prefix ?? '';
  const dictionary = options?.dictionary ?? {};
  const rx = /!\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g;

  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || typeof index !== 'number') return;

      const value = node.value;
      let match: RegExpExecArray | null;
      const parts: WikiImagePart[] = [];

      while ((match = rx.exec(value))) {
        parts.push({
          start: match.index,
          end: match.index + match[0].length,
          path: match[1] ?? '',
          alt: match[2],
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

        const isSupported = imagesExtensions.includes(ext);

        if (!isSupported) {
          newChildren.push({
            type: 'text',
            value: value.slice(p.start, p.end),
          });
          cursor = p.end;
          continue;
        }

        const resolvedPath = dictionary[rawPath] ?? rawPath;
        const alt = p.alt?.trim() ?? rawPath;
        const url = prefix + encodeURI(resolvedPath);

        const imageNode: Image = {
          type: 'image',
          url,
          title: null,
          alt,
        };

        newChildren.push(imageNode);
        cursor = p.end;
      }

      // Add remaining text after last wiki image
      if (cursor < value.length) {
        newChildren.push({
          type: 'text',
          value: value.slice(cursor),
        });
      }

      parent.children.splice(index, 1, ...newChildren);

      // Return the index to continue visiting after inserted nodes
      return [SKIP, index + newChildren.length] as const;
    });
  };
};
