import { articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import ArticleDetailsClient from './article-details-client';

export default function ArticleDetailsPage({ params }: { params: { id: string } }) {
  const article = articles.find((p) => p.id === params.id);

  if (!article) {
    notFound();
  }

  return <ArticleDetailsClient article={article} />;
}
