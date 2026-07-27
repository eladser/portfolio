// One post. Deliberately not a blog engine — when there's a second one, this becomes a
// list and the post moves behind a route. Until then a list of one is just a longer
// path to the same words.

import { m } from 'framer-motion';
import { LiteDbIdPost, POST } from './LiteDbIdPost';

export function WritingView({ onNext }) {
  return (
    <div className="max-w-2xl w-full">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Writing</h1>
        <p className="text-base text-zinc-300">Occasional notes. Mostly things that cost me an evening.</p>
      </m.div>

      <m.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 font-mono text-[11px] text-zinc-500">
          <time dateTime={POST.date}>
            {new Date(POST.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <span className="text-zinc-700" aria-hidden="true">·</span>
          <span>{POST.readingTime}</span>
          <span className="text-zinc-700" aria-hidden="true">·</span>
          {POST.tags.map((t, i) => (
            <span key={t} className="text-[#4ECDC4]">
              {i > 0 && <span className="text-zinc-700 mr-3" aria-hidden="true">·</span>}
              {t}
            </span>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-[1.15] mb-3">
          {POST.title}
        </h2>
        <div className="h-px w-12 bg-[#4ECDC4] mb-5" aria-hidden="true" />
        <p className="text-base text-zinc-400 leading-relaxed mb-8">{POST.dek}</p>

        <LiteDbIdPost />

        <p className="mt-10 pt-6 border-t border-white/10 text-sm text-zinc-500">
          The fixed version is running in{' '}
          <a
            href="https://github.com/eladser/AspNetFlags"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4ECDC4] hover:underline underline-offset-4"
          >
            AspNetFlags
          </a>
          {' '}if you want to read the whole thing.
        </p>
      </m.article>

      {onNext}
    </div>
  );
}
