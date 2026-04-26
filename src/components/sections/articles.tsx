"use client";

import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { Card } from '../ui/card';
import { useCollection } from '@/firebase';
import type { Article } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';

const formatDate = (date: any) => {
    if (!date) return '';
    if (date instanceof Timestamp) {
        return date.toDate().toLocaleDateString('en-US');
    }
    return new Date(date).toLocaleDateString('en-US');
};

const renderWithLinks = (text: string) => {
  if (!text) return text;
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [fullMatch, linkText, url] = match;
    parts.push(
      <a
        key={url + match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {linkText}
      </a>
    );
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  if (parts.length === 0) {
    return text;
  }

  return <>{parts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>)}</>;
};

export default function InsightsSection() {
  const { data: articles, loading } = useCollection<Article>('articles');
  const recentArticles = articles ? articles.slice(0, 3) : [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6" data-reveal>
                    <h2 className="text-3xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground inline-block">
                        Insights
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Explore my latest insights on AI, digital transformation, and the future of project management.
                    </p>
                     <Link href="/articles" className="inline-block mt-4">
                        <Button variant="outline" className="group">
                            View All Insights
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
                        <div key={article.id} data-reveal>
                            <Card className="p-4 flex items-center gap-4 bg-card/30 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group">
                                <div className={cn("flex-grow", 'text-left')}>
                                    <h3 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{renderWithLinks(article.headline)}</h3>
                                    <div className={cn("flex items-center gap-2 text-xs text-muted-foreground mt-1", 'justify-start')}>
                                        <Calendar className="w-3 h-3" />
                                        <span>{formatDate(article.date)}</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                      );
                    })}
                </div>
            </div>
        </div>
    </div>
  );
}
