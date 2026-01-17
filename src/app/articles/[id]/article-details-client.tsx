
"use client";

import { notFound } from 'next/navigation';

export default function ArticleDetailsClient() {
  // Since "Insights" (articles) are now short-form and displayed on the main articles page,
  // this detail page is no longer necessary.
  notFound();
  return null;
}
