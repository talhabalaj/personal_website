export interface Project {
  name: string;
  description: string;
  link: string;
  downloads?: string;
  type: string;
  tech: string[];
  stars?: string;
  status: 'Active' | 'Maintained' | 'Archived';
}

export const projects: Project[] = [
  {
    name: 'VSCode Font Changer',
    description:
      'A VS Code extension that revolutionizes font management in Visual Studio Code. Allows developers to quickly switch between installed fonts with a simple command palette interface.',
    link: 'https://github.com/talhabalaj/vscode-font-changer',
    downloads: '22k+',
    type: 'VS Code Extension',
    tech: ['TypeScript', 'VS Code API', 'Node.js'],
    stars: '10',
    status: 'Active',
  },
];
