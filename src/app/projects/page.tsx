
"use client";

import { notFound } from 'next/navigation';

// This page's content is now part of the homepage.
// This file is kept to prevent broken links but redirects to a 404.
export default function ProjectsPage() {
    notFound();
    return null;
}
