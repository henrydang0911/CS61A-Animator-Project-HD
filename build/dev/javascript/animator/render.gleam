//// Convert each shape into a list of points called a RenderPath.

import shape.{type Path, type Point, Line}

/// One path as canvas.mjs setDrawing consumes it (field by field): the
/// polyline, stroke colour/width, and the start and end times (in tenths of a second)
/// between which the reveal runs — so the renderer's clock needs no shape
/// knowledge.
pub type RenderPath {
  RenderPath(
    points: List(Point),
    thickness: Float,
    color: String,
    start: Float,
    end: Float,
  )
}

/// A single tangent arrow for e^iθ. Sweeps a full 2π lap with the clock.
/// If `pinned`, the lap starts at `fixed_theta`; otherwise it starts at 0.
pub type SweepArrow {
  SweepArrow(
    center_x: Float,
    center_y: Float,
    radius: Float,
    start: Float,
    end: Float,
    color: String,
    thickness: Float,
    pinned: Bool,
    fixed_theta: Float,
  )
}

/// A text label in world coordinates (same space as Path points).
pub type RenderLabel {
  RenderLabel(
    x: Float,
    y: Float,
    text: String,
    color: String,
    size: Float,
    start: Float,
    end: Float,
  )
}

/// A circle marker (filled disc or hollow ring) in world coordinates.
pub type RenderDot {
  RenderDot(
    x: Float,
    y: Float,
    radius: Float,
    color: String,
    filled: Bool,
    start: Float,
    end: Float,
  )
}

// ── The canvas (canvas.mjs) ───────────────────────────────────────────────────

/// Replace the drawing being animated in the page's
/// `<canvas id="animation-canvas">` element. If that element doesn't appear within
/// about 10 seconds, this logs an error to the browser console. This keeps the
/// current time, so a drawing that replaces a finished one appears complete. To
/// animate it from the start, also call reset_clock.
@external(javascript, "./canvas.mjs", "setDrawing")
pub fn set_drawing(paths: List(RenderPath)) -> Nil

/// Replace axis / tick number labels drawn on top of the paths. Pass [] to clear.
@external(javascript, "./canvas.mjs", "setLabels")
pub fn set_labels(labels: List(RenderLabel)) -> Nil

/// Replace filled/hollow dots (e.g. step/δ markers). Pass [] to clear.
@external(javascript, "./canvas.mjs", "setDots")
pub fn set_dots(dots: List(RenderDot)) -> Nil

/// Install a clock-driven orbiting tangent arrow, or clear with clear_sweep.
@external(javascript, "./canvas.mjs", "setSweep")
pub fn set_sweep(arrow: SweepArrow) -> Nil

@external(javascript, "./canvas.mjs", "clearSweep")
pub fn clear_sweep() -> Nil

/// Set the animation's speed, as a multiple of its normal speed: 1.0 is normal and
/// is where it starts, 0.0 pauses, and a negative rate plays it backward.
/// Time stops at the start of the drawing and when its last path finishes, so
/// playing a finished drawing again takes a call to reset_clock.
@external(javascript, "./canvas.mjs", "setSpeed")
pub fn set_speed(rate: Float) -> Nil

/// When True, the clock wraps at the end (or start, when playing backward)
/// instead of holding still.
@external(javascript, "./canvas.mjs", "setLoop")
pub fn set_loop(on: Bool) -> Nil

/// Jump the animation back to its start, where the canvas is empty.
@external(javascript, "./canvas.mjs", "resetClock")
pub fn reset_clock() -> Nil

pub fn render_path(path: Path, color: String) -> RenderPath {
  case path.shape {
    Line(a, b) ->
      RenderPath([a, b], path.thickness, color, path.start, path.end)
  }
}
