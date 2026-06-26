import { useState, useEffect } from 'react';
import { GitCommit } from 'lucide-react';
import { CountUp } from './textfx';

// Contribution heatmap fed by jogruber's tokenless GitHub contributions API.
// GitHub's own graph needs an auth token (GraphQL contributionsCollection), so
// for a static site this proxy is the only way to get the real per-day grid.
const API = (user) => `https://github-contributions-api.jogruber.de/v4/${user}?y=last`;

const TEAL = [78, 205, 196]; // brand #4ECDC4
const cellColor = (level, isDark) => {
  if (level === 0) return isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const alpha = [0, 0.25, 0.45, 0.7, 1][level];
  return `rgba(${TEAL[0]},${TEAL[1]},${TEAL[2]},${alpha})`;
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const GitHubHeatmap = ({ isDark = true, username = 'eladser' }) => {
  const [weeks, setWeeks] = useState([]);
  const [stats, setStats] = useState({ total: 0, max: 0, average: 0 });
  const [state, setState] = useState('loading'); // loading | ok | error

  useEffect(() => {
    let alive = true;
    (async () => {
      setState('loading');
      try {
        const res = await fetch(API(username));
        if (!res.ok) throw new Error(`${res.status}`);
        const json = await res.json();
        const days = json.contributions || [];
        if (!days.length) throw new Error('no data');

        // Pad the front so each column is a Sun–Sat week, GitHub-style
        const pad = new Date(days[0].date).getDay();
        const cells = [...Array(pad).fill(null), ...days];
        const w = [];
        for (let i = 0; i < cells.length; i += 7) w.push(cells.slice(i, i + 7));

        const counts = days.map((d) => d.count);
        const total = json.total?.lastYear ?? counts.reduce((a, b) => a + b, 0);
        const max = Math.max(...counts);

        if (!alive) return;
        setWeeks(w);
        setStats({ total, max, average: Math.round((total / days.length) * 10) / 10 });
        setState('ok');
      } catch {
        if (alive) setState('error');
      }
    })();
    return () => { alive = false; };
  }, [username]);

  const shell = `rounded-xl border overflow-hidden ${
    isDark ? 'bg-zinc-900 border-white/10' : 'bg-black/[0.02] border-black/10'
  }`;

  if (state === 'loading') {
    return (
      <div className={shell}>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-[#4ECDC4]/30 border-t-[#4ECDC4] rounded-full animate-spin" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Loading contributions...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={shell}>
        <div className="px-6 py-8 text-sm text-gray-500">
          Couldn't reach GitHub right now.{' '}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4ECDC4] hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className={`px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-3 mb-2">
          <GitCommit className={isDark ? 'text-gray-300' : 'text-gray-500'} size={20} aria-hidden="true" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Contribution Activity
          </h3>
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {stats.total.toLocaleString()} contributions in the last year
        </p>
      </div>

      <div className={`grid grid-cols-3 gap-4 px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        {[
          { label: 'Total', value: stats.total },
          { label: 'Best day', value: stats.max },
          { label: 'Daily avg', value: stats.average, plain: true },
        ].map(({ label, value, plain }) => (
          <div key={label}>
            <div className={`text-2xl font-bold font-mono ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              {plain ? value : <CountUp value={value} />}
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
          </div>
        ))}
      </div>

      <div className="p-6 overflow-x-auto">
        <div>
          {/* Month labels */}
          <div className="flex gap-1 mb-1 h-3 ml-0">
            {weeks.map((week, wi) => {
              const d = week.find(Boolean);
              const show = d && new Date(d.date).getDate() <= 7;
              return (
                <div key={wi} className="w-3">
                  {show && (
                    <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {months[new Date(d.date).getMonth()]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: day ? cellColor(day.level, isDark) : 'transparent' }}
                    title={day ? `${day.count} on ${day.date}` : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={`flex items-center gap-2 mt-4 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className="w-3 h-3 rounded-sm" style={{ backgroundColor: cellColor(level, isDark) }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubHeatmap;
