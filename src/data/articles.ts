export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  imagePlaceholderId: string;
  tags: string[];
};

export const articles: Article[] = [
  {
    id: 'mastering-react-hooks',
    title: 'Mastering React Hooks: A Deep Dive',
    description: 'Unlock the full potential of React Hooks and write cleaner, more efficient, and more maintainable code. This guide covers everything from the basics to advanced patterns.',
    content: 'React Hooks have revolutionized the way we write components. In this deep dive, we will explore the most important hooks like useState, useEffect, and useContext. We will also look at custom hooks and advanced patterns to manage complex state and side effects with ease. By the end of this article, you will have a solid understanding of how to leverage hooks to build powerful React applications.',
    author: 'Eng. Sameh Moussa',
    date: '2024-07-20',
    imagePlaceholderId: 'article-1',
    tags: ['React', 'JavaScript', 'Web Development'],
  },
  {
    id: 'the-rise-of-serverless-architecture',
    title: 'The Rise of Serverless Architecture',
    description: 'Serverless is more than just a buzzword; it’s a paradigm shift in how we build and deploy applications. Discover the benefits, challenges, and best practices of going serverless.',
    content: 'Serverless computing allows developers to build and run applications without thinking about servers. This article explores the pros and cons of serverless architectures, covering topics like AWS Lambda, Firebase Functions, and the Serverless Framework. We will discuss cost models, scalability, and when it makes sense to adopt a serverless approach for your next project.',
    author: 'Eng. Sameh Moussa',
    date: '2024-06-15',
    imagePlaceholderId: 'article-2',
    tags: ['Serverless', 'Cloud', 'Architecture'],
  },
  {
    id: 'a-guide-to-modern-css',
    title: 'A Practical Guide to Modern CSS',
    description: 'CSS has evolved significantly over the years. This guide will walk you through modern features like Flexbox, Grid, and Custom Properties that will change the way you write styles.',
    content: 'Long gone are the days of float-based layouts and table hacks. Modern CSS offers powerful tools for creating complex, responsive layouts with ease. This article provides practical examples of CSS Grid, Flexbox, and CSS Variables (Custom Properties). We will build several common UI patterns and demonstrate how these modern features lead to cleaner, more maintainable stylesheets.',
    author: 'Eng. Sameh Moussa',
    date: '2024-05-30',
    imagePlaceholderId: 'article-3',
    tags: ['CSS', 'Web Design', 'Frontend'],
  },
];
