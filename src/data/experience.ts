export type ExperienceItem = {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string;
  longDescription: string;
};

export const experience: ExperienceItem[] = [
  {
    id: 1,
    date: '2021 - Present',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    description: 'Leading the development of high-performance web applications.',
    longDescription: 'Leading the development of high-performance web applications using React and Next.js. Responsible for architectural decisions, code reviews, and mentoring a team of junior developers. Played a key role in improving application performance by 30% and reducing bundle size through code splitting and optimization techniques. Championed the adoption of TypeScript across the organization.',
  },
  {
    id: 2,
    date: '2019 - 2021',
    title: 'Mid-Level Software Engineer',
    company: 'Innovate Co.',
    description: 'Developed and maintained client-facing features for a SaaS platform.',
    longDescription: 'Developed and maintained client-facing features for a large-scale SaaS platform. Collaborated with UI/UX designers to implement responsive and accessible interfaces using React and Tailwind CSS. Contributed to the development of a component library that increased development velocity and ensured design consistency across the product.',
  },
  {
    id: 3,
    date: '2017 - 2019',
    title: 'Junior Web Developer',
    company: 'Digital Creations',
    description: 'Built and styled websites for various clients.',
    longDescription: 'Built and styled websites for a variety of clients using HTML, CSS, and JavaScript. Gained foundational experience in web development, version control with Git, and agile project management methodologies. Assisted senior developers in building interactive features and learned to translate design mockups into functional web pages.',
  },
];