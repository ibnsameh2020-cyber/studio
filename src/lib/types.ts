
import type { Timestamp } from "firebase/firestore";

export type Project = {
    id: string;
    title: string;
    category: string;
    shortDescription: string;
    client: string;
    partner?: string;
    scale?: string;
    scope: string;
    role: string;
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
  category: string;
  headline: string;
  hook: string;
  keyInsight: string;
  authorId: string;
  date: Timestamp | Date | string;
  language?: 'ltr' | 'rtl';
};

export type Resource = {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    date: Timestamp | Date | string;
    tags: string[];
    imageUrl?: string;
    language?: 'ltr' | 'rtl';
};

export type UserProfile = {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  category: 'Strategic Leadership & Governance' | 'Technical Licenses & Authorizations' | 'Digital Innovation & Analytics' | 'Professional Endorsements';
  imagePlaceholderId: string;
  url?: string;
};
