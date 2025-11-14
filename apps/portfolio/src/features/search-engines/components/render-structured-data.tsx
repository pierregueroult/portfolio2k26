import type { BlogPosting, Thing, WithContext } from 'schema-dts';

type RenderStructuredDataProps<T extends Thing> = {
  data: WithContext<T>;
};

export function RenderStructuredData<T extends Thing>({ data }: RenderStructuredDataProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function RenderBlogStructuredData({ data }: RenderStructuredDataProps<BlogPosting>) {
  return <RenderStructuredData<BlogPosting> data={data} />;
}
