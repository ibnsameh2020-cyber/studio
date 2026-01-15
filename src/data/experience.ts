
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
        date: 'Aug 2025 – Present',
        title: 'Strategic Planning & Cost Efficiency Consultant (IT-PMO)',
        company: 'Saudi Irrigation Organization (SIO)',
        description: 'Leading strategic cost optimization and PMO maturity initiatives.',
        longDescription: 'Advising leadership on strategic planning and spending efficiency across the organization. Establishing IT-PMO governance frameworks to improve project success rates. Aligning digital initiatives with national water security and efficiency goals.',
    },
    {
        id: 2,
        date: '[Year] – [Year]',
        title: 'Digital Transformation Manager',
        company: 'REPOTECH',
        description: 'Drove digital adoption and process modernization.',
        longDescription: 'Led the digital transformation roadmap, integrating modern tech stacks into legacy environments. Optimized business processes to support scalable growth and data-driven decision-making.',
    },
    {
        id: 3,
        date: '[Year] – [Year]',
        title: 'Senior IT Projects Manager',
        company: 'ROSMIMAN®',
        description: 'Managed complex IT infrastructure and asset management projects.',
        longDescription: 'Oversaw the implementation of advanced facility management software solutions. Coordinated cross-functional teams to deliver projects within strict timelines and budgets.',
    },
    {
        id: 4,
        date: '[Year] – [Year]',
        title: 'Projects Director',
        company: 'SALEHIYA HEALTHCARE',
        description: 'Directed large-scale healthcare technology programs.',
        longDescription: 'Managed a diverse portfolio of healthcare IT projects aimed at improving patient care services. Successfully steered budgets exceeding $100M, ensuring alignment with healthcare regulations.',
    },
];
