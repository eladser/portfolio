// Stack timeline: rows are technologies grouped by category, columns are years.
// Cell intensity (0..3) shows how heavily I used the tech that year. Hand-curated
// from the real CV — not made up.

import { useState, useMemo } from 'react';
import { STACK_TIMELINE, STACK_YEARS, JOB_BOUNDARIES, CATEGORY_COLORS } from '../data/stack-timeline';

const CATEGORIES = ['backend', 'frontend', 'database', 'cloud', 'devops', 'ai'];

function jobForYear(y) {
  if (y <= 2018) return 'Elbit';
  if (y <= 2024) return 'KLA';
  return 'WEM';
}

function intensityWord(i) {
  return ['', 'light', 'regular', 'heavy'][i] || '';
}

export function StackUsageViz() {
  const [hover, setHover] = useState(null);   // { tech, year, intensity, job }

  const grouped = useMemo(() => {
    const out = {};
    for (const cat of CATEGORIES) out[cat] = STACK_TIMELINE.filter((t) => t.category === cat);
    return out;
  }, []);

  // Year-label positions: every other year for breathing room
  const yearLabels = STACK_YEARS.map((y, i) => ({ y, show: i % 2 === 0 || i === STACK_YEARS.length - 1 }));

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight">Stack over time</h3>
          <p className="text-xs text-zinc-400 mt-1">How my day-to-day actually changed across the three jobs</p>
        </div>
        {/* Category legend */}
        <div className="flex items-center gap-3 flex-wrap text-[10px] font-mono uppercase tracking-wider">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-sm ${CATEGORY_COLORS[cat].bar}`} />
              <span className="text-zinc-400">{CATEGORY_COLORS[cat].label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover detail panel — reserved height so the grid doesn't jump */}
      <div className="h-6 mb-2 text-xs font-mono">
        {hover ? (
          <div className="text-zinc-300">
            <span className={CATEGORY_COLORS[hover.tech.category].text}>{hover.tech.name}</span>
            <span className="text-zinc-500"> · {hover.year} · {hover.job} · {intensityWord(hover.intensity)} use</span>
          </div>
        ) : (
          <div className="text-zinc-600">hover a cell</div>
        )}
      </div>

      {/* The grid */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="min-w-[640px]">
          {/* Year header */}
          <div className="flex items-end mb-2 pl-32 sm:pl-36">
            {STACK_YEARS.map((y, i) => (
              <div key={y} className="flex-1 min-w-0 text-center font-mono text-[10px] text-zinc-500">
                {yearLabels[i].show ? y : ''}
              </div>
            ))}
          </div>

          {/* Job-boundary chapter band */}
          <div className="flex pl-32 sm:pl-36 -mb-px h-4 relative">
            {STACK_YEARS.map((y, i) => {
              const job = jobForYear(y);
              const prev = i > 0 ? jobForYear(STACK_YEARS[i - 1]) : null;
              const boundary = prev && prev !== job;
              return (
                <div key={y} className="flex-1 min-w-0 relative">
                  {boundary && (
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-[#4ECDC4]/40" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Rows grouped by category */}
          {CATEGORIES.map((cat) => (
            <div key={cat} className="mb-3 last:mb-0">
              {grouped[cat].map((tech) => (
                <div key={tech.name} className="flex items-center h-6 mb-px">
                  <div className={`w-32 sm:w-36 pr-3 text-right text-xs font-mono ${CATEGORY_COLORS[cat].text}`}>
                    {tech.name}
                  </div>
                  <div className="flex-1 flex">
                    {tech.usage.map((intensity, i) => {
                      const y = STACK_YEARS[i];
                      const job = jobForYear(y);
                      const opacity = intensity === 0 ? 0 : 0.25 + intensity * 0.22;
                      const isHover = hover && hover.tech.name === tech.name && hover.year === y;
                      return (
                        <button
                          key={y}
                          type="button"
                          aria-label={`${tech.name} in ${y}: ${intensityWord(intensity) || 'not used'}`}
                          className="flex-1 min-w-0 h-5 mx-px relative outline-none focus-visible:ring-1 focus-visible:ring-[#4ECDC4]"
                          onMouseEnter={() => intensity > 0 && setHover({ tech, year: y, intensity, job })}
                          onMouseLeave={() => setHover(null)}
                          onFocus={() => intensity > 0 && setHover({ tech, year: y, intensity, job })}
                          onBlur={() => setHover(null)}
                        >
                          <span
                            className={`absolute inset-0 ${CATEGORY_COLORS[cat].bar} rounded-sm transition-opacity duration-150`}
                            style={{ opacity: isHover ? Math.min(1, opacity + 0.3) : opacity }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Job chapter labels under the grid */}
          <div className="flex pl-32 sm:pl-36 mt-3">
            {['Elbit', 'KLA', 'WEM'].map((label, i) => {
              const spans = [5, 6, 2]; // years per job: 2014-18, 2019-24, 2025-26
              const flex = spans[i];
              return (
                <div key={label} className="text-center" style={{ flex }}>
                  <div className="text-[10px] font-mono tracking-[0.24em] text-zinc-500 border-t border-[#4ECDC4]/20 pt-1.5">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
