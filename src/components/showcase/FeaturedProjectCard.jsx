// Featured project. No card chrome, no side stripe. Section-style layout: huge name
// with accent underline, content beside the demo media, hairline divider below.

import { m } from 'framer-motion';
import { Github } from 'lucide-react';
import { useGitHubStars } from '../../hooks/useGitHubStars';

const ACCENTS = {
  teal: { underline: 'bg-[#4ECDC4]',   chip: 'text-[#4ECDC4]', chipBg: 'bg-[#4ECDC4]/10', hoverName: 'hover:text-[#4ECDC4]' },
  sky:  { underline: 'bg-sky-400',     chip: 'text-sky-300',   chipBg: 'bg-sky-500/10',   hoverName: 'hover:text-sky-300' },
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

export function FeaturedProjectCard({ project }) {
  const stars = useGitHubStars(project.githubRepo, project.fallbackStars ?? 0);
  const mediaSrc = `${import.meta.env.BASE_URL}${project.media?.src || ''}`;
  const accent = ACCENTS[project.accent] || ACCENTS.teal;
  const mediaLink = project.links.live || project.links.source;

  return (
    <m.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative pb-10 mb-10 border-b border-white/10"
    >
      <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 items-start">
        <div>
          <div className="flex items-baseline gap-3 flex-wrap mb-2">
            <h3 className={`text-3xl sm:text-4xl font-semibold text-white tracking-tight transition-colors ${accent.hoverName}`}>
              {project.name}
            </h3>
            <span className={`text-[10px] font-mono uppercase tracking-[0.18em] ${accent.chip}`}>
              {project.status.label}
            </span>
            <StarBadge count={stars} />
          </div>
          <div className={`h-px w-12 ${accent.underline} mb-4`} aria-hidden="true" />
          <p className="text-xs font-mono text-zinc-500 mb-5">{project.tagline}</p>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-5">{project.description}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-6 text-[11px] font-mono text-zinc-500">
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
        </div>

        {project.media && mediaLink && (
          <a
            href={mediaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md overflow-hidden ring-1 ring-white/5 hover:ring-white/15 transition"
          >
            {project.media.type === 'video' ? (
              <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-auto" />
            ) : (
              <img src={mediaSrc} alt={`${project.name} demo`} loading="lazy" className="w-full h-auto" />
            )}
          </a>
        )}
      </div>
    </m.section>
  );
}
