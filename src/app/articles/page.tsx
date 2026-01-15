import AnimatedSection from '@/components/animated-section';
import ArticleCard from '@/components/article-card';
import { articles } from '@/data/articles';

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Blog</h1>
        <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on web development and design.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <AnimatedSection key={article.id} style={{ animationDelay: `${index * 150}ms` }}>
            <ArticleCard article={article} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
