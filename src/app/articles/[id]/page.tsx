"use client";

import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { notFound, useParams } from 'next/navigation';
import ArticleDetailsClient from './article-details-client';
import { useEffect, useState } from 'react';
import { Article } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function ArticleDetailsPage() {
  const { id } = useParams();
  const firestore = useFirestore();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !id) return;

    const getArticle = async () => {
      const articleId = Array.isArray(id) ? id[0] : id;
      const docRef = doc(firestore, 'articles', articleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle(docSnap.data() as Article);
      } else {
        notFound();
      }
      setLoading(false);
    };

    getArticle();
  }, [firestore, id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  return <ArticleDetailsClient article={article} />;
}
