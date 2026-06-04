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

      {/* Content layer */}
      <div className="relative z-[2] w-full h-full pointer-events-none">
        <header className="absolute top-8 left-10 font-mono text-xs text-white/55 tracking-[0.18em]">
          ELAD SERTSHUK · BACKEND / FULL-STACK · 10+ YRS
        </header>

        {enabled3D && (
          <>
            {CAREER.map((chap, i) => (
              <HudOverlay key={chap.id} chapter={chap} index={i} progress={progress} />
            ))}
            <TerminalStream chapters={CAREER} progress={progress} />
          </>
        )}

        {/* Scroll hint at top, fades out after a bit of scroll */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          scroll ↓
        </div>
      </div>
    </section>
  );
}
