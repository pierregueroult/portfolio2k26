import { Injectable } from '@nestjs/common';
import { TreeNode } from '@repo/database/dtos/blog/tree';
import { ArticleResponse } from '@repo/database/dtos/blog/article';
import { resolveContentDirectory, getDirectoryTree, resolveSafeChildPath } from './blog.util';
import { MarkdownService } from './markdown/markdown.service';
import { ExcalidrawService } from './excalidraw/excalidraw.service';

@Injectable()
export class BlogService {
    constructor(
        private readonly markdownService: MarkdownService,
        private readonly excalidrawService: ExcalidrawService,
    ) { }

    async getTree(): Promise<TreeNode[]> {
        const blogDir = resolveContentDirectory();
        return getDirectoryTree(blogDir);
    }

    async getArticle(param: string): Promise<ArticleResponse> {
        const { content: rawContent, stats } = await this.markdownService.readMarkdownFile(param);
        const { content, data: frontmatter } =
            await this.markdownService.extractFrontMatterOrThrow(rawContent);

        if (frontmatter.tags && frontmatter.tags.includes('excalidraw')) {
            const json = this.excalidrawService.decompressDrawing(
                this.excalidrawService.getCompressedJson(content),
            );

            return {
                stats,
                frontmatter,
                type: 'excalidraw',
                drawing: {
                    json,
                    content,
                },
            };
        }

        return {
            stats,
            frontmatter,
            type: 'markdown',
            article: {
                content,
            },
        };
    }
}
