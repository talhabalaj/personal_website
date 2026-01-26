import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { desktopApps, type AppConfig } from '../../data/apps';
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

export function MobileDesktop() {
  const [activeApp, setActiveApp] = useState<AppConfig | null>(null);

  const handleAppClick = (app: AppConfig) => {
    setActiveApp(app);
  };

  const handleBack = () => {
    setActiveApp(null);
  };

  return (
    <div className="fixed inset-0 bg-bg-primary">
      <AnimatePresence mode="wait">
        {!activeApp ? (
          // App List View
          <motion.div
            key="app-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            {/* Header */}
            <header className="sticky top-0 bg-bg-secondary/95 backdrop-blur-md border-b border-border px-4 py-3 z-10">
              <h1 className="text-lg font-mono text-text-primary">Talha Balaj</h1>
              <p className="text-xs text-text-secondary font-mono">Full Stack Engineer</p>
            </header>

            {/* App Grid */}
            <div className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-3 gap-4">
                {desktopApps.map((app, index) => {
                  const IconComponent =
                    (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[
                      app.icon
                    ] || LucideIcons.File;

                  return (
                    <motion.button
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAppClick(app)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-bg-secondary border border-border hover:bg-bg-elevated active:scale-95 transition-all"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-bg-elevated rounded-lg">
                        <IconComponent className="w-6 h-6 text-text-primary" />
                      </div>
                      <span className="text-[10px] text-text-primary text-center font-mono leading-tight">
                        {app.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <footer className="sticky bottom-0 bg-bg-secondary/95 backdrop-blur-md border-t border-border px-4 py-3 text-center">
              <p className="text-xs text-text-secondary font-mono">
                Tap an app to open
              </p>
            </footer>
          </motion.div>
        ) : (
          // App View
          <motion.div
            key={`app-${activeApp.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-full flex flex-col"
          >
            {/* App Header */}
            <header className="sticky top-0 bg-bg-secondary/95 backdrop-blur-md border-b border-border px-2 py-2 z-10 flex items-center gap-2">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-bg-elevated rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>
              <span className="text-sm font-mono text-text-primary truncate">
                {activeApp.title}
              </span>
            </header>

            {/* App Content */}
            <div className="flex-1 overflow-auto">
              {(() => {
                const AppComponent = AppComponents[activeApp.id];
                return AppComponent ? <AppComponent /> : null;
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
