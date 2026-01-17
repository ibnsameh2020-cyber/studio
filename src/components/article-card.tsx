
import type { Article } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="h-full w-full flex flex-col bg-card/30 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      <CardHeader className="p-0">
        {article.category && <Badge variant="secondary" className="mb-4 w-fit">{article.category}</Badge>}
        <CardTitle className="font-headline text-xl text-primary">{article.headline}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow pt-6 space-y-4">
        <div>
            <h3 className="font-semibold text-foreground/80 mb-2 uppercase tracking-wider text-xs">The Hook</h3>
            <p className="text-base text-muted-foreground italic">"{article.hook}"</p>
        </div>
        <div>
            <h3 className="font-semibold text-foreground/80 mb-2 uppercase tracking-wider text-xs">Key Insight</h3>
            <p className="text-base text-foreground font-medium">{article.keyInsight}</p>
        </div>
      </CardContent>
    </Card>
  );
}
