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

@Injectable()
export class MarkdownService {
  async readMarkdownFile(path: string): Promise<{ content: string; stats: Stats }> {
    const dir = resolveContentDirectory();
    const file = resolve(dir, 'blog', `${path}.md`);

    try {
      const [content, stats] = await Promise.all([readFile(file, 'utf-8'), stat(file)]);

      return {
        content,
        stats,
      };
    } catch (error) {
      throw new NotFoundException(`Markdown file not found: ${path}`);
    }
  }

  async extractFrontMatterFromContent(markdown: string): Promise<{
    content: string;
    data: FrontMatter;
  }> {
    const result = matter(markdown);

    if (!result.data.visibility || result.data.visibility !== 'public') {
      throw new UnauthorizedException('This article is not public');
    }

    const validated = await validate<FrontMatter>(FrontMatter, result.data, { whitelist: false });

    if (!('data' in validated)) {
      throw new BadRequestException(`'Invalid front matter : ${validated.errors.join(', ')}`);
    }

    return { content: result.content, data: validated.data };
  }

  async getAllArticlePaths() {
    const dir = resolveContentDirectory();
    const blogDir = resolve(dir, 'blog');

    return await readDirectoryRecursively(blogDir, blogDir, ['.md'], true);
  }
}
