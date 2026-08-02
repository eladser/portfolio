// SSR entry for the writing pages. Vite builds this separately (`vite build --ssr`),
// then scripts/prerender.mjs renders each post to a real static HTML file.
//
// The posts are static prose, so they ship as plain server-rendered HTML with no JS —
// which is the whole point: Google gets the full article without executing anything,
// and the page works with scripts off.

import { renderToStaticMarkup } from 'react-dom/server';
import { LiteDbIdPost } from '../components/writing/LiteDbIdPost';
import { POSTS as META } from '../components/writing/posts';

const BODIES = {
  'litedb-bsonid': () => renderToStaticMarkup(<LiteDbIdPost />),
};

export const POSTS = META.map((meta) => ({
  slug: meta.slug,
  meta,
  render: BODIES[meta.slug],
}));
