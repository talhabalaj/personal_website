import type { AppId } from '../stores/windowStore';

export interface AppConfig {
  id: AppId;
  name: string;
  icon: string;
  title: string;
  defaultSize?: { width: number; height: number };
  category: 'core' | 'interactive' | 'fun';
}

export const apps: AppConfig[] = [
  // Core Apps
  {
    id: 'profile',
    name: 'Profile',
    icon: 'User',
    title: 'Profile - Talha Balaj',
    defaultSize: { width: 700, height: 600 },
    category: 'core',
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: 'FolderOpen',
    title: 'Projects',
    defaultSize: { width: 600, height: 500 },
    category: 'core',
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: 'Mail',
    title: 'Contact Me',
    defaultSize: { width: 450, height: 550 },
    category: 'core',
  },

  // Interactive Apps
  {
    id: 'terminal',
    name: 'Terminal',
    icon: 'Terminal',
    title: 'Terminal',
    defaultSize: { width: 650, height: 450 },
    category: 'interactive',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'Settings',
    title: 'Settings',
    defaultSize: { width: 450, height: 400 },
    category: 'interactive',
  },

  // Fun Apps
  {
    id: 'snake',
    name: 'Snake',
    icon: 'Gamepad2',
    title: 'Snake Game',
    defaultSize: { width: 420, height: 500 },
    category: 'fun',
  },
  {
    id: 'minesweeper',
    name: 'Minesweeper',
    icon: 'Bomb',
    title: 'Minesweeper',
    defaultSize: { width: 320, height: 420 },
    category: 'fun',
  },
  {
    id: 'trash',
    name: 'Trash',
    icon: 'Trash2',
    title: 'Trash',
    defaultSize: { width: 400, height: 300 },
    category: 'fun',
  },
];

export const getAppConfig = (appId: AppId): AppConfig | undefined => {
  return apps.find(app => app.id === appId);
};

export const desktopApps = apps.filter(app =>
  ['profile', 'projects', 'contact', 'terminal', 'settings', 'snake', 'minesweeper', 'trash'].includes(app.id)
);
