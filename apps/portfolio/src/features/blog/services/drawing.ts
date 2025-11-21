import type { GetAllImagesResponse } from '@repo/database/dtos/blog/image';
import type { BinaryFiles } from '@repo/database/schemas/blog/excalidraw';
import type { ValueOf } from '@excalidraw/excalidraw/utility-types';
import type { FileId } from '@excalidraw/excalidraw/element/types';
import type { BinaryFileData, DataURL } from '@excalidraw/excalidraw/types';
import { MIME_TYPES, IMAGE_MIME_TYPES } from '../config/mime-types';

export async function parseDrawingFiles(
  markdown: string,
  locale: string,
  images: GetAllImagesResponse,
): BinaryFiles {
  const regex = /## Embedded Files\n([\s\S]*?)%%/;
  const match = markdown.match(regex);

  const files: BinaryFiles = {};

  console.log(images);

  if (match && match[1]) {
    const pairs = match[1]
      .trim()
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) =>
        line.split(':').map((part) => part.trim().replace(/^\[\[/, '').replace(/\]\]$/, '')),
      );

    for (const [id, name] of pairs) {
      if (!id || !name) continue;

      const permalink = images.images[name];

      if (!permalink) continue;

      const file: BinaryFileData = {
        id: id as FileId,
        dataURL: `/${locale}/blog/images/${permalink}` as DataURL,
        created: Date.now(),
        mimeType: parseMimeTypeImage(name),
      };

      files[id] = file;
    }
  }

  return files;
}

export function parseMimeTypeImage(
  fileName: string,
): ValueOf<typeof IMAGE_MIME_TYPES> | typeof MIME_TYPES.binary {
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (!extension) return 'application/octet-stream';

  if (extension && extension in IMAGE_MIME_TYPES) {
    return IMAGE_MIME_TYPES[extension as keyof typeof IMAGE_MIME_TYPES];
  }

  return 'application/octet-stream';
}
