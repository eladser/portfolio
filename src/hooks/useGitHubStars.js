// Fetch live star counts for the project cards. Cache aggressively (sessionStorage
// for the tab, with a 30-min freshness window). Falls back to whatever was passed in
// when the API errors or rate-limits.

import { useEffect, useState } from 'react';

const TTL_MS = 30 * 60 * 1000;
const SS_KEY = (repo) => `gh-stars:${repo}`;

function readCache(repo) {
  try {
    const raw = sessionStorage.getItem(SS_KEY(repo));
    if (!raw) return null;
    const { stars, ts } = JSON.parse(raw);
    if (Date.now() - ts > TTL_MS) return null;
    return stars;
  } catch { return null; }
}

function writeCache(repo, stars) {
  try {
    sessionStorage.setItem(SS_KEY(repo), JSON.stringify({ stars, ts: Date.now() }));
  } catch { /* quota or disabled — fine */ }
}

export function useGitHubStars(repo, fallback = 0) {
  const [stars, setStars] = useState(() => readCache(repo) ?? fallback);

  useEffect(() => {
    if (!repo) return;
    const cached = readCache(repo);
    if (cached != null) { setStars(cached); return; }

    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (cancelled || !data) return;
        const n = data.stargazers_count ?? fallback;
        writeCache(repo, n);
        setStars(n);
      })
      .catch(() => { /* swallow — fallback already set */ });

    return () => { cancelled = true; };
  }, [repo, fallback]);

  return stars;
}
