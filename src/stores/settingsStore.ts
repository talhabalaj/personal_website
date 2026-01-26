import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Wallpaper = 'grid' | 'dots' | 'none' | 'gradient';

interface SettingsStore {
  wallpaper: Wallpaper;
  screensaverEnabled: boolean;
  screensaverTimeout: number; // in minutes
  soundEnabled: boolean;
  showBootSequence: boolean;

  // Actions
  setWallpaper: (wallpaper: Wallpaper) => void;
  setScreensaverEnabled: (enabled: boolean) => void;
  setScreensaverTimeout: (timeout: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setShowBootSequence: (show: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      wallpaper: 'grid',
      screensaverEnabled: true,
      screensaverTimeout: 3,
      soundEnabled: false,
      showBootSequence: true,

      setWallpaper: (wallpaper) => set({ wallpaper }),
      setScreensaverEnabled: (enabled) => set({ screensaverEnabled: enabled }),
      setScreensaverTimeout: (timeout) => set({ screensaverTimeout: timeout }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setShowBootSequence: (show) => set({ showBootSequence: show }),
    }),
    {
      name: 'settings-store',
    }
  )
);
