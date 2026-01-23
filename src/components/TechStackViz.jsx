import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';

/**
 * TechStackViz - Interactive technology stack visualization
 *
 * Features:
 * - Category filtering (Backend, Frontend, Database, DevOps, etc.)
 * - Proficiency level indicators
 * - Animated skill bars
 * - Hover effects with details
 *
 * Usage:
 * <TechStackViz isDark={true} />
 */

const TechStackViz = ({ isDark = true }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const techStack = [
    // Backend
    { name: 'C#', category: 'backend', level: 95, years: 12, icon: '#' },
    { name: '.NET 8', category: 'backend', level: 95, years: 2, icon: '.N' },
    { name: 'ASP.NET Core', category: 'backend', level: 90, years: 8, icon: 'AS' },
    { name: 'SignalR', category: 'backend', level: 90, years: 6, icon: 'SR' },
    { name: 'Entity Framework', category: 'backend', level: 85, years: 8, icon: 'EF' },

    // Frontend
    { name: 'React', category: 'frontend', level: 75, years: 4, icon: 'R' },
    { name: 'TypeScript', category: 'frontend', level: 80, years: 3, icon: 'TS' },
    { name: 'JavaScript', category: 'frontend', level: 85, years: 6, icon: 'JS' },
    { name: 'Tailwind CSS', category: 'frontend', level: 80, years: 2, icon: 'TW' },
    { name: 'HTML/CSS', category: 'frontend', level: 85, years: 10, icon: 'H' },

    // Database
    { name: 'SQL Server', category: 'database', level: 90, years: 12, icon: 'SQL' },
    { name: 'Redis', category: 'database', level: 75, years: 3, icon: 'R' },
    { name: 'PostgreSQL', category: 'database', level: 70, years: 2, icon: 'PG' },

    // Cloud & DevOps
    { name: 'Docker', category: 'devops', level: 80, years: 4, icon: 'D' },
    { name: 'Azure', category: 'cloud', level: 75, years: 3, icon: 'Az' },
    { name: 'AWS', category: 'cloud', level: 70, years: 2, icon: 'AWS' },
    { name: 'GitHub Actions', category: 'devops', level: 80, years: 2, icon: 'GA' },
    { name: 'Git', category: 'devops', level: 90, years: 10, icon: 'Git' },

    // Tools
    { name: 'Visual Studio', category: 'tools', level: 90, years: 12, icon: 'VS' },
    { name: 'VS Code', category: 'tools', level: 85, years: 6, icon: 'VSC' },
    { name: 'Vite', category: 'tools', level: 80, years: 2, icon: 'V' },
  ];

  const categories = [
    { id: 'all', label: 'All', count: techStack.length },
    { id: 'backend', label: 'Backend', count: techStack.filter(t => t.category === 'backend').length },
    { id: 'frontend', label: 'Frontend', count: techStack.filter(t => t.category === 'frontend').length },
    { id: 'database', label: 'Database', count: techStack.filter(t => t.category === 'database').length },
    { id: 'cloud', label: 'Cloud', count: techStack.filter(t => t.category === 'cloud').length },
    { id: 'devops', label: 'DevOps', count: techStack.filter(t => t.category === 'devops').length },
    { id: 'tools', label: 'Tools', count: techStack.filter(t => t.category === 'tools').length },
  ];

  const filteredStack = selectedCategory === 'all'
    ? techStack
    : techStack.filter(tech => tech.category === selectedCategory);

  const categoryColors = {
    backend: {
      bg: 'bg-purple-950',
      text: 'text-purple-400',
      bar: 'bg-purple-500',
      border: 'border-purple-800',
    },
    frontend: {
      bg: 'bg-blue-950',
      text: 'text-blue-400',
      bar: 'bg-blue-500',
      border: 'border-blue-800',
    },
    database: {
      bg: 'bg-green-950',
      text: 'text-green-400',
      bar: 'bg-green-500',
      border: 'border-green-800',
    },
    cloud: {
      bg: 'bg-cyan-950',
      text: 'text-cyan-400',
      bar: 'bg-cyan-500',
      border: 'border-cyan-800',
    },
    devops: {
      bg: 'bg-orange-950',
      text: 'text-orange-400',
      bar: 'bg-orange-500',
      border: 'border-orange-800',
    },
    tools: {
      bg: 'bg-pink-950',
      text: 'text-pink-400',
      bar: 'bg-pink-500',
      border: 'border-pink-800',
    },
  };

  const getProficiencyLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-zinc-900 border-white/10' : 'bg-black/[0.02] border-black/10'
      }`}
    >
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Technology Stack
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
              {filteredStack.length} technologies {selectedCategory !== 'all' && `in ${selectedCategory}`}
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isDark
                ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            {showFilters ? <X size={14} aria-hidden="true" /> : <Filter size={14} aria-hidden="true" />}
            Filter
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <AnimatePresence>
        {showFilters && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`overflow-hidden border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}
          >
            <div className="px-6 py-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? isDark
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-600 text-white'
                      : isDark
                      ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white'
                      : 'bg-black/[0.05] text-gray-400 hover:bg-black/[0.1] hover:text-zinc-900'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Tech Stack Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredStack.map((tech, index) => {
              const colors = categoryColors[tech.category];
              return (
                <m.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className={`p-4 rounded-lg border ${
                    isDark ? 'bg-zinc-900 border-white/10' : 'bg-black/[0.02] border-black/10'
                  } hover:scale-[1.02] transition-transform cursor-default group`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center font-bold text-sm border ${colors.border}`}>
                        {tech.icon}
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                          {tech.name}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                          {tech.years} {tech.years === 1 ? 'year' : 'years'}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {getProficiencyLabel(tech.level)}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-400'}>Proficiency</span>
                      <span className={`font-medium ${colors.text}`}>{tech.level}%</span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-zinc-800' : 'bg-black/[0.05]'
                    }`}>
                      <m.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
                        className={`h-full ${colors.bar} rounded-full`}
                      />
                    </div>
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredStack.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
            No technologies found in this category
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStackViz;
