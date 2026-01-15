
import { articles } from '@/data/articles';
import AnimatedSection from '../animated-section';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Card } from '../ui/card';

export default function ArticlesSection() {
  const recentArticles = articles.slice(0, 3);

  return (
    <section id="articles" className="relative z-10 py-20 md:py-32">
       <div 
          className="absolute inset-0 z-[-1] h-full w-full bg-transparent"
          style={{
            backgroundSize: '30px 30px',
            backgroundImage:
              'linear-gradient(to right, hsl(var(--border) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.1) 1px, transparent 1px)',
          }}
        ></div>
        <div className="absolute inset-0 z-[-2] bg-[radial-gradient(circle_500px_at_50%_700px,hsl(var(--primary)/0.1),transparent)]"></div>
      
      <AnimatedSection>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground inline-block">
                        From My Blog
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Dive into a world of insights, tutorials, and reflections on modern web development and design. Here are a few of my latest thoughts.
                    </p>
                     <Link href="/articles">
                        <Button variant="outline" className="group">
                            View All Articles
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
                
                <div className="space-y-4">
                    {recentArticles.map((article) => (
                        <Link href={`/articles/${article.id}`} key={article.id}>
                            <Card className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/30 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group">
                                <div>
                                    <h3 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors">{article.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(article.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
