import { type ReadStream, createReadStream, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { resolveContentDirectory } from '../blog.util';

@Injectable()
export class DocumentService {
  async readPdfFile(path: string): Promise<{
    stream: ReadStream;
    filename: string;
  }> {
    const dir = resolveContentDirectory();
    const filePath = join(dir, 'blog', path);

    if (!existsSync(filePath)) {
      throw new NotFoundException(`PDF file not found: ${path}`);
    }

    const filename = basename(filePath);

    try {
      const stream = createReadStream(filePath);

      stream.on('error', () => {
        throw new InternalServerErrorException('Error reading file');
      });

      return { stream, filename };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(`Error reading file: ${message}`);
    }
  }
}
