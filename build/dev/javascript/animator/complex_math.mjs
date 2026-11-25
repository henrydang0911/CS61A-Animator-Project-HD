//# sourceMappingURL=complex_math.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { Some, Option$None$const } from "../gleam_stdlib/gleam/option.mjs";
import {
  Ok,
  Error,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  divideFloat,
} from "./gleam.mjs";
import * as $math from "./math.mjs";
import { Plot } from "./math.mjs";
import { sin as js_sin, cos as js_cos, parse_theta as js_parse_theta } from "./math_ffi.mjs";
import * as $render from "./render.mjs";
import { RenderLabel, SweepArrow } from "./render.mjs";
import * as $shape from "./shape.mjs";
import { Line, Path, Point } from "./shape.mjs";

/**
 * Unit circle e^iθ with tangent arrow i·e^iθ.
 */
export class ExpITheta extends $CustomType {}
export const ComplexFn$ExpITheta$const = new ExpITheta();
export const ComplexFn$ExpITheta = () => ComplexFn$ExpITheta$const;
export const ComplexFn$isExpITheta = (value) => value instanceof ExpITheta;

/**
 * |z − b| = |a| — circle centered on the Re axis.
 */
export class Circle extends $CustomType {}
export const ComplexFn$Circle$const = new Circle();
export const ComplexFn$Circle = () => ComplexFn$Circle$const;
export const ComplexFn$isCircle = (value) => value instanceof Circle;

/**
 * r = 2a cos θ — circle diameter on the Re axis.
 */
export class CircleCos extends $CustomType {}
export const ComplexFn$CircleCos$const = new CircleCos();
export const ComplexFn$CircleCos = () => ComplexFn$CircleCos$const;
export const ComplexFn$isCircleCos = (value) => value instanceof CircleCos;

/**
 * r = 2a sin θ — circle diameter on the Im axis.
 */
export class CircleSin extends $CustomType {}
export const ComplexFn$CircleSin$const = new CircleSin();
export const ComplexFn$CircleSin = () => ComplexFn$CircleSin$const;
export const ComplexFn$isCircleSin = (value) => value instanceof CircleSin;

export class ArchimedesSpiral extends $CustomType {}
export const ComplexFn$ArchimedesSpiral$const = new ArchimedesSpiral();
export const ComplexFn$ArchimedesSpiral = () =>
  ComplexFn$ArchimedesSpiral$const;
export const ComplexFn$isArchimedesSpiral = (value) =>
  value instanceof ArchimedesSpiral;

export class LogSpiral extends $CustomType {}
export const ComplexFn$LogSpiral$const = new LogSpiral();
export const ComplexFn$LogSpiral = () => ComplexFn$LogSpiral$const;
export const ComplexFn$isLogSpiral = (value) => value instanceof LogSpiral;

export class RoseCos extends $CustomType {}
export const ComplexFn$RoseCos$const = new RoseCos();
export const ComplexFn$RoseCos = () => ComplexFn$RoseCos$const;
export const ComplexFn$isRoseCos = (value) => value instanceof RoseCos;

export class RoseSin extends $CustomType {}
export const ComplexFn$RoseSin$const = new RoseSin();
export const ComplexFn$RoseSin = () => ComplexFn$RoseSin$const;
export const ComplexFn$isRoseSin = (value) => value instanceof RoseSin;

export class Cardioid extends $CustomType {}
export const ComplexFn$Cardioid$const = new Cardioid();
export const ComplexFn$Cardioid = () => ComplexFn$Cardioid$const;
export const ComplexFn$isCardioid = (value) => value instanceof Cardioid;

export class Limacon extends $CustomType {}
export const ComplexFn$Limacon$const = new Limacon();
export const ComplexFn$Limacon = () => ComplexFn$Limacon$const;
export const ComplexFn$isLimacon = (value) => value instanceof Limacon;

export class Lemniscate extends $CustomType {}
export const ComplexFn$Lemniscate$const = new Lemniscate();
export const ComplexFn$Lemniscate = () => ComplexFn$Lemniscate$const;
export const ComplexFn$isLemniscate = (value) => value instanceof Lemniscate;

export class C extends $CustomType {
  constructor(re, im) {
    super();
    this.re = re;
    this.im = im;
  }
}
export const C$C = (re, im) => new C(re, im);
export const C$isC = (value) => value instanceof C;
export const C$C$re = (value) => value.re;
export const C$C$0 = (value) => value.re;
export const C$C$im = (value) => value.im;
export const C$C$1 = (value) => value.im;

class Pt extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

class Break extends $CustomType {}
const Mark$Break$const = new Break();

export const decoration_count = 18;

const y_clip = 480.0;

const x_math_max = 5.0;

const world_half = 450.0;

const pi = 3.141592653589793;

const polar_samples = 360;

export function fn_id(f) {
  if (f instanceof ExpITheta) {
    return "w=exp(i*theta)";
  } else if (f instanceof Circle) {
    return "r=a";
  } else if (f instanceof CircleCos) {
    return "r=2a*cos(theta)";
  } else if (f instanceof CircleSin) {
    return "r=2a*sin(theta)";
  } else if (f instanceof ArchimedesSpiral) {
    return "r=a*theta";
  } else if (f instanceof LogSpiral) {
    return "r=a*e^(k*theta)";
  } else if (f instanceof RoseCos) {
    return "r=a*cos(n*theta)";
  } else if (f instanceof RoseSin) {
    return "r=a*sin(n*theta)";
  } else if (f instanceof Cardioid) {
    return "r=a*(1-cos(theta))";
  } else if (f instanceof Limacon) {
    return "r=a+cos(theta)";
  } else {
    return "r^2=a^2*cos(2*theta)";
  }
}

export function fn_label(f) {
  if (f instanceof ExpITheta) {
    return "e^iθ";
  } else if (f instanceof Circle) {
    return "|z − b| = |a|  (circle)";
  } else if (f instanceof CircleCos) {
    return "r = 2a cos θ  (circle)";
  } else if (f instanceof CircleSin) {
    return "r = 2a sin θ  (circle)";
  } else if (f instanceof ArchimedesSpiral) {
    return "r = aθ  (Archimedes)";
  } else if (f instanceof LogSpiral) {
    return "r = a e^{kθ}  (log spiral)";
  } else if (f instanceof RoseCos) {
    return "r = a cos(ωθ)  (rose)";
  } else if (f instanceof RoseSin) {
    return "r = a sin(ωθ)  (rose)";
  } else if (f instanceof Cardioid) {
    return "r = a(1 − cos θ)  (cardioid)";
  } else if (f instanceof Limacon) {
    return "r = a + cos θ  (limaçon)";
  } else {
    return "r² = a² cos(ωθ)  (lemniscate)";
  }
}

export function all_map_functions() {
  return listPrepend(ComplexFn$ExpITheta$const, $List$Empty$const);
}

export function all_polar_functions() {
  return listPrepend(
    ComplexFn$Circle$const,
    listPrepend(
      ComplexFn$CircleCos$const,
      listPrepend(
        ComplexFn$CircleSin$const,
        listPrepend(
          ComplexFn$ArchimedesSpiral$const,
          listPrepend(
            ComplexFn$LogSpiral$const,
            listPrepend(
              ComplexFn$RoseCos$const,
              listPrepend(
                ComplexFn$RoseSin$const,
                listPrepend(
                  ComplexFn$Cardioid$const,
                  listPrepend(
                    ComplexFn$Limacon$const,
                    listPrepend(ComplexFn$Lemniscate$const, $List$Empty$const),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

export function all_functions() {
  return $list.append(all_map_functions(), all_polar_functions());
}

export function parse_fn_id(id) {
  if (id === "w=exp(i*theta)") {
    return ComplexFn$ExpITheta$const;
  } else if (id === "r=a") {
    return ComplexFn$Circle$const;
  } else if (id === "r=1") {
    return ComplexFn$Circle$const;
  } else if (id === "r=2a*cos(theta)") {
    return ComplexFn$CircleCos$const;
  } else if (id === "r=2a*sin(theta)") {
    return ComplexFn$CircleSin$const;
  } else if (id === "r=a*theta") {
    return ComplexFn$ArchimedesSpiral$const;
  } else if (id === "r=a*e^(k*theta)") {
    return ComplexFn$LogSpiral$const;
  } else if (id === "r=a*cos(n*theta)") {
    return ComplexFn$RoseCos$const;
  } else if (id === "r=a*sin(n*theta)") {
    return ComplexFn$RoseSin$const;
  } else if (id === "r=a*(1-cos(theta))") {
    return ComplexFn$Cardioid$const;
  } else if (id === "r=a+cos(theta)") {
    return ComplexFn$Limacon$const;
  } else if (id === "r=a+b*cos(theta)") {
    return ComplexFn$Limacon$const;
  } else if (id === "r^2=a^2*cos(2*theta)") {
    return ComplexFn$Lemniscate$const;
  } else {
    return ComplexFn$ExpITheta$const;
  }
}

export function is_polar(f) {
  if (f instanceof ExpITheta) {
    return false;
  } else {
    return true;
  }
}

export function uses_omega(f) {
  if (f instanceof ExpITheta) {
    return true;
  } else if (f instanceof ArchimedesSpiral) {
    return true;
  } else if (f instanceof LogSpiral) {
    return true;
  } else if (f instanceof RoseCos) {
    return true;
  } else if (f instanceof RoseSin) {
    return true;
  } else if (f instanceof Lemniscate) {
    return true;
  } else {
    return false;
  }
}

/**
 * Parse θ expressions like "pi", "pi/2", "3*pi/2", "0". Empty → Error.
 */
export function parse_theta(raw) {
  let $ = js_parse_theta(raw);
  let ok = $[0];
  let value = $[1];
  if (ok) {
    return new Ok(value);
  } else {
    return new Error(undefined);
  }
}

export function path_color(index, horizontal_count) {
  let $ = index < decoration_count;
  if ($) {
    return "#8a8aaa";
  } else {
    let j = index - decoration_count;
    let $1 = j < horizontal_count;
    if ($1) {
      return "#58C4DD";
    } else {
      return "#C77DFF";
    }
  }
}

function do_stroke(
  loop$prev,
  loop$rest,
  loop$i,
  loop$n_f,
  loop$t0,
  loop$span,
  loop$thickness,
  loop$acc
) {
  while (true) {
    let prev = loop$prev;
    let rest = loop$rest;
    let i = loop$i;
    let n_f = loop$n_f;
    let t0 = loop$t0;
    let span = loop$span;
    let thickness = loop$thickness;
    let acc = loop$acc;
    if (rest instanceof $Empty) {
      return $list.reverse(acc);
    } else {
      let next = rest.head;
      let tail = rest.tail;
      let dx = $float.absolute_value(next.x - prev.x);
      let dy = $float.absolute_value(next.y - prev.y);
      let _block;
      let $ = (dx + dy) > 120.0;
      if ($) {
        _block = acc;
      } else {
        let s0 = t0 + ((divideFloat($int.to_float(i), n_f)) * span);
        let s1 = t0 + ((divideFloat($int.to_float(i + 1), n_f)) * span);
        _block = listPrepend(
          new Path(new Line(prev, next), s0, s1, thickness),
          acc,
        );
      }
      let acc$1 = _block;
      loop$prev = next;
      loop$rest = tail;
      loop$i = i + 1;
      loop$n_f = n_f;
      loop$t0 = t0;
      loop$span = span;
      loop$thickness = thickness;
      loop$acc = acc$1;
    }
  }
}

function stroke_run(points, t0, t1, thickness) {
  if (points instanceof $Empty) {
    return $List$Empty$const;
  } else {
    let $ = points.tail;
    if ($ instanceof $Empty) {
      return $List$Empty$const;
    } else {
      let a = points.head;
      let b = $.head;
      let rest = $.tail;
      let n = $list.length(points) - 1;
      let n_f = $int.to_float($int.max(n, 1));
      let span = t1 - t0;
      return do_stroke(
        a,
        listPrepend(b, rest),
        0,
        n_f,
        t0,
        span,
        thickness,
        $List$Empty$const,
      );
    }
  }
}

function split_runs(loop$marks, loop$current, loop$acc) {
  while (true) {
    let marks = loop$marks;
    let current = loop$current;
    let acc = loop$acc;
    if (marks instanceof $Empty) {
      let _block;
      if (current instanceof $Empty) {
        _block = acc;
      } else if (current.tail instanceof $Empty) {
        _block = acc;
      } else {
        _block = listPrepend($list.reverse(current), acc);
      }
      let acc$1 = _block;
      return $list.reverse(acc$1);
    } else {
      let $ = marks.head;
      if ($ instanceof Pt) {
        let rest = marks.tail;
        let p = $[0];
        loop$marks = rest;
        loop$current = listPrepend(p, current);
        loop$acc = acc;
      } else {
        let rest = marks.tail;
        let _block;
        if (current instanceof $Empty) {
          _block = acc;
        } else if (current.tail instanceof $Empty) {
          _block = acc;
        } else {
          _block = listPrepend($list.reverse(current), acc);
        }
        let acc$1 = _block;
        loop$marks = rest;
        loop$current = $List$Empty$const;
        loop$acc = acc$1;
      }
    }
  }
}

function paths_from_marks(marks, start_base, duration, thickness) {
  let runs = split_runs(marks, $List$Empty$const, $List$Empty$const);
  let n_runs = $list.length(runs);
  let n_f = $int.to_float($int.max(n_runs, 1));
  let _pipe = $list.index_map(
    runs,
    (run, ri) => {
      let t0 = start_base + ((divideFloat($int.to_float(ri), n_f)) * duration);
      let t1 = start_base + ((divideFloat($int.to_float(ri + 1), n_f)) * duration);
      return stroke_run(run, t0, t1, thickness);
    },
  );
  return $list.flatten(_pipe);
}

function to_world(w) {
  let scale = divideFloat(world_half, x_math_max);
  return [w.re * scale, 0.0 - (w.im * scale)];
}

function world_marks(w) {
  let $ = to_world(w);
  let wx0 = $[0];
  let wy0 = $[1];
  let ax = $float.absolute_value(wx0);
  let ay = $float.absolute_value(wy0);
  let _block;
  let $1 = ax > ay;
  if ($1) {
    _block = ax;
  } else {
    _block = ay;
  }
  let m = _block;
  let $2 = m > y_clip;
  if ($2) {
    let s = divideFloat(y_clip, m);
    return listPrepend(
      new Pt(new Point(wx0 * s, wy0 * s)),
      listPrepend(Mark$Break$const, $List$Empty$const),
    );
  } else {
    return listPrepend(new Pt(new Point(wx0, wy0)), $List$Empty$const);
  }
}

function from_polar(r, theta, b_re) {
  return new C((r * js_cos(theta)) + b_re, r * js_sin(theta));
}

function polar_point(f, t, a, omega, b) {
  if (f instanceof ExpITheta) {
    return new Error(undefined);
  } else if (f instanceof Circle) {
    let theta = (t * 2.0) * pi;
    return new Ok(from_polar(a, theta, b));
  } else if (f instanceof CircleCos) {
    let theta = (t * 2.0) * pi;
    let r = (2.0 * a) * js_cos(theta);
    return new Ok(from_polar(r, theta, b));
  } else if (f instanceof CircleSin) {
    let theta = (t * 2.0) * pi;
    let r = (2.0 * a) * js_sin(theta);
    return new Ok(from_polar(r, theta, b));
  } else if (f instanceof ArchimedesSpiral) {
    let theta = ((t * 2.0) * pi) * omega;
    let r = (a / 8.0) * theta;
    return new Ok(from_polar(r, theta, b));
  } else if (f instanceof LogSpiral) {
    let theta = ((t * 2.0) * pi) * omega;
    let k = 0.12;
    let r = (a / 3.0) * $float.exponential(k * theta);
    return new Ok(from_polar(r, theta, b));
  } else if (f instanceof RoseCos) {
    let theta = (t * 2.0) * pi;
    let r = a * js_cos(omega * theta);
    return new Ok(from_polar(r, theta, b));
  } else if (f instanceof RoseSin) {
    let theta = (t * 2.0) * pi;
    let r = a * js_sin(omega * theta);
    return new Ok(from_polar(r, theta, b));
  } else if (f instanceof Cardioid) {
    let theta = (t * 2.0) * pi;
    let r = a * (1.0 - js_cos(theta));
    return new Ok(from_polar(r, theta, b));
  } else if (f instanceof Limacon) {
    let theta = (t * 2.0) * pi;
    let r = a + js_cos(theta);
    return new Ok(from_polar(r, theta, b));
  } else {
    let theta = (t * 2.0) * pi;
    let c = js_cos(omega * theta);
    let $ = c < 0.0;
    if ($) {
      return new Error(undefined);
    } else {
      let $1 = $float.square_root((a * a) * c);
      if ($1 instanceof Ok) {
        let r = $1[0];
        return new Ok(from_polar(r, theta, b));
      } else {
        return $1;
      }
    }
  }
}

function polar_plot(f, a, omega, b) {
  let _block;
  let $ = $float.absolute_value(a) < 0.01;
  if ($) {
    _block = 1.0;
  } else {
    _block = $float.absolute_value(a);
  }
  let amp = _block;
  let _block$1;
  let _pipe = $list.repeat(undefined, polar_samples + 1);
  let _pipe$1 = $list.index_map(
    _pipe,
    (_, i) => {
      let t = divideFloat($int.to_float(i), $int.to_float(polar_samples));
      let $1 = polar_point(f, t, amp, omega, b);
      if ($1 instanceof Ok) {
        let w = $1[0];
        return world_marks(w);
      } else {
        return listPrepend(Mark$Break$const, $List$Empty$const);
      }
    },
  );
  _block$1 = $list.flatten(_pipe$1);
  let marks = _block$1;
  return paths_from_marks(marks, 14.0, 40.0, 3.0);
}

function math_to_world(t) {
  return t * (divideFloat(world_half, x_math_max));
}

function imag_tick_label(k) {
  if (k === 1) {
    return "i";
  } else if (k === -1) {
    return "−i";
  } else {
    return $int.to_string(k) + "i";
  }
}

/**
 * When `for_complex` is True: Re/Im axis names and Im ticks as i, 2i, −i, …
 * 
 * @ignore
 */
function argand_decorations(for_complex) {
  let axis_t = 2.0;
  let tick_t = 1.5;
  let tick_len = 12.0;
  let label_color = "#b8b8d0";
  let re_axis = new Path(
    new Line(new Point(0.0 - world_half, 0.0), new Point(world_half, 0.0)),
    0.0,
    8.0,
    axis_t,
  );
  let im_axis = new Path(
    new Line(new Point(0.0, world_half), new Point(0.0, 0.0 - world_half)),
    4.0,
    12.0,
    axis_t,
  );
  let tick_maths = listPrepend(
    -4,
    listPrepend(
      -3,
      listPrepend(
        -2,
        listPrepend(
          -1,
          listPrepend(
            1,
            listPrepend(2, listPrepend(3, listPrepend(4, $List$Empty$const))),
          ),
        ),
      ),
    ),
  );
  let re_ticks = $list.map(
    tick_maths,
    (k) => {
      let wx = math_to_world($int.to_float(k));
      return new Path(
        new Line(new Point(wx, tick_len), new Point(wx, 0.0 - tick_len)),
        8.0,
        12.0,
        tick_t,
      );
    },
  );
  let im_ticks = $list.map(
    tick_maths,
    (k) => {
      let wy = 0.0 - math_to_world($int.to_float(k));
      return new Path(
        new Line(new Point(0.0 - tick_len, wy), new Point(tick_len, wy)),
        8.0,
        12.0,
        tick_t,
      );
    },
  );
  let re_labels = $list.map(
    tick_maths,
    (k) => {
      return new RenderLabel(
        math_to_world($int.to_float(k)),
        28.0,
        $int.to_string(k),
        label_color,
        22.0,
        10.0,
        14.0,
      );
    },
  );
  let im_labels = $list.map(
    tick_maths,
    (k) => {
      let _block;
      if (for_complex) {
        _block = imag_tick_label(k);
      } else {
        _block = $int.to_string(k);
      }
      let text = _block;
      return new RenderLabel(
        0.0 - 28.0,
        0.0 - math_to_world($int.to_float(k)),
        text,
        label_color,
        22.0,
        10.0,
        14.0,
      );
    },
  );
  let _block;
  if (for_complex) {
    _block = listPrepend(
      new RenderLabel(
        world_half - 36.0,
        36.0,
        "Re",
        "#e8e8ff",
        28.0,
        10.0,
        14.0,
      ),
      listPrepend(
        new RenderLabel(
          40.0,
          (0.0 - world_half) + 28.0,
          "Im",
          "#e8e8ff",
          28.0,
          10.0,
          14.0,
        ),
        $List$Empty$const,
      ),
    );
  } else {
    _block = $List$Empty$const;
  }
  let axis_names = _block;
  let paths = $list.flatten(
    listPrepend(
      listPrepend(re_axis, listPrepend(im_axis, $List$Empty$const)),
      listPrepend(re_ticks, listPrepend(im_ticks, $List$Empty$const)),
    ),
  );
  let labels = $list.flatten(
    listPrepend(
      re_labels,
      listPrepend(im_labels, listPrepend(axis_names, $List$Empty$const)),
    ),
  );
  return [paths, labels];
}

function exp_i_theta_plot(a, omega, b, pinned_theta) {
  let _block;
  let $ = $float.absolute_value(a) < 0.01;
  if ($) {
    _block = 1.0;
  } else {
    _block = $float.absolute_value(a);
  }
  let radius = _block;
  let circle_n = 180;
  let _block$1;
  let _pipe = $list.repeat(undefined, circle_n + 1);
  let _pipe$1 = $list.index_map(
    _pipe,
    (_, i) => {
      let t = divideFloat($int.to_float(i), $int.to_float(circle_n));
      let theta = (t * 2.0) * pi;
      let w = new C(b + (radius * js_cos(theta)), radius * js_sin(theta));
      return world_marks(w);
    },
  );
  _block$1 = $list.flatten(_pipe$1);
  let circle_marks = _block$1;
  let circle = paths_from_marks(circle_marks, 12.0, 16.0, 3.0);
  let scale = divideFloat(world_half, x_math_max);
  let r_world = radius * scale;
  let sweep_start = 28.0;
  let sweep_dur = $float.max(divideFloat(48.0, omega), 12.0);
  let _block$2;
  if (pinned_theta instanceof Some) {
    let theta = pinned_theta[0];
    _block$2 = [true, theta, sweep_start, sweep_start + sweep_dur];
  } else {
    _block$2 = [false, 0.0, sweep_start, sweep_start + sweep_dur];
  }
  let $1 = _block$2;
  let pinned = $1[0];
  let fixed = $1[1];
  let start = $1[2];
  let end = $1[3];
  let sweep = new SweepArrow(
    b * scale,
    0.0,
    r_world,
    start,
    end,
    "#C77DFF",
    3.5,
    pinned,
    fixed,
  );
  return [circle, sweep];
}

/**
 * `pinned_theta`: Some(θ) pins the tangent arrow; None sweeps with the clock.
 */
export function plot(f, a, omega, b, pinned_theta) {
  let a_f = $int.to_float($int.clamp(a, -5, 5));
  let w_f = $int.to_float($int.clamp(omega, 1, 10));
  let b_f = $int.to_float($int.clamp(b, -5, 5));
  if (f instanceof ExpITheta) {
    let $ = argand_decorations(true);
    let axis_paths = $[0];
    let labels = $[1];
    let $1 = exp_i_theta_plot(a_f, w_f, b_f, pinned_theta);
    let circle = $1[0];
    let sweep = $1[1];
    let paths = $list.append(axis_paths, circle);
    return [
      new Plot(paths, labels, $List$Empty$const),
      $list.length(circle),
      new Some(sweep),
    ];
  } else {
    let f$1 = f;
    let $ = argand_decorations(false);
    let axis_paths = $[0];
    let labels = $[1];
    let curves = polar_plot(f$1, a_f, w_f, b_f);
    let n = $list.length(curves);
    return [
      new Plot($list.append(axis_paths, curves), labels, $List$Empty$const),
      n,
      Option$None$const,
    ];
  }
}
