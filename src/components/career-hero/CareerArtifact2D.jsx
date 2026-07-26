// One career artifact, driven by scroll progress. Replaces the old R3F/GLB version:
// same depth-tunnel choreography (enter from deep back, hold, dolly past the camera),
// but as a masked 2D still with CSS transforms. ~100 KB per artifact instead of ~17 MB,
// and the product-render fidelity is far better than the generated meshes were.

const smoothstep = (t) => t * t * (3 - 2 * t);

// Visibility windows: [enterStart, settledStart, settledEnd, exitEnd]
const WINDOWS = [
  { es: 0.00, ss: 0.00, se: 0.30, ee: 0.50 },  // Elbit — on screen from the start
  { es: 0.30, ss: 0.50, se: 0.65, ee: 0.85 },  // KLA
  { es: 0.65, ss: 0.85, se: 1.00, ee: 1.00 },  // WEM — anchored at the end
];

const X_DRIFT    = 13;    // % of viewport width — small lateral drift, depth carries the move
const SCALE_FROM = 0.42;  // entering starts this fraction of full size (far away)
const SCALE_EXIT = 1.32;  // exiting grows as it passes the camera
const RY_TRAVEL  = 15;    // deg — keep modest; a flat plane rotated hard reads as flat
const RX_TUMBLE  = 5;     // deg

function poseFor(index, p) {
  const w = WINDOWS[index];
  if (p < w.es || p > w.ee) return null;

  // WEM tail: dolly out and fade before the closing prompt so nothing stacks on it
  if (index === 2 && p > 0.88) {
    const t = smoothstep(Math.min(1, (p - 0.88) / 0.06));
    return { o: 1 - t, x: -t * X_DRIFT * 0.5, ry: -t * RY_TRAVEL * 0.4, rx: t * RX_TUMBLE * 0.4, s: 1 + (SCALE_EXIT - 1) * t * 0.4 };
  }

  if (p >= w.ss && p <= w.se) return { o: 1, x: 0, ry: 0, rx: 0, s: 1 };

  // Entering: rise out of depth from the right
  if (p < w.ss) {
    const t = (w.ss - w.es) === 0 ? 1 : smoothstep((p - w.es) / (w.ss - w.es));
    const k = 1 - t;
    return { o: t, x: k * X_DRIFT, ry: k * RY_TRAVEL, rx: -k * RX_TUMBLE, s: SCALE_FROM + (1 - SCALE_FROM) * t };
  }

  // Exiting: dolly toward the camera, growing and fading
  const t = (w.ee - w.se) === 0 ? 1 : smoothstep((p - w.se) / (w.ee - w.se));
  return { o: 1 - t, x: -t * X_DRIFT, ry: -t * RY_TRAVEL, rx: t * RX_TUMBLE, s: 1 + (SCALE_EXIT - 1) * t };
}

export function CareerArtifact2D({ index, src, alt, progress, onLoad }) {
  const pose = poseFor(index, progress);
  if (!pose || pose.o <= 0.01) return null;

  return (
    <div
      className="absolute inset-x-0 top-[34%] bottom-auto sm:inset-0 sm:top-0 flex items-center justify-center pointer-events-none sm:translate-x-[6vw]"
      style={{ perspective: '1400px' }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        width="1400"
        height="1400"
        decoding="async"
        fetchPriority={index === 0 ? 'high' : 'low'}
        loading="eager"
        onLoad={onLoad}
        className="h-[34vh] sm:h-[86vh] max-h-[300px] sm:max-h-[760px] w-auto select-none"
        style={{
          opacity: pose.o,
          transform: `translate3d(${pose.x}vw, 0, 0) rotateY(${pose.ry}deg) rotateX(${pose.rx}deg) scale(${pose.s})`,
          // Feather the square frame into the page so no image edge is visible
          maskImage: 'radial-gradient(ellipse 62% 62% at 50% 50%, #000 58%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 62% 62% at 50% 50%, #000 58%, transparent 92%)',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
