import { useSettingsStore, type Wallpaper } from '../../stores/settingsStore';
import { Check } from 'lucide-react';

const wallpaperOptions: { value: Wallpaper; label: string; preview: string }[] = [
  { value: 'grid', label: 'Grid', preview: 'Grid pattern background' },
  { value: 'dots', label: 'Dots', preview: 'Dotted pattern background' },
  { value: 'gradient', label: 'Gradient', preview: 'Subtle gradient background' },
  { value: 'none', label: 'None', preview: 'Solid black background' },
];

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
    <div className="p-6 font-mono">
      <div className="text-xs text-text-secondary mb-4">
        $ ./settings --configure
      </div>

      <div className="space-y-6">
        {/* Wallpaper */}
        <div className="border border-border bg-bg-secondary p-4">
          <h3 className="text-xs text-text-secondary uppercase mb-3">Wallpaper</h3>
          <div className="grid grid-cols-2 gap-2">
            {wallpaperOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setWallpaper(option.value)}
                className={`flex items-center justify-between p-3 border transition-colors ${
                  wallpaper === option.value
                    ? 'border-accent bg-bg-elevated'
                    : 'border-border hover:border-text-secondary'
                }`}
              >
                <span className="text-sm text-text-primary">{option.label}</span>
                {wallpaper === option.value && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Screensaver */}
        <div className="border border-border bg-bg-secondary p-4">
          <h3 className="text-xs text-text-secondary uppercase mb-3">Screensaver</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-primary">Enable screensaver</span>
              <button
                onClick={() => setScreensaverEnabled(!screensaverEnabled)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  screensaverEnabled ? 'bg-accent' : 'bg-border'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    screensaverEnabled ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </label>

            {screensaverEnabled && (
              <div>
                <label className="block text-xs text-text-secondary mb-2">
                  Timeout: {screensaverTimeout} minute{screensaverTimeout !== 1 ? 's' : ''}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={screensaverTimeout}
                  onChange={(e) => setScreensaverTimeout(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Boot Sequence */}
        <div className="border border-border bg-bg-secondary p-4">
          <h3 className="text-xs text-text-secondary uppercase mb-3">Startup</h3>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-text-primary">Show boot sequence on load</span>
            <button
              onClick={() => setShowBootSequence(!showBootSequence)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                showBootSequence ? 'bg-accent' : 'bg-border'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                  showBootSequence ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </label>
        </div>

        {/* System Info */}
        <div className="border border-border bg-bg-secondary p-4">
          <h3 className="text-xs text-text-secondary uppercase mb-3">System Info</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">OS:</span>
              <span className="text-text-primary">TalhaOS v1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Framework:</span>
              <span className="text-text-primary">Astro + React</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Theme:</span>
              <span className="text-text-primary">Minimal Dark</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
