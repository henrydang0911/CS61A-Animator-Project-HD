//// Math mode: Desmos-like y = f(x) plotting with a Manim-style Create reveal.
//// Sampling uses host floats; the canvas still draws 2D Line Paths only.

import gleam/float
import gleam/int
import gleam/list
import render.{type RenderDot, type RenderLabel, RenderDot, RenderLabel}
import shape.{type Path, type Point, Line, Path, Point}

@external(javascript, "./math_ffi.mjs", "sin")
fn js_sin(x: Float) -> Float

@external(javascript, "./math_ffi.mjs", "cos")
fn js_cos(x: Float) -> Float

@external(javascript, "./math_ffi.mjs", "tan")
fn js_tan(x: Float) -> Float

@external(javascript, "./math_ffi.mjs", "asin")
fn js_asin(x: Float) -> Float

@external(javascript, "./math_ffi.mjs", "acos")
fn js_acos(x: Float) -> Float

@external(javascript, "./math_ffi.mjs", "atan")
fn js_atan(x: Float) -> Float

/// Preset formulas shown in the Math mode dropdown.
/// Wave presets are a·sin(ωx) / a·cos(ωx); defaults a=1, ω=1 act like sin/cos.
pub type MathFn {
  Identity
  Square
  Cube
  Absolute
  Signum
  ScaledSine
  ScaledCosine
  Tangent
  ArcSine
  ArcCosine
  ArcTangent
  ArcSecant
  ArcCosecant
  ArcCotangent
  Exp
  /// Exponential with adjustable base: y = aˣ (a from the base slider).
  Power
  Ln
  Sqrt
  Reciprocal
  /// Unit step (Heaviside): 0 for x < b, 1 for x ≥ b.
  Step
  /// Discrete-style impulse at x = b (Kronecker / δ spike on the plot).
  Kronecker
  /// Explicitly unsupported — surfaces the 3D error.
  ThreeDUnsupported
}

pub type MathError {
  Unsupported3D
}

/// True when a and ω sliders apply (periodic wave presets).
pub fn uses_wave_params(f: MathFn) -> Bool {
  case f {
    ScaledSine | ScaledCosine -> True
    _ -> False
  }
}

/// True when the base slider a applies (y = aˣ).
pub fn uses_base_param(f: MathFn) -> Bool {
  case f {
    Power -> True
    _ -> False
  }
}

/// True when the slope slider m applies (line y = m(x − b)).
pub fn uses_slope(f: MathFn) -> Bool {
  case f {
    Identity -> True
    _ -> False
  }
}

/// Dropdown value ↔ preset.
pub fn fn_id(f: MathFn) -> String {
  case f {
    Identity -> "y=x"
    Square -> "y=x^2"
    Cube -> "y=x^3"
    Absolute -> "y=abs(x)"
    Signum -> "y=sgn(x)"
    ScaledSine -> "y=a*sin(wx)"
    ScaledCosine -> "y=a*cos(wx)"
    Tangent -> "y=tan(x)"
    ArcSine -> "y=arcsin(x)"
    ArcCosine -> "y=arccos(x)"
    ArcTangent -> "y=arctan(x)"
    ArcSecant -> "y=arcsec(x)"
    ArcCosecant -> "y=arccsc(x)"
    ArcCotangent -> "y=arccot(x)"
    Exp -> "y=exp(x)"
    Power -> "y=a^x"
    Ln -> "y=ln(x)"
    Sqrt -> "y=sqrt(x)"
    Reciprocal -> "y=1/x"
    Step -> "y=step"
    Kronecker -> "y=delta"
    ThreeDUnsupported -> "3d"
  }
}

/// Short generic name for the Real-mode dropdown (no shift parameters).
pub fn fn_label(f: MathFn) -> String {
  case f {
    Identity -> "y = x"
    Square -> "y = x²"
    Cube -> "y = x³"
    Absolute -> "y = |x|"
    Signum -> "y = sgn(x)"
    ScaledSine -> "y = sin(x)"
    ScaledCosine -> "y = cos(x)"
    Tangent -> "y = tan(x)"
    ArcSine -> "y = arcsin(x)"
    ArcCosine -> "y = arccos(x)"
    ArcTangent -> "y = arctan(x)"
    ArcSecant -> "y = arcsec(x)"
    ArcCosecant -> "y = arccsc(x)"
    ArcCotangent -> "y = arccot(x)"
    Exp -> "y = exp(x)"
    Power -> "y = aˣ"
    Ln -> "y = ln(x)"
    Sqrt -> "y = √x"
    Reciprocal -> "y = 1/x"
    Step -> "y = u(x)  (step / Heaviside)"
    Kronecker -> "y = δ(x)  (Kronecker spike)"
    ThreeDUnsupported -> "z = f(x,y)  (3D — unsupported)"
  }
}

/// Parameterized form shown under the dropdown (shift b, and a / ω / m when used).
pub fn fn_generalized(f: MathFn) -> String {
  case f {
    Identity -> "y = m(x − b)"
    Square -> "y = (x − b)²"
    Cube -> "y = (x − b)³"
    Absolute -> "y = |x − b|"
    Signum -> "y = sgn(x − b)"
    ScaledSine -> "y = a·sin(ω(x − b))"
    ScaledCosine -> "y = a·cos(ω(x − b))"
    Tangent -> "y = tan(x − b)"
    ArcSine -> "y = arcsin(x − b)"
    ArcCosine -> "y = arccos(x − b)"
    ArcTangent -> "y = arctan(x − b)"
    ArcSecant -> "y = arcsec(x − b)"
    ArcCosecant -> "y = arccsc(x − b)"
    ArcCotangent -> "y = arccot(x − b)"
    Exp -> "y = exp(x − b)"
    Power -> "y = a^(x − b)"
    Ln -> "y = ln(x − b)"
    Sqrt -> "y = √(x − b)"
    Reciprocal -> "y = 1/(x − b)"
    Step -> "y = u(x − b)  (step / Heaviside)"
    Kronecker -> "y = δ(x − b)  (Kronecker spike)"
    ThreeDUnsupported -> "z = f(x,y)  (3D — unsupported)"
  }
}

pub fn all_functions() -> List(MathFn) {
  [
    ScaledSine,
    ScaledCosine,
    Identity,
    Square,
    Cube,
    Absolute,
    Signum,
    Step,
    Kronecker,
    Tangent,
    ArcSine,
    ArcCosine,
    ArcTangent,
    ArcSecant,
    ArcCosecant,
    ArcCotangent,
    Exp,
    Power,
    Ln,
    Sqrt,
    Reciprocal,
    ThreeDUnsupported,
  ]
}

pub fn parse_fn_id(id: String) -> MathFn {
  case id {
    "y=x" -> Identity
    "y=x^2" -> Square
    "y=x^3" -> Cube
    "y=abs(x)" -> Absolute
    "y=sgn(x)" -> Signum
    "y=a*sin(wx)" -> ScaledSine
    "y=a*cos(wx)" -> ScaledCosine
    "y=tan(x)" -> Tangent
    "y=arcsin(x)" -> ArcSine
    "y=arccos(x)" -> ArcCosine
    "y=arctan(x)" -> ArcTangent
    "y=arcsec(x)" -> ArcSecant
    "y=arccsc(x)" -> ArcCosecant
    "y=arccot(x)" -> ArcCotangent
    "y=exp(x)" -> Exp
    "y=a^x" -> Power
    "y=ln(x)" -> Ln
    "y=sqrt(x)" -> Sqrt
    "y=1/x" -> Reciprocal
    "y=step" -> Step
    "y=delta" -> Kronecker
    "3d" -> ThreeDUnsupported
    _ -> ScaledSine
  }
}

pub fn error_message(error: MathError) -> String {
  case error {
    Unsupported3D -> "3D: Unsupported Functionality"
  }
}

/// World units: plot math-x in about [-5, 5] across the canvas width.
const x_math_min = -5.0

const x_math_max = 5.0

const world_half = 450.0

const sample_count = 360

/// Math-y limit (~viewport edge); curves clamp here so asymptotes extend cleanly.
const y_math_lim = 5.3

pub type Plot {
  Plot(paths: List(Path), labels: List(RenderLabel), dots: List(RenderDot))
}

/// Build axes, tick marks, labels, and curve for Manim-style reveal.
/// Most plots use f(x − b). The line is y = m(x − b). Waves also use amplitude
/// `a` (−5…5) and angular frequency `omega` (1…10). Power uses base a (2…10).
pub fn plot(
  f: MathFn,
  a: Int,
  omega: Int,
  b: Int,
  m: Int,
) -> Result(Plot, MathError) {
  case f {
    ThreeDUnsupported -> Error(Unsupported3D)
    Kronecker -> {
      let b_f = int.to_float(int.clamp(b, -5, 5))
      let #(axis_strokes, labels) = axis_decorations()
      Ok(Plot(
        list.append(axis_strokes, kronecker_stem(b_f)),
        labels,
        kronecker_dots(b_f),
      ))
    }
    f -> {
      let a_f = case f {
        Power -> int.to_float(int.clamp(a, 2, 10))
        _ -> int.to_float(int.clamp(a, -5, 5))
      }
      let w_f = int.to_float(int.clamp(omega, 1, 10))
      let b_f = int.to_float(int.clamp(b, -5, 5))
      let m_f = int.to_float(int.clamp(m, -5, 5))
      let curve = sample_curve(f, a_f, w_f, b_f, m_f)
      let #(axis_strokes, labels) = axis_decorations()
      let dots = case f {
        Step -> step_dots(b_f)
        Signum -> signum_dots(b_f)
        _ -> []
      }
      Ok(Plot(list.append(axis_strokes, curve), labels, dots))
    }
  }
}

fn world_y(y_math: Float) -> Float {
  0.0 -. math_to_world_x(y_math)
}

/// Lollipop stick: vertical segment from (b, 0) to (b, 1).
fn kronecker_stem(b: Float) -> List(Path) {
  let wx = math_to_world_x(b)
  [
    Path(
      Line(Point(wx, world_y(0.0)), Point(wx, world_y(1.0))),
      12.0,
      28.0,
      4.0,
    ),
  ]
}

/// Dot on top of the lollipop at y = 1 (the Kronecker mass at x = b).
fn kronecker_dots(b: Float) -> List(RenderDot) {
  [
    RenderDot(
      math_to_world_x(b),
      world_y(1.0),
      12.0,
      "#58C4DD",
      True,
      24.0,
      32.0,
    ),
  ]
}

/// Step at x = b: open circle at the left limit (0), filled at the value H(0)=1.
fn step_dots(b: Float) -> List(RenderDot) {
  let wx = math_to_world_x(b)
  let color = "#58C4DD"
  [
    // Left-hand limit y → 0 (not attained if right-continuous).
    RenderDot(wx, world_y(0.0), 11.0, color, False, 20.0, 28.0),
    // Value at the jump: H(0) = 1.
    RenderDot(wx, world_y(1.0), 11.0, color, True, 20.0, 28.0),
  ]
}

/// Signum at x = b: open at ±1 (side limits), filled at sgn(0) = 0.
fn signum_dots(b: Float) -> List(RenderDot) {
  let wx = math_to_world_x(b)
  let color = "#58C4DD"
  [
    RenderDot(wx, world_y(-1.0), 11.0, color, False, 20.0, 28.0),
    RenderDot(wx, world_y(0.0), 11.0, color, True, 20.0, 28.0),
    RenderDot(wx, world_y(1.0), 11.0, color, False, 20.0, 28.0),
  ]
}

fn axis_decorations() -> #(List(Path), List(RenderLabel)) {
  let axis_t = 2.0
  let tick_t = 1.5
  let tick_len = 12.0
  let label_color = "#b8b8d0"
  let axis_color_time_x = #(0.0, 8.0)
  let axis_color_time_y = #(4.0, 12.0)

  let x_axis =
    Path(
      Line(Point(0.0 -. world_half, 0.0), Point(world_half, 0.0)),
      axis_color_time_x.0,
      axis_color_time_x.1,
      axis_t,
    )
  let y_axis =
    Path(
      Line(Point(0.0, world_half), Point(0.0, 0.0 -. world_half)),
      axis_color_time_y.0,
      axis_color_time_y.1,
      axis_t,
    )

  // Integer ticks at math −4…4 (skip 0 — the origin).
  let tick_maths = [-4, -3, -2, -1, 1, 2, 3, 4]
  let x_ticks =
    list.map(tick_maths, fn(k) {
      let wx = math_to_world_x(int.to_float(k))
      Path(
        Line(Point(wx, tick_len), Point(wx, 0.0 -. tick_len)),
        8.0,
        12.0,
        tick_t,
      )
    })
  let y_ticks =
    list.map(tick_maths, fn(k) {
      // Positive math-y is up → negative world y.
      let wy = 0.0 -. math_to_world_x(int.to_float(k))
      Path(
        Line(Point(0.0 -. tick_len, wy), Point(tick_len, wy)),
        8.0,
        12.0,
        tick_t,
      )
    })

  let x_tick_labels =
    list.map(tick_maths, fn(k) {
      let wx = math_to_world_x(int.to_float(k))
      RenderLabel(
        wx,
        28.0,
        int.to_string(k),
        label_color,
        22.0,
        10.0,
        14.0,
      )
    })
  let y_tick_labels =
    list.map(tick_maths, fn(k) {
      let wy = 0.0 -. math_to_world_x(int.to_float(k))
      RenderLabel(
        0.0 -. 28.0,
        wy,
        int.to_string(k),
        label_color,
        22.0,
        10.0,
        14.0,
      )
    })

  let axis_names = [
    RenderLabel(world_half -. 24.0, 36.0, "x", "#e8e8ff", 32.0, 10.0, 14.0),
    RenderLabel(36.0, 0.0 -. world_half +. 24.0, "y", "#e8e8ff", 32.0, 10.0, 14.0),
  ]

  let paths = list.flatten([[x_axis, y_axis], x_ticks, y_ticks])
  let labels = list.flatten([x_tick_labels, y_tick_labels, axis_names])
  #(paths, labels)
}

fn math_to_world_x(x_math: Float) -> Float {
  let scale = world_half /. x_math_max
  x_math *. scale
}

/// Sampling mark: a drawable point, or an explicit break (domain gap / asymptote).
type Mark {
  Pt(Point)
  Break
}

fn sample_curve(
  f: MathFn,
  a: Float,
  omega: Float,
  b: Float,
  m: Float,
) -> List(Path) {
  let marks =
    list.repeat(Nil, sample_count + 1)
    |> list.index_map(fn(_, i) {
      let t = int.to_float(i) /. int.to_float(sample_count)
      let x_math = x_math_min +. t *. { x_math_max -. x_math_min }
      case eval(f, x_math, a, omega, b, m) {
        Error(Nil) -> [Break]
        Ok(y_math) -> {
          let clipped = float.absolute_value(y_math) >. y_math_lim
          let y2 = float.clamp(y_math, min: 0.0 -. y_math_lim, max: y_math_lim)
          let #(wx, wy) = to_world(x_math, y2)
          case clipped {
            // Run the curve out to the viewport edge, then break so the other
            // side of an asymptote starts a fresh stroke.
            True -> [Pt(Point(wx, wy)), Break]
            False -> [Pt(Point(wx, wy))]
          }
        }
      }
    })
    |> list.flatten

  paths_from_marks(marks, 12.0, 36.0, 3.0)
}

fn eval(
  f: MathFn,
  x: Float,
  a: Float,
  omega: Float,
  b: Float,
  m: Float,
) -> Result(Float, Nil) {
  // Horizontal shift: every real preset uses u = x − b (line is y = m·u).
  let u = x -. b
  case f {
    Identity -> Ok(m *. u)
    Square -> Ok(u *. u)
    Cube -> Ok(u *. u *. u)
    Absolute -> Ok(float.absolute_value(u))
    Signum ->
      case u <. 0.0 {
        True -> Ok(-1.0)
        False ->
          case u >. 0.0 {
            True -> Ok(1.0)
            False -> Ok(0.0)
          }
      }
    ScaledSine -> Ok(a *. js_sin(omega *. u))
    ScaledCosine -> Ok(a *. js_cos(omega *. u))
    Tangent -> {
      let c = js_cos(u)
      // Gap only at the asymptote itself; large |tan| is clamped in the sampler.
      case float.absolute_value(c) <. 0.012 {
        True -> Error(Nil)
        False -> Ok(js_tan(u))
      }
    }
    ArcSine ->
      case float.absolute_value(u) >. 1.0 {
        True -> Error(Nil)
        False -> Ok(js_asin(u))
      }
    ArcCosine ->
      case float.absolute_value(u) >. 1.0 {
        True -> Error(Nil)
        False -> Ok(js_acos(u))
      }
    ArcTangent -> Ok(js_atan(u))
    ArcSecant ->
      case float.absolute_value(u) <. 1.0 {
        True -> Error(Nil)
        False -> Ok(js_acos(1.0 /. u))
      }
    ArcCosecant ->
      case float.absolute_value(u) <. 1.0 {
        True -> Error(Nil)
        False -> Ok(js_asin(1.0 /. u))
      }
    // Principal value in (0, π): arccot(x) = atan(1/x) adjusted for x < 0.
    ArcCotangent ->
      case u >. 0.0 {
        True -> Ok(js_atan(1.0 /. u))
        False ->
          case u <. 0.0 {
            True -> Ok(js_atan(1.0 /. u) +. 3.141592653589793)
            False -> Ok(1.5707963267948966)
          }
      }
    // Let the sampler clamp runaway growth so the curve reaches the edge.
    Exp -> Ok(float.exponential(u))
    Power -> float.power(a, u)
    Ln ->
      case u <=. 0.0 {
        True -> Error(Nil)
        False -> float.logarithm(u)
      }
    Sqrt ->
      case u <. 0.0 {
        True -> Error(Nil)
        False -> float.square_root(u)
      }
    Reciprocal ->
      case float.absolute_value(u) <. 0.008 {
        True -> Error(Nil)
        False -> Ok(1.0 /. u)
      }
    // Heaviside, right-continuous: H(u)=0 for u<0, H(0)=1, H(u)=1 for u>0.
    // Markers at x=b show the open/filled circles for the jump.
    Step ->
      case u <. 0.0 {
        True -> Ok(0.0)
        False -> Ok(1.0)
      }
    // Drawn as a lollipop via special geometry; sampling unused.
    Kronecker -> Ok(0.0)
    ThreeDUnsupported -> Error(Nil)
  }
}

fn to_world(x_math: Float, y_math: Float) -> #(Float, Float) {
  let scale = world_half /. x_math_max
  // Canvas y grows downward; flip so positive math-y goes up.
  #(x_math *. scale, 0.0 -. y_math *. scale)
}

fn paths_from_marks(
  marks: List(Mark),
  start_base: Float,
  duration: Float,
  thickness: Float,
) -> List(Path) {
  let runs = split_runs(marks, [], [])
  let n_runs = list.length(runs)
  let n_f = int.to_float(int.max(n_runs, 1))
  list.index_map(runs, fn(run, ri) {
    let t0 = start_base +. int.to_float(ri) /. n_f *. duration
    let t1 = start_base +. int.to_float(ri + 1) /. n_f *. duration
    stroke_run(run, t0, t1, thickness)
  })
  |> list.flatten
}

fn split_runs(
  marks: List(Mark),
  current: List(Point),
  acc: List(List(Point)),
) -> List(List(Point)) {
  case marks {
    [] -> {
      let acc = case current {
        [] | [_] -> acc
        _ -> [list.reverse(current), ..acc]
      }
      list.reverse(acc)
    }
    [Break, ..rest] -> {
      let acc = case current {
        [] | [_] -> acc
        _ -> [list.reverse(current), ..acc]
      }
      split_runs(rest, [], acc)
    }
    [Pt(p), ..rest] -> split_runs(rest, [p, ..current], acc)
  }
}

fn stroke_run(
  points: List(Point),
  t0: Float,
  t1: Float,
  thickness: Float,
) -> List(Path) {
  case points {
    [] | [_] -> []
    [a, b, ..rest] -> {
      let n = list.length(points) - 1
      let n_f = int.to_float(int.max(n, 1))
      let span = t1 -. t0
      do_stroke(a, [b, ..rest], 0, n_f, t0, span, thickness, [])
    }
  }
}

fn do_stroke(
  prev: Point,
  rest: List(Point),
  i: Int,
  n_f: Float,
  t0: Float,
  span: Float,
  thickness: Float,
  acc: List(Path),
) -> List(Path) {
  case rest {
    [] -> list.reverse(acc)
    [next, ..tail] -> {
      let dx = float.absolute_value(next.x -. prev.x)
      let dy = float.absolute_value(next.y -. prev.y)
      // Safety break for any residual huge jump.
      let acc = case dx +. dy >. 120.0 {
        True -> acc
        False -> {
          let s0 = t0 +. int.to_float(i) /. n_f *. span
          let s1 = t0 +. int.to_float(i + 1) /. n_f *. span
          [Path(Line(prev, next), s0, s1, thickness), ..acc]
        }
      }
      do_stroke(next, tail, i + 1, n_f, t0, span, thickness, acc)
    }
  }
}
