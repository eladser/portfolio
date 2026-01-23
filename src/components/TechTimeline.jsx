import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * TechTimeline - Visual timeline showing skills evolution
 *
 * Features:
 * - Year-based progression with skills grouped by year
 * - Collapsible to reduce space on About page
 * - Color-coded by technology category
 * - Realistic data structure for easy customization
 *
 * Usage:
 * <TechTimeline isDark={true} />
 */

const timelineData = [
  {
    year: 2026,
    period: 'Current',
    skills: [
      { name: '.NET 8', category: 'backend', level: 'advanced' },
      { name: 'SignalR', category: 'realtime', level: 'advanced' },
      { name: 'React', category: 'frontend', level: 'intermediate' },
      { name: 'Azure', category: 'cloud', level: 'intermediate' },
      { name: 'Docker', category: 'devops', level: 'intermediate' },
    ],
    highlight: true,
  },
  {
    year: 2024,
    period: '2024-2025',
    skills: [
      { name: 'ASP.NET Core', category: 'backend', level: 'advanced' },
      { name: 'TypeScript', category: 'frontend', level: 'intermediate' },
      { name: 'AWS', category: 'cloud', level: 'intermediate' },
      { name: 'Redis', category: 'database', level: 'intermediate' },
    ],
  },
  {
    year: 2023,
    period: '2023',
    skills: [
      { name: 'Vite', category: 'devops', level: 'intermediate' },
      { name: 'Tailwind CSS', category: 'frontend', level: 'intermediate' },
      { name: 'GitHub Actions', category: 'devops', level: 'intermediate' },
    ],
  },
  {
    year: 2020,
    period: '2020-2022',
    skills: [
      { name: 'SignalR', category: 'realtime', level: 'intermediate' },
      { name: 'React', category: 'frontend', level: 'beginner' },
      { name: 'JavaScript', category: 'frontend', level: 'intermediate' },
      { name: 'REST APIs', category: 'backend', level: 'advanced' },
    ],
  },
  {
    year: 2017,
    period: '2017-2019',
    skills: [
      { name: 'ASP.NET Core', category: 'backend', level: 'intermediate' },
      { name: 'Entity Framework', category: 'database', level: 'intermediate' },
      { name: 'WPF', category: 'frontend', level: 'intermediate' },
      { name: 'SQL Server', category: 'database', level: 'advanced' },
    ],
  },
  {
    year: 2014,
    period: '2014-2016',
    skills: [
      { name: 'C#', category: 'backend', level: 'beginner' },
      { name: '.NET Framework', category: 'backend', level: 'beginner' },
      { name: 'ASP.NET', category: 'backend', level: 'beginner' },
      { name: 'SQL Server', category: 'database', level: 'beginner' },
    ],
  },
];

// Category styling
const categoryStyles = {
  backend: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    dot: 'bg-purple-500',
  },
  frontend: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    dot: 'bg-cyan-500',
  },
  database: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    dot: 'bg-blue-500',
  },
  cloud: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/20',
    dot: 'bg-orange-500',
  },
  devops: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  realtime: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    dot: 'bg-amber-500',
  },
};

const TechTimeline = ({ isDark = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-zinc-900 border-white/10' : 'bg-black/[0.02] border-black/10'
      }`}
      role="region"
      aria-label="Technology timeline"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${
          isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
        }`}
        aria-expanded={isExpanded}
        aria-controls="timeline-content"
      >
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Skills Timeline
          </h3>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
            Evolution over the years
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-gray-400" size={20} aria-hidden="true" />
        ) : (
          <ChevronDown className="text-gray-400" size={20} aria-hidden="true" />
        )}
      </button>

      {/* Timeline Content */}
      <AnimatePresence>
        {isExpanded && (
          <m.div
            id="timeline-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-6 py-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <div className="relative">
                {/* Vertical line */}
                <div
                  className={`absolute left-[7px] top-2 bottom-2 w-px ${
                    isDark ? 'bg-white/10' : 'bg-black/10'
                  }`}
                  aria-hidden="true"
                />

                {/* Timeline items */}
                <div className="space-y-8">
                  {timelineData.map((item, index) => {
                    const isFirst = index === 0;
                    return (
                      <m.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8"
                      >
                        {/* Timeline dot */}
                        <div
                          className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 ${
                            item.highlight
                              ? 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/50'
                              : isDark
                              ? 'bg-zinc-800 border-zinc-700'
                              : 'bg-white border-zinc-300'
                          }`}
                          aria-hidden="true"
                        >
                          {item.highlight && (
                            <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75" />
                          )}
                        </div>

                        {/* Content */}
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className={`text-sm font-semibold ${
                                item.highlight
                                  ? 'text-purple-400'
                                  : isDark
                                  ? 'text-zinc-300'
                                  : 'text-zinc-700'
                              }`}
                            >
                              {item.period}
                            </span>
                            {item.highlight && (
                              <span
                                className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400"
                                aria-label="Current period"
                              >
                                Now
                              </span>
                            )}
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill) => {
                              const style = categoryStyles[skill.category];
                              return (
                                <div
                                  key={skill.name}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${
                                    isDark
                                      ? `${style.bg} ${style.text} ${style.border}`
                                      : 'bg-black/5 text-zinc-600 border-transparent'
                                  }`}
                                  role="listitem"
                                  aria-label={`${skill.name}, ${skill.category}, ${skill.level} level`}
                                >
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                                    aria-hidden="true"
                                  />
                                  <span className="font-medium">{skill.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </m.div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div
                className={`mt-8 pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
              >
                <p className={`text-xs mb-3 ${isDark ? 'text-zinc-600' : 'text-gray-400'}`}>
                  Categories
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  {Object.entries(categoryStyles).map(([key, style]) => (
                    <div key={key} className="flex items-center gap-2" role="listitem">
                      <div className={`w-2 h-2 rounded-full ${style.dot}`} aria-hidden="true" />
                      <span className={isDark ? 'text-gray-400' : 'text-zinc-600'}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechTimeline;
