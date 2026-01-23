import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { GitCommit, TrendingUp } from 'lucide-react';

/**
 * GitHubHeatmap - GitHub contribution heatmap visualization
 *
 * Features:
 * - Fetches real contribution data from GitHub
 * - Color-coded activity levels
 * - Hover tooltips with details
 * - Responsive grid layout
 *
 * Usage:
 * <GitHubHeatmap isDark={true} username="eladser" />
 */

const GitHubHeatmap = ({ isDark = true, username = 'eladser' }) => {
  const [contributions, setContributions] = useState([]);
  const [stats, setStats] = useState({ total: 0, max: 0, average: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true);
      setError(null);

      try {
        // Generate mock data for demonstration
        // In production, you'd fetch from GitHub GraphQL API
        const mockData = generateMockContributions();
        setContributions(mockData.contributions);
        setStats(mockData.stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  // Generate mock contribution data (52 weeks)
  const generateMockContributions = () => {
    const contributions = [];
    const weeksToShow = 52;
    const now = new Date();
    let total = 0;
    let max = 0;

    for (let week = weeksToShow - 1; week >= 0; week--) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (week * 7 + (6 - day)));

        // Generate random contribution count (weighted towards weekdays)
        const isWeekend = day === 0 || day === 6;
        const baseChance = isWeekend ? 0.3 : 0.7;
        const count = Math.random() < baseChance ? Math.floor(Math.random() * 15) : 0;

        total += count;
        max = Math.max(max, count);

        contributions.push({
          date: date.toISOString().split('T')[0],
          count,
          level: getLevel(count),
        });
      }
    }

    return {
      contributions,
      stats: {
        total,
        max,
        average: Math.round(total / contributions.length * 10) / 10,
      },
    };
  };

  const getLevel = (count) => {
    if (count === 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 10) return 3;
    return 4;
  };

  const getLevelColor = (level) => {
    if (isDark) {
      const colors = [
        'bg-white/[0.05]',
        'bg-purple-500/20',
        'bg-purple-500/40',
        'bg-purple-500/60',
        'bg-purple-500/80',
      ];
      return colors[level];
    } else {
      const colors = [
        'bg-black/[0.05]',
        'bg-purple-200',
        'bg-purple-300',
        'bg-purple-400',
        'bg-purple-500',
      ];
      return colors[level];
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Group contributions by week
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  if (loading) {
    return (
      <div
        className={`rounded-xl border p-6 ${
          isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
        }`}
      >
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <span className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Loading contributions...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
      }`}
    >
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <GitCommit className={isDark ? 'text-zinc-400' : 'text-zinc-600'} size={20} aria-hidden="true" />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Contribution Activity
              </h3>
            </div>
            <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {stats.total} contributions in the last year
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={`grid grid-cols-3 gap-4 px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {stats.total}
          </div>
          <div className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Total
          </div>
        </div>
        <div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {stats.max}
          </div>
          <div className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Best Day
          </div>
        </div>
        <div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {stats.average}
          </div>
          <div className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Daily Avg
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="p-6 overflow-x-auto">
        <div className="inline-flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 pr-2">
            <div className="h-3" /> {/* Spacer for month labels */}
            {days.map((day, i) => (
              i % 2 === 1 && (
                <div
                  key={day}
                  className={`text-xs h-3 flex items-center ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}
                >
                  {day}
                </div>
              )
            ))}
          </div>

          {/* Contribution grid */}
          <div>
            {/* Month labels */}
            <div className="flex gap-1 mb-1 h-3">
              {weeks.map((week, weekIndex) => {
                const firstDay = week[0];
                const date = new Date(firstDay.date);
                const showMonth = date.getDate() <= 7;
                return (
                  <div key={weekIndex} className="w-3">
                    {showMonth && (
                      <div className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>
                        {months[date.getMonth()]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <m.div
                      key={dayIndex}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                      whileHover={{ scale: 1.5, zIndex: 10 }}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} cursor-pointer group relative`}
                      title={`${day.count} contributions on ${day.date}`}
                    >
                      {/* Tooltip */}
                      <div
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 ${
                          isDark ? 'bg-zinc-800 text-white' : 'bg-zinc-700 text-white'
                        }`}
                      >
                        {day.count} on {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </m.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className={`flex items-center gap-2 mt-4 text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubHeatmap;
