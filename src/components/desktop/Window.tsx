import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import type { WindowState } from '../../stores/windowStore';
import { useWindowStore } from '../../stores/windowStore';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export function Window({ window, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useWindowStore();

  const isActive = activeWindowId === window.id;

  if (window.isMinimized) {
    return null;
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(window.id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(window.id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.isMaximized) {
      restoreWindow(window.id);
    } else {
      maximizeWindow(window.id);
    }
  };

  const windowContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="h-full flex flex-col bg-bg-secondary border border-border rounded-lg overflow-hidden shadow-2xl"
      style={{
        boxShadow: isActive
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.3)'
          : '0 20px 40px -12px rgba(0, 0, 0, 0.4)',
      }}
      onMouseDown={() => focusWindow(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`window-drag-handle flex items-center justify-between px-3 py-2 border-b border-border select-none ${
          isActive ? 'bg-bg-elevated' : 'bg-bg-secondary'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors flex items-center justify-center group"
              aria-label="Close window"
            >
              <X className="w-2 h-2 text-[#990000] opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors flex items-center justify-center group"
              aria-label="Minimize window"
            >
              <Minus className="w-2 h-2 text-[#9a6b00] opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors flex items-center justify-center group"
              aria-label="Maximize window"
            >
              {window.isMaximized ? (
                <Maximize2 className="w-2 h-2 text-[#0a6b00] opacity-0 group-hover:opacity-100" />
              ) : (
                <Square className="w-1.5 h-1.5 text-[#0a6b00] opacity-0 group-hover:opacity-100" />
              )}
            </button>
          </div>
        </div>

        <span className="text-xs text-text-secondary font-mono truncate max-w-[200px]">
          {window.title}
        </span>

        <div className="w-[52px]" /> {/* Spacer for centering title */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-bg-primary">{children}</div>
    </motion.div>
  );

  if (window.isMaximized) {
    return (
      <div
        className="fixed inset-0 z-50 pointer-events-auto"
        style={{ zIndex: window.zIndex + 1000 }}
      >
        {windowContent}
      </div>
    );
  }

  return (
    <Rnd
      position={window.position}
      size={window.size}
      onDragStop={(_, d) => {
        updateWindowPosition(window.id, { x: d.x, y: d.y });
      }}
      onResizeStop={(_, __, ref, ___, position) => {
        updateWindowSize(window.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
        updateWindowPosition(window.id, position);
      }}
      minWidth={300}
      minHeight={200}
      dragHandleClassName="window-drag-handle"
      bounds="parent"
      style={{ zIndex: window.zIndex, pointerEvents: 'auto' }}
      onMouseDown={() => focusWindow(window.id)}
    >
      {windowContent}
    </Rnd>
  );
}
