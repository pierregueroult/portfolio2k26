import { Controller, Get, NotImplementedException, Param, Res } from '@nestjs/common';
import { BlogService } from './blog.service';

import type { Response } from 'express';
import { ExcalidrawService } from './excalidraw/excalidraw.service';
import { ArticleResponse } from '@repo/database/dtos/blog/article';
import { GetAllImagesResponse } from '@repo/database/dtos/blog/image';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly excalidrawService: ExcalidrawService,
  ) {}

  @Get('article/*param')
  async getArticleBySlug(@Param('param') param: string): Promise<ArticleResponse> {
    const path = this.blogService.convertParamToPath(param);

    const { content: rawContent, stats } = await this.blogService.readMarkdownFile(path);

    const { content, data } = await this.blogService.extractFrontMatterFromContent(rawContent);

    if (data.tags && data.tags.includes('excalidraw')) {
      const excalidraw = this.excalidrawService.decompressDrawing(
        this.excalidrawService.getCompressedJson(content),
      );

      return {
        stats,
        frontmatter: data,
        type: 'excalidraw',
        drawing: {
          json: excalidraw,
          content: content,
        },
      };
    }

    return {
      stats,
      frontmatter: data,
      type: 'markdown',
      content,
    };
  }

  @Get('image/*param')
  async getImage(@Param('param') param: string, @Res() res: Response) {
    const path = this.blogService.convertParamToPath(param);

    const { stream, mime } = await this.blogService.readImageFile(path);

    res.setHeader('Content-Type', mime);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    stream.pipe(res);
  }

  @Get('images')
  async getAllImagesDictionary(): Promise<GetAllImagesResponse> {
    return this.blogService.getAllImagesDictionary();
  }

  @Get('paths')
  async getAllArticlePaths() {
    return this.blogService.getAllArticlePaths();
  }
}
