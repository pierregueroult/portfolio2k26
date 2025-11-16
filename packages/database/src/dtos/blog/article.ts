import type { Stats } from 'node:fs';
import type { FrontMatter } from '../../schemas/blog/front-matter';
import type { ExcalidrawJson } from '../../schemas/blog/excalidraw';

interface ArticleResponseBase {
  stats: Stats;
  frontmatter: FrontMatter;
}

interface ArticleMarkdownResponse extends ArticleResponseBase {
  content: string;
  type: 'markdown';
}

interface ArticleExcalidrawResponse extends ArticleResponseBase {
  drawing: {
    json: ExcalidrawJson;
    content: string;
  };
  type: 'excalidraw';
}

export type ArticleResponse = ArticleMarkdownResponse | ArticleExcalidrawResponse;
