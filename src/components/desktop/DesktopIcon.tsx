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

  const handleDoubleClick = () => {
    openWindow(app.id, app.title, app.defaultSize);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      openWindow(app.id, app.title, app.defaultSize);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/5 focus:bg-white/10 focus:outline-none transition-colors cursor-pointer w-20 group"
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`Open ${app.name}`}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-bg-elevated rounded-lg border border-border group-hover:border-border/80 group-hover:bg-bg-secondary transition-colors">
        <IconComponent className="w-6 h-6 text-text-primary" />
      </div>
      <span className="text-[11px] text-text-primary text-center leading-tight font-mono break-words max-w-full">
        {app.name}
      </span>
    </motion.button>
  );
}
