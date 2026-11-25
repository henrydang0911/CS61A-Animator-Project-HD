//// Complex / Polar submodes of Math on the Argand plane.
//// — Complex: e^iθ circle + single tangent arrow (clock sweep or θ jump)
//// — Polar: r(θ) curves (calc-class classics + spirals)

import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import math.{type Plot, Plot}
import render.{type RenderLabel, type SweepArrow, RenderLabel, SweepArrow}
import shape.{type Path, type Point, Line, Path, Point}

@external(javascript, "./math_ffi.mjs", "sin")
fn js_sin(x: Float) -> Float

@external(javascript, "./math_ffi.mjs", "cos")
fn js_cos(x: Float) -> Float

@external(javascript, "./math_ffi.mjs", "parse_theta")
fn js_parse_theta(expr: String) -> #(Bool, Float)

/// Complex tab has only e^iθ; Polar tab has the r(θ) curves.
pub type ComplexFn {
  /// Unit circle e^iθ with tangent arrow i·e^iθ.
  ExpITheta
  /// |z − b| = |a| — circle centered on the Re axis.
  Circle
  /// r = 2a cos θ — circle diameter on the Re axis.
  CircleCos
  /// r = 2a sin θ — circle diameter on the Im axis.
  CircleSin
  ArchimedesSpiral
  LogSpiral
  RoseCos
  RoseSin
  Cardioid
  Limacon
  Lemniscate
}

pub type C {
  C(re: Float, im: Float)
}

pub const decoration_count = 18

const world_half = 450.0

const x_math_max = 5.0

const y_clip = 480.0

const polar_samples = 360

const pi = 3.141592653589793

type Mark {
  Pt(Point)
  Break
}

pub fn fn_id(f: ComplexFn) -> String {
  case f {
    ExpITheta -> "w=exp(i*theta)"
    Circle -> "r=a"
    CircleCos -> "r=2a*cos(theta)"
    CircleSin -> "r=2a*sin(theta)"
    ArchimedesSpiral -> "r=a*theta"
    LogSpiral -> "r=a*e^(k*theta)"
    RoseCos -> "r=a*cos(n*theta)"
    RoseSin -> "r=a*sin(n*theta)"
    Cardioid -> "r=a*(1-cos(theta))"
    Limacon -> "r=a+cos(theta)"
    Lemniscate -> "r^2=a^2*cos(2*theta)"
  }
}

pub fn fn_label(f: ComplexFn) -> String {
  case f {
    ExpITheta -> "e^iθ"
    Circle -> "|z − b| = |a|  (circle)"
    CircleCos -> "r = 2a cos θ  (circle)"
    CircleSin -> "r = 2a sin θ  (circle)"
    ArchimedesSpiral -> "r = aθ  (Archimedes)"
    LogSpiral -> "r = a e^{kθ}  (log spiral)"
    RoseCos -> "r = a cos(ωθ)  (rose)"
    RoseSin -> "r = a sin(ωθ)  (rose)"
    Cardioid -> "r = a(1 − cos θ)  (cardioid)"
    Limacon -> "r = a + cos θ  (limaçon)"
    Lemniscate -> "r² = a² cos(ωθ)  (lemniscate)"
  }
}

pub fn all_map_functions() -> List(ComplexFn) {
  [ExpITheta]
}

pub fn all_polar_functions() -> List(ComplexFn) {
  [
    Circle,
    CircleCos,
    CircleSin,
    ArchimedesSpiral,
    LogSpiral,
    RoseCos,
    RoseSin,
    Cardioid,
    Limacon,
    Lemniscate,
  ]
}

pub fn all_functions() -> List(ComplexFn) {
  list.append(all_map_functions(), all_polar_functions())
}

pub fn parse_fn_id(id: String) -> ComplexFn {
  case id {
    "w=exp(i*theta)" -> ExpITheta
    "r=a" -> Circle
    "r=1" -> Circle
    "r=2a*cos(theta)" -> CircleCos
    "r=2a*sin(theta)" -> CircleSin
    "r=a*theta" -> ArchimedesSpiral
    "r=a*e^(k*theta)" -> LogSpiral
    "r=a*cos(n*theta)" -> RoseCos
    "r=a*sin(n*theta)" -> RoseSin
    "r=a*(1-cos(theta))" -> Cardioid
    "r=a+cos(theta)" -> Limacon
    "r=a+b*cos(theta)" -> Limacon
    "r^2=a^2*cos(2*theta)" -> Lemniscate
    _ -> ExpITheta
  }
}

pub fn is_polar(f: ComplexFn) -> Bool {
  case f {
    ExpITheta -> False
    _ -> True
  }
}

pub fn uses_omega(f: ComplexFn) -> Bool {
  case f {
    ExpITheta | ArchimedesSpiral | LogSpiral | RoseCos | RoseSin | Lemniscate ->
      True
    _ -> False
  }
}

/// Parse θ expressions like "pi", "pi/2", "3*pi/2", "0". Empty → Error.
pub fn parse_theta(raw: String) -> Result(Float, Nil) {
  let #(ok, value) = js_parse_theta(raw)
  case ok {
    True -> Ok(value)
    False -> Error(Nil)
  }
}

pub fn path_color(index: Int, horizontal_count: Int) -> String {
  case index < decoration_count {
    True -> "#8a8aaa"
    False -> {
      let j = index - decoration_count
      case j < horizontal_count {
        True -> "#58C4DD"
        False -> "#C77DFF"
      }
    }
  }
}

/// `pinned_theta`: Some(θ) pins the tangent arrow; None sweeps with the clock.
pub fn plot(
  f: ComplexFn,
  a: Int,
  omega: Int,
  b: Int,
  pinned_theta: Option(Float),
) -> #(Plot, Int, Option(SweepArrow)) {
  let a_f = int.to_float(int.clamp(a, -5, 5))
  let w_f = int.to_float(int.clamp(omega, 1, 10))
  let b_f = int.to_float(int.clamp(b, -5, 5))
  case f {
    ExpITheta -> {
      let #(axis_paths, labels) = argand_decorations(True)
      let #(circle, sweep) = exp_i_theta_plot(a_f, w_f, b_f, pinned_theta)
      let paths = list.append(axis_paths, circle)
      #(Plot(paths, labels, []), list.length(circle), Some(sweep))
    }
    f -> {
      let #(axis_paths, labels) = argand_decorations(False)
      let curves = polar_plot(f, a_f, w_f, b_f)
      let n = list.length(curves)
      #(Plot(list.append(axis_paths, curves), labels, []), n, None)
    }
  }
}

fn exp_i_theta_plot(
  a: Float,
  omega: Float,
  b: Float,
  pinned_theta: Option(Float),
) -> #(List(Path), SweepArrow) {
  let radius = case float.absolute_value(a) <. 0.01 {
    True -> 1.0
    False -> float.absolute_value(a)
  }
  let circle_n = 180
  let circle_marks =
    list.repeat(Nil, circle_n + 1)
    |> list.index_map(fn(_, i) {
      let t = int.to_float(i) /. int.to_float(circle_n)
      let theta = t *. 2.0 *. pi
      let w = C(b +. radius *. js_cos(theta), radius *. js_sin(theta))
      world_marks(w)
    })
    |> list.flatten
  let circle = paths_from_marks(circle_marks, 12.0, 16.0, 3.0)

  let scale = world_half /. x_math_max
  let r_world = radius *. scale
  let sweep_start = 28.0
  let sweep_dur = float.max(48.0 /. omega, 12.0)
  let #(pinned, fixed, start, end) = case pinned_theta {
    // Start the tangent trace at this θ, then sweep a full 2π lap.
    Some(theta) -> #(True, theta, sweep_start, sweep_start +. sweep_dur)
    None -> #(False, 0.0, sweep_start, sweep_start +. sweep_dur)
  }
  let sweep =
    SweepArrow(
      b *. scale,
      0.0,
      r_world,
      start,
      end,
      "#C77DFF",
      3.5,
      pinned,
      fixed,
    )
  #(circle, sweep)
}

/// When `for_complex` is True: Re/Im axis names and Im ticks as i, 2i, −i, …
fn argand_decorations(for_complex: Bool) -> #(List(Path), List(RenderLabel)) {
  let axis_t = 2.0
  let tick_t = 1.5
  let tick_len = 12.0
  let label_color = "#b8b8d0"

  let re_axis =
    Path(
      Line(Point(0.0 -. world_half, 0.0), Point(world_half, 0.0)),
      0.0,
      8.0,
      axis_t,
    )
  let im_axis =
    Path(
      Line(Point(0.0, world_half), Point(0.0, 0.0 -. world_half)),
      4.0,
      12.0,
      axis_t,
    )

  let tick_maths = [-4, -3, -2, -1, 1, 2, 3, 4]
  let re_ticks =
    list.map(tick_maths, fn(k) {
      let wx = math_to_world(int.to_float(k))
      Path(
        Line(Point(wx, tick_len), Point(wx, 0.0 -. tick_len)),
        8.0,
        12.0,
        tick_t,
      )
    })
  let im_ticks =
    list.map(tick_maths, fn(k) {
      let wy = 0.0 -. math_to_world(int.to_float(k))
      Path(
        Line(Point(0.0 -. tick_len, wy), Point(tick_len, wy)),
        8.0,
        12.0,
        tick_t,
      )
    })

  let re_labels =
    list.map(tick_maths, fn(k) {
      RenderLabel(
        math_to_world(int.to_float(k)),
        28.0,
        int.to_string(k),
        label_color,
        22.0,
        10.0,
        14.0,
      )
    })
  let im_labels =
    list.map(tick_maths, fn(k) {
      let text = case for_complex {
        True -> imag_tick_label(k)
        False -> int.to_string(k)
      }
      RenderLabel(
        0.0 -. 28.0,
        0.0 -. math_to_world(int.to_float(k)),
        text,
        label_color,
        22.0,
        10.0,
        14.0,
      )
    })

  let axis_names = case for_complex {
    False -> []
    True -> [
      RenderLabel(world_half -. 36.0, 36.0, "Re", "#e8e8ff", 28.0, 10.0, 14.0),
      RenderLabel(
        40.0,
        0.0 -. world_half +. 28.0,
        "Im",
        "#e8e8ff",
        28.0,
        10.0,
        14.0,
      ),
    ]
  }

  let paths = list.flatten([[re_axis, im_axis], re_ticks, im_ticks])
  let labels = list.flatten([re_labels, im_labels, axis_names])
  #(paths, labels)
}

fn imag_tick_label(k: Int) -> String {
  case k {
    1 -> "i"
    -1 -> "−i"
    _ -> int.to_string(k) <> "i"
  }
}

fn math_to_world(t: Float) -> Float {
  t *. { world_half /. x_math_max }
}

fn polar_plot(f: ComplexFn, a: Float, omega: Float, b: Float) -> List(Path) {
  let amp = case float.absolute_value(a) <. 0.01 {
    True -> 1.0
    False -> float.absolute_value(a)
  }
  let marks =
    list.repeat(Nil, polar_samples + 1)
    |> list.index_map(fn(_, i) {
      let t = int.to_float(i) /. int.to_float(polar_samples)
      case polar_point(f, t, amp, omega, b) {
        Error(Nil) -> [Break]
        Ok(w) -> world_marks(w)
      }
    })
    |> list.flatten
  paths_from_marks(marks, 14.0, 40.0, 3.0)
}

fn polar_point(
  f: ComplexFn,
  t: Float,
  a: Float,
  omega: Float,
  b: Float,
) -> Result(C, Nil) {
  case f {
    ExpITheta -> Error(Nil)
    Circle -> {
      let theta = t *. 2.0 *. pi
      Ok(from_polar(a, theta, b))
    }
    CircleCos -> {
      let theta = t *. 2.0 *. pi
      let r = 2.0 *. a *. js_cos(theta)
      Ok(from_polar(r, theta, b))
    }
    CircleSin -> {
      let theta = t *. 2.0 *. pi
      let r = 2.0 *. a *. js_sin(theta)
      Ok(from_polar(r, theta, b))
    }
    ArchimedesSpiral -> {
      let theta = t *. 2.0 *. pi *. omega
      let r = { a /. 8.0 } *. theta
      Ok(from_polar(r, theta, b))
    }
    LogSpiral -> {
      let theta = t *. 2.0 *. pi *. omega
      let k = 0.12
      let r = { a /. 3.0 } *. float.exponential(k *. theta)
      Ok(from_polar(r, theta, b))
    }
    RoseCos -> {
      let theta = t *. 2.0 *. pi
      let r = a *. js_cos(omega *. theta)
      Ok(from_polar(r, theta, b))
    }
    RoseSin -> {
      let theta = t *. 2.0 *. pi
      let r = a *. js_sin(omega *. theta)
      Ok(from_polar(r, theta, b))
    }
    Cardioid -> {
      let theta = t *. 2.0 *. pi
      let r = a *. { 1.0 -. js_cos(theta) }
      Ok(from_polar(r, theta, b))
    }
    Limacon -> {
      let theta = t *. 2.0 *. pi
      let r = a +. js_cos(theta)
      Ok(from_polar(r, theta, b))
    }
    Lemniscate -> {
      let theta = t *. 2.0 *. pi
      let c = js_cos(omega *. theta)
      case c <. 0.0 {
        True -> Error(Nil)
        False ->
          case float.square_root(a *. a *. c) {
            Error(Nil) -> Error(Nil)
            Ok(r) -> Ok(from_polar(r, theta, b))
          }
      }
    }
  }
}

fn from_polar(r: Float, theta: Float, b_re: Float) -> C {
  C(r *. js_cos(theta) +. b_re, r *. js_sin(theta))
}

fn world_marks(w: C) -> List(Mark) {
  let #(wx0, wy0) = to_world(w)
  let ax = float.absolute_value(wx0)
  let ay = float.absolute_value(wy0)
  let m = case ax >. ay {
    True -> ax
    False -> ay
  }
  case m >. y_clip {
    True -> {
      let s = y_clip /. m
      [Pt(Point(wx0 *. s, wy0 *. s)), Break]
    }
    False -> [Pt(Point(wx0, wy0))]
  }
}

fn to_world(w: C) -> #(Float, Float) {
  let scale = world_half /. x_math_max
  #(w.re *. scale, 0.0 -. w.im *. scale)
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
