// (sx, sy) in 0..1 of viewport when section is centred → world (x, y) at depth z.
// Pattern from the WEM living-object work — far more intuitive than picking world
// coords directly, and survives viewport changes.

export function screenToWorld(camera, sx, sy, z) {
  const dist = camera.position.z - z;
  const vh = 2 * dist * Math.tan((camera.fov * Math.PI) / 360);
  const vw = vh * camera.aspect;
  return {
    x: (sx * 2 - 1) * (vw / 2),
    y: (1 - sy * 2) * (vh / 2),
  };
}
