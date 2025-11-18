import { Module } from '@nestjs/common';

import { MarkdownService } from './markdown/markdown.service';
import { ImageService } from './image/image.service';
import { DocumentService } from './document/document.service';
import { BlogController } from './blog.controller';
import { ExcalidrawService } from './excalidraw/excalidraw.service';

@Module({
  providers: [ExcalidrawService, DocumentService, MarkdownService, ImageService],
  controllers: [BlogController],
})
export class BlogModule {}
