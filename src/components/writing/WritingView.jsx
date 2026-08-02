// Index only. The posts themselves live at real prerendered URLs (/writing/<slug>/)
// so they can be indexed and ranked on their own — rendering the full text here too
// would just be the same content at a second URL.

import { m } from 'framer-motion';
import { POSTS } from './posts';

export function WritingView({ onNext }) {
  return (
    <div className="max-w-2xl w-full">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Writing</h1>
        <p className="text-base text-zinc-300">Occasional notes. Mostly things that cost me an evening.</p>
      </m.div>

      {POSTS.map((post, i) => (
        <m.a
          key={post.slug}
          href={`/writing/${post.slug}/`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className="group block pb-8 mb-8 border-b border-white/10"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 font-mono text-[11px] text-zinc-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            <span className="text-zinc-700" aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
            <span className="text-zinc-700" aria-hidden="true">·</span>
            {post.tags.map((t, n) => (
              <span key={t} className="text-[#4ECDC4]">
                {n > 0 && <span className="text-zinc-700 mr-3" aria-hidden="true">·</span>}
                {t}
              </span>
            ))}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-[1.2] mb-2 transition-colors group-hover:text-[#4ECDC4]">
            {post.title}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">{post.dek}</p>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors group-hover:text-[#4ECDC4]">
            read
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </span>
        </m.a>
      ))}

      {onNext}
    </div>
  );
}
