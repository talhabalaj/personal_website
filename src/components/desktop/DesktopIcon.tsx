import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { AppConfig } from '../../data/apps';
import { useWindowStore } from '../../stores/windowStore';

interface DesktopIconProps {
  app: AppConfig;
  index: number;
}

export function DesktopIcon({ app, index }: DesktopIconProps) {
  const openWindow = useWindowStore((state) => state.openWindow);

  // Get icon component dynamically
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[app.icon] || LucideIcons.File;

  const handleOpen = () => {
    openWindow(app.id, app.title, app.defaultSize);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex min-h-[92px] w-24 flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-white/5 focus:bg-white/10 focus:outline-none cursor-pointer group"
      onClick={handleOpen}
      onDoubleClick={handleOpen}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      title={app.name}
      aria-label={`Open ${app.name}`}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-bg-elevated rounded-lg border border-border group-hover:border-border/80 group-hover:bg-bg-secondary transition-colors">
        <IconComponent className="w-6 h-6 text-text-primary" />
      </div>
      <span className="max-w-full text-center font-mono text-[11px] leading-snug text-text-primary break-words">
        {app.name}
      </span>
    </motion.button>
  );
}
