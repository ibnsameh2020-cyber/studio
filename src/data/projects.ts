
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
    description: 'A full-featured e-commerce site with product listings, cart functionality, and a secure checkout process. This project demonstrates a robust architecture for online retail, featuring user authentication, product management, and a seamless payment gateway integration. It is built for scalability and performance, ensuring a smooth shopping experience.',
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
    description: 'An interactive dashboard for visualizing complex datasets with dynamic charts and filters. This powerful tool allows users to explore data intuitively, with various chart types and real-time filtering capabilities. The architecture is optimized for handling large volumes of data while maintaining a responsive and user-friendly interface.',
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
    description: 'A cross-platform mobile app to help users organize their daily tasks and boost productivity. Featuring a clean, intuitive interface, this app allows for task creation, scheduling, and progress tracking. It leverages real-time database synchronization to ensure data is always up-to-date across all of the user\'s devices, enhancing productivity on the go.',
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
    description: 'A web-based chat application supporting real-time messaging, user authentication, and multiple channels. Built with a scalable backend, it ensures low-latency communication. Features include private messaging, group chats, and online status indicators, providing a comprehensive and engaging chat experience for communities.',
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
