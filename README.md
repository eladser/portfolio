# eladser.dev

My portfolio. Live at [eladser.dev](https://eladser.dev).

Home is a scroll-driven 3D walk through three career chapters: Elbit (defense simulators, 2014-18), KLA (semiconductor fab tools, 2019-24), WEM (grid energy + LLM stuff, 2025-now). Each chapter has its own HUD, a terminal that types out the kind of code I actually wrote there, and a giant year in the background that swaps as you scroll.

## Stack

- React 18 + Vite + Tailwind 3
- `@react-three/fiber` + `drei` + `three` for the hero
- `gsap` + `ScrollTrigger` (pinned scroller, scrub mode)
- `framer-motion` for everything outside the hero
- GLBs from Tripo3D, Draco-compressed via `gltf-transform`
- HDRI from polyhaven (`studio_small_03_1k.hdr`)

## Run

```bash
npm install
npm run dev      # localhost:3000
npm run build    # static site to dist/
npm run preview  # serve build at localhost:4173
```

## Deploy

GitHub Pages. Workflow at `.github/workflows/deploy.yml`. Push to `main` triggers build + deploy. Custom domain set up in repo settings.

## Layout

```
src/
  components/
    CareerHero3D.jsx              # pinned R3F canvas + content layer
    CareerHeroStatic.jsx          # text fallback for mobile / reduced-motion
    career-hero/
      CareerArtifact.jsx          # one GLB per chapter, scroll-driven pose
      HudOverlay.jsx              # chapter card on the left
      TerminalStream.jsx          # code snippet typing, bottom right
      YearTicker.jsx              # background year, scales during transitions
      TimelineIndicator.jsx       # top-right, 4 nodes
      BridgeCaption.jsx           # mid-transition caption
      FuturePrompt.jsx            # closing beat + contact
      useScrollProgress.js        # GSAP pin + scrub
    easter-eggs/
      ManifestoOverlay.jsx        # whoami opens this
      VerboseOverlay.jsx          # hold-` 3s opens this
    showcase/
      FeaturedProjectCard.jsx     # AeroLens card
      ProjectCard.jsx             # smaller cards
    LiveStrip.jsx                 # fixed bottom-left, real GitHub push activity
    StackUsageViz.jsx             # year x tech grid on About
  data/
    career.js                     # 3 chapters
    projects.js                   # showcase list
    stack-timeline.js             # year x tech matrix
  hooks/
    useEnable3D.js                # mobile / reduced-motion gate
    useGitHubStars.js             # star counts, sessionStorage 30min
    useLiveSignals.js             # push activity, sessionStorage 5min
    useHoldKey.js                 # hold key for N ms
    useFastScrollDetector.js      # the "you blinked" warn
public/
  assets/
    models/                       # 3 Draco-compressed GLBs (4-6 MB each)
    hdri/studio.hdr               # CC0 from polyhaven
```

## Easter eggs

- Type `whoami` in the Showcase terminal, manifesto slides in
- Hold backtick (`` ` ``) for 3 seconds, verbose stats overlay shows up (FPS, scroll %, hero progress, viewport, DPR)
- Scroll past the hero in under 1.2s, terminal gets a `WARN: you blinked through 10 years of work in X seconds` line
- Old ones still work: Konami, Ctrl+Shift+D for the debug console, click name 5x

## Notes to future me

Hero scroll uses GSAP ScrollTrigger with a custom scroller (the home view's overflow container, not `window`). If you remove `pinType: 'transform'` or `anticipatePin: 1` from `useScrollProgress`, it jitters on first scroll. Leave them in.

Don't try to split `three` / `r3f` / `gsap` via Vite `manualChunks`. The `id.includes('react')` match is greedy and grabs R3F internals at paths like `@react-three/fiber/dist/...`. They end up in the React chunk and run before React is initialized, so you get `Cannot read properties of undefined (reading 'useLayoutEffect')` in prod. Dev works fine which makes it fun. Auto-chunking is already correct.

Mobile + `prefers-reduced-motion` skip the 3D hero via React.lazy. They render `CareerHeroStatic` instead. Gate is in `hooks/useEnable3D.js`.

If `data/stack-timeline.js` goes stale, edit by hand. Grid is keyed off the years constant at the top.
