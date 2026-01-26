import { motion } from 'framer-motion';
import { Trash2, FileX, Coffee, Bug, RotateCcw } from 'lucide-react';

const trashItems = [
  {
    name: 'old_bugs.txt',
    icon: Bug,
    size: '42 KB',
    date: 'Dec 2023',
    message: 'These bugs were squashed. May they rest in peace.',
  },
  {
    name: 'unused_features.zip',
    icon: FileX,
    size: '128 KB',
    date: 'Nov 2023',
    message: 'Features that never made it to production.',
  },
  {
    name: 'coffee_breaks.log',
    icon: Coffee,
    size: '∞ KB',
    date: 'Jan 2024',
    message: 'Too many to count. Essential for productivity.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function TrashApp() {
  return (
    <motion.div
      className="h-full flex flex-col font-mono"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-secondary/50"
      >
        <div className="flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-text-secondary" />
          <span className="text-sm text-text-primary">Trash</span>
          <span className="px-2 py-0.5 bg-bg-elevated border border-border rounded text-xs text-text-secondary">
            {trashItems.length} items
          </span>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary bg-bg-elevated border border-border rounded-lg hover:border-border/80 transition-colors"
          onClick={() => {}}
        >
          <RotateCcw className="w-3 h-3" />
          Empty Trash
        </button>
      </motion.div>

      {/* Items */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2">
          {trashItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-bg-secondary border border-border rounded-lg p-3 hover:border-border/80 transition-colors cursor-default"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-bg-elevated border border-border flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-text-primary truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-text-secondary shrink-0">
                      {item.size}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {item.message}
                  </p>
                  <p className="text-xs text-text-secondary/60 mt-1">
                    Deleted {item.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        variants={itemVariants}
        className="px-4 py-3 border-t border-border bg-bg-secondary/50 text-center"
      >
        <p className="text-xs text-text-secondary">
          Some things are better left deleted.
        </p>
      </motion.div>
    </motion.div>
  );
}
