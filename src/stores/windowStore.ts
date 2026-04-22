import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppId =
  | 'terminal'
  | 'settings'
  | 'snake'
  | 'minesweeper';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  position: WindowPosition;
  size: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface SavedWindowLayout {
  position: WindowPosition;
  size: WindowSize;
}

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;
  savedLayouts: Partial<Record<AppId, SavedWindowLayout>>;

  // Actions
  openWindow: (appId: AppId, title: string, defaultSize?: WindowSize) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: WindowPosition) => void;
  updateWindowSize: (id: string, size: WindowSize) => void;
  closeAllWindows: () => void;
  isWindowOpen: (appId: AppId) => boolean;
  getWindowByAppId: (appId: AppId) => WindowState | undefined;
}

const DEFAULT_WINDOW_SIZE: WindowSize = { width: 600, height: 450 };

const getRandomOffset = () => Math.floor(Math.random() * 50) + 20;

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      activeWindowId: null,
      highestZIndex: 0,
      savedLayouts: {},

      openWindow: (appId, title, defaultSize = DEFAULT_WINDOW_SIZE) => {
        const state = get();

        // Check if window with this appId already exists
        const existingWindow = state.windows.find(w => w.appId === appId);
        if (existingWindow) {
          // Focus the existing window
          get().focusWindow(existingWindow.id);
          if (existingWindow.isMinimized) {
            get().restoreWindow(existingWindow.id);
          }
          return;
        }

        const newZIndex = state.highestZIndex + 1;
        const id = `${appId}-${Date.now()}`;
        const savedLayout = state.savedLayouts[appId];
        const windowSize = savedLayout?.size ?? defaultSize;

        // Center window with slight random offset
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

        const x = savedLayout?.position.x ?? Math.max(50, (viewportWidth - windowSize.width) / 2 + getRandomOffset());
        const y = savedLayout?.position.y ?? Math.max(50, (viewportHeight - windowSize.height) / 2 + getRandomOffset() - 50);

        const newWindow: WindowState = {
          id,
          appId,
          title,
          position: { x, y },
          size: windowSize,
          isMinimized: false,
          isMaximized: false,
          zIndex: newZIndex,
        };

        set({
          windows: [...state.windows, newWindow],
          activeWindowId: id,
          highestZIndex: newZIndex,
        });
      },

      closeWindow: (id) => {
        set((state) => {
          const newWindows = state.windows.filter(w => w.id !== id);
          const newActiveId = state.activeWindowId === id
            ? (newWindows.length > 0
              ? newWindows.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id
              : null)
            : state.activeWindowId;

          return {
            windows: newWindows,
            activeWindowId: newActiveId,
          };
        });
      },

      minimizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, isMinimized: true } : w
          ),
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        }));
      },

      maximizeWindow: (id) => {
        const state = get();
        const newZIndex = state.highestZIndex + 1;

        set({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, isMaximized: true, zIndex: newZIndex } : w
          ),
          activeWindowId: id,
          highestZIndex: newZIndex,
        });
      },

      restoreWindow: (id) => {
        const state = get();
        const newZIndex = state.highestZIndex + 1;

        set({
          windows: state.windows.map(w =>
            w.id === id
              ? { ...w, isMinimized: false, isMaximized: false, zIndex: newZIndex }
              : w
          ),
          activeWindowId: id,
          highestZIndex: newZIndex,
        });
      },

      focusWindow: (id) => {
        const state = get();
        const window = state.windows.find(w => w.id === id);

        if (!window || window.zIndex === state.highestZIndex) {
          set({ activeWindowId: id });
          return;
        }

        const newZIndex = state.highestZIndex + 1;

        set({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, zIndex: newZIndex } : w
          ),
          activeWindowId: id,
          highestZIndex: newZIndex,
        });
      },

      updateWindowPosition: (id, position) => {
        set((state) => {
          const targetWindow = state.windows.find((w) => w.id === id);
          if (!targetWindow) return state;

          return {
            windows: state.windows.map(w =>
              w.id === id ? { ...w, position } : w
            ),
            savedLayouts: {
              ...state.savedLayouts,
              [targetWindow.appId]: {
                position,
                size: targetWindow.size,
              },
            },
          };
        });
      },

      updateWindowSize: (id, size) => {
        set((state) => {
          const targetWindow = state.windows.find((w) => w.id === id);
          if (!targetWindow) return state;

          return {
            windows: state.windows.map(w =>
              w.id === id ? { ...w, size } : w
            ),
            savedLayouts: {
              ...state.savedLayouts,
              [targetWindow.appId]: {
                position: targetWindow.position,
                size,
              },
            },
          };
        });
      },

      closeAllWindows: () => {
        set({ windows: [], activeWindowId: null });
      },

      isWindowOpen: (appId) => {
        return get().windows.some(w => w.appId === appId && !w.isMinimized);
      },

      getWindowByAppId: (appId) => {
        return get().windows.find(w => w.appId === appId);
      },
    }),
    {
      name: 'window-store-v2',
      partialize: (state) => ({
        savedLayouts: state.savedLayouts,
      }),
    }
  )
);
