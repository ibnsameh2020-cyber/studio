
import type { Timestamp } from "firebase/firestore";

export type Project = {
    id: string;
    title: string;
    shortDescription: string;
    description: string; // Retained for backward compatibility if needed, but new fields are preferred.
    situation?: string;
    task?: string;
    action?: string;
    result?: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    imagePlaceholderId: string;
};
  
export type ExperienceItem = {
    id: number;
    date: string;
    title: string;
    company: string;
    description: string;
    longDescription: string;
};

export type ContentBlock = {
  type: 'h1' | 'h2' | 'p' | 'blockquote' | 'list';
  content: string | string[];
};

export type Article = {
    id: string;
    title: string;
    description: string;
    content: string;
    formattedContent?: ContentBlock[] | string;
    author: string;
    date: Timestamp | Date | string;
    tags: string[];
    imageUrl?: string;
    language?: 'ltr' | 'rtl';
};
