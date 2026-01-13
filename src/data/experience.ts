export type ExperienceItem = {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    id: 1,
    date: '2021 - Present',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    description: 'Leading the development of high-performance web applications using React and Next.js. Mentoring junior developers and driving architectural decisions.',
  },
  {
    id: 2,
    date: '2019 - 2021',
    title: 'Mid-Level Software Engineer',
    company: 'Innovate Co.',
    description: 'Developed and maintained client-facing features for a large-scale SaaS platform. Collaborated with UI/UX designers to implement responsive and accessible interfaces.',
  },
  {
    id: 3,
    date: '2017 - 2019',
    title: 'Junior Web Developer',
    company: 'Digital Creations',
    description: 'Built and styled websites for a variety of clients using HTML, CSS, and JavaScript. Gained foundational experience in web development and project management.',
  },
];
