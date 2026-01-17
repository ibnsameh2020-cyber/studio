"use client";

import AnimatedSection from '@/components/animated-section';
import ArticleCard from '@/components/article-card';
import { useCollection } from '@/firebase';
import type { Article } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function ArticlesPage() {
  const { data: articles, loading } = useCollection<Article>('articles');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Insights</h1>
        <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore my latest insights on AI, digital transformation, and the future of project management.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article, index) => (
            <AnimatedSection key={article.id} style={{ animationDelay: `${index * 150}ms` }}>
              <ArticleCard article={article} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
