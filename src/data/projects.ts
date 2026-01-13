export type TechStack = 'React' | 'Next.js' | 'Tailwind CSS' | 'TypeScript' | 'Firebase' | 'Node.js';

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: TechStack[];
  liveUrl?: string;
  githubUrl?: string;
  imagePlaceholderId: string;
  layout: {
    colSpan: string;
    rowSpan: string;
  };
};

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce site with product listings, cart functionality, and a secure checkout process.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Firebase'],
    liveUrl: '#',
    githubUrl: '#',
    imagePlaceholderId: 'project-1',
    layout: {
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
    },
  },
  {
    id: 'project-2',
    title: 'Data Analytics Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets with dynamic charts and filters.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
    imagePlaceholderId: 'project-2',
    layout: {
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
    },
  },
  {
    id: 'project-3',
    title: 'Mobile Task Manager',
    description: 'A cross-platform mobile app to help users organize their daily tasks and boost productivity.',
    techStack: ['React', 'Firebase'],
    liveUrl: '#',
    githubUrl: '#',
    imagePlaceholderId: 'project-3',
    layout: {
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
    },
  },
    {
    id: 'project-4',
    title: 'Real-time Chat App',
    description: 'A web-based chat application supporting real-time messaging, user authentication, and multiple channels.',
    techStack: ['React', 'Firebase', 'Node.js'],
    liveUrl: '#',
    githubUrl: '#',
    imagePlaceholderId: 'project-4',
    layout: {
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
    },
  },
];
