export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['React', 'NextJS', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'NestJS', 'Express', 'NextJS API', 'AWS Lambda'],
  },
  {
    category: 'Database',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'DevOps & Tools',
    skills: ['Docker', 'Git', 'GitHub Actions', 'AWS'],
  },
];
