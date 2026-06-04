// Pinned R3F canvas. Scroll progresses through 3 career artifacts (Elbit → KLA → WEM).
// HUD + terminal stream sit over the canvas at z:2; canvas at z:1; nav stays above.
// Mobile + prefers-reduced-motion: canvas hidden, static frame shown instead.

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
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

function useEnable3D() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const mq1 = window.matchMedia('(hover: hover) and (min-width: 900px)');
    const mq2 = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => setEnabled(mq1.matches && !mq2.matches);
    decide();
    mq1.addEventListener('change', decide);
    mq2.addEventListener('change', decide);
    return () => {
      mq1.removeEventListener('change', decide);
      mq2.removeEventListener('change', decide);
    };
  }, []);
  return enabled;
}

export function CareerHero3D({ scroller }) {
  const containerRef = useRef(null);
  const enabled3D = useEnable3D();
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
            <ambientLight intensity={0.35} />
            <directionalLight intensity={1.1} position={[-4, 5, 6]} />
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
          <div className="font-mono text-[10px] tracking-[0.32em] text-[#4ECDC4] mb-4">
            BACKEND / FULL-STACK ENGINEER · HAIFA, IL
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-[1.02] mb-5">
            Elad Sertshuk
          </h1>
          <p className="text-white/70 text-base md:text-xl leading-relaxed mb-6">
            Backend C# for about ten years now. Three jobs so far:
            {' '}<span className="text-[#4ECDC4]/90">Elbit</span> on defense simulators,
            {' '}<span className="text-[#4ECDC4]/90">KLA</span> on semiconductor fab tools (five years),
            {' '}and now <span className="text-[#4ECDC4]/90">WEM</span> doing grid-scale energy.
          </p>
          <div className="font-mono text-xs tracking-[0.24em] text-white/55 flex items-center gap-3">
            <span className="text-[#4ECDC4]">↓</span>
            <span>SCROLL</span>
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
