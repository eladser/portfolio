// Pulls real activity signals from GitHub's public events API. One call, no auth,
// 60 req/hr per IP — fine for a personal portfolio. Cached in sessionStorage for 5 min
// so refresh doesn't re-fetch and tab switches stay snappy.

import { useEffect, useState } from 'react';

const USER = 'eladser';
const CACHE_KEY = `live-signals:${USER}`;
const TTL_MS = 5 * 60 * 1000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    if (Date.now() - at > TTL_MS) return null;
    return data;
  } catch { return null; }
}

function writeCache(data) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data })); } catch {}
}

function relTime(iso) {
  const d = Date.now() - new Date(iso).getTime();
  const m = Math.floor(d / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function useLiveSignals() {
  const [state, setState] = useState(() => {
    const cached = readCache();
    return cached ? { ...cached, loading: false } : { loading: true };
  });

  useEffect(() => {
    if (!state.loading) return;
    let cancelled = false;
    fetch(`https://api.github.com/users/${USER}/events?per_page=100`)
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((events) => {
        const now = Date.now();
        const recent = events.filter((e) => (now - new Date(e.created_at).getTime()) < WEEK_MS);
        const pushes = recent.filter((e) => e.type === 'PushEvent');
        // payload.size used to give commit counts but the public events API stopped
        // returning it. Count pushes as the activity unit instead — each one is real work.
        const pushCount = pushes.length;
        const repos = new Set(recent.map((e) => e.repo?.name).filter(Boolean));
        const latestPush = pushes[0]?.created_at || events[0]?.created_at || null;
        const data = {
          pushesThisWeek: pushCount,
          reposTouched: repos.size,
          lastPush: latestPush ? relTime(latestPush) : null,
          lastPushAt: latestPush,
        };
        writeCache(data);
        if (!cancelled) setState({ ...data, loading: false });
      })
      .catch((err) => {
        if (!cancelled) setState({ loading: false, error: String(err) });
      });
    return () => { cancelled = true; };
  }, [state.loading]);

  return state;
}
