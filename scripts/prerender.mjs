/**
 * Writes each writing post to dist/writing/<slug>/index.html as fully server-rendered
 * HTML. Runs after `vite build` (which produced dist/) and `vite build --ssr` (which
 * produced the compiled post components in .ssr/).
 *
 * The stylesheet href is lifted out of the built index.html so the article inherits the
 * site's CSS without hardcoding a content hash.
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE = 'https://eladser.dev';

const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');
const cssHref = (indexHtml.match(/href="(\/assets\/[^"]+\.css)"/) || [])[1];
if (!cssHref) throw new Error('prerender: no stylesheet found in dist/index.html');

// pathToFileURL: a bare Windows path is not a legal ESM specifier
const { POSTS } = await import(pathToFileURL(join(root, '.ssr', 'writing-entry.js')).href);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

for (const post of POSTS) {
  const { slug, meta } = post;
  const url = `${SITE}/writing/${slug}/`;
  const body = post.render();
  const date = new Date(meta.date);
  const dateLabel = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.dek,
    datePublished: meta.date,
    url,
    mainEntityOfPage: url,
    author: { '@type': 'Person', name: 'Elad Sertshuk', url: `${SITE}/` },
    keywords: meta.tags.join(', '),
  };

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(meta.title)} — Elad Sertshuk</title>
    <meta name="description" content="${esc(meta.dek)}" />
    <link rel="canonical" href="${url}" />
    <meta name="author" content="Elad Sertshuk" />
    <meta name="robots" content="index, follow, max-snippet:-1" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.dek)}" />
    <meta property="og:image" content="${SITE}/profile.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(meta.dek)}" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="alternate" type="application/rss+xml" title="Elad Sertshuk — Writing" href="/rss.xml" />
    <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-400-latin.woff2" crossorigin />
    <link rel="preload" as="font" type="font/woff2" href="/fonts/jetbrains-mono-400-latin.woff2" crossorigin />
    <link rel="stylesheet" href="${cssHref}" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  </head>
  <body class="bg-[#0a0a0a]">
    <div class="min-h-screen px-5 sm:px-8 py-12 sm:py-20">
      <div class="max-w-2xl mx-auto">
        <a href="/" class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-[#4ECDC4] transition-colors mb-12">
          <span aria-hidden="true">←</span> Elad Sertshuk
        </a>

        <article>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 font-mono text-[11px] text-zinc-500">
            <time datetime="${meta.date}">${dateLabel}</time>
            <span class="text-zinc-700" aria-hidden="true">·</span>
            <span>${esc(meta.readingTime)}</span>
            <span class="text-zinc-700" aria-hidden="true">·</span>
            ${meta.tags.map((t, i) => `<span class="text-[#4ECDC4]">${i > 0 ? '<span class="text-zinc-700 mr-3" aria-hidden="true">·</span>' : ''}${esc(t)}</span>`).join('')}
          </div>

          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-[1.15] mb-3">${esc(meta.title)}</h1>
          <div class="h-px w-12 bg-[#4ECDC4] mb-5" aria-hidden="true"></div>
          <p class="text-base text-zinc-400 leading-relaxed mb-8">${esc(meta.dek)}</p>

          ${body}

          <p class="mt-10 pt-6 border-t border-white/10 text-sm text-zinc-500">
            The fixed version is running in
            <a href="https://github.com/eladser/AspNetDebugDashboard/tree/main/src/AspNetFlags" target="_blank" rel="noopener noreferrer" class="text-[#4ECDC4] hover:underline underline-offset-4">AspNetFlags</a>,
            one of the packages in my ASP.NET suite. The model and queries above are in
            <a href="https://github.com/eladser/AspNetDebugDashboard/blob/main/src/AspNetFlags/Flags.cs" target="_blank" rel="noopener noreferrer" class="text-[#4ECDC4] hover:underline underline-offset-4">Flags.cs</a>.
          </p>
        </article>

        <footer class="mt-14 pt-6 border-t border-white/10 font-mono text-xs text-zinc-500">
          <a href="/" class="hover:text-[#4ECDC4] transition-colors">eladser.dev</a>
          <span class="text-zinc-700 mx-2" aria-hidden="true">·</span>
          <a href="https://github.com/eladser" target="_blank" rel="noopener noreferrer" class="hover:text-[#4ECDC4] transition-colors">github</a>
          <span class="text-zinc-700 mx-2" aria-hidden="true">·</span>
          <a href="mailto:elad.ser@gmail.com" class="hover:text-[#4ECDC4] transition-colors">elad.ser@gmail.com</a>
        </footer>
      </div>
    </div>
  </body>
</html>
`;

  const outDir = join(dist, 'writing', slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`prerendered  /writing/${slug}/  (${Math.round(html.length / 1024)} KB)`);
}

rmSync(join(root, '.ssr'), { recursive: true, force: true });
