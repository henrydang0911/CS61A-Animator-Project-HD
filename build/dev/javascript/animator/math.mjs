//# sourceMappingURL=math.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  divideFloat,
} from "./gleam.mjs";
import {
  sin as js_sin,
  cos as js_cos,
  tan as js_tan,
  asin as js_asin,
  acos as js_acos,
  atan as js_atan,
} from "./math_ffi.mjs";
import * as $render from "./render.mjs";
import { RenderDot, RenderLabel } from "./render.mjs";
import * as $shape from "./shape.mjs";
import { Line, Path, Point } from "./shape.mjs";

export class Identity extends $CustomType {}
export const MathFn$Identity$const = new Identity();
export const MathFn$Identity = () => MathFn$Identity$const;
export const MathFn$isIdentity = (value) => value instanceof Identity;

export class Square extends $CustomType {}
export const MathFn$Square$const = new Square();
export const MathFn$Square = () => MathFn$Square$const;
export const MathFn$isSquare = (value) => value instanceof Square;

export class Cube extends $CustomType {}
export const MathFn$Cube$const = new Cube();
export const MathFn$Cube = () => MathFn$Cube$const;
export const MathFn$isCube = (value) => value instanceof Cube;

export class Absolute extends $CustomType {}
export const MathFn$Absolute$const = new Absolute();
export const MathFn$Absolute = () => MathFn$Absolute$const;
export const MathFn$isAbsolute = (value) => value instanceof Absolute;

export class Signum extends $CustomType {}
export const MathFn$Signum$const = new Signum();
export const MathFn$Signum = () => MathFn$Signum$const;
export const MathFn$isSignum = (value) => value instanceof Signum;

export class ScaledSine extends $CustomType {}
export const MathFn$ScaledSine$const = new ScaledSine();
export const MathFn$ScaledSine = () => MathFn$ScaledSine$const;
export const MathFn$isScaledSine = (value) => value instanceof ScaledSine;

export class ScaledCosine extends $CustomType {}
export const MathFn$ScaledCosine$const = new ScaledCosine();
export const MathFn$ScaledCosine = () => MathFn$ScaledCosine$const;
export const MathFn$isScaledCosine = (value) => value instanceof ScaledCosine;

export class Tangent extends $CustomType {}
export const MathFn$Tangent$const = new Tangent();
export const MathFn$Tangent = () => MathFn$Tangent$const;
export const MathFn$isTangent = (value) => value instanceof Tangent;

export class ArcSine extends $CustomType {}
export const MathFn$ArcSine$const = new ArcSine();
export const MathFn$ArcSine = () => MathFn$ArcSine$const;
export const MathFn$isArcSine = (value) => value instanceof ArcSine;

export class ArcCosine extends $CustomType {}
export const MathFn$ArcCosine$const = new ArcCosine();
export const MathFn$ArcCosine = () => MathFn$ArcCosine$const;
export const MathFn$isArcCosine = (value) => value instanceof ArcCosine;

export class ArcTangent extends $CustomType {}
export const MathFn$ArcTangent$const = new ArcTangent();
export const MathFn$ArcTangent = () => MathFn$ArcTangent$const;
export const MathFn$isArcTangent = (value) => value instanceof ArcTangent;

export class ArcSecant extends $CustomType {}
export const MathFn$ArcSecant$const = new ArcSecant();
export const MathFn$ArcSecant = () => MathFn$ArcSecant$const;
export const MathFn$isArcSecant = (value) => value instanceof ArcSecant;

export class ArcCosecant extends $CustomType {}
export const MathFn$ArcCosecant$const = new ArcCosecant();
export const MathFn$ArcCosecant = () => MathFn$ArcCosecant$const;
export const MathFn$isArcCosecant = (value) => value instanceof ArcCosecant;

export class ArcCotangent extends $CustomType {}
export const MathFn$ArcCotangent$const = new ArcCotangent();
export const MathFn$ArcCotangent = () => MathFn$ArcCotangent$const;
export const MathFn$isArcCotangent = (value) => value instanceof ArcCotangent;

export class Exp extends $CustomType {}
export const MathFn$Exp$const = new Exp();
export const MathFn$Exp = () => MathFn$Exp$const;
export const MathFn$isExp = (value) => value instanceof Exp;

/**
 * Exponential with adjustable base: y = aˣ (a from the base slider).
 */
export class Power extends $CustomType {}
export const MathFn$Power$const = new Power();
export const MathFn$Power = () => MathFn$Power$const;
export const MathFn$isPower = (value) => value instanceof Power;

export class Ln extends $CustomType {}
export const MathFn$Ln$const = new Ln();
export const MathFn$Ln = () => MathFn$Ln$const;
export const MathFn$isLn = (value) => value instanceof Ln;

export class Sqrt extends $CustomType {}
export const MathFn$Sqrt$const = new Sqrt();
export const MathFn$Sqrt = () => MathFn$Sqrt$const;
export const MathFn$isSqrt = (value) => value instanceof Sqrt;

export class Reciprocal extends $CustomType {}
export const MathFn$Reciprocal$const = new Reciprocal();
export const MathFn$Reciprocal = () => MathFn$Reciprocal$const;
export const MathFn$isReciprocal = (value) => value instanceof Reciprocal;

/**
 * Unit step (Heaviside): 0 for x < b, 1 for x ≥ b.
 */
export class Step extends $CustomType {}
export const MathFn$Step$const = new Step();
export const MathFn$Step = () => MathFn$Step$const;
export const MathFn$isStep = (value) => value instanceof Step;

/**
 * Discrete-style impulse at x = b (Kronecker / δ spike on the plot).
 */
export class Kronecker extends $CustomType {}
export const MathFn$Kronecker$const = new Kronecker();
export const MathFn$Kronecker = () => MathFn$Kronecker$const;
export const MathFn$isKronecker = (value) => value instanceof Kronecker;

/**
 * Explicitly unsupported — surfaces the 3D error.
 */
export class ThreeDUnsupported extends $CustomType {}
export const MathFn$ThreeDUnsupported$const = new ThreeDUnsupported();
export const MathFn$ThreeDUnsupported = () => MathFn$ThreeDUnsupported$const;
export const MathFn$isThreeDUnsupported = (value) =>
  value instanceof ThreeDUnsupported;

export class Unsupported3D extends $CustomType {}
export const MathError$Unsupported3D$const = new Unsupported3D();
export const MathError$Unsupported3D = () => MathError$Unsupported3D$const;
export const MathError$isUnsupported3D = (value) =>
  value instanceof Unsupported3D;

export class Plot extends $CustomType {
  constructor(paths, labels, dots) {
    super();
    this.paths = paths;
    this.labels = labels;
    this.dots = dots;
  }
}
export const Plot$Plot = (paths, labels, dots) => new Plot(paths, labels, dots);
export const Plot$isPlot = (value) => value instanceof Plot;
export const Plot$Plot$paths = (value) => value.paths;
export const Plot$Plot$0 = (value) => value.paths;
export const Plot$Plot$labels = (value) => value.labels;
export const Plot$Plot$1 = (value) => value.labels;
export const Plot$Plot$dots = (value) => value.dots;
export const Plot$Plot$2 = (value) => value.dots;

class Pt extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

class Break extends $CustomType {}
const Mark$Break$const = new Break();

const x_math_max = 5.0;

const world_half = 450.0;

/**
 * Math-y limit (~viewport edge); curves clamp here so asymptotes extend cleanly.
 * 
 * @ignore
 */
const y_math_lim = 5.3;

/**
 * World units: plot math-x in about [-5, 5] across the canvas width.
 * 
 * @ignore
 */
const x_math_min = -5.0;

const sample_count = 360;

/**
 * True when a and ω sliders apply (periodic wave presets).
 */
export function uses_wave_params(f) {
  if (f instanceof ScaledSine) {
    return true;
  } else if (f instanceof ScaledCosine) {
    return true;
  } else {
    return false;
  }
}

/**
 * True when the base slider a applies (y = aˣ).
 */
export function uses_base_param(f) {
  if (f instanceof Power) {
    return true;
  } else {
    return false;
  }
}

/**
 * True when the slope slider m applies (line y = m(x − b)).
 */
export function uses_slope(f) {
  if (f instanceof Identity) {
    return true;
  } else {
    return false;
  }
}

/**
 * Dropdown value ↔ preset.
 */
export function fn_id(f) {
  if (f instanceof Identity) {
    return "y=x";
  } else if (f instanceof Square) {
    return "y=x^2";
  } else if (f instanceof Cube) {
    return "y=x^3";
  } else if (f instanceof Absolute) {
    return "y=abs(x)";
  } else if (f instanceof Signum) {
    return "y=sgn(x)";
  } else if (f instanceof ScaledSine) {
    return "y=a*sin(wx)";
  } else if (f instanceof ScaledCosine) {
    return "y=a*cos(wx)";
  } else if (f instanceof Tangent) {
    return "y=tan(x)";
  } else if (f instanceof ArcSine) {
    return "y=arcsin(x)";
  } else if (f instanceof ArcCosine) {
    return "y=arccos(x)";
  } else if (f instanceof ArcTangent) {
    return "y=arctan(x)";
  } else if (f instanceof ArcSecant) {
    return "y=arcsec(x)";
  } else if (f instanceof ArcCosecant) {
    return "y=arccsc(x)";
  } else if (f instanceof ArcCotangent) {
    return "y=arccot(x)";
  } else if (f instanceof Exp) {
    return "y=exp(x)";
  } else if (f instanceof Power) {
    return "y=a^x";
  } else if (f instanceof Ln) {
    return "y=ln(x)";
  } else if (f instanceof Sqrt) {
    return "y=sqrt(x)";
  } else if (f instanceof Reciprocal) {
    return "y=1/x";
  } else if (f instanceof Step) {
    return "y=step";
  } else if (f instanceof Kronecker) {
    return "y=delta";
  } else {
    return "3d";
  }
}

/**
 * Short generic name for the Real-mode dropdown (no shift parameters).
 */
export function fn_label(f) {
  if (f instanceof Identity) {
    return "y = x";
  } else if (f instanceof Square) {
    return "y = x²";
  } else if (f instanceof Cube) {
    return "y = x³";
  } else if (f instanceof Absolute) {
    return "y = |x|";
  } else if (f instanceof Signum) {
    return "y = sgn(x)";
  } else if (f instanceof ScaledSine) {
    return "y = sin(x)";
  } else if (f instanceof ScaledCosine) {
    return "y = cos(x)";
  } else if (f instanceof Tangent) {
    return "y = tan(x)";
  } else if (f instanceof ArcSine) {
    return "y = arcsin(x)";
  } else if (f instanceof ArcCosine) {
    return "y = arccos(x)";
  } else if (f instanceof ArcTangent) {
    return "y = arctan(x)";
  } else if (f instanceof ArcSecant) {
    return "y = arcsec(x)";
  } else if (f instanceof ArcCosecant) {
    return "y = arccsc(x)";
  } else if (f instanceof ArcCotangent) {
    return "y = arccot(x)";
  } else if (f instanceof Exp) {
    return "y = exp(x)";
  } else if (f instanceof Power) {
    return "y = aˣ";
  } else if (f instanceof Ln) {
    return "y = ln(x)";
  } else if (f instanceof Sqrt) {
    return "y = √x";
  } else if (f instanceof Reciprocal) {
    return "y = 1/x";
  } else if (f instanceof Step) {
    return "y = u(x)  (step / Heaviside)";
  } else if (f instanceof Kronecker) {
    return "y = δ(x)  (Kronecker spike)";
  } else {
    return "z = f(x,y)  (3D — unsupported)";
  }
}

/**
 * Parameterized form shown under the dropdown (shift b, and a / ω / m when used).
 */
export function fn_generalized(f) {
  if (f instanceof Identity) {
    return "y = m(x − b)";
  } else if (f instanceof Square) {
    return "y = (x − b)²";
  } else if (f instanceof Cube) {
    return "y = (x − b)³";
  } else if (f instanceof Absolute) {
    return "y = |x − b|";
  } else if (f instanceof Signum) {
    return "y = sgn(x − b)";
  } else if (f instanceof ScaledSine) {
    return "y = a·sin(ω(x − b))";
  } else if (f instanceof ScaledCosine) {
    return "y = a·cos(ω(x − b))";
  } else if (f instanceof Tangent) {
    return "y = tan(x − b)";
  } else if (f instanceof ArcSine) {
    return "y = arcsin(x − b)";
  } else if (f instanceof ArcCosine) {
    return "y = arccos(x − b)";
  } else if (f instanceof ArcTangent) {
    return "y = arctan(x − b)";
  } else if (f instanceof ArcSecant) {
    return "y = arcsec(x − b)";
  } else if (f instanceof ArcCosecant) {
    return "y = arccsc(x − b)";
  } else if (f instanceof ArcCotangent) {
    return "y = arccot(x − b)";
  } else if (f instanceof Exp) {
    return "y = exp(x − b)";
  } else if (f instanceof Power) {
    return "y = a^(x − b)";
  } else if (f instanceof Ln) {
    return "y = ln(x − b)";
  } else if (f instanceof Sqrt) {
    return "y = √(x − b)";
  } else if (f instanceof Reciprocal) {
    return "y = 1/(x − b)";
  } else if (f instanceof Step) {
    return "y = u(x − b)  (step / Heaviside)";
  } else if (f instanceof Kronecker) {
    return "y = δ(x − b)  (Kronecker spike)";
  } else {
    return "z = f(x,y)  (3D — unsupported)";
  }
}

export function all_functions() {
  return toList([
    MathFn$ScaledSine$const,
    MathFn$ScaledCosine$const,
    MathFn$Identity$const,
    MathFn$Square$const,
    MathFn$Cube$const,
    MathFn$Absolute$const,
    MathFn$Signum$const,
    MathFn$Step$const,
    MathFn$Kronecker$const,
    MathFn$Tangent$const,
    MathFn$ArcSine$const,
    MathFn$ArcCosine$const,
    MathFn$ArcTangent$const,
    MathFn$ArcSecant$const,
    MathFn$ArcCosecant$const,
    MathFn$ArcCotangent$const,
    MathFn$Exp$const,
    MathFn$Power$const,
    MathFn$Ln$const,
    MathFn$Sqrt$const,
    MathFn$Reciprocal$const,
    MathFn$ThreeDUnsupported$const,
  ]);
}

export function parse_fn_id(id) {
  if (id === "y=x") {
    return MathFn$Identity$const;
  } else if (id === "y=x^2") {
    return MathFn$Square$const;
  } else if (id === "y=x^3") {
    return MathFn$Cube$const;
  } else if (id === "y=abs(x)") {
    return MathFn$Absolute$const;
  } else if (id === "y=sgn(x)") {
    return MathFn$Signum$const;
  } else if (id === "y=a*sin(wx)") {
    return MathFn$ScaledSine$const;
  } else if (id === "y=a*cos(wx)") {
    return MathFn$ScaledCosine$const;
  } else if (id === "y=tan(x)") {
    return MathFn$Tangent$const;
  } else if (id === "y=arcsin(x)") {
    return MathFn$ArcSine$const;
  } else if (id === "y=arccos(x)") {
    return MathFn$ArcCosine$const;
  } else if (id === "y=arctan(x)") {
    return MathFn$ArcTangent$const;
  } else if (id === "y=arcsec(x)") {
    return MathFn$ArcSecant$const;
  } else if (id === "y=arccsc(x)") {
    return MathFn$ArcCosecant$const;
  } else if (id === "y=arccot(x)") {
    return MathFn$ArcCotangent$const;
  } else if (id === "y=exp(x)") {
    return MathFn$Exp$const;
  } else if (id === "y=a^x") {
    return MathFn$Power$const;
  } else if (id === "y=ln(x)") {
    return MathFn$Ln$const;
  } else if (id === "y=sqrt(x)") {
    return MathFn$Sqrt$const;
  } else if (id === "y=1/x") {
    return MathFn$Reciprocal$const;
  } else if (id === "y=step") {
    return MathFn$Step$const;
  } else if (id === "y=delta") {
    return MathFn$Kronecker$const;
  } else if (id === "3d") {
    return MathFn$ThreeDUnsupported$const;
  } else {
    return MathFn$ScaledSine$const;
  }
}

export function error_message(error) {
  return "3D: Unsupported Functionality";
}

function math_to_world_x(x_math) {
  let scale = divideFloat(world_half, x_math_max);
  return x_math * scale;
}

function world_y(y_math) {
  return 0.0 - math_to_world_x(y_math);
}

/**
 * Signum at x = b: open at ±1 (side limits), filled at sgn(0) = 0.
 * 
 * @ignore
 */
function signum_dots(b) {
  let wx = math_to_world_x(b);
  let color = "#58C4DD";
  return listPrepend(
    new RenderDot(wx, world_y(-1.0), 11.0, color, false, 20.0, 28.0),
    listPrepend(
      new RenderDot(wx, world_y(0.0), 11.0, color, true, 20.0, 28.0),
      listPrepend(
        new RenderDot(wx, world_y(1.0), 11.0, color, false, 20.0, 28.0),
        $List$Empty$const,
      ),
    ),
  );
}

/**
 * Step at x = b: open circle at the left limit (0), filled at the value H(0)=1.
 * 
 * @ignore
 */
function step_dots(b) {
  let wx = math_to_world_x(b);
  let color = "#58C4DD";
  return listPrepend(
    new RenderDot(wx, world_y(0.0), 11.0, color, false, 20.0, 28.0),
    listPrepend(
      new RenderDot(wx, world_y(1.0), 11.0, color, true, 20.0, 28.0),
      $List$Empty$const,
    ),
  );
}

function axis_decorations() {
  let axis_t = 2.0;
  let tick_t = 1.5;
  let tick_len = 12.0;
  let label_color = "#b8b8d0";
  let axis_color_time_x = [0.0, 8.0];
  let axis_color_time_y = [4.0, 12.0];
  let x_axis = new Path(
    new Line(new Point(0.0 - world_half, 0.0), new Point(world_half, 0.0)),
    axis_color_time_x[0],
    axis_color_time_x[1],
    axis_t,
  );
  let y_axis = new Path(
    new Line(new Point(0.0, world_half), new Point(0.0, 0.0 - world_half)),
    axis_color_time_y[0],
    axis_color_time_y[1],
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
  let x_ticks = $list.map(
    tick_maths,
    (k) => {
      let wx = math_to_world_x($int.to_float(k));
      return new Path(
        new Line(new Point(wx, tick_len), new Point(wx, 0.0 - tick_len)),
        8.0,
        12.0,
        tick_t,
      );
    },
  );
  let y_ticks = $list.map(
    tick_maths,
    (k) => {
      let wy = 0.0 - math_to_world_x($int.to_float(k));
      return new Path(
        new Line(new Point(0.0 - tick_len, wy), new Point(tick_len, wy)),
        8.0,
        12.0,
        tick_t,
      );
    },
  );
  let x_tick_labels = $list.map(
    tick_maths,
    (k) => {
      let wx = math_to_world_x($int.to_float(k));
      return new RenderLabel(
        wx,
        28.0,
        $int.to_string(k),
        label_color,
        22.0,
        10.0,
        14.0,
      );
    },
  );
  let y_tick_labels = $list.map(
    tick_maths,
    (k) => {
      let wy = 0.0 - math_to_world_x($int.to_float(k));
      return new RenderLabel(
        0.0 - 28.0,
        wy,
        $int.to_string(k),
        label_color,
        22.0,
        10.0,
        14.0,
      );
    },
  );
  let axis_names = listPrepend(
    new RenderLabel(world_half - 24.0, 36.0, "x", "#e8e8ff", 32.0, 10.0, 14.0),
    listPrepend(
      new RenderLabel(
        36.0,
        (0.0 - world_half) + 24.0,
        "y",
        "#e8e8ff",
        32.0,
        10.0,
        14.0,
      ),
      $List$Empty$const,
    ),
  );
  let paths = $list.flatten(
    listPrepend(
      listPrepend(x_axis, listPrepend(y_axis, $List$Empty$const)),
      listPrepend(x_ticks, listPrepend(y_ticks, $List$Empty$const)),
    ),
  );
  let labels = $list.flatten(
    listPrepend(
      x_tick_labels,
      listPrepend(y_tick_labels, listPrepend(axis_names, $List$Empty$const)),
    ),
  );
  return [paths, labels];
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

function to_world(x_math, y_math) {
  let scale = divideFloat(world_half, x_math_max);
  return [x_math * scale, 0.0 - (y_math * scale)];
}

function eval$(f, x, a, omega, b, m) {
  let u = x - b;
  if (f instanceof Identity) {
    return new Ok(m * u);
  } else if (f instanceof Square) {
    return new Ok(u * u);
  } else if (f instanceof Cube) {
    return new Ok((u * u) * u);
  } else if (f instanceof Absolute) {
    return new Ok($float.absolute_value(u));
  } else if (f instanceof Signum) {
    let $ = u < 0.0;
    if ($) {
      return new Ok(-1.0);
    } else {
      let $1 = u > 0.0;
      if ($1) {
        return new Ok(1.0);
      } else {
        return new Ok(0.0);
      }
    }
  } else if (f instanceof ScaledSine) {
    return new Ok(a * js_sin(omega * u));
  } else if (f instanceof ScaledCosine) {
    return new Ok(a * js_cos(omega * u));
  } else if (f instanceof Tangent) {
    let c = js_cos(u);
    let $ = $float.absolute_value(c) < 0.012;
    if ($) {
      return new Error(undefined);
    } else {
      return new Ok(js_tan(u));
    }
  } else if (f instanceof ArcSine) {
    let $ = $float.absolute_value(u) > 1.0;
    if ($) {
      return new Error(undefined);
    } else {
      return new Ok(js_asin(u));
    }
  } else if (f instanceof ArcCosine) {
    let $ = $float.absolute_value(u) > 1.0;
    if ($) {
      return new Error(undefined);
    } else {
      return new Ok(js_acos(u));
    }
  } else if (f instanceof ArcTangent) {
    return new Ok(js_atan(u));
  } else if (f instanceof ArcSecant) {
    let $ = $float.absolute_value(u) < 1.0;
    if ($) {
      return new Error(undefined);
    } else {
      return new Ok(js_acos(divideFloat(1.0, u)));
    }
  } else if (f instanceof ArcCosecant) {
    let $ = $float.absolute_value(u) < 1.0;
    if ($) {
      return new Error(undefined);
    } else {
      return new Ok(js_asin(divideFloat(1.0, u)));
    }
  } else if (f instanceof ArcCotangent) {
    let $ = u > 0.0;
    if ($) {
      return new Ok(js_atan(divideFloat(1.0, u)));
    } else {
      let $1 = u < 0.0;
      if ($1) {
        return new Ok(js_atan(divideFloat(1.0, u)) + 3.141592653589793);
      } else {
        return new Ok(1.5707963267948966);
      }
    }
  } else if (f instanceof Exp) {
    return new Ok($float.exponential(u));
  } else if (f instanceof Power) {
    return $float.power(a, u);
  } else if (f instanceof Ln) {
    let $ = u <= 0.0;
    if ($) {
      return new Error(undefined);
    } else {
      return $float.logarithm(u);
    }
  } else if (f instanceof Sqrt) {
    let $ = u < 0.0;
    if ($) {
      return new Error(undefined);
    } else {
      return $float.square_root(u);
    }
  } else if (f instanceof Reciprocal) {
    let $ = $float.absolute_value(u) < 0.008;
    if ($) {
      return new Error(undefined);
    } else {
      return new Ok(divideFloat(1.0, u));
    }
  } else if (f instanceof Step) {
    let $ = u < 0.0;
    if ($) {
      return new Ok(0.0);
    } else {
      return new Ok(1.0);
    }
  } else if (f instanceof Kronecker) {
    return new Ok(0.0);
  } else {
    return new Error(undefined);
  }
}

function sample_curve(f, a, omega, b, m) {
  let _block;
  let _pipe = $list.repeat(undefined, sample_count + 1);
  let _pipe$1 = $list.index_map(
    _pipe,
    (_, i) => {
      let t = divideFloat($int.to_float(i), $int.to_float(sample_count));
      let x_math = x_math_min + (t * (x_math_max - x_math_min));
      let $ = eval$(f, x_math, a, omega, b, m);
      if ($ instanceof Ok) {
        let y_math = $[0];
        let clipped = $float.absolute_value(y_math) > y_math_lim;
        let y2 = $float.clamp(y_math, 0.0 - y_math_lim, y_math_lim);
        let $1 = to_world(x_math, y2);
        let wx = $1[0];
        let wy = $1[1];
        if (clipped) {
          return listPrepend(
            new Pt(new Point(wx, wy)),
            listPrepend(Mark$Break$const, $List$Empty$const),
          );
        } else {
          return listPrepend(new Pt(new Point(wx, wy)), $List$Empty$const);
        }
      } else {
        return listPrepend(Mark$Break$const, $List$Empty$const);
      }
    },
  );
  _block = $list.flatten(_pipe$1);
  let marks = _block;
  return paths_from_marks(marks, 12.0, 36.0, 3.0);
}

/**
 * Dot on top of the lollipop at y = 1 (the Kronecker mass at x = b).
 * 
 * @ignore
 */
function kronecker_dots(b) {
  return listPrepend(
    new RenderDot(
      math_to_world_x(b),
      world_y(1.0),
      12.0,
      "#58C4DD",
      true,
      24.0,
      32.0,
    ),
    $List$Empty$const,
  );
}

/**
 * Lollipop stick: vertical segment from (b, 0) to (b, 1).
 * 
 * @ignore
 */
function kronecker_stem(b) {
  let wx = math_to_world_x(b);
  return listPrepend(
    new Path(
      new Line(new Point(wx, world_y(0.0)), new Point(wx, world_y(1.0))),
      12.0,
      28.0,
      4.0,
    ),
    $List$Empty$const,
  );
}

/**
 * Build axes, tick marks, labels, and curve for Manim-style reveal.
 * Most plots use f(x − b). The line is y = m(x − b). Waves also use amplitude
 * `a` (−5…5) and angular frequency `omega` (1…10). Power uses base a (2…10).
 */
export function plot(f, a, omega, b, m) {
  if (f instanceof Kronecker) {
    let b_f = $int.to_float($int.clamp(b, -5, 5));
    let $ = axis_decorations();
    let axis_strokes = $[0];
    let labels = $[1];
    return new Ok(
      new Plot(
        $list.append(axis_strokes, kronecker_stem(b_f)),
        labels,
        kronecker_dots(b_f),
      ),
    );
  } else if (f instanceof ThreeDUnsupported) {
    return new Error(MathError$Unsupported3D$const);
  } else {
    let f$1 = f;
    let _block;
    if (f$1 instanceof Power) {
      _block = $int.to_float($int.clamp(a, 2, 10));
    } else {
      _block = $int.to_float($int.clamp(a, -5, 5));
    }
    let a_f = _block;
    let w_f = $int.to_float($int.clamp(omega, 1, 10));
    let b_f = $int.to_float($int.clamp(b, -5, 5));
    let m_f = $int.to_float($int.clamp(m, -5, 5));
    let curve = sample_curve(f$1, a_f, w_f, b_f, m_f);
    let $ = axis_decorations();
    let axis_strokes = $[0];
    let labels = $[1];
    let _block$1;
    if (f$1 instanceof Signum) {
      _block$1 = signum_dots(b_f);
    } else if (f$1 instanceof Step) {
      _block$1 = step_dots(b_f);
    } else {
      _block$1 = $List$Empty$const;
    }
    let dots = _block$1;
    return new Ok(new Plot($list.append(axis_strokes, curve), labels, dots));
  }
}
