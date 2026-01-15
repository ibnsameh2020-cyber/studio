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
  isFeatured?: boolean;
};

export default function ArticleCard({ article, isFeatured = false }: ArticleCardProps) {
  const articleImage = PlaceHolderImages.find(img => img.id === article.imagePlaceholderId);

  return (
    <Link href={`/articles/${article.id}`}>
        <Card className={cn(
          "h-full w-full flex flex-col group overflow-hidden cursor-pointer",
          "bg-card/30 backdrop-blur-md border border-white/10 transition-all duration-300",
          "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2",
          isFeatured ? "md:flex-row" : "flex-col"
        )}>
            {articleImage && (
              <div className={cn(
                "relative overflow-hidden",
                isFeatured ? "md:w-1/2 aspect-video" : "w-full aspect-video"
              )}>
                <Image
                  src={articleImage.imageUrl}
                  alt={article.title}
                  fill
                  data-ai-hint={articleImage.imageHint}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className={cn("flex flex-col flex-grow", isFeatured ? "md:w-1/2" : "w-full")}>
              <CardHeader>
                <CardTitle className="font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
              </CardContent>
              <CardFooter className="mt-auto flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                  </div>
                  <div className="flex items-center text-sm text-primary group-hover:underline">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
              </CardFooter>
            </div>
        </Card>
    </Link>
  );
}
