// Featured project. Wider card, two-column on desktop with the demo media on the
// right (video or gif), stacks on mobile. Themed by accent (teal default, sky for
// AeroLens).

import { m } from 'framer-motion';
import { Github } from 'lucide-react';
import { useGitHubStars } from '../../hooks/useGitHubStars';

const ACCENTS = {
  teal: { border: 'border-l-[#4ECDC4]', tag: 'bg-[#4ECDC4]/10 text-[#4ECDC4]', hover: 'hover:border-[#4ECDC4]/50' },
  sky:  { border: 'border-l-sky-500',   tag: 'bg-sky-950 text-sky-400',         hover: 'hover:border-sky-500/50' },
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
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`relative rounded-xl border border-white/10 border-l-2 ${accent.border} bg-zinc-900/60 p-5 sm:p-7 mb-6 transition-shadow hover:shadow-[0_18px_40px_-16px_rgba(78,205,196,0.18)]`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">{project.name}</h3>
          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${accent.tag}`}>
            {project.status.label}
          </span>
        </div>
        <StarBadge count={stars} />
      </div>

      <p className="text-xs font-mono text-zinc-500 mb-4">{project.tagline}</p>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-5 items-start">
        <div>
          <p className="text-sm text-zinc-300 leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
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
                className={`text-xs px-3 py-1.5 rounded font-medium ${accent.tag} hover:brightness-125 transition-transform active:scale-[0.97]`}
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
        </div>

        {project.media && mediaLink && (
          <a
            href={mediaLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`block rounded-lg overflow-hidden border border-white/10 ${accent.hover} transition-colors`}
          >
            {project.media.type === 'video' ? (
              <video
                src={mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            ) : (
              <img
                src={mediaSrc}
                alt={`${project.name} demo`}
                loading="lazy"
                className="w-full h-auto"
              />
            )}
          </a>
        )}
      </div>
    </m.div>
  );
}
