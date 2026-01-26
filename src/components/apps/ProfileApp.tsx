import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  User,
  Code,
  BookOpen,
} from 'lucide-react';
import { experiences } from '../../data/experience';
import { skillCategories } from '../../data/skills';
import { education } from '../../data/education';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/talhabalaj', icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/talhabalaj', icon: Linkedin },
  { name: 'Email', url: 'mailto:hey@talhabalaj.com', icon: Mail },
  { name: 'Website', url: 'https://talhabalaj.com', icon: Globe },
];

const tabs = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'education', label: 'Education', icon: BookOpen },
] as const;

type TabId = (typeof tabs)[number]['id'];

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

function parseGPA(gpa: string): { value: number; max: number } {
  const parts = gpa.split('/');
  return {
    value: parseFloat(parts[0]) || 0,
    max: parseFloat(parts[1]) || 4.0,
  };
}

function AboutSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Profile Header */}
      <motion.div
        variants={cardVariants}
        className="bg-bg-secondary border border-border rounded-lg p-5"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-xl font-semibold shrink-0">
            TB
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-text-primary">Talha Balaj</h1>
            <p className="text-text-secondary text-sm mt-0.5">Full Stack Engineer</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-text-secondary text-sm">
                <MapPin className="w-3.5 h-3.5" />
                Toronto, ON
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400">Available</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div
        variants={cardVariants}
        className="bg-bg-secondary border border-border rounded-lg p-5"
      >
        <h2 className="text-sm font-medium text-text-primary mb-3">About</h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Experienced Full Stack Engineer specializing in React, Node.js, TypeScript,
          and modern web technologies. Passionate about building scalable applications
          and improving developer experience. Currently leading development at mobileLive,
          building e-commerce solutions for major Canadian retailers.
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        variants={cardVariants}
        className="bg-bg-secondary border border-border rounded-lg p-5"
      >
        <h2 className="text-sm font-medium text-text-primary mb-3">Connect</h2>
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border rounded-lg text-sm text-text-primary hover:border-accent hover:text-accent transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ExperienceSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Vertical Line */}
      <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-border" />

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <motion.div key={index} variants={cardVariants} className="relative pl-8">
            {/* Timeline Dot */}
            <div
              className={`absolute left-0 top-5 w-6 h-6 rounded-full flex items-center justify-center ${
                exp.status === 'current'
                  ? 'bg-accent/20 border-2 border-accent'
                  : 'bg-bg-elevated border-2 border-border'
              }`}
            >
              <Briefcase
                className={`w-3 h-3 ${
                  exp.status === 'current' ? 'text-accent' : 'text-text-secondary'
                }`}
              />
            </div>

            {/* Job Card */}
            <div className="bg-bg-secondary border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-medium text-text-primary">{exp.role}</h3>
                    <p className="text-sm text-text-secondary mt-0.5">{exp.company}</p>
                  </div>
                  {exp.status === 'current' && (
                    <span className="shrink-0 px-2 py-1 bg-accent/10 border border-accent/30 rounded text-xs text-accent">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-text-secondary">
                  <span>{exp.dates}</span>
                  <span className="text-border">•</span>
                  <span>{exp.duration}</span>
                  <span className="text-border">•</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="p-4">
                <ul className="space-y-2 mb-4">
                  {exp.details.map((detail, i) => (
                    <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-accent mt-1.5 shrink-0">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-bg-elevated border border-border rounded text-xs text-text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4"
    >
      {skillCategories.map((category, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          className="bg-bg-secondary border border-border rounded-lg p-5"
        >
          <h3 className="text-sm font-medium text-text-primary mb-3">{category.category}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, i) => (
              <motion.span
                key={i}
                className="px-3 py-1.5 bg-bg-elevated border border-border rounded-full text-sm text-text-primary hover:border-accent hover:text-accent transition-colors cursor-default"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function EducationSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4"
    >
      {education.map((edu, index) => {
        const { value: gpaValue, max: gpaMax } = parseGPA(edu.gpa);
        const gpaPercent = (gpaValue / gpaMax) * 100;

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-bg-secondary border border-border rounded-lg overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-text-primary">{edu.degree}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">{edu.institution}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">GPA</span>
                <span className="text-sm font-medium text-text-primary">{edu.gpa}</span>
              </div>
              <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${gpaPercent}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-sm font-medium text-text-primary mb-3">Core Coursework</h4>
              <ul className="grid gap-2">
                {edu.highlights.map((course, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {course}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function ProfileApp() {
  const [activeTab, setActiveTab] = useState<TabId>('about');

  return (
    <div className="h-full flex flex-col font-mono">
      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-bg-secondary/50 px-2 shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors relative ${
              activeTab === tab.id
                ? 'text-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'experience' && <ExperienceSection />}
        {activeTab === 'skills' && <SkillsSection />}
        {activeTab === 'education' && <EducationSection />}
      </div>
    </div>
  );
}
