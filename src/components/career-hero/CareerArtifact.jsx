// One GLB pinned in 3-space. Visibility + light pose tweaks driven by overall pin progress.
// Idle sin-wave rotation while visible so it never freezes. Recenters + fits the model.

import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const smoothstep = (t) => t * t * (3 - 2 * t);

// Per-artifact opacity over the pin (0..1). True crossfade: pair-sums stay near 1
// through the two transition windows.
function opacityFor(index, p) {
  const T1A = 0.30, T1B = 0.50;   // Elbit → KLA
  const T2A = 0.65, T2B = 0.85;   // KLA → WEM
  if (index === 0) {
    if (p < T1A) return 1;
    if (p > T1B) return 0;
    return 1 - smoothstep((p - T1A) / (T1B - T1A));
  }
  if (index === 1) {
    if (p < T1A) return 0;
    if (p < T1B) return smoothstep((p - T1A) / (T1B - T1A));
    if (p < T2A) return 1;
    if (p < T2B) return 1 - smoothstep((p - T2A) / (T2B - T2A));
    return 0;
  }
  // index 2
  if (p < T2A) return 0;
  if (p < T2B) return smoothstep((p - T2A) / (T2B - T2A));
  return 1;
}

// Per-artifact base pose (centred-ish, varied tilt). World coords; camera at z=6, fov 38.
const BASE = [
  { rx:  0.15, ry:  0.30, rz: 0,    target: 2.3, y:  0.1 },  // Elbit
  { rx:  0.00, ry: -0.35, rz: 0,    target: 2.0, y:  0.0 },  // KLA
  { rx:  0.00, ry:  0.40, rz: 0,    target: 2.4, y: -0.1 },  // WEM
];

export function CareerArtifact({ index, modelUrl, progress }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const { scene } = useGLTF(modelUrl, true, true);  // draco + meshopt decoders

  // Clone so multiple GLBs don't share materials; recenter + fit-scale to `target` height
  const { content, scaleFactor } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    const tgt = BASE[index].target;
    const factor = tgt / Math.max(size.x, size.y, size.z);
    const applyToMat = (m) => {
      if (!m) return;
      m.envMapIntensity = 1.15;
      m.transparent = true;            // enables opacity; keep depth-write on for solid look
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

  // Per-frame: apply opacity to materials + idle sway. Skip work when invisible.
  useFrame((state) => {
    const o = opacityFor(index, progress);
    const group = groupRef.current;
    if (!group) return;
    group.visible = o > 0.01;
    if (!group.visible) return;

    // Apply opacity to all meshes (handle material arrays)
    content.traverse((n) => {
      if (!n.isMesh) return;
      if (Array.isArray(n.material)) n.material.forEach((m) => { if (m) m.opacity = o; });
      else if (n.material) n.material.opacity = o;
    });

    // Idle sway (alive feel) + tiny crossfade lift on the way out
    const t = state.clock.elapsedTime;
    const base = BASE[index];
    if (innerRef.current) {
      innerRef.current.rotation.x = base.rx;
      innerRef.current.rotation.y = base.ry + Math.sin(t * 0.18 + index) * 0.06;
      innerRef.current.rotation.z = base.rz;
      innerRef.current.position.y = base.y + Math.sin(t * 0.4 + index) * 0.03;
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
