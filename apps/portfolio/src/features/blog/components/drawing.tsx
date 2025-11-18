import { Locale } from '@/features/internationalization/lib/routing';
import { ExcalidrawJson } from '@repo/database/schemas/blog/excalidraw';
import { parseDrawingFiles } from '../services/drawing';
import { getArticlesImagesDictionary } from '../services/content';
import { Excalidraw } from './excalidraw';
import { ComponentProps } from 'react';

type DrawingProps = {
  locale: Locale;
  content: string;
  json: ExcalidrawJson;
  config?: {
    scrollToContent?: boolean;
  } & Partial<ComponentProps<typeof Excalidraw>>;
};

export async function Drawing({ locale, content, json, config }: DrawingProps) {
  json.files = await parseDrawingFiles(content, locale, await getArticlesImagesDictionary());

  return (
    <div className="h-screen w-screen fixed left-0 top-0">
      <Excalidraw
        initialData={{ ...json, scrollToContent: config?.scrollToContent ?? true }}
        viewModeEnabled
        langCode={locale}
        {...config}
      />
    </div>
  );
}
