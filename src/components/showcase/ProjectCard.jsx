// Standard project card (non-featured). Uses the teal motion tokens for hover lift.
// Featured project (AeroLens) uses FeaturedProjectCard with the video embed.

import { m } from 'framer-motion';
import { Github } from 'lucide-react';
import { useGitHubStars } from '../../hooks/useGitHubStars';

const ACCENTS = {
  sky:     { border: 'border-l-sky-500',     tag: 'bg-sky-950 text-sky-400',         badge: 'bg-sky-950 text-sky-400' },
  purple:  { border: 'border-l-purple-500',  tag: 'bg-purple-950 text-purple-300',   badge: 'bg-purple-950 text-purple-300' },
  emerald: { border: 'border-l-emerald-500', tag: 'bg-emerald-950 text-emerald-400', badge: 'bg-emerald-950 text-emerald-400' },
  teal:    { border: 'border-l-[#4ECDC4]',   tag: 'bg-[#4ECDC4]/10 text-[#4ECDC4]',  badge: 'bg-[#4ECDC4]/10 text-[#4ECDC4]' },
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

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ transform: 'translateY(-4px)' }}
      className={`group relative rounded-xl border border-white/10 ${accent.border} border-l-2 bg-zinc-900/60 p-5 sm:p-6 transition-shadow duration-200 hover:shadow-[0_12px_28px_-12px_rgba(78,205,196,0.20)]`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg sm:text-xl font-semibold text-white">{project.name}</h3>
          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${accent.badge}`}>
            {project.status.label}
          </span>
        </div>
        <StarBadge count={stars} />
      </div>

      <p className="text-xs font-mono text-zinc-500 mb-3">{project.tagline}</p>

      <p className="text-sm text-zinc-300 leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((t) => (
          <span key={t} className={`text-[11px] font-mono px-2 py-0.5 rounded ${accent.tag}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs px-3 py-1.5 rounded font-medium transition-transform active:scale-[0.97] ${accent.badge} hover:brightness-125`}
          >
            Try it
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        )}
        {project.links.source && (
          <a
            href={project.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded text-zinc-300 hover:text-white hover:bg-white/5 transition-colors active:scale-[0.97]"
          >
            <Github size={13} />
            Source
            <span className="sr-only">(opens in new tab)</span>
          </a>
        )}
        {project.links.nuget && (
          <a
            href={project.links.nuget}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded font-mono text-zinc-400 hover:text-white hover:bg-white/5 transition-colors active:scale-[0.97]"
          >
            nuget
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        )}
      </div>
    </m.div>
  );
}
