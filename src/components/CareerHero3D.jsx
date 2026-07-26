// Pinned scroll hero. Scroll progresses through 3 real career artifacts
// (Elbit → KLA → WEM). HUD + terminal stream sit over the artwork; nav stays above.
//
// This used to be an R3F canvas rendering three generated GLBs. It shipped 55.8 MB of
// models + HDRI behind a single Suspense boundary, which meant a first-time visitor
// stared at an empty black frame for minutes before anything appeared — and the meshes
// carried garbled, invented branding. It's now three masked 2D product stills at
// ~100 KB each, choreographed with the same depth-tunnel motion. 296 KB total.

import { useRef, useState, useCallback } from 'react';
import { CAREER } from '../data/career';
import { CareerArtifact2D } from './career-hero/CareerArtifact2D';
import { HudOverlay } from './career-hero/HudOverlay';
import { TerminalStream } from './career-hero/TerminalStream';
import { YearTicker } from './career-hero/YearTicker';
import { TimelineIndicator } from './career-hero/TimelineIndicator';
import { BridgeCaption } from './career-hero/BridgeCaption';
import { FuturePrompt } from './career-hero/FuturePrompt';
import { useScrollProgress } from './career-hero/useScrollProgress';

// How far you scroll through the pinned hero. Also reserved as real page height below,
// so ScrollTrigger's pin doesn't have to insert a spacer after first paint.
const PIN_DISTANCE = 2400;

export function CareerHero3D({ scroller }) {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef, { distance: PIN_DISTANCE, scroller });
  // The first artifact is the only one that gates the "ready" state — the other two
  // are far enough down the scroll that they stream in long before they're needed.
  const [ready, setReady] = useState(false);
  const onFirstLoad = useCallback(() => setReady(true), []);

  return (
    // Outer shell reserves the pin's scroll distance from first paint. With
    // pinSpacing:false, ScrollTrigger then only switches the section to fixed/transform
    // and never touches document flow — on a real network the hero chunk mounts after
    // first paint, so a spacer inserted at that moment registered as a ~0.3 CLS.
    <div style={{ height: `calc(100dvh + ${PIN_DISTANCE}px)` }}>
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0a0a0a]"
      style={{ height: '100dvh' }}
      aria-label="Three career chapters: defense, semiconductor, energy"
    >
      {/* Artwork layer (z:1) — behind the HUD */}
      <div className="absolute inset-0 z-[1]">
        {CAREER.map((chap, i) => (
          <CareerArtifact2D
            key={chap.id}
            index={i}
            src={`${import.meta.env.BASE_URL}${chap.image.replace(/^\//, '')}`}
            alt={chap.imageAlt}
            progress={progress}
            onLoad={i === 0 ? onFirstLoad : undefined}
          />
        ))}
      </div>

      {/* Loading state — a quiet line, not a spinner. Replaced the old black void. */}
      {!ready && (
        <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none">
          <div className="font-mono text-[11px] tracking-[0.32em] text-white/35 animate-pulse">
            LOADING CHAPTER 01
          </div>
        </div>
      )}

      {/* Big background year ticker — behind everything except the page bg */}
      <div className="absolute inset-0 z-[0]">
        <YearTicker chapters={CAREER} progress={progress} />
      </div>

      {/* Content layer */}
      <div className="relative z-[2] w-full h-full pointer-events-none">
        {/* Framing — sets the context before the visitor sees an artifact + 2014 and is
            confused. Fades out as scroll progresses; the chapter HUD takes over. */}
        <header
          className="absolute top-16 left-5 right-5 sm:top-12 sm:left-12 sm:right-auto max-w-2xl"
          style={{ opacity: Math.max(0, 1 - progress * 7) }}
        >
          <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
            <picture>
              <source
                type="image/webp"
                srcSet={`${import.meta.env.BASE_URL}profile-160.webp 160w, ${import.meta.env.BASE_URL}profile-320.webp 320w`}
                sizes="80px"
              />
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt=""
                width="80"
                height="80"
                loading="eager"
                fetchPriority="high"
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover ring-1 ring-white/15"
              />
            </picture>
            <div>
              <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.32em] text-[#4ECDC4] mb-2">
                BACKEND / FULL-STACK ENGINEER · HAIFA, IL
              </div>
              <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
                Elad Sertshuk
              </h1>
            </div>
          </div>
          <p className="text-white/70 text-sm sm:text-base md:text-xl leading-relaxed mb-5 sm:mb-6">
            Backend C# for about ten years now. Three jobs so far:
            {' '}<span className="text-[#4ECDC4]/90">Elbit</span> on defense simulators,
            {' '}<span className="text-[#4ECDC4]/90">KLA</span> on semiconductor fab tools (five years),
            {' '}and now <span className="text-[#4ECDC4]/90">WEM</span> on grid-scale energy,
            with a fair bit of <span className="text-[#FF6B6B]/90">LLM integration</span> mixed in lately. Also shipping <a href="https://github.com/eladser/seerlens" target="_blank" rel="noopener noreferrer" className="text-[#FF6B6B]/90 underline decoration-[#FF6B6B]/30 underline-offset-4 hover:decoration-[#FF6B6B] transition-colors pointer-events-auto">Seerlens</a> on the side, local devtools for those AI calls.
          </p>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.24em] text-white/55 flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-5 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="text-[#4ECDC4]">↓</span>
              <span>SCROLL</span>
            </div>
            <span className="text-white/20" aria-hidden="true">·</span>
            <a
              href="https://github.com/eladser"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4ECDC4] transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/eladser"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4ECDC4] transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="mailto:elad.ser@gmail.com"
              className="hover:text-[#4ECDC4] transition-colors"
            >
              EMAIL
            </a>
          </div>
        </header>

        <TimelineIndicator chapters={CAREER} progress={progress} />
        {CAREER.map((chap, i) => (
          <HudOverlay key={chap.id} chapter={chap} index={i} progress={progress} />
        ))}
        <TerminalStream chapters={CAREER} progress={progress} />
        <BridgeCaption progress={progress} />
        <FuturePrompt progress={progress} />

        {/* Scroll hint, fades out after a bit of scroll */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          scroll ↓
        </div>
      </div>
    </section>
    </div>
  );
}

export default CareerHero3D;
