import { type ReadStream, createReadStream, existsSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { lookup } from 'mime-types';

import { resolveContentDirectory, readDirectoryRecursively } from '../blog.util';

@Injectable()
export class ImageService {
  async readImageFile(path: string): Promise<{
    stream: ReadStream;
    mime: string;
  }> {
    const dir = resolveContentDirectory();
    const filePath = join(dir, 'blog', path);

    if (!existsSync(filePath)) {
      throw new NotFoundException(`Image file not found: ${path}`);
    }

    const mime = lookup(filePath) || 'application/octet-stream';

    try {
      const stream = createReadStream(filePath);

      stream.on('error', () => {
        throw new InternalServerErrorException('Error reading file');
      });

      return { stream, mime };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(`Error reading file: ${message}`);
    }
  }

  async getAllImagesDictionary() {
    const dir = resolveContentDirectory();
    const blogDir = resolve(dir, 'blog');

    const images = await readDirectoryRecursively(
      blogDir,
      blogDir,
      ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      false,
    );

    return Object.freeze(Object.fromEntries(images.map((img) => [basename(img), img] as const)));
  }
}
