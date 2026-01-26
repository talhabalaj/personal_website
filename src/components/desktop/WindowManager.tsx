import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';
import { Window } from './Window';
import { ProfileApp } from '../apps/ProfileApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { ContactApp } from '../apps/ContactApp';
import { TerminalApp } from '../apps/TerminalApp';
import { SettingsApp } from '../apps/SettingsApp';
import { SnakeApp } from '../apps/games/SnakeApp';
import { MinesweeperApp } from '../apps/games/MinesweeperApp';
import { TrashApp } from '../apps/TrashApp';

const AppComponents: Record<string, React.ComponentType> = {
  profile: ProfileApp,
  projects: ProjectsApp,
  contact: ContactApp,
  terminal: TerminalApp,
  settings: SettingsApp,
  snake: SnakeApp,
  minesweeper: MinesweeperApp,
  trash: TrashApp,
};

export function WindowManager() {
  const windows = useWindowStore((state) => state.windows);

  return (
    <div className="fixed inset-0 top-0 bottom-12 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {windows.map((window) => {
          const AppComponent = AppComponents[window.appId];
          if (!AppComponent) return null;

          return (
            <Window key={window.id} window={window}>
              <AppComponent />
            </Window>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
