
import ArticleCard from '@/components/article-card';
import { articles } from '@/data/articles';
import AnimatedSection from '../animated-section';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ArticlesSection() {
  // Display the 3 most recent articles
  const recentArticles = articles.slice(0, 3);

  return (
    <section id="articles" className="relative z-10">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Recent Articles</h2>
          <p className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Check out my latest thoughts on web development, design, and more.
          </p>
        </div>
      </AnimatedSection>
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-0 md:gap-8 md:grid md:grid-cols-2 items-start">
        {recentArticles.map((article, index) => (
          <AnimatedSection
            key={article.id}
            style={{ 
              animationDelay: `${index * 150}ms`,
              gridColumn: index === 0 ? 'span 2' : 'span 1',
              marginTop: index > 0 && index % 2 !== 0 ? '2rem' : '0'
            }}
            className={index === 0 ? 'md:col-span-2' : `md:col-span-1 ${index === 2 ? 'md:mt-16' : ''}` }
          >
            <ArticleCard article={article} isFeatured={index === 0} />
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection>
        <div className="text-center mt-16">
            <Link href="/articles">
                <Button variant="outline" className="group">
                    View All Articles
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
