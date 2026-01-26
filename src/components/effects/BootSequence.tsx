import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: 'Initializing system...', delay: 0 },
  { text: 'Loading kernel modules...', delay: 400 },
  { text: 'Starting services...', delay: 800 },
  { text: 'Mounting filesystems...', delay: 1200 },
  { text: 'Loading user profile: talha.balaj', delay: 1600 },
  { text: 'Starting desktop environment...', delay: 2000 },
  { text: 'Ready.', delay: 2400 },
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootMessages.forEach((msg, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleMessages(index + 1);
        }, msg.delay)
      );
    });

    // Complete boot sequence
    timers.push(
      setTimeout(() => {
        onComplete();
      }, 3000)
    );

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-bg-primary z-[10000] flex items-center justify-center"
    >
      <div className="w-full max-w-2xl px-8">
        {/* ASCII Logo */}
        <pre className="text-text-secondary text-[8px] sm:text-[10px] mb-8 font-mono leading-none">
{`████████╗ █████╗ ██╗     ██╗  ██╗ █████╗  ██████╗ ███████╗
╚══██╔══╝██╔══██╗██║     ██║  ██║██╔══██╗██╔═══██╗██╔════╝
   ██║   ███████║██║     ███████║███████║██║   ██║███████╗
   ██║   ██╔══██║██║     ██╔══██║██╔══██║██║   ██║╚════██║
   ██║   ██║  ██║███████╗██║  ██║██║  ██║╚██████╔╝███████║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝`}
        </pre>

        {/* Boot Messages */}
        <div className="font-mono text-sm space-y-1">
          <AnimatePresence mode="popLayout">
            {bootMessages.slice(0, visibleMessages).map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="text-accent">[OK]</span>
                <span className="text-text-secondary">{msg.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Cursor */}
          {visibleMessages < bootMessages.length && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-text-primary">$</span>
              <span
                className={`w-2 h-4 bg-text-primary ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}
        </div>

        {/* Skip hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary text-xs font-mono"
        >
          Press any key to skip...
        </motion.div>
      </div>

      {/* Skip on keypress */}
      <div
        className="absolute inset-0"
        onClick={onComplete}
        onKeyDown={onComplete}
        tabIndex={0}
        aria-label="Skip boot sequence"
      />
    </motion.div>
  );
}
