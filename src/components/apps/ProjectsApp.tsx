import { motion } from 'framer-motion';
import { ExternalLink, Star, Download } from 'lucide-react';
import { projects } from '../../data/projects';

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

export function ProjectsApp() {
  return (
    <motion.div
      className="p-6 font-mono"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-bg-secondary border border-border rounded-lg overflow-hidden hover:border-border/80 transition-colors"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-medium text-text-primary">
                    {project.name}
                  </h3>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {project.type}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2 py-1 rounded text-xs border ${
                    project.status === 'Active'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : project.status === 'Maintained'
                      ? 'bg-accent/10 border-accent/30 text-accent'
                      : 'bg-bg-elevated border-border text-text-secondary'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 border-b border-border">
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Stats & Tech */}
            <div className="p-4 space-y-4">
              {/* Stats Row */}
              {(project.stars || project.downloads) && (
                <div className="flex items-center gap-4">
                  {project.stars && (
                    <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{project.stars}</span>
                    </span>
                  )}
                  {project.downloads && (
                    <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                      <Download className="w-4 h-4 text-accent" />
                      <span>{project.downloads}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-bg-elevated border border-border rounded text-xs text-text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="px-4 pb-4">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg text-sm text-accent hover:bg-accent/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
              >
                View on GitHub
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
