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
];

export const getAppConfig = (appId: AppId): AppConfig | undefined => {
  return apps.find(app => app.id === appId);
};

export const desktopApps = apps.filter(app =>
  ['terminal', 'settings', 'snake', 'minesweeper'].includes(app.id)
);
