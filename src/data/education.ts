export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa: string;
  highlights: string[];
}

export const education: Education[] = [
  {
    degree: 'Bachelors in Computer Science',
    institution: 'University of Engineering and Technology, Lahore',
    location: 'Lahore, Pakistan',
    duration: '2018 - 2022',
    gpa: '3.4/4.0',
    highlights: [
      'Software Engineering & Development',
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Computer Networks & Security',
    ],
  },
];
