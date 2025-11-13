import { Injectable } from "@nestjs/common";
import { dirname, resolve } from "node:path";
import { readFile, stat } from "node:fs/promises";

@Injectable()
export class BlogService {
  convertParamToPath(param: string) {
    return param.replace(/,/g, "/").replace(/ /g, "-").toLowerCase();
  }

  async readMarkdownFile(path: string) {
    const dir = this.resolveContentDirectory();
    const file = resolve(dir, "blog", `${path}.md`);

    const [content, stats] = await Promise.all([
      readFile(file, "utf-8"),
      stat(file),
    ]);

    return {
      content,
      stats,
    };
  }

  private resolveContentDirectory(): string {
    const packageJsonPath = require.resolve("@repo/content/package.json");
    return dirname(packageJsonPath);
  }
}
