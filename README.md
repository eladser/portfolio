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

## Notes to future me

The hero scroll uses GSAP ScrollTrigger with a custom scroller (the home view's
overflow container, not `window`). If you remove `pinType: 'transform'` or
`anticipatePin: 1` from `useScrollProgress`, it jitters on first scroll. Leave
them in.

Don't try to split `three` / `r3f` / `gsap` via Vite `manualChunks`. The
`id.includes('react')` match is greedy and grabs R3F internals at paths like
`@react-three/fiber/dist/...`. They end up in the React chunk and run before
React's actually initialized — you get `Cannot read properties of undefined
(reading 'useLayoutEffect')` in prod (dev works fine, fun bug). Auto-chunking is
already doing the right thing.

Mobile + `prefers-reduced-motion` skip the 3D hero via React.lazy. They render
`CareerHeroStatic` instead. If you touch the gate, that's in
`hooks/useEnable3D.js`.

If the stack timeline (`data/stack-timeline.js`) goes stale, update the
intensities by hand. Whole grid is keyed off the years constant up top.
