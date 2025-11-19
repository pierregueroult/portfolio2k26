import { BlogPosting, WithContext } from 'schema-dts';

type ArticleStructuredDataProps = {
  data: WithContext<BlogPosting>;
};

export function ArticleStructuredData({ data }: ArticleStructuredDataProps) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
