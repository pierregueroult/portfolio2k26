import { Injectable } from '@nestjs/common';
import { decompressFromBase64 } from 'lz-string';
import { ExcalidrawJson } from '@repo/database/schemas/blog/excalidraw';

@Injectable()
export class ExcalidrawService {
  decompressDrawing(compressedData: string): ExcalidrawJson {
    let cleanedData = '';
    const length = compressedData.length;
    for (let i = 0; i < length; i++) {
      const char = compressedData[i];
      if (char !== '\n' && char !== '\r') {
        cleanedData += char;
      }
    }

    const resultAsString = decompressFromBase64(cleanedData);
    if (!resultAsString) {
      throw new Error('The drawing data is corrupted or invalid.');
    }

    try {
      const result = JSON.parse(resultAsString);

      return result;
    } catch {
      throw new Error('The drawing data is corrupted or invalid.');
    }
  }

  getCompressedJson(markdown: string): string {
    return markdown.split('```compressed-json')[1].split('```')[0];
  }
}
