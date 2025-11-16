import type { ExcalidrawElement } from '@excalidraw/excalidraw/dist/types/excalidraw/element/types';
import type {
  AppState,
  BinaryFiles,
  DataURL,
} from '@excalidraw/excalidraw/dist/types/excalidraw/types';
import { IsArray, IsIn, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { IsObjectOrNull } from '../../decorators/object-or-null';

export class ExcalidrawJson {
  @IsString()
  @IsIn(['excalidraw'])
  type: 'excalidraw';

  @IsNumber()
  version: number;

  @IsString()
  @IsOptional()
  source?: string;

  @IsArray()
  elements: ExcalidrawElement[];

  @IsObject()
  @IsOptional()
  appState?: Partial<AppState>;

  @IsObjectOrNull()
  @IsOptional()
  files?: BinaryFiles | null;
}

export type { ExcalidrawElement, AppState, BinaryFiles, DataURL };
