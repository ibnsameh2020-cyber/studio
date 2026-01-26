
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
        date: 'Jan 2024 – Present',
        title: 'Strategic Planning & Cost-Efficiency Consultant (IT-PMO)',
        company: 'Saudi Irrigation Organization (SIO)',
        description: 'Leading strategic cost optimization and PMO maturity initiatives.',
        longDescription: 'Advising leadership on strategic planning and spending efficiency. I established IT-PMO governance frameworks to improve project success rates and aligned digital initiatives with national water security goals.',
    },
    {
        id: 2,
        date: 'Jun 2021 – Jan 2024',
        title: 'Digital Transformation Manager',
        company: 'REPOTECH',
        description: 'Drove digital adoption and process modernization.',
        longDescription: 'Led the digital transformation roadmap, integrating modern technology stacks into legacy environments and optimizing business processes to support scalable, data-driven growth.',
    },
    {
        id: 3,
        date: 'Mar 2018 – Jun 2021',
        title: 'Senior IT Project Manager',
        company: 'ROSMIMAN®',
        description: 'Managed complex IT infrastructure and asset management projects.',
        longDescription: 'Oversaw the implementation of advanced facility management software solutions. I coordinated cross-functional teams to deliver projects within strict timelines and budgets.',
    },
    {
        id: 4,
        date: 'Mar 2013 – Mar 2018',
        title: 'Project Director',
        company: 'SALEHIYA HEALTHCARE',
        description: 'Directed large-scale healthcare technology programs.',
        longDescription: 'Managed a diverse portfolio of healthcare IT projects aimed at improving patient care. I successfully steered budgets exceeding $120M, ensuring alignment with all healthcare regulations.',
    },
];
