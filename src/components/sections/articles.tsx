
"use client";

import AnimatedSection from '../animated-section';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { Card } from '../ui/card';
import { useCollection } from '@/firebase';
import type { Article } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const formatDate = (date: any) => {
    if (!date) return '';
    if (date instanceof Timestamp) {
        return date.toDate().toLocaleDateString('en-US');
    }
    return new Date(date).toLocaleDateString('en-US');
};

export default function InsightsSection() {
  const { data: articles, loading } = useCollection<Article>('articles');
  const recentArticles = articles ? articles.slice(0, 3) : [];

  return (
    <section id="insights" className="relative z-10 py-20 md:py-32">
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
                        From My Articles
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Explore my latest articles on AI, digital transformation, and the future of project management.
                    </p>
                     <Link href="/articles" className="inline-block mt-4">
                        <Button variant="outline" className="group">
                            View All Articles
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
                
                <div className="space-y-4">
                    {loading && (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    )}
                    {!loading && recentArticles.map((article) => {
                      return (
                        <Link href={`/articles/${article.id}`} key={article.id}>
                            <Card className="p-4 flex items-center gap-4 bg-card/30 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group">
                                {article.imageUrl && (
                                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                      <Image
                                          src={article.imageUrl}
                                          alt={article.title}
                                          fill
                                          className="object-cover"
                                      />
                                  </div>
                                )}
                                <div className={cn("flex-grow", article.language === 'rtl' && 'text-right')}>
                                    <h3 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                                    <div className={cn("flex items-center gap-2 text-xs text-muted-foreground mt-1", article.language === 'rtl' && 'justify-end')}>
                                        <Calendar className="w-3 h-3" />
                                        <span>{formatDate(article.date)}</span>
                                    </div>
                                </div>
                                <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 ml-auto">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </Card>
                        </Link>
                      );
                    })}
                </div>
            </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
