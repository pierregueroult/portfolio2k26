import type { Stats } from 'node:fs';
import { FrontMatter } from '../../schemas/blog/front-matter';
import { ExcalidrawJson } from '../../schemas/blog/excalidraw';
import { Equals, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ArticleResponseBaseDto {
  @IsObject()
  stats: Stats;

  @ValidateNested()
  @Type(() => FrontMatter)
  frontmatter: FrontMatter;

  @IsString()
  type: string;
}

export class ArticleMarkdownContentDto {
  @IsString()
  content: string;
}

export class ArticleMarkdownResponseDto extends ArticleResponseBaseDto {
  @Equals('markdown')
  declare type: 'markdown';

  @ValidateNested()
  @Type(() => ArticleMarkdownContentDto)
  article: ArticleMarkdownContentDto;
}

export class ArticleExcalidrawContentDto {
  @ValidateNested()
  @Type(() => ExcalidrawJson)
  json: ExcalidrawJson;

  @IsString()
  content: string;
}

export class ArticleExcalidrawResponseDto extends ArticleResponseBaseDto {
  @Equals('excalidraw')
  declare type: 'excalidraw';

  @ValidateNested()
  @Type(() => ArticleExcalidrawContentDto)
  drawing: ArticleExcalidrawContentDto;
}

export type ArticleResponse = ArticleMarkdownResponseDto | ArticleExcalidrawResponseDto;
