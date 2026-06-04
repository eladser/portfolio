// One GLB driven by scroll. As scroll progresses through the pinned hero, each artifact
// slides in from the right, holds centred, then slides out to the left while rotating —
// not just fading. Per-artifact phase windows give clean handoffs without overlap reads.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const smoothstep = (t) => t * t * (3 - 2 * t);

// Visibility phase windows: [enterStart, settledStart, settledEnd, exitEnd]
// Crossfade windows are the gaps where two artifacts swap. First and last have a zero-length
// entry/exit so they're "anchored" at the boundary.
const WINDOWS = [
  { es: 0.00, ss: 0.00, se: 0.30, ee: 0.50 },  // Elbit  — visible from start, exits 0.30→0.50
  { es: 0.30, ss: 0.50, se: 0.65, ee: 0.85 },  // KLA    — enters 0.30→0.50, holds, exits 0.65→0.85
  { es: 0.65, ss: 0.85, se: 1.00, ee: 1.00 },  // WEM    — enters 0.65→0.85, anchored at end
];

// Per-artifact natural-size fit + base rotation (zeroed for now — tune per model)
const BASE = [
  { fitHeight: 2.6, rx: 0.05, ry: 0.0, rz: 0 },
  { fitHeight: 2.4, rx: 0.00, ry: 0.0, rz: 0 },
  { fitHeight: 2.6, rx: 0.00, ry: 0.0, rz: 0 },
];

// Travel amounts during the entry/exit phases
const X_TRAVEL = 5.0;       // slide horizontally
const Z_TRAVEL = -0.8;      // recede slightly back
const RY_TRAVEL = 0.55;     // ~31° rotation arc

function poseFor(index, p) {
  const w = WINDOWS[index];
  // Outside the window: invisible
  if (p < w.es || p > w.ee) return { o: 0, x: 0, z: 0, ry: 0 };
  // Settled (hold)
  if (p >= w.ss && p <= w.se) return { o: 1, x: 0, z: 0, ry: 0 };
  // Entering: slides in from +X, rotates from +ry
  if (p < w.ss) {
    const t = (w.ss - w.es) === 0 ? 1 : smoothstep((p - w.es) / (w.ss - w.es));
    return {
      o:  t,
      x:  (1 - t) * X_TRAVEL,
      z:  (1 - t) * Z_TRAVEL,
      ry: (1 - t) * RY_TRAVEL,
    };
  }
  // Exiting: slides to -X, rotates the other way
  const t = (w.ee - w.se) === 0 ? 1 : smoothstep((p - w.se) / (w.ee - w.se));
  return {
    o:  1 - t,
    x:  -t * X_TRAVEL,
    z:  t * Z_TRAVEL,
    ry: -t * RY_TRAVEL,
  };
}

export function CareerArtifact({ index, modelUrl, progress }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const { scene } = useGLTF(modelUrl, true, true);

  // Live rotation overrides from ?debug=rot panel (no-op when not in debug)
  const [liveBase, setLiveBase] = useState(null);
  useEffect(() => {
    const read = () => setLiveBase((window.__hero_base && window.__hero_base[index]) || null);
    read();
    window.addEventListener('hero-base-changed', read);
    return () => window.removeEventListener('hero-base-changed', read);
  }, [index]);

  // Clone + recenter + fit-scale to consistent height across artifacts
  const { content, scaleFactor } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    const base = BASE[index];
    const factor = base.fitHeight / size.y;
    const applyToMat = (m) => {
      if (!m) return;
      m.envMapIntensity = 1.15;
      m.transparent = true;
    };
    cloned.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = false;
        n.receiveShadow = false;
        Array.isArray(n.material) ? n.material.forEach(applyToMat) : applyToMat(n.material);
      }
    });
    return { content: cloned, scaleFactor: factor };
  }, [scene, index]);

  useFrame((state) => {
    const pose = poseFor(index, progress);
    const group = groupRef.current;
    if (!group) return;
    group.visible = pose.o > 0.01;
    if (!group.visible) return;

    // Material opacity (handle material arrays)
    content.traverse((n) => {
      if (!n.isMesh) return;
      if (Array.isArray(n.material)) n.material.forEach((m) => { if (m) m.opacity = pose.o; });
      else if (n.material) n.material.opacity = pose.o;
    });

    // Outer group carries the scroll-driven travel (position + Y-rotation)
    const t = state.clock.elapsedTime;
    group.position.set(pose.x, Math.sin(t * 0.4 + index) * 0.04, pose.z);
    group.rotation.y = pose.ry + Math.sin(t * 0.18 + index) * 0.05;  // base + tiny idle sway

    // Inner group holds the base "facing" tilt — kept tiny so the model reads as front-on.
    // When ?debug=rot is active, live slider values override all three axes.
    if (innerRef.current) {
      const base = BASE[index];
      if (liveBase) {
        innerRef.current.rotation.x = liveBase.rx;
        innerRef.current.rotation.y = liveBase.ry;
        innerRef.current.rotation.z = liveBase.rz;
        // when debugging rotation, override outer Y too so idle/scroll rotations don't fight the slider
        group.rotation.y = liveBase.ry;
      } else {
        innerRef.current.rotation.x = base.rx;
        innerRef.current.rotation.y = base.ry;
        innerRef.current.rotation.z = base.rz;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef} scale={scaleFactor}>
        <primitive object={content} />
      </group>
    </group>
  );
}

// Preload all 3 so the hero never shows a flash of nothing on first scroll
useGLTF.preload('/assets/models/elbit-station.glb', true, true);
useGLTF.preload('/assets/models/kla-tool.glb', true, true);
useGLTF.preload('/assets/models/wem-bess.glb', true, true);
