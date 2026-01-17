
import type { Timestamp } from "firebase/firestore";

export type Project = {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
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

export type Article = {
    id: string;
    title: string;
    description: string;
    content: string;
    formattedContent?: string;
    author: string;
    date: Timestamp | Date | string;
    tags: string[];
    imageUrl?: string;
    language?: 'ltr' | 'rtl';
};

    
