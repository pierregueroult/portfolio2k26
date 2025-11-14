import { dirname, relative, resolve } from "node:path";
import { readdir, readFile, stat } from "node:fs/promises";
import type { Stats } from "node:fs";

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import matter from "gray-matter";

@Injectable()
export class BlogService {
  convertParamToPath(param: string) {
    return param.replace(/,/g, "/").replaceAll("-", " ");
  }

  async readMarkdownFile(
    path: string,
  ): Promise<{ content: string; stats: Stats }> {
    const dir = this.resolveContentDirectory();
    const file = resolve(dir, "blog", `${path}.md`);

    try {
      const [content, stats] = await Promise.all([
        readFile(file, "utf-8"),
        stat(file),
      ]);

      return {
        content,
        stats,
      };
    } catch (error) {
      throw new NotFoundException(`Markdown file not found: ${path}`);
    }
  }

  private resolveContentDirectory(): string {
    const packageJsonPath = require.resolve("@repo/content/package.json");
    return dirname(packageJsonPath);
  }

  extractFrontMatterFromContent(markdown: string): {
    content: string;
    data: Record<string, unknown>;
  } {
    const result = matter(markdown);

    if (!result.data.visibility || result.data.visibility !== "public") {
      throw new UnauthorizedException("This article is not public");
    }

    return result;
  }

  async getAllArticlePaths() {
    const dir = this.resolveContentDirectory();
    const blogDir = resolve(dir, "blog");

    return await this.readDirectoryRecursively(blogDir, blogDir);
  }

  private async readDirectoryRecursively(
    dir: string,
    rootDir: string,
  ): Promise<string[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const results: string[] = [];
    const subdirPromises: Promise<string[]>[] = [];

    for (const entry of entries) {
      if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        const relativePath = relative(rootDir, resolve(dir, entry.name));
        results.push(
          relativePath.slice(0, -3).toLowerCase().replaceAll(" ", "-"),
        );
      } else if (entry.isDirectory()) {
        subdirPromises.push(
          this.readDirectoryRecursively(resolve(dir, entry.name), rootDir),
        );
      }
    }

    if (subdirPromises.length > 0) {
      const subdirResults = await Promise.all(subdirPromises);
      results.push(...subdirResults.flat());
    }

    return results;
  }
}
