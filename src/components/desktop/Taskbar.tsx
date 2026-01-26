import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useWindowStore } from '../../stores/windowStore';
import { getAppConfig, apps } from '../../data/apps';

export function Taskbar() {
  const [time, setTime] = useState(new Date());
  const [showLauncher, setShowLauncher] = useState(false);

  const { windows, activeWindowId, focusWindow, restoreWindow, minimizeWindow, openWindow } =
    useWindowStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleTaskbarItemClick = (windowId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(windowId);
    } else if (activeWindowId === windowId) {
      minimizeWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  };

  return (
    <>
      {/* Launcher Menu */}
      <AnimatePresence>
        {showLauncher && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowLauncher(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-14 left-2 z-50 bg-bg-secondary border border-border rounded-lg p-2 shadow-2xl min-w-[200px]"
            >
              <div className="text-xs text-text-secondary px-2 py-1 mb-1">
                Applications
              </div>
              {apps.map((app) => {
                const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[app.icon] || LucideIcons.File;
                return (
                  <button
                    key={app.id}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 transition-colors text-left"
                    onClick={() => {
                      openWindow(app.id, app.title, app.defaultSize);
                      setShowLauncher(false);
                    }}
                  >
                    <IconComponent className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-primary">{app.name}</span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-bg-secondary/95 backdrop-blur-md border-t border-border flex items-center px-2 z-50">
        {/* App Launcher */}
        <button
          onClick={() => setShowLauncher(!showLauncher)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            showLauncher ? 'bg-white/10' : 'hover:bg-white/5'
          }`}
          aria-label="Open app launcher"
        >
          <LucideIcons.LayoutGrid className="w-5 h-5 text-text-primary" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-2" />

        {/* Open Windows */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {windows.map((win) => {
            const appConfig = getAppConfig(win.appId);
            const IconComponent = appConfig
              ? (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[appConfig.icon] || LucideIcons.File
              : LucideIcons.File;
            const isActive = activeWindowId === win.id;

            return (
              <motion.button
                key={win.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors min-w-0 ${
                  isActive
                    ? 'bg-white/10 border border-accent/30'
                    : win.isMinimized
                    ? 'bg-white/5 opacity-60'
                    : 'hover:bg-white/5'
                }`}
                onClick={() => handleTaskbarItemClick(win.id, win.isMinimized)}
              >
                <IconComponent className="w-4 h-4 text-text-primary flex-shrink-0" />
                <span className="text-xs text-text-primary truncate max-w-[120px]">
                  {win.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 text-xs text-text-secondary font-mono">
          <span>{formatDate(time)}</span>
          <span className="text-text-primary">{formatTime(time)}</span>
        </div>
      </div>
    </>
  );
}
