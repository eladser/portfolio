// Pinned R3F canvas. Scroll progresses through 3 career artifacts (Elbit → KLA → WEM).
// HUD + terminal stream sit over the canvas at z:2; canvas at z:1; nav stays above.
// Mobile + prefers-reduced-motion: canvas hidden, static frame shown instead.

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { CAREER } from '../data/career';
import { CareerArtifact } from './career-hero/CareerArtifact';
import { HudOverlay } from './career-hero/HudOverlay';
import { TerminalStream } from './career-hero/TerminalStream';
import { YearTicker } from './career-hero/YearTicker';
import { TimelineIndicator } from './career-hero/TimelineIndicator';
import { BridgeCaption } from './career-hero/BridgeCaption';
import { FuturePrompt } from './career-hero/FuturePrompt';
import { RotationDebugPanel } from './career-hero/RotationDebugPanel';
import { useScrollProgress } from './career-hero/useScrollProgress';

// Parent gates the mount via useEnable3D + React.lazy, so by the time this renders
// 3D is always enabled. Kept the variable name for the few code paths that still
// reference it inside the JSX.
const enabled3D = true;

// Per-chapter fill + rim light colors. Each chapter gets its own room: Elbit a warm
// amber fill, KLA a clean cool blue, WEM a teal-leaning fill. The rim stays warm-ish
// to keep the silhouette readable against the dark page. Colors lerp across scroll so
// the "rooms" cross-fade instead of snapping.
const CHAPTER_FILL = [
  new THREE.Color('#ffe0b8'),  // elbit warm
  new THREE.Color('#cfe6ff'),  // kla cool
  new THREE.Color('#bfeee4'),  // wem teal-ish
];
const CHAPTER_RIM = [
  new THREE.Color('#ffcf9a'),  // elbit warm
  new THREE.Color('#d6e4ff'),  // kla cool-ish
  new THREE.Color('#a8f0dd'),  // wem teal
];

// Maps scroll progress to a continuous chapter index in [0, 2].
function chapterFloat(p) {
  if (p < 0.30) return 0;
  if (p < 0.50) return (p - 0.30) / 0.20;            // 0 → 1
  if (p < 0.65) return 1;
  if (p < 0.85) return 1 + (p - 0.65) / 0.20;        // 1 → 2
  return 2;
}

function sampleChapterColor(palette, cf) {
  const i0 = Math.floor(cf);
  const i1 = Math.min(palette.length - 1, i0 + 1);
  const t = cf - i0;
  return palette[i0].clone().lerp(palette[i1], t);
}

// Lives inside the Canvas. Drives the fill + rim light colors from scroll progress.
function ChapterLights({ progress }) {
  const fillRef = useRef();
  const rimRef = useRef();
  useFrame(() => {
    const cf = chapterFloat(progress);
    if (fillRef.current) fillRef.current.color.copy(sampleChapterColor(CHAPTER_FILL, cf));
    if (rimRef.current) rimRef.current.color.copy(sampleChapterColor(CHAPTER_RIM, cf));
  });
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight intensity={1.0} position={[-4, 5, 6]} color="#ffffff" />
      <directionalLight ref={fillRef} intensity={0.45} position={[5, 3, 4]} />
      <directionalLight ref={rimRef} intensity={0.55} position={[2, 2, -6]} />
    </>
  );
}

export function CareerHero3D({ scroller }) {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef, { distance: 2400, scroller });

  // Determine current chapter for HUD title fallback / aria
  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0a0a0a]"
      style={{ minHeight: '100dvh' }}
      aria-label="Three career chapters: defense, semiconductor, energy"
    >
      {/* Canvas at z:1 — behind text/HUD at z:2 */}
      {enabled3D && (
        <div className="absolute inset-0 z-[1]">
          <Canvas
            camera={{ fov: 38, position: [0, 0, 6], near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 0.95;
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.setClearColor(0x000000, 0);
            }}
          >
            {/* 3-point lighting with per-chapter fill + rim tint (see ChapterLights):
                white key from front-left stays constant, the fill + rim shift warm →
                cool → teal as you scroll Elbit → KLA → WEM, so each chapter reads as
                its own room. */}
            <ChapterLights progress={progress} />
            <Suspense fallback={null}>
              <Environment files="/assets/hdri/studio.hdr" background={false} />
              {CAREER.map((chap, i) => (
                <CareerArtifact
                  key={chap.id}
                  index={i}
                  modelUrl={chap.model}
                  progress={progress}
                />
              ))}
            </Suspense>
            <EffectComposer multisampling={0} disableNormalPass>
              {/* Bloom dropped: the KLA cleanroom panel + WEM cabinet are mostly
                  white, which blew out under any bloom setting that read on the
                  Elbit station. Without emissive masks in the textures there's
                  nothing to selectively glow, so the 3-point lighting + HDRI
                  reflections carry the premium-render look on their own. */}
              <Vignette
                offset={0.35}
                darkness={0.55}
                blendFunction={BlendFunction.NORMAL}
              />
            </EffectComposer>
          </Canvas>
        </div>
      )}

      {/* Static fallback for mobile / reduced-motion (single SVG-ish frame) */}
      {!enabled3D && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center text-white/50 font-mono text-xs">
          three high-stakes domains · defense · semiconductor · energy
        </div>
      )}

      {/* Big background year ticker — sits behind everything except the page bg */}
      {enabled3D && (
        <div className="absolute inset-0 z-[0]">
          <YearTicker chapters={CAREER} progress={progress} />
        </div>
      )}

      {/* Content layer */}
      <div className="relative z-[2] w-full h-full pointer-events-none">
        {/* Framing — sets the context BEFORE the visitor sees a 3D simulator + 2014 and is
            confused. Fades out as scroll progresses; the chapter HUD takes over from there. */}
        <header
          className="absolute top-12 left-12 max-w-2xl"
          style={{ opacity: Math.max(0, 1 - progress * 7) }}
        >
          <div className="flex items-center gap-5 mb-5">
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
              <div className="font-mono text-[10px] tracking-[0.32em] text-[#4ECDC4] mb-2">
                BACKEND / FULL-STACK ENGINEER · HAIFA, IL
              </div>
              <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
                Elad Sertshuk
              </h1>
            </div>
          </div>
          <p className="text-white/70 text-base md:text-xl leading-relaxed mb-6">
            Backend C# for about ten years now. Three jobs so far:
            {' '}<span className="text-[#4ECDC4]/90">Elbit</span> on defense simulators,
            {' '}<span className="text-[#4ECDC4]/90">KLA</span> on semiconductor fab tools (five years),
            {' '}and now <span className="text-[#4ECDC4]/90">WEM</span> on grid-scale energy,
            with a fair bit of <span className="text-violet-400/90">LLM integration</span> mixed in lately. Also shipping <a href="https://github.com/eladser/seerlens" target="_blank" rel="noopener noreferrer" className="text-violet-400/90 underline decoration-violet-400/30 underline-offset-4 hover:decoration-violet-400 transition-colors pointer-events-auto">Seerlens</a> on the side, local devtools for those AI calls.
          </p>
          <div className="font-mono text-xs tracking-[0.24em] text-white/55 flex items-center gap-5 pointer-events-auto">
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

        {enabled3D && (
          <>
            <TimelineIndicator chapters={CAREER} progress={progress} />
            {CAREER.map((chap, i) => (
              <HudOverlay key={chap.id} chapter={chap} index={i} progress={progress} />
            ))}
            <TerminalStream chapters={CAREER} progress={progress} />
            <BridgeCaption progress={progress} />
            <FuturePrompt progress={progress} />
          </>
        )}

        {/* Scroll hint at top, fades out after a bit of scroll */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          scroll ↓
        </div>
      </div>

      <RotationDebugPanel />
    </section>
  );
}

export default CareerHero3D;
