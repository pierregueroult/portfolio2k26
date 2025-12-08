import { Controller, Get, Param, Res } from '@nestjs/common';

import type { Response } from 'express';
import { BlogService } from './blog.service';
import { ImageService } from './image/image.service';
import { MarkdownService } from './markdown/markdown.service';
import { DocumentService } from './document/document.service';

import { convertParamToPath } from './blog.util';

import { ArticleResponse } from '@repo/database/dtos/blog/article';
import { GetAllImagesResponse } from '@repo/database/dtos/blog/image';
import { TreeNode } from '@repo/database/dtos/blog/tree';


@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly imageService: ImageService,
    private readonly markdownService: MarkdownService,
    private readonly documentService: DocumentService,
  ) { }

  @Get('tree')
  async getBlogTree(): Promise<TreeNode[]> {
    return this.blogService.getTree();
  }

  @Get('article/*param')
  async getArticleBySlug(@Param('param') param: string): Promise<ArticleResponse> {
    const path = convertParamToPath(param);
    return this.blogService.getArticle(path);
  }

  @Get('image/*param')
  async getImage(@Param('param') param: string, @Res() res: Response) {
    const path = convertParamToPath(param);

    const { stream, mime } = await this.imageService.readImageFile(path);

    res.setHeader('Content-Type', mime);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    stream.pipe(res);
  }

  @Get('document/*param')
  async getDocument(@Param('param') param: string, @Res() res: Response) {
    const path = convertParamToPath(param);

    const { stream, filename } = await this.documentService.readPdfFile(path);

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    stream.pipe(res);
  }

  @Get('images')
  async getAllImagesDictionary(): Promise<GetAllImagesResponse> {
    return {
      images: await this.imageService.getAllImagesDictionary(),
    };
  }

  @Get('paths')
  async getAllArticlePaths() {
    return this.markdownService.getAllArticlePaths();
  }

  @Get('articles/for-blog')
  async getAllArticles() {
    return this.markdownService.getAllStringArticles('blog');
  }

  @Get('articles/for-classes')
  async getAllClassesArticles() {
    return this.markdownService.getAllStringArticles('classes');
  }
}
