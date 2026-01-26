import { motion } from 'framer-motion';
import { useSettingsStore, type Wallpaper } from '../../stores/settingsStore';
import { Check, Monitor, Moon, Zap, Info } from 'lucide-react';

const wallpaperOptions: { value: Wallpaper; label: string }[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'dots', label: 'Dots' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'none', label: 'None' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function SettingsApp() {
  const {
    wallpaper,
    screensaverEnabled,
    screensaverTimeout,
    showBootSequence,
    setWallpaper,
    setScreensaverEnabled,
    setScreensaverTimeout,
    setShowBootSequence,
  } = useSettingsStore();

  return (
    <motion.div
      className="p-6 font-mono"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-4">
        {/* Wallpaper */}
        <motion.div
          variants={cardVariants}
          className="bg-bg-secondary border border-border rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-medium text-text-primary">Wallpaper</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {wallpaperOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setWallpaper(option.value)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  wallpaper === option.value
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-border/80 bg-bg-elevated'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-sm text-text-primary">{option.label}</span>
                {wallpaper === option.value && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Screensaver */}
        <motion.div
          variants={cardVariants}
          className="bg-bg-secondary border border-border rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-medium text-text-primary">Screensaver</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-secondary">Enable screensaver</span>
              <button
                onClick={() => setScreensaverEnabled(!screensaverEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  screensaverEnabled ? 'bg-accent' : 'bg-bg-elevated border border-border'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    screensaverEnabled ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </label>

            {screensaverEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Timeout</span>
                  <span className="text-xs text-text-primary">
                    {screensaverTimeout} min{screensaverTimeout !== 1 ? 's' : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={screensaverTimeout}
                  onChange={(e) => setScreensaverTimeout(Number(e.target.value))}
                  className="w-full accent-accent h-1 bg-bg-elevated rounded-full appearance-none cursor-pointer"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Boot Sequence */}
        <motion.div
          variants={cardVariants}
          className="bg-bg-secondary border border-border rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-medium text-text-primary">Startup</h3>
          </div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-text-secondary">Show boot sequence</span>
            <button
              onClick={() => setShowBootSequence(!showBootSequence)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                showBootSequence ? 'bg-accent' : 'bg-bg-elevated border border-border'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  showBootSequence ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </label>
        </motion.div>

        {/* System Info */}
        <motion.div
          variants={cardVariants}
          className="bg-bg-secondary border border-border rounded-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-medium text-text-primary">System Info</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">OS</span>
              <span className="text-text-primary">TalhaOS v2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Framework</span>
              <span className="text-text-primary">Astro + React</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Theme</span>
              <span className="text-text-primary">Minimal Dark</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
