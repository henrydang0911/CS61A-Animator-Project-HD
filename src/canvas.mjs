// The canvas animation loop. The renderer is kept out of Lustre's virtual DOM:
// Gleam computes the full curve of every path once (whenever the code or
// `shape_slider` changes) and pushes it here via `setDrawing`. A single
// requestAnimationFrame loop owns the clock and, each frame, reveals a growing
// prefix of the precomputed points straight to the 2D context. So per frame
// there is no geometry work and no vdom diffing — just canvas strokes — which
// is what lets many paths animate at high frames per second.
//
// Values cross the Gleam/JS boundary directly — no JSON: a Gleam record arrives
// as an object with named fields, and a Gleam list is iterable.


let canvas = null;
let ctx = null;
// { paths: [...], labels: [...], dots: [...], sweep: null|{...}, endClock }
let drawing = null;
let rate = 1; // a multiple of normal speed; negative plays the drawing backward
let clock = 0; // the drawing's time, in tenths of a second, in [0, endClock]
let loopEnabled = false; // when true, wrap at endClock / 0 instead of clamping
let lastTs = 0;
let running = false;
let framesWithoutCanvas = 0;
let pendingLabels = [];
let pendingDots = [];
let pendingSweep = null;

const TENTHS_PER_SECOND = 10;
// How many frames (about 10 seconds' worth) to wait for the canvas to appear
// before reporting that it hasn't.
const MAX_FRAMES_WITHOUT_CANVAS = 600;

// Replace the drawing being animated. `pathList` is the List(RenderPath) built
// by render.gleam; each path's points are packed into a flat Float64Array so
// the per-frame draw loop touches only contiguous numbers.
export function setDrawing(pathList) {
  const paths = [];
  for (const p of pathList) {
    const flat = [];
    for (const q of p.points) flat.push(q.x, q.y);
    paths.push({
      pts: new Float64Array(flat),
      thickness: p.thickness,
      color: p.color,
      start: p.start,
      end: p.end,
    });
  }
  // Keep the current clock across drawing swaps: dragging the shape slider on an
  // already-finished drawing shows the new shape complete, rather than restarting.
  // `endClock` is the moment the last path finishes drawing, past which the frame
  // loop holds time still (see frame).
  const labels = pendingLabels;
  const dots = pendingDots;
  const sweep = pendingSweep;
  drawing = {
    paths,
    labels,
    dots,
    sweep,
    endClock: drawingEndClock(paths, labels, dots, sweep),
  };
  if (!running) {
    running = true;
    lastTs = performance.now();
    requestAnimationFrame(frame);
  }
}

/// Clock-driven single tangent arrow for e^{iθ} (from render.set_sweep).
export function setSweep(arrow) {
  pendingSweep = {
    centerX: arrow.center_x,
    centerY: arrow.center_y,
    radius: arrow.radius,
    start: arrow.start,
    end: arrow.end,
    color: arrow.color,
    thickness: arrow.thickness,
    pinned: !!arrow.pinned,
    fixedTheta: arrow.fixed_theta ?? 0,
  };
  if (drawing) {
    drawing = {
      ...drawing,
      sweep: pendingSweep,
      endClock: drawingEndClock(
        drawing.paths,
        drawing.labels,
        drawing.dots,
        pendingSweep,
      ),
    };
  }
}

export function clearSweep() {
  pendingSweep = null;
  if (drawing) {
    drawing = {
      ...drawing,
      sweep: null,
      endClock: drawingEndClock(
        drawing.paths,
        drawing.labels,
        drawing.dots,
        null,
      ),
    };
  }
}

/// Axis / tick text labels in world coordinates (from render.set_labels).
export function setLabels(labelList) {
  const labels = [];
  for (const L of labelList) {
    labels.push({
      x: L.x,
      y: L.y,
      text: L.text,
      color: L.color,
      size: L.size,
      start: L.start,
      end: L.end,
    });
  }
  pendingLabels = labels;
  if (drawing) {
    drawing = {
      ...drawing,
      labels,
      endClock: drawingEndClock(
        drawing.paths,
        labels,
        drawing.dots,
        drawing.sweep,
      ),
    };
  }
}

/// Filled/hollow dots (step & Kronecker markers) from render.set_dots.
export function setDots(dotList) {
  const dots = [];
  for (const d of dotList) {
    dots.push({
      x: d.x,
      y: d.y,
      radius: d.radius,
      color: d.color,
      filled: d.filled,
      start: d.start,
      end: d.end,
    });
  }
  pendingDots = dots;
  if (drawing) {
    drawing = {
      ...drawing,
      dots,
      endClock: drawingEndClock(
        drawing.paths,
        drawing.labels,
        dots,
        drawing.sweep,
      ),
    };
  }
}

// The clock at which every path/label/dot/sweep has fully drawn — the largest
// per-item finish time (u = 1). An empty drawing has nothing to finish, so time
// runs on unbounded (Infinity).
function drawingEndClock(paths, labels, dots, sweep) {
  let end = Infinity;
  const consider = (start, finishEnd) => {
    const finish = Math.max(start, finishEnd);
    end = end === Infinity ? finish : Math.max(end, finish);
  };
  for (const p of paths) consider(p.start, p.end);
  for (const L of labels || []) consider(L.start, L.end);
  for (const d of dots || []) consider(d.start, d.end);
  if (sweep) consider(sweep.start, sweep.end);
  return end;
}

export function setSpeed(r) {
  rate = r;
}

export function setLoop(on) {
  loopEnabled = !!on;
}

// Jump the animation back to the start (empty canvas).
export function resetClock() {
  clock = 0;
}

function frame(ts) {
  // Cap dt so a backgrounded/paused tab can't jump the clock far ahead.
  const dt = Math.min((ts - lastTs) / 1000, 0.1);
  lastTs = ts;
  if (drawing) {
    const end = drawing.endClock;
    clock += dt * rate * TENTHS_PER_SECOND;
    if (
      loopEnabled &&
      Number.isFinite(end) &&
      end > 0
    ) {
      // Wrap forward at the end, or backward at the start.
      if (rate > 0 && clock >= end) clock = 0;
      else if (rate < 0 && clock <= 0) clock = end;
      else clock = clamp(clock, 0, end);
    } else {
      // Hold at the ends when not looping.
      clock = clamp(clock, 0, end);
    }
  }
  render();
  requestAnimationFrame(frame);
}

// Match the backing store to the element's CSS size (× device pixel ratio) so
// the drawing stays crisp; only touched when the size actually changes.
function ensureSize() {
  const dpr = window.devicePixelRatio || 1;
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
    canvas.width = w;
    canvas.height = h;
  }
}

// Find the page's canvas, which Lustre can add to the page after the first drawing
// arrives. Returns whether it is there.
function findCanvas() {
  const el = document.getElementById("animation-canvas");
  if (!el) {
    framesWithoutCanvas += 1;
    if (framesWithoutCanvas === MAX_FRAMES_WITHOUT_CANVAS) {
      console.error('The page has no <canvas id="animation-canvas"> element to draw on.');
    }
    return false;
  }
  if (el !== canvas) {
    canvas = el;
    ctx = canvas.getContext("2d");
  }
  return true;
}

function render() {
  if (!findCanvas()) return;
  ensureSize();
  const w = canvas.width;
  const h = canvas.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);
  // Draw functions work in a 0..1000 world centred on the origin: scale it to
  // fill the canvas and translate (0, 0) to the middle, so positive coordinates
  // run toward the bottom-right corner.
  ctx.setTransform(w / 1000, 0, 0, h / 1000, w / 2, h / 2);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const p of drawing.paths) {
    // Each path is revealed by a parameter u ∈ [0, 1] that advances at a steady
    // rate. A path is complete once u reaches 1.
    const u = penU(p);
    // `u` clamps to 0 both before a path starts and at the very instant it
    // does, so it can't tell "not yet" from "just begun". Gate on the start
    // time instead, so a just-begun path is shown at rest at u = 0
    // rather than staying hidden until the clock advances.
    if (clock >= p.start) {
      drawUpToU(p, u);
    }
  }
  for (const L of drawing.labels || []) {
    if (clock >= L.start) {
      drawLabel(L, penU(L));
    }
  }
  for (const d of drawing.dots || []) {
    if (clock >= d.start) {
      drawDot(d, penU(d));
    }
  }
  if (drawing.sweep && clock >= drawing.sweep.start) {
    drawSweepArrow(drawing.sweep);
  }
}

// How much of a path is revealed now: its parameter u ∈ [0, 1], advancing
// linearly from its start time to its end time — 0 before it starts, 1 once
// done. A path with no positive duration (end ≤ start) appears complete the
// moment it starts.
function penU(p) {
  const duration = p.end - p.start;
  if (duration <= 0) return clock >= p.start ? 1 : 0;
  const u = (clock - p.start) / duration;
  return u < 0 ? 0 : u > 1 ? 1 : u;
}

function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}

// Stroke the first `u` fraction of a path's polyline, interpolating the final
// partial segment so the curve reveals smoothly rather than a vertex at a time.
function drawUpToU(p, u) {
  const pts = p.pts;
  const count = pts.length / 2;
  if (count < 2) return;
  const segs = count - 1;
  const f = u * segs;
  const k = Math.min(segs, Math.floor(f));
  ctx.beginPath();
  ctx.moveTo(pts[0], pts[1]);
  for (let i = 1; i <= k; i++) ctx.lineTo(pts[2 * i], pts[2 * i + 1]);
  const frac = f - k;
  if (k < segs && frac > 0) {
    const ax = pts[2 * k];
    const ay = pts[2 * k + 1];
    const bx = pts[2 * k + 2];
    const by = pts[2 * k + 3];
    ctx.lineTo(ax + (bx - ax) * frac, ay + (by - ay) * frac);
  }
  ctx.lineWidth = p.thickness;
  ctx.strokeStyle = p.color;
  ctx.stroke();
}

// Fade text in over [start, end] using globalAlpha from penU.
function drawLabel(L, u) {
  if (u <= 0) return;
  ctx.save();
  ctx.globalAlpha = u;
  ctx.fillStyle = L.color;
  ctx.font = `${L.size || 28}px "Segoe UI", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(L.text, L.x, L.y);
  ctx.restore();
}

function drawDot(d, u) {
  if (u <= 0) return;
  const r = d.radius || 10;
  ctx.save();
  ctx.globalAlpha = u;
  ctx.beginPath();
  ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
  if (d.filled) {
    ctx.fillStyle = d.color;
    ctx.fill();
  } else {
    // Open circle at a jump (e.g. step left-limit): fill stage color, then ring.
    ctx.fillStyle = "#0a0a14";
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = d.color;
    ctx.stroke();
  }
  ctx.restore();
}

// One tangent arrow at the current θ for e^iθ: base = c + r e^{iθ},
// tip = base + r · i e^{iθ}. Redrawn each frame — no trail of past arrows.
function drawSweepArrow(s) {
  const duration = Math.max(s.end - s.start, 1e-6);
  let u = (clock - s.start) / duration;
  if (u < 0) u = 0;
  if (u > 1) u = 1;
  // Full lap around the circle; pinned θ is the starting angle.
  const origin = s.pinned ? s.fixedTheta : 0;
  const theta = origin + u * 2 * Math.PI;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const bx = s.centerX + s.radius * cos;
  const by = s.centerY - s.radius * sin; // world y flips Im
  // i e^{iθ} = (-sin, cos) in math; world tip uses flipped Im
  const tx = bx + s.radius * -sin;
  const ty = by - s.radius * cos;
  drawArrow(bx, by, tx, ty, s.color, s.thickness);
}

function drawArrow(x0, y0, x1, y1, color, thickness) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return;
  const ux = dx / len;
  const uy = dy / len;
  const head = Math.min(22, len * 0.28);
  const wing = head * 0.55;
  // Shaft stops before the tip so the head sits cleanly on the end.
  const sx = x1 - ux * head;
  const sy = y1 - uy * head;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(sx, sy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(sx - uy * wing, sy + ux * wing);
  ctx.lineTo(sx + uy * wing, sy - ux * wing);
  ctx.closePath();
  ctx.fill();
}

