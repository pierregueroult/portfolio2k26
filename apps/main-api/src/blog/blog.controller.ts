import {
  Controller,
  Get,
  Param,
  Res,
} from "@nestjs/common";
import { BlogService } from "./blog.service";

import type { Response } from "express";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get("article/*param")
  async getArticleBySlug(@Param("param") param: string) {
    const path = this.blogService.convertParamToPath(param);

    const { content: rawContent, stats } =
      await this.blogService.readMarkdownFile(path);

    const { content, data } =
      this.blogService.extractFrontMatterFromContent(rawContent);

    return {
      content,
      data,
      stats,
    };
  }

  @Get("image/*param")
  async getImage(@Param("param") param: string, @Res() res: Response) {
    const path = this.blogService.convertParamToPath(param);

    const { stream, mime } = await this.blogService.readImageFile(path);

    res.setHeader('Content-Type', mime);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    stream.pipe(res);
  }

  @Get("images")
  async getAllImagesDictionary() {
    return this.blogService.getAllImagesDictionary();
  }

  @Get("paths")
  async getAllArticlePaths() {
    return this.blogService.getAllArticlePaths();
  }
}
