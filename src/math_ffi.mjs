// Host-side math used by Math mode sampling (gleam/float has no trig).

export function sin(x) {
  return Math.sin(x);
}

export function cos(x) {
  return Math.cos(x);
}

export function tan(x) {
  return Math.tan(x);
}

export function asin(x) {
  return Math.asin(x);
}

export function acos(x) {
  return Math.acos(x);
}

export function atan(x) {
  return Math.atan(x);
}

export function atan2(y, x) {
  return Math.atan2(y, x);
}

/// Parse θ expressions: "pi", "pi/2", "3*pi/2", "0", "2pi", etc.
/// Returns [ok, value] — ok false when empty/invalid.
export function parse_theta(expr) {
  let s = String(expr ?? "")
    .trim()
    .toLowerCase()
    .replace(/π/g, "pi")
    .replace(/\s+/g, "");
  if (!s) return [false, 0];
  // Allow digits, pi, * / + - ( ) and decimal points only.
  if (!/^[0-9pi.*+\-/()]+$/.test(s)) return [false, 0];
  // Bare "2pi" → "2*pi"
  s = s.replace(/(\d)pi/g, "$1*pi").replace(/pi(\d)/g, "pi*$1");
  try {
    const v = Function("pi", `"use strict"; return (${s});`)(Math.PI);
    if (typeof v !== "number" || !Number.isFinite(v)) return [false, 0];
    // Allowed range is [0, 2π] only.
    const twoPi = 2 * Math.PI;
    if (v < 0 || v > twoPi + 1e-9) return [false, 0];
    return [true, v];
  } catch {
    return [false, 0];
  }
}
