import { Controller, Get, Param, UnauthorizedException } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { get } from "node:https";

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

  @Get("paths")
  async getAllArticlePaths() {
    return this.blogService.getAllArticlePaths();
  }
}
