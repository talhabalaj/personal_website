import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Check } from 'lucide-react';

const contactLinks = [
  {
    name: 'Email',
    value: 'hey@talhabalaj.com',
    url: 'mailto:hey@talhabalaj.com',
    icon: Mail,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
  },
  {
    name: 'GitHub',
    value: 'talhabalaj',
    url: 'https://github.com/talhabalaj',
    icon: Github,
    color: 'text-text-primary',
    bg: 'bg-text-primary/10',
    border: 'border-text-primary/30',
  },
  {
    name: 'LinkedIn',
    value: 'talhabalaj',
    url: 'https://www.linkedin.com/in/talhabalaj',
    icon: Linkedin,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
  },
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

export function ContactApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const mailtoLink = `mailto:hey@talhabalaj.com?subject=Contact from ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    window.open(mailtoLink, '_blank');
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <motion.div
      className="p-6 font-mono"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="bg-bg-secondary border border-border rounded-lg p-5 mb-4"
      >
        <h2 className="text-lg font-medium text-text-primary mb-1">
          Get in Touch
        </h2>
        <p className="text-sm text-text-secondary">
          Have a question or want to work together? Drop me a message.
        </p>
      </motion.div>

      {/* Quick Contact Buttons */}
      <motion.div
        variants={cardVariants}
        className="grid grid-cols-3 gap-3 mb-4"
      >
        {contactLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center gap-2 p-4 ${link.bg} border ${link.border} rounded-lg hover:scale-105 transition-transform`}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.15 }}
          >
            <link.icon className={`w-5 h-5 ${link.color}`} />
            <span className="text-xs text-text-secondary">{link.name}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        variants={cardVariants}
        className="bg-bg-secondary border border-border rounded-lg p-5"
      >
        <h3 className="text-sm font-medium text-text-primary mb-4">
          Send a Message
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows={4}
              className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent/10 border border-accent/30 rounded-lg text-sm text-accent hover:bg-accent/20 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Mail Client Opened
                </motion.span>
              ) : status === 'sending' ? (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Opening...
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
