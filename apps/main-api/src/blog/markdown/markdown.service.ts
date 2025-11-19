import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { type Stats } from 'node:fs';
import { FrontMatter } from '@repo/database/schemas/blog/front-matter';
import { validate } from '@repo/database/utils/validate';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import matter from 'gray-matter';
import { resolveContentDirectory, readDirectoryRecursively } from '../blog.util';

interface MarkdownFileResult {
  content: string;
  stats: Stats;
}

interface FrontMatterResult {
  content: string;
  data: FrontMatter;
}

type FrontMatterExtractResult = FrontMatterResult | 'unauthorized' | 'bad-request';

export interface ArticleSummary {
  title: string;
  link: string;
  date: string;
}

const MARKDOWN_EXTENSION = '.md';
const BLOG_SUBDIRECTORY = 'blog';
const PUBLIC_VISIBILITY = 'public';

@Injectable()
export class MarkdownService {
  async readMarkdownFile(path: string): Promise<MarkdownFileResult> {
    const filePath = this.buildMarkdownFilePath(path);

    try {
      const [content, stats] = await Promise.all([readFile(filePath, 'utf-8'), stat(filePath)]);

      return { content, stats };
    } catch (error) {
      throw new NotFoundException(`Markdown file not found: ${filePath}`);
    }
  }

  async extractFrontMatterOrThrow(markdown: string): Promise<FrontMatterResult> {
    const result = await this.extractFrontMatterFromContent(markdown);

    if (result === 'unauthorized') {
      throw new UnauthorizedException('Article visibility is not public');
    }

    if (result === 'bad-request') {
      throw new BadRequestException('Invalid front matter data');
    }

    return result;
  }

  async extractFrontMatterFromContent(markdown: string): Promise<FrontMatterExtractResult> {
    const { data, content } = matter(markdown);

    if (!this.isPublicArticle(data)) {
      return 'unauthorized';
    }

    const validated = await validate<FrontMatter>(FrontMatter, data, { whitelist: false });

    if (!('data' in validated)) {
      return 'bad-request';
    }

    return { content, data: validated.data };
  }

  async getAllArticlePaths(): Promise<string[]> {
    const blogDir = this.resolveBlogDirectory();
    return await readDirectoryRecursively(blogDir, blogDir, [MARKDOWN_EXTENSION], true);
  }

  async getAllStringArticles(folder: string): Promise<ArticleSummary[]> {
    const articlePaths = await this.getArticlePathsInFolder(folder);
    const articles = await this.processArticles(folder, articlePaths);

    return articles.filter((article): article is ArticleSummary => article !== null);
  }

  private buildMarkdownFilePath(relativePath: string): string {
    const contentDir = resolveContentDirectory();
    return resolve(contentDir, BLOG_SUBDIRECTORY, `${relativePath}${MARKDOWN_EXTENSION}`);
  }

  private resolveBlogDirectory(): string {
    const contentDir = resolveContentDirectory();
    return resolve(contentDir, BLOG_SUBDIRECTORY);
  }

  private isPublicArticle(data: Record<string, unknown>): boolean {
    return data.visibility === PUBLIC_VISIBILITY;
  }

  private async getArticlePathsInFolder(folder: string): Promise<string[]> {
    const blogDir = this.resolveBlogDirectory();
    const folderPath = resolve(blogDir, folder);

    return await readDirectoryRecursively(
      folderPath,
      folderPath,
      [MARKDOWN_EXTENSION],
      false,
      false,
    );
  }

  private async processArticles(
    folder: string,
    articlePaths: string[],
  ): Promise<(ArticleSummary | null)[]> {
    return await Promise.all(
      articlePaths.map((relativePath) => this.processArticle(folder, relativePath)),
    );
  }

  private async processArticle(
    folder: string,
    relativePath: string,
  ): Promise<ArticleSummary | null> {
    const pathWithoutExtension = relativePath.replace(MARKDOWN_EXTENSION, '');
    const fullPath = `${folder}/${pathWithoutExtension}`;

    try {
      const { content } = await this.readMarkdownFile(fullPath);
      const result = await this.extractFrontMatterFromContent(content);

      if (result === 'bad-request' || result === 'unauthorized') {
        return null;
      }

      return this.buildArticleSummary(pathWithoutExtension, result.data);
    } catch (error) {
      return null;
    }
  }

  private buildArticleSummary(
    pathWithoutExtension: string,
    frontMatter: FrontMatter,
  ): ArticleSummary {
    const title = this.extractTitleFromPath(pathWithoutExtension);
    const link = this.generateLinkFromPath(pathWithoutExtension);
    const date = frontMatter.date ?? this.getCurrentDate();

    return { title, link, date };
  }

  private extractTitleFromPath(path: string): string {
    return path.split('/').pop() ?? path;
  }

  private generateLinkFromPath(path: string): string {
    return path.replace(/ /g, '-').toLowerCase();
  }

  private getCurrentDate(): string {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  }
}
