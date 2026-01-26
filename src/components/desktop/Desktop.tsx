import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSettingsStore } from '../../stores/settingsStore';
import { desktopApps } from '../../data/apps';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { WindowManager } from './WindowManager';
import { Screensaver } from '../effects/Screensaver';
import { BootSequence } from '../effects/BootSequence';
import { MobileDesktop } from './MobileDesktop';
import { useIdleDetection } from '../../hooks/useIdleDetection';
import { useIsMobile } from '../../hooks/useMediaQuery';

export function Desktop() {
  const [isBooting, setIsBooting] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { wallpaper, screensaverEnabled, screensaverTimeout, showBootSequence } = useSettingsStore();
  const isIdle = useIdleDetection(screensaverTimeout * 60 * 1000);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!showBootSequence) {
      setIsBooting(false);
    }
  }, [showBootSequence]);

  const getWallpaperStyle = () => {
    switch (wallpaper) {
      case 'grid':
        return {
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        };
      case 'dots':
        return {
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)`,
        };
      default:
        return {};
    }
  };

  if (isBooting && showBootSequence) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  // Use mobile layout on smaller screens
  if (mounted && isMobile) {
    return <MobileDesktop />;
  }

  return (
    <div
      className="fixed inset-0 bg-bg-primary overflow-hidden"
      style={getWallpaperStyle()}
    >
      {/* Desktop Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bottom-12 p-4 overflow-hidden"
      >
        <div className="flex flex-col flex-wrap content-start gap-2 h-full">
          {desktopApps.map((app, index) => (
            <DesktopIcon key={app.id} app={app} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Window Manager */}
      <WindowManager />

      {/* Taskbar */}
      <Taskbar />

      {/* Screensaver */}
      {screensaverEnabled && isIdle && <Screensaver />}
    </div>
  );
}
