import { Drawing } from '@/features/blog/components/drawing';
import { getArticleContentBySlug } from '@/features/blog/services/content';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { notFound } from 'next/navigation';

export default async function DrawingPage(
  props: PageProps<'/[locale]/blog/drawings/[...drawing]'>,
) {
  const { drawing } = await props.params;
  const locale = await assertValidLocaleFromParams(props.params);
  const result = await getArticleContentBySlug(drawing);

  if (result.type !== 'excalidraw') return notFound();

  return (
    <Drawing
      locale={locale.slug}
      content={result.drawing.content}
      json={result.drawing.json}
      config={{ scrollToContent: true }}
    />
  );
}
