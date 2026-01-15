import type { Article } from '@/data/articles';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const articleImage = PlaceHolderImages.find(img => img.id === article.imagePlaceholderId);

  return (
    <Link href={`/articles/${article.id}`}>
        <Card className={cn(
          "h-full w-full flex flex-col group overflow-hidden cursor-pointer",
          "bg-card/50 backdrop-blur-lg border border-border/30 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
        )}>
            {articleImage && (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={articleImage.imageUrl}
                  alt={article.title}
                  fill
                  data-ai-hint={articleImage.imageHint}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex items-center text-sm text-primary group-hover:underline">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
            </CardFooter>
        </Card>
    </Link>
  );
}
