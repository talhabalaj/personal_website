export interface Experience {
  role: string;
  company: string;
  dates: string;
  duration: string;
  type: string;
  location: string;
  status?: 'current';
  details: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    role: 'Senior Software Engineer',
    company: 'mobileLive, Inc',
    dates: 'April 2024 - Present',
    duration: '9 months',
    type: 'Full-time',
    location: 'Toronto, ON',
    status: 'current',
    details: [
      'Reverse engineered and rebuilt in-house pricing engine SDK for Staples.ca',
      'Lead development of new NextJS checkout experience for the entire store platform',
      'Enhanced development workflow and tooling, improving team velocity',
    ],
    skills: ['React', 'NextJS', 'Shopify', 'SDK Development', 'E-commerce'],
  },
  {
    role: 'Software Engineer',
    company: 'Nextbridge, Inc',
    dates: 'June 2022 - Mar 2024',
    duration: '1 year 9 months',
    type: 'Full-time',
    location: 'Lahore, Pakistan',
    details: [
      'Developed customer device management interface with real-time tracking',
      'Led migration from Create React App to NextJS for improved SEO',
      'Implemented AWS S3 and CloudFront CDN integration',
      'Architected full-stack solution using NextJS and NestJS microservices',
      'Built NodeJS backend for order tracking across multiple platforms',
    ],
    skills: ['React', 'NodeJS', 'NextJS', 'NestJS', 'Docker', 'AWS'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Netelsoft',
    dates: 'May 2021 - April 2022',
    duration: '1 year',
    type: 'Full-time',
    location: 'Lahore, Pakistan',
    details: [
      'Built VPN service management dashboard using React and Express',
      'Developed cross-platform ISP management app using Flutter and NodeJS',
      'Created web-based configuration dashboard for Huawei OLT equipment',
    ],
    skills: ['React', 'NodeJS', 'Express', 'MySQL', 'Docker', 'Flutter'],
  },
  {
    role: 'Software Engineer Freelancer',
    company: 'Upwork (Freelance)',
    dates: 'Jan 2020 - May 2021',
    duration: '1 year 4 months',
    type: 'Freelance',
    location: 'Remote',
    details: [
      'Delivered full-stack web applications for international clients',
      'Maintained perfect 5-star rating and 100% job success score',
      'Achieved Top Rated status representing top 3% of freelancers',
    ],
    skills: ['React', 'NodeJS', 'Express', 'MySQL', 'Docker'],
  },
];
