import { IsObject } from 'class-validator';

export class GetAllImagesResponse {
  @IsObject()
  images: {
    [key: string]: string;
  };
}
