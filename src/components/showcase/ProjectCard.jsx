// Non-featured cards. No side-stripe accents, no border-l-2. Variants by index so
// three cards in a row don't read as "identical card × 3". The accent color shows
// only on the project name underline + tag chip text.

import { m } from 'framer-motion';
import { Github } from 'lucide-react';
import { useGitHubStars } from '../../hooks/useGitHubStars';

const ACCENTS = {
  sky:     { underline: 'bg-sky-400',     chip: 'text-sky-300',      chipBg: 'bg-sky-500/10',     status: 'text-sky-300' },
  purple:  { underline: 'bg-purple-400',  chip: 'text-purple-300',   chipBg: 'bg-purple-500/10',  status: 'text-purple-300' },
  emerald: { underline: 'bg-emerald-400', chip: 'text-emerald-300',  chipBg: 'bg-emerald-500/10', status: 'text-emerald-300' },
  teal:    { underline: 'bg-[#4ECDC4]',   chip: 'text-[#4ECDC4]',    chipBg: 'bg-[#4ECDC4]/10',   status: 'text-[#4ECDC4]' },
};

function StarBadge({ count }) {
  if (count == null || count < 0) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400">
      <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-[#4ECDC4]">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span className="tabular-nums">{count}</span>
    </span>
  );
}

export function ProjectCard({ project, index = 0 }) {
  const stars = useGitHubStars(project.githubRepo, project.fallbackStars ?? 0);
  const accent = ACCENTS[project.accent] || ACCENTS.teal;

  // Visual variants so a row of cards doesn't read identical. Variant 0 = boxed,
  // 1 = bare with hairline divider, 2 = compact one-line-style.
  const variant = index % 3;
  const wrapper =
    variant === 0
      ? 'group relative rounded-md border border-white/10 bg-zinc-900/40 p-5 sm:p-6 transition-colors hover:border-white/20 hover:bg-zinc-900/60'
      : variant === 1
      ? 'group relative p-5 sm:p-6 border-t border-white/10 transition-colors'
      : 'group relative p-5 sm:p-6 transition-colors';

  return (
    <m.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className={wrapper}
    >
      <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
        <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
          {project.name}
        </h3>
        <span className={`text-[10px] font-mono uppercase tracking-[0.18em] ${accent.status}`}>
          {project.status.label}
        </span>
        <StarBadge count={stars} />
      </div>
      <div className={`h-px w-8 ${accent.underline} mb-3`} aria-hidden="true" />
      <p className="text-xs font-mono text-zinc-500 mb-3">{project.tagline}</p>

      <p className="text-sm text-zinc-300 leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-[11px] font-mono text-zinc-500">
        {project.tags.map((t, i) => (
          <span key={t}>
            {i > 0 && <span className="text-zinc-700 mr-3" aria-hidden="true">·</span>}
            <span className={accent.chip}>{t}</span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 flex-wrap text-xs font-mono">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`${accent.chip} hover:underline underline-offset-4`}
          >
            live ↗
          </a>
        )}
        {project.links.source && (
          <a
            href={project.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white"
          >
            <Github size={12} />
            source
          </a>
        )}
        {project.links.nuget && (
          <a
            href={project.links.nuget}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white"
          >
            nuget
          </a>
        )}
      </div>
    </m.article>
  );
}
