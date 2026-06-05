# eladser.dev

Personal portfolio. Live at [eladser.dev](https://eladser.dev).

The home view is a scroll-driven 3D walkthrough through three career chapters:
**Elbit** (defense simulators, 2014–18), **KLA** (semiconductor fab tools, 2019–24),
**WEM** (grid-scale energy + LLM integration, 2025–present). Each chapter has a
per-stop HUD, a typing terminal showing the kind of code that ran in that job, and a
large background year that crossfades as you scroll.

## Stack

- React 18 + Vite + Tailwind 3
- `@react-three/fiber` + `@react-three/drei` + `three` for the hero
- `gsap` + `ScrollTrigger` (pinned scroller, scrub mode)
- `framer-motion` for view transitions outside the hero
- GLBs from Tripo3D, Draco-compressed via `gltf-transform`
- HDRI from Poly Haven (`studio_small_03_1k.hdr`)

## Run

```bash
npm install
npm run dev      # localhost:3000
npm run build    # static site -> dist/
npm run preview  # serve build at localhost:4173
```

## Deploy

GitHub Pages, via the workflow at `.github/workflows/deploy.yml`. Pushes to `main` trigger
a build + deploy. Custom domain `eladser.dev` is configured in repo settings.

## Layout

```
src/
  components/
    CareerHero3D.jsx              # the pinned R3F canvas + content layer
    CareerHeroStatic.jsx          # text-only fallback for mobile / reduced-motion
    career-hero/
      CareerArtifact.jsx          # one GLB per chapter, scroll-driven pose
      HudOverlay.jsx              # left-side chapter card (org, years, role, stack)
      TerminalStream.jsx          # bottom-right code snippet typing
      YearTicker.jsx              # huge background year, scaled during transitions
      TimelineIndicator.jsx       # top-right 4-node timeline
      BridgeCaption.jsx           # mid-transition narrative beat
      FuturePrompt.jsx            # closing "what's next?" + contact
      useScrollProgress.js        # GSAP pin + scrub hook
    easter-eggs/
      ManifestoOverlay.jsx        # `whoami` command opens this
      VerboseOverlay.jsx          # hold-` for 3s opens this
    showcase/
      FeaturedProjectCard.jsx     # big AeroLens card
      ProjectCard.jsx             # smaller secondary cards
    LiveStrip.jsx                 # fixed bottom-left, real GitHub push activity
    StackUsageViz.jsx             # year-by-tech grid on About
  data/
    career.js                     # the three chapters (real dates / roles / stacks)
    projects.js                   # showcase project list
    stack-timeline.js             # year-by-tech intensity matrix
  hooks/
    useEnable3D.js                # gates the 3D bundle on hover + reduced-motion
    useGitHubStars.js             # live star counts, sessionStorage cache 30min
    useLiveSignals.js             # GitHub push activity, sessionStorage cache 5min
    useHoldKey.js                 # generic "hold N ms to fire" for easter eggs
    useFastScrollDetector.js      # triggers the "you blinked" WARN
public/
  assets/
    models/                       # the 3 Draco-compressed GLBs (4–6 MB each)
    hdri/studio.hdr               # CC0 from polyhaven.com
```

## Easter eggs

- Type `whoami` in the Showcase terminal → manifesto slides in from the right
- Hold backtick (`` ` ``) for 3 seconds → verbose stats overlay (FPS, scroll %, hero progress, viewport, DPR)
- Scroll past the hero in under 1.2s → terminal gets a `WARN: you blinked through 10 years of work in X seconds` line
- Old ones still in place: Konami code, Ctrl+Shift+D debug console, click name 5×

## Things to know

- The 3D code is lazy-loaded — mobile + `prefers-reduced-motion` users skip it entirely
  and see the text fallback. Saves ~1 MB of three/r3f/gsap.
- The pinned hero uses GSAP ScrollTrigger with a custom scroller (the home view's
  overflow container, not window). `pinType: 'transform'` + `anticipatePin: 1` are
  required for that to not jitter.
- Don't add `vite.config.js` `manualChunks` for `three`/`r3f`/`gsap`. The greedy
  `id.includes('react')` match pulls R3F internals into the React chunk and crashes
  module init with `Cannot read properties of undefined (reading 'useLayoutEffect')`.
  Vite's auto-chunking handles it correctly.
- Year-by-tech matrix in `data/stack-timeline.js` is hand-curated from the actual CV.
  Not invented numbers.
