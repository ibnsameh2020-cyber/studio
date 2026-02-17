
import React from 'react';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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


type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const cardContent = (
    <Card className="h-full w-full flex flex-col bg-card/30 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      <CardHeader className="p-0">
        {article.category && <Badge variant="secondary" className="mb-4 w-fit">{article.category}</Badge>}
        <CardTitle className="font-headline text-xl text-primary">{renderWithLinks(article.headline)}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow pt-6 space-y-4">
        <div>
            <h3 className="font-semibold text-foreground/80 mb-2 uppercase tracking-wider text-xs">The Hook</h3>
            <p className="text-base text-muted-foreground italic">"{renderWithLinks(article.hook)}"</p>
        </div>
        <div>
            <h3 className="font-semibold text-foreground/80 mb-2 uppercase tracking-wider text-xs">Key Insight</h3>
            <p className="text-base text-foreground font-medium">{renderWithLinks(article.keyInsight)}</p>
        </div>
      </CardContent>
    </Card>
  );

  return cardContent;
}
