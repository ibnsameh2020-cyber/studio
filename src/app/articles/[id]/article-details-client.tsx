
"use client";

import type { Article, ContentBlock } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

const formatDate = (date: any) => {
  if (!date) return '';
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// This function processes simple inline markdown like **bold** and *italic*.
const processInlineMarkdown = (line: string): React.ReactNode => {
  const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

// Renders content from the new structured format
const renderStructuredContent = (blocks: ContentBlock[]) => {
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'h1':
        return (
          <h2 key={index} className="text-3xl font-headline font-bold mt-10 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
            {processInlineMarkdown(block.content as string)}
          </h2>
        );
      case 'h2':
        return (
          <h3 key={index} className="text-2xl font-headline font-semibold mt-8 mb-4 text-primary">
            {processInlineMarkdown(block.content as string)}
          </h3>
        );
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 my-6 bg-card/30">
            <p className="text-lg italic text-foreground/90">{processInlineMarkdown(block.content as string)}</p>
          </blockquote>
        );
      case 'list':
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-2 pl-4">
            {(block.content as string[]).map((item, i) => <li key={i}>{processInlineMarkdown(item)}</li>)}
          </ul>
        );
      case 'p':
      default:
        return <p key={index} className="mb-4 leading-relaxed">{processInlineMarkdown(block.content as string)}</p>;
    }
  });
};

// Renders content from the legacy string format (for backward compatibility)
const renderLegacyContent = (content: string) => {
  const lines = content.split('\n');
  
  const isHeader = (line: string) => /^\.\d+\s/.test(line.trim());
  const isSubHeader = (line: string) => /^\d+\.\d+\s/.test(line.trim());
  const isQuote = (line: string) => line.trim().startsWith('>');

  return lines.map((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      return null;
    }

    if (isHeader(trimmedLine)) {
      return (
        <h2 key={index} className="text-3xl font-headline font-bold mt-10 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
          {processInlineMarkdown(trimmedLine)}
        </h2>
      );
    }
    if (isSubHeader(trimmedLine)) {
      return (
        <h3 key={index} className="text-2xl font-headline font-semibold mt-8 mb-4 text-primary">
          {processInlineMarkdown(trimmedLine)}
        </h3>
      );
    }
    if (isQuote(trimmedLine)) {
      return (
        <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 my-6 bg-card/30">
          <p className="text-lg italic text-foreground/90">{processInlineMarkdown(trimmedLine.substring(1).trim())}</p>
        </blockquote>
      );
    }

    return <p key={index} className="mb-4 leading-relaxed">{processInlineMarkdown(trimmedLine)}</p>;
  });
};


export default function ArticleDetailsClient({ article }: { article: Article }) {
  const isRTL = article.language === 'rtl';
  const contentToRender = article.formattedContent || article.content;

  return (
    <div 
      className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32",
        isRTL && "font-arabic"
      )}
      dir={article.language || 'ltr'}
    >
      <div className="max-w-4xl mx-auto">
        
        {article.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8 shadow-lg border border-border/20">
            <Image 
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">{article.title}</h1>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Eng. Sameh Moussa</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Published on {formatDate(article.date)}</span>
                </div>
            </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 mb-12">
            {Array.isArray(contentToRender)
              ? renderStructuredContent(contentToRender as ContentBlock[])
              : renderLegacyContent(contentToRender as string)
            }
        </article>

        <div className="flex flex-wrap gap-2" dir="ltr">
          {Array.isArray(article.tags) && article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

      </div>
    </div>
  );
}
