import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { ExcalidrawService } from './excalidraw/excalidraw.service';

@Module({
  providers: [BlogService, ExcalidrawService],
  controllers: [BlogController],
})
export class BlogModule {}
