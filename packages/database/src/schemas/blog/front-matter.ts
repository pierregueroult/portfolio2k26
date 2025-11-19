import { IsArray, IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import { visibilities, Visibility } from '../../constracts/blog/visibilty';

export class FrontMatter {
  @IsString()
  title: string;

  @IsString()
  id: string;

  @IsString()
  folder: string;

  @IsString()
  @IsIn(visibilities)
  @IsOptional()
  visibility?: Visibility;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  'excalidraw-plugin': string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  date: string;
}
