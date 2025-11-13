import { Controller, Get, Param } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get("article/*param")
  async getArticleBySlug(@Param("param") param: string) {
    const path = this.blogService.convertParamToPath(param);

    const file = await this.blogService.readMarkdownFile(path);

    return {
      status: "success",
      message: "Article retrieved successfully",
      file,
    };
  }
}
