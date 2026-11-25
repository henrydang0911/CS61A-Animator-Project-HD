//# sourceMappingURL=app.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { Some, Option$None$const } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attr from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import * as $builtins from "./builtins.mjs";
import * as $complex_math from "./complex_math.mjs";
import * as $data from "./data.mjs";
import * as $drawing from "./drawing.mjs";
import * as $editor from "./editor.mjs";
import * as $errors from "./errors.mjs";
import {
  Ok,
  Error,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  remainderInt,
  isEqual,
} from "./gleam.mjs";
import * as $math from "./math.mjs";
import * as $parser from "./parser.mjs";
import * as $render from "./render.mjs";
import * as $shape from "./shape.mjs";

const FILEPATH = "src\\app.gleam";

export class SyntaxError extends $CustomType {}
export const ErrorKind$SyntaxError$const = new SyntaxError();
export const ErrorKind$SyntaxError = () => ErrorKind$SyntaxError$const;
export const ErrorKind$isSyntaxError = (value) => value instanceof SyntaxError;

export class TypeError extends $CustomType {}
export const ErrorKind$TypeError$const = new TypeError();
export const ErrorKind$TypeError = () => ErrorKind$TypeError$const;
export const ErrorKind$isTypeError = (value) => value instanceof TypeError;

export class RuntimeError extends $CustomType {}
export const ErrorKind$RuntimeError$const = new RuntimeError();
export const ErrorKind$RuntimeError = () => ErrorKind$RuntimeError$const;
export const ErrorKind$isRuntimeError = (value) =>
  value instanceof RuntimeError;

export class DrawingError extends $CustomType {}
export const ErrorKind$DrawingError$const = new DrawingError();
export const ErrorKind$DrawingError = () => ErrorKind$DrawingError$const;
export const ErrorKind$isDrawingError = (value) =>
  value instanceof DrawingError;

export class MathError extends $CustomType {}
export const ErrorKind$MathError$const = new MathError();
export const ErrorKind$MathError = () => ErrorKind$MathError$const;
export const ErrorKind$isMathError = (value) => value instanceof MathError;

export class AppError extends $CustomType {
  constructor(kind, message) {
    super();
    this.kind = kind;
    this.message = message;
  }
}
export const AppError$AppError = (kind, message) => new AppError(kind, message);
export const AppError$isAppError = (value) => value instanceof AppError;
export const AppError$AppError$kind = (value) => value.kind;
export const AppError$AppError$0 = (value) => value.kind;
export const AppError$AppError$message = (value) => value.message;
export const AppError$AppError$1 = (value) => value.message;

export class DrawMode extends $CustomType {}
export const AppMode$DrawMode$const = new DrawMode();
export const AppMode$DrawMode = () => AppMode$DrawMode$const;
export const AppMode$isDrawMode = (value) => value instanceof DrawMode;

export class MathMode extends $CustomType {}
export const AppMode$MathMode$const = new MathMode();
export const AppMode$MathMode = () => AppMode$MathMode$const;
export const AppMode$isMathMode = (value) => value instanceof MathMode;

export class RealPlane extends $CustomType {}
export const MathPlane$RealPlane$const = new RealPlane();
export const MathPlane$RealPlane = () => MathPlane$RealPlane$const;
export const MathPlane$isRealPlane = (value) => value instanceof RealPlane;

export class ComplexPlane extends $CustomType {}
export const MathPlane$ComplexPlane$const = new ComplexPlane();
export const MathPlane$ComplexPlane = () => MathPlane$ComplexPlane$const;
export const MathPlane$isComplexPlane = (value) =>
  value instanceof ComplexPlane;

export class PolarPlane extends $CustomType {}
export const MathPlane$PolarPlane$const = new PolarPlane();
export const MathPlane$PolarPlane = () => MathPlane$PolarPlane$const;
export const MathPlane$isPolarPlane = (value) => value instanceof PolarPlane;

export class Model extends $CustomType {
  constructor(library, source, code_open, error, shape_slider, speed_percent, paused, looping, mode, math_plane, math_fn, complex_fn, polar_fn, complex_theta_input, complex_theta, math_amp, math_omega, math_shift, math_slope) {
    super();
    this.library = library;
    this.source = source;
    this.code_open = code_open;
    this.error = error;
    this.shape_slider = shape_slider;
    this.speed_percent = speed_percent;
    this.paused = paused;
    this.looping = looping;
    this.mode = mode;
    this.math_plane = math_plane;
    this.math_fn = math_fn;
    this.complex_fn = complex_fn;
    this.polar_fn = polar_fn;
    this.complex_theta_input = complex_theta_input;
    this.complex_theta = complex_theta;
    this.math_amp = math_amp;
    this.math_omega = math_omega;
    this.math_shift = math_shift;
    this.math_slope = math_slope;
  }
}
export const Model$Model = (library, source, code_open, error, shape_slider, speed_percent, paused, looping, mode, math_plane, math_fn, complex_fn, polar_fn, complex_theta_input, complex_theta, math_amp, math_omega, math_shift, math_slope) =>
  new Model(library,
  source,
  code_open,
  error,
  shape_slider,
  speed_percent,
  paused,
  looping,
  mode,
  math_plane,
  math_fn,
  complex_fn,
  polar_fn,
  complex_theta_input,
  complex_theta,
  math_amp,
  math_omega,
  math_shift,
  math_slope);
export const Model$isModel = (value) => value instanceof Model;
export const Model$Model$library = (value) => value.library;
export const Model$Model$0 = (value) => value.library;
export const Model$Model$source = (value) => value.source;
export const Model$Model$1 = (value) => value.source;
export const Model$Model$code_open = (value) => value.code_open;
export const Model$Model$2 = (value) => value.code_open;
export const Model$Model$error = (value) => value.error;
export const Model$Model$3 = (value) => value.error;
export const Model$Model$shape_slider = (value) => value.shape_slider;
export const Model$Model$4 = (value) => value.shape_slider;
export const Model$Model$speed_percent = (value) => value.speed_percent;
export const Model$Model$5 = (value) => value.speed_percent;
export const Model$Model$paused = (value) => value.paused;
export const Model$Model$6 = (value) => value.paused;
export const Model$Model$looping = (value) => value.looping;
export const Model$Model$7 = (value) => value.looping;
export const Model$Model$mode = (value) => value.mode;
export const Model$Model$8 = (value) => value.mode;
export const Model$Model$math_plane = (value) => value.math_plane;
export const Model$Model$9 = (value) => value.math_plane;
export const Model$Model$math_fn = (value) => value.math_fn;
export const Model$Model$10 = (value) => value.math_fn;
export const Model$Model$complex_fn = (value) => value.complex_fn;
export const Model$Model$11 = (value) => value.complex_fn;
export const Model$Model$polar_fn = (value) => value.polar_fn;
export const Model$Model$12 = (value) => value.polar_fn;
export const Model$Model$complex_theta_input = (value) =>
  value.complex_theta_input;
export const Model$Model$13 = (value) => value.complex_theta_input;
export const Model$Model$complex_theta = (value) => value.complex_theta;
export const Model$Model$14 = (value) => value.complex_theta;
export const Model$Model$math_amp = (value) => value.math_amp;
export const Model$Model$15 = (value) => value.math_amp;
export const Model$Model$math_omega = (value) => value.math_omega;
export const Model$Model$16 = (value) => value.math_omega;
export const Model$Model$math_shift = (value) => value.math_shift;
export const Model$Model$17 = (value) => value.math_shift;
export const Model$Model$math_slope = (value) => value.math_slope;
export const Model$Model$18 = (value) => value.math_slope;

export class SetCode extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetCode = ($0) => new SetCode($0);
export const Msg$isSetCode = (value) => value instanceof SetCode;
export const Msg$SetCode$0 = (value) => value[0];

export class SelectDrawing extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SelectDrawing = ($0) => new SelectDrawing($0);
export const Msg$isSelectDrawing = (value) => value instanceof SelectDrawing;
export const Msg$SelectDrawing$0 = (value) => value[0];

export class SetMode extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetMode = ($0) => new SetMode($0);
export const Msg$isSetMode = (value) => value instanceof SetMode;
export const Msg$SetMode$0 = (value) => value[0];

export class SetMathPlane extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetMathPlane = ($0) => new SetMathPlane($0);
export const Msg$isSetMathPlane = (value) => value instanceof SetMathPlane;
export const Msg$SetMathPlane$0 = (value) => value[0];

export class SetMathFn extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetMathFn = ($0) => new SetMathFn($0);
export const Msg$isSetMathFn = (value) => value instanceof SetMathFn;
export const Msg$SetMathFn$0 = (value) => value[0];

export class SetComplexFn extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetComplexFn = ($0) => new SetComplexFn($0);
export const Msg$isSetComplexFn = (value) => value instanceof SetComplexFn;
export const Msg$SetComplexFn$0 = (value) => value[0];

export class SetPolarFn extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetPolarFn = ($0) => new SetPolarFn($0);
export const Msg$isSetPolarFn = (value) => value instanceof SetPolarFn;
export const Msg$SetPolarFn$0 = (value) => value[0];

export class SetComplexTheta extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetComplexTheta = ($0) => new SetComplexTheta($0);
export const Msg$isSetComplexTheta = (value) =>
  value instanceof SetComplexTheta;
export const Msg$SetComplexTheta$0 = (value) => value[0];

export class SetMathAmp extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetMathAmp = ($0) => new SetMathAmp($0);
export const Msg$isSetMathAmp = (value) => value instanceof SetMathAmp;
export const Msg$SetMathAmp$0 = (value) => value[0];

export class SetMathOmega extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetMathOmega = ($0) => new SetMathOmega($0);
export const Msg$isSetMathOmega = (value) => value instanceof SetMathOmega;
export const Msg$SetMathOmega$0 = (value) => value[0];

export class SetMathShift extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetMathShift = ($0) => new SetMathShift($0);
export const Msg$isSetMathShift = (value) => value instanceof SetMathShift;
export const Msg$SetMathShift$0 = (value) => value[0];

export class SetMathSlope extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetMathSlope = ($0) => new SetMathSlope($0);
export const Msg$isSetMathSlope = (value) => value instanceof SetMathSlope;
export const Msg$SetMathSlope$0 = (value) => value[0];

export class SetShape extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetShape = ($0) => new SetShape($0);
export const Msg$isSetShape = (value) => value instanceof SetShape;
export const Msg$SetShape$0 = (value) => value[0];

export class SetSpeed extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetSpeed = ($0) => new SetSpeed($0);
export const Msg$isSetSpeed = (value) => value instanceof SetSpeed;
export const Msg$SetSpeed$0 = (value) => value[0];

export class PauseAnimation extends $CustomType {}
export const Msg$PauseAnimation$const = new PauseAnimation();
export const Msg$PauseAnimation = () => Msg$PauseAnimation$const;
export const Msg$isPauseAnimation = (value) => value instanceof PauseAnimation;

export class PlayAnimation extends $CustomType {}
export const Msg$PlayAnimation$const = new PlayAnimation();
export const Msg$PlayAnimation = () => Msg$PlayAnimation$const;
export const Msg$isPlayAnimation = (value) => value instanceof PlayAnimation;

export class RestartAnimation extends $CustomType {}
export const Msg$RestartAnimation$const = new RestartAnimation();
export const Msg$RestartAnimation = () => Msg$RestartAnimation$const;
export const Msg$isRestartAnimation = (value) =>
  value instanceof RestartAnimation;

export class ToggleLoop extends $CustomType {}
export const Msg$ToggleLoop$const = new ToggleLoop();
export const Msg$ToggleLoop = () => Msg$ToggleLoop$const;
export const Msg$isToggleLoop = (value) => value instanceof ToggleLoop;

export class ToggleCode extends $CustomType {}
export const Msg$ToggleCode$const = new ToggleCode();
export const Msg$ToggleCode = () => Msg$ToggleCode$const;
export const Msg$isToggleCode = (value) => value instanceof ToggleCode;

export class RealStyle extends $CustomType {}
export const MathStyle$RealStyle$const = new RealStyle();
export const MathStyle$RealStyle = () => MathStyle$RealStyle$const;
export const MathStyle$isRealStyle = (value) => value instanceof RealStyle;

export class ComplexStyle extends $CustomType {
  constructor(horizontal_count, sweep) {
    super();
    this.horizontal_count = horizontal_count;
    this.sweep = sweep;
  }
}
export const MathStyle$ComplexStyle = (horizontal_count, sweep) =>
  new ComplexStyle(horizontal_count, sweep);
export const MathStyle$isComplexStyle = (value) =>
  value instanceof ComplexStyle;
export const MathStyle$ComplexStyle$horizontal_count = (value) =>
  value.horizontal_count;
export const MathStyle$ComplexStyle$0 = (value) => value.horizontal_count;
export const MathStyle$ComplexStyle$sweep = (value) => value.sweep;
export const MathStyle$ComplexStyle$1 = (value) => value.sweep;

/**
 * 3Blue1Brown / Manim-style stroke palette: saturated colors on a dark stage.
 * 
 * @ignore
 */
const manim_palette = /* @__PURE__ */ listPrepend(
  "#58C4DD",
  listPrepend(
    "#83C167",
    listPrepend(
      "#FFFF00",
      listPrepend(
        "#FC6255",
        listPrepend(
          "#9A72AC",
          listPrepend("#FF862F", listPrepend("#FFFFFF", $List$Empty$const)),
        ),
      ),
    ),
  ),
);

/**
 * Axes + ticks muted; curve in Manim teal. First 18 paths are decorations
 * (2 axes + 8 x-ticks + 8 y-ticks) from math.axis_decorations.
 * 
 * @ignore
 */
const math_decoration_count = 18;

/**
 * Your app's public address, once you've deployed it in Problem 13, such as
 * "https://your-username.github.io/animator/".
 */
export const public_url = "";

/**
 * Set to True if you would like your app's URL included in the course gallery.
 */
export const include_app_in_gallery = false;

/**
 * A link to your video from Problem 14, which anyone with the link can watch.
 */
export const video_url = "";

/**
 * Set to True if you would like your video included in the course gallery.
 */
export const include_video_in_gallery = false;

export function init(_) {
  let library = $data.load();
  let source = $data.current_source(library);
  let model = new Model(
    library,
    source,
    true,
    Option$None$const,
    10,
    100,
    false,
    false,
    AppMode$DrawMode$const,
    MathPlane$RealPlane$const,
    $math.MathFn$ScaledSine$const,
    $complex_math.ComplexFn$ExpITheta$const,
    $complex_math.ComplexFn$Circle$const,
    "",
    Option$None$const,
    1,
    1,
    0,
    1,
  );
  return [
    model,
    $effect.batch(
      listPrepend(
        $editor.mount(source, (var0) => { return new SetCode(var0); }),
        listPrepend(
          $effect.from((dispatch) => { return dispatch(new SetCode(source)); }),
          $List$Empty$const,
        ),
      ),
    ),
  ];
}

function unwrap_line(loop$error) {
  while (true) {
    let error = loop$error;
    if (error instanceof $errors.OnLine) {
      let inner = error.error;
      loop$error = inner;
    } else {
      return error;
    }
  }
}

function classify_eval_error(error) {
  let message = $errors.error_message(error);
  let $ = unwrap_line(error);
  if ($ instanceof $errors.TypeError) {
    return new AppError(ErrorKind$TypeError$const, message);
  } else if ($ instanceof $errors.PathLimit) {
    return new AppError(ErrorKind$DrawingError$const, message);
  } else if ($ instanceof $errors.BadDrawing) {
    return new AppError(ErrorKind$DrawingError$const, message);
  } else {
    return new AppError(ErrorKind$RuntimeError$const, message);
  }
}

function run_source(shape_slider, source) {
  let $ = $parser.parse_program(source, $builtins.global_frame());
  if ($ instanceof Ok) {
    let program = $[0];
    let $1 = $drawing.try_draw(shape_slider, program);
    if ($1 instanceof Ok) {
      return $1;
    } else {
      let err = $1[0];
      return new Error(classify_eval_error(err));
    }
  } else {
    let msg = $[0];
    return new Error(new AppError(ErrorKind$SyntaxError$const, msg));
  }
}

function error_kind_label(kind) {
  if (kind instanceof SyntaxError) {
    return "Syntax";
  } else if (kind instanceof TypeError) {
    return "Type";
  } else if (kind instanceof RuntimeError) {
    return "Runtime";
  } else if (kind instanceof DrawingError) {
    return "Drawing";
  } else {
    return "Math";
  }
}

function manim_color(index) {
  let _block;
  let _pipe = $list.drop(
    manim_palette,
    remainderInt(index, $list.length(manim_palette)),
  );
  _block = $list.first(_pipe);
  let $ = _block;
  let color;
  if ($ instanceof Ok) {
    color = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "app",
      421,
      "manim_color",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 11312,
        end: 11417,
        pattern_start: 11323,
        pattern_end: 11332
      }
    )
  }
  return color;
}

function to_render_paths(paths) {
  return $list.index_map(
    paths,
    (path, i) => { return $render.render_path(path, manim_color(i)); },
  );
}

function math_render_paths(paths, style) {
  return $list.index_map(
    paths,
    (path, i) => {
      let _block;
      if (style instanceof RealStyle) {
        let $ = i < math_decoration_count;
        if ($) {
          _block = "#8a8aaa";
        } else {
          _block = "#58C4DD";
        }
      } else {
        let h = style.horizontal_count;
        _block = $complex_math.path_color(i, h);
      }
      let color = _block;
      return $render.render_path(path, color);
    },
  );
}

function run_math(model) {
  let $ = model.math_plane;
  if ($ instanceof RealPlane) {
    let $1 = $math.plot(
      model.math_fn,
      model.math_amp,
      model.math_omega,
      model.math_shift,
      model.math_slope,
    );
    if ($1 instanceof Ok) {
      let plot = $1[0];
      return new Ok([plot, MathStyle$RealStyle$const]);
    } else {
      let err = $1[0];
      return new Error(
        new AppError(ErrorKind$MathError$const, $math.error_message(err)),
      );
    }
  } else if ($ instanceof ComplexPlane) {
    let $1 = $complex_math.plot(
      $complex_math.ComplexFn$ExpITheta$const,
      model.math_amp,
      model.math_omega,
      model.math_shift,
      model.complex_theta,
    );
    let plot = $1[0];
    let horiz = $1[1];
    let sweep = $1[2];
    return new Ok([plot, new ComplexStyle(horiz, sweep)]);
  } else {
    let $1 = $complex_math.plot(
      model.polar_fn,
      model.math_amp,
      model.math_omega,
      model.math_shift,
      Option$None$const,
    );
    let plot = $1[0];
    let horiz = $1[1];
    let sweep = $1[2];
    return new Ok([plot, new ComplexStyle(horiz, sweep)]);
  }
}

function apply_sweep(style) {
  if (style instanceof ComplexStyle) {
    let $ = style.sweep;
    if ($ instanceof Some) {
      let arrow = $[0];
      return $render.set_sweep(arrow);
    } else {
      return $render.clear_sweep();
    }
  } else {
    return $render.clear_sweep();
  }
}

/**
 * Slider percent → canvas clock multiplier (100 → 1.0×).
 * 
 * @ignore
 */
function speed_rate(speed_percent) {
  return $int.to_float(speed_percent) / 100.0;
}

function effective_rate(speed_percent, paused) {
  if (paused) {
    return 0.0;
  } else {
    return speed_rate(speed_percent);
  }
}

function animate_math(plot, style, speed_percent, paused, looping) {
  let rendered = math_render_paths(plot.paths, style);
  let rate = effective_rate(speed_percent, paused);
  return $effect.from(
    (_) => {
      $render.reset_clock();
      $render.set_speed(rate);
      $render.set_loop(looping);
      $render.set_labels(plot.labels);
      $render.set_dots(plot.dots);
      apply_sweep(style);
      return $render.set_drawing(rendered);
    },
  );
}

function update_math_drawing(plot, style) {
  let rendered = math_render_paths(plot.paths, style);
  return $effect.from(
    (_) => {
      $render.set_labels(plot.labels);
      $render.set_dots(plot.dots);
      apply_sweep(style);
      return $render.set_drawing(rendered);
    },
  );
}

function clear_drawing() {
  return $effect.from(
    (_) => {
      $render.reset_clock();
      $render.set_labels($List$Empty$const);
      $render.set_dots($List$Empty$const);
      $render.clear_sweep();
      return $render.set_drawing($List$Empty$const);
    },
  );
}

function refresh_math(model, restart) {
  let $ = run_math(model);
  if ($ instanceof Ok) {
    let plot = $[0][0];
    let style = $[0][1];
    let _block;
    if (restart) {
      _block = animate_math(
        plot,
        style,
        model.speed_percent,
        model.paused,
        model.looping,
      );
    } else {
      _block = update_math_drawing(plot, style);
    }
    let effect = _block;
    return [
      new Model(
        model.library,
        model.source,
        model.code_open,
        Option$None$const,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      effect,
    ];
  } else {
    let err = $[0];
    return [
      new Model(
        model.library,
        model.source,
        model.code_open,
        new Some(err),
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      clear_drawing(),
    ];
  }
}

/**
 * Turn Paths into RenderPaths with cycling Manim colours, then push them to
 * the canvas and restart the clock so each edit plays like a fresh construction.
 * 
 * @ignore
 */
function animate(paths, speed_percent, paused, looping) {
  let rendered = to_render_paths(paths);
  let rate = effective_rate(speed_percent, paused);
  return $effect.from(
    (_) => {
      $render.reset_clock();
      $render.set_speed(rate);
      $render.set_loop(looping);
      $render.set_labels($List$Empty$const);
      $render.set_dots($List$Empty$const);
      $render.clear_sweep();
      return $render.set_drawing(rendered);
    },
  );
}

/**
 * Swap geometry for a new shape_slider value without touching speed or clock.
 * 
 * @ignore
 */
function update_drawing(paths) {
  let rendered = to_render_paths(paths);
  return $effect.from(
    (_) => {
      $render.set_labels($List$Empty$const);
      $render.set_dots($List$Empty$const);
      $render.clear_sweep();
      return $render.set_drawing(rendered);
    },
  );
}

function apply_speed(speed_percent, paused) {
  let rate = effective_rate(speed_percent, paused);
  return $effect.from((_) => { return $render.set_speed(rate); });
}

function apply_loop(looping) {
  return $effect.from((_) => { return $render.set_loop(looping); });
}

function restart_animation(speed_percent, paused, looping) {
  let rate = effective_rate(speed_percent, paused);
  return $effect.from(
    (_) => {
      $render.reset_clock();
      $render.set_speed(rate);
      return $render.set_loop(looping);
    },
  );
}

/**
 * Open `library`'s current drawing in the editor and on the canvas.
 * 
 * @ignore
 */
function open_current(model, library) {
  let source = $data.current_source(library);
  $data.save(library);
  let model$1 = new Model(
    library,
    source,
    model.code_open,
    model.error,
    model.shape_slider,
    model.speed_percent,
    model.paused,
    model.looping,
    model.mode,
    model.math_plane,
    model.math_fn,
    model.complex_fn,
    model.polar_fn,
    model.complex_theta_input,
    model.complex_theta,
    model.math_amp,
    model.math_omega,
    model.math_shift,
    model.math_slope,
  );
  let mount = $editor.mount(source, (var0) => { return new SetCode(var0); });
  let $ = run_source(model$1.shape_slider, source);
  if ($ instanceof Ok) {
    let paths = $[0];
    return [
      new Model(
        model$1.library,
        model$1.source,
        model$1.code_open,
        Option$None$const,
        model$1.shape_slider,
        model$1.speed_percent,
        model$1.paused,
        model$1.looping,
        model$1.mode,
        model$1.math_plane,
        model$1.math_fn,
        model$1.complex_fn,
        model$1.polar_fn,
        model$1.complex_theta_input,
        model$1.complex_theta,
        model$1.math_amp,
        model$1.math_omega,
        model$1.math_shift,
        model$1.math_slope,
      ),
      $effect.batch(
        listPrepend(
          mount,
          listPrepend(
            animate(
              paths,
              model$1.speed_percent,
              model$1.paused,
              model$1.looping,
            ),
            $List$Empty$const,
          ),
        ),
      ),
    ];
  } else {
    let err = $[0];
    return [
      new Model(
        model$1.library,
        model$1.source,
        model$1.code_open,
        new Some(err),
        model$1.shape_slider,
        model$1.speed_percent,
        model$1.paused,
        model$1.looping,
        model$1.mode,
        model$1.math_plane,
        model$1.math_fn,
        model$1.complex_fn,
        model$1.polar_fn,
        model$1.complex_theta_input,
        model$1.complex_theta,
        model$1.math_amp,
        model$1.math_omega,
        model$1.math_shift,
        model$1.math_slope,
      ),
      $effect.batch(
        listPrepend(mount, listPrepend(clear_drawing(), $List$Empty$const)),
      ),
    ];
  }
}

export function update(model, msg) {
  if (msg instanceof SetCode) {
    let text = msg[0];
    let library = $data.set_current_source(model.library, text);
    $data.save(library);
    let $ = model.mode;
    if ($ instanceof DrawMode) {
      let $1 = run_source(model.shape_slider, text);
      if ($1 instanceof Ok) {
        let paths = $1[0];
        return [
          new Model(
            library,
            text,
            model.code_open,
            Option$None$const,
            model.shape_slider,
            model.speed_percent,
            model.paused,
            model.looping,
            model.mode,
            model.math_plane,
            model.math_fn,
            model.complex_fn,
            model.polar_fn,
            model.complex_theta_input,
            model.complex_theta,
            model.math_amp,
            model.math_omega,
            model.math_shift,
            model.math_slope,
          ),
          animate(paths, model.speed_percent, model.paused, model.looping),
        ];
      } else {
        let err = $1[0];
        return [
          new Model(
            library,
            text,
            model.code_open,
            new Some(err),
            model.shape_slider,
            model.speed_percent,
            model.paused,
            model.looping,
            model.mode,
            model.math_plane,
            model.math_fn,
            model.complex_fn,
            model.polar_fn,
            model.complex_theta_input,
            model.complex_theta,
            model.math_amp,
            model.math_omega,
            model.math_shift,
            model.math_slope,
          ),
          clear_drawing(),
        ];
      }
    } else {
      return [
        new Model(
          library,
          text,
          model.code_open,
          model.error,
          model.shape_slider,
          model.speed_percent,
          model.paused,
          model.looping,
          model.mode,
          model.math_plane,
          model.math_fn,
          model.complex_fn,
          model.polar_fn,
          model.complex_theta_input,
          model.complex_theta,
          model.math_amp,
          model.math_omega,
          model.math_shift,
          model.math_slope,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof SelectDrawing) {
    let choice = msg[0];
    let model$1 = new Model(
      model.library,
      model.source,
      model.code_open,
      model.error,
      model.shape_slider,
      model.speed_percent,
      model.paused,
      model.looping,
      AppMode$DrawMode$const,
      model.math_plane,
      model.math_fn,
      model.complex_fn,
      model.polar_fn,
      model.complex_theta_input,
      model.complex_theta,
      model.math_amp,
      model.math_omega,
      model.math_shift,
      model.math_slope,
    );
    let $ = choice === $data.new_drawing_option;
    if ($) {
      let name = $string.trim($data.prompt_drawing_name());
      if (name === "") {
        return [model$1, $effect.none()];
      } else {
        let name$1 = name;
        let library = $data.add(model$1.library, name$1, $data.blank_source);
        return open_current(model$1, library);
      }
    } else {
      return open_current(model$1, $data.select(model$1.library, choice));
    }
  } else if (msg instanceof SetMode) {
    let mode = msg[0];
    let model$1 = new Model(
      model.library,
      model.source,
      model.code_open,
      Option$None$const,
      model.shape_slider,
      model.speed_percent,
      model.paused,
      model.looping,
      mode,
      model.math_plane,
      model.math_fn,
      model.complex_fn,
      model.polar_fn,
      model.complex_theta_input,
      model.complex_theta,
      model.math_amp,
      model.math_omega,
      model.math_shift,
      model.math_slope,
    );
    if (mode instanceof DrawMode) {
      let $ = run_source(model$1.shape_slider, model$1.source);
      if ($ instanceof Ok) {
        let paths = $[0];
        return [
          model$1,
          $effect.batch(
            listPrepend(
              $editor.mount(
                model$1.source,
                (var0) => { return new SetCode(var0); },
              ),
              listPrepend(
                animate(
                  paths,
                  model$1.speed_percent,
                  model$1.paused,
                  model$1.looping,
                ),
                $List$Empty$const,
              ),
            ),
          ),
        ];
      } else {
        let err = $[0];
        return [
          new Model(
            model$1.library,
            model$1.source,
            model$1.code_open,
            new Some(err),
            model$1.shape_slider,
            model$1.speed_percent,
            model$1.paused,
            model$1.looping,
            model$1.mode,
            model$1.math_plane,
            model$1.math_fn,
            model$1.complex_fn,
            model$1.polar_fn,
            model$1.complex_theta_input,
            model$1.complex_theta,
            model$1.math_amp,
            model$1.math_omega,
            model$1.math_shift,
            model$1.math_slope,
          ),
          $effect.batch(
            listPrepend(
              $editor.mount(
                model$1.source,
                (var0) => { return new SetCode(var0); },
              ),
              listPrepend(clear_drawing(), $List$Empty$const),
            ),
          ),
        ];
      }
    } else {
      return refresh_math(model$1, true);
    }
  } else if (msg instanceof SetMathPlane) {
    let plane = msg[0];
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      true,
    );
  } else if (msg instanceof SetMathFn) {
    let math_fn = msg[0];
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      true,
    );
  } else if (msg instanceof SetComplexFn) {
    let complex_fn = msg[0];
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      true,
    );
  } else if (msg instanceof SetPolarFn) {
    let polar_fn = msg[0];
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      true,
    );
  } else if (msg instanceof SetComplexTheta) {
    let raw = msg[0];
    let previous = model.complex_theta;
    let _block;
    let $ = $string.trim(raw);
    if ($ === "") {
      _block = Option$None$const;
    } else {
      let $1 = $complex_math.parse_theta(raw);
      if ($1 instanceof Ok) {
        let theta = $1[0];
        _block = new Some(theta);
      } else {
        _block = model.complex_theta;
      }
    }
    let pinned = _block;
    let restart = !isEqual(pinned, previous);
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        raw,
        pinned,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      restart,
    );
  } else if (msg instanceof SetMathAmp) {
    let a = msg[0];
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        $int.clamp(a, -5, 5),
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      false,
    );
  } else if (msg instanceof SetMathOmega) {
    let w = msg[0];
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        $int.clamp(w, 1, 10),
        model.math_shift,
        model.math_slope,
      ),
      false,
    );
  } else if (msg instanceof SetMathShift) {
    let b = msg[0];
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        $int.clamp(b, -5, 5),
        model.math_slope,
      ),
      false,
    );
  } else if (msg instanceof SetMathSlope) {
    let m = msg[0];
    return refresh_math(
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        $int.clamp(m, -5, 5),
      ),
      false,
    );
  } else if (msg instanceof SetShape) {
    let value = msg[0];
    let shape_slider = $int.clamp(value, 0, 100);
    let model$1 = new Model(
      model.library,
      model.source,
      model.code_open,
      model.error,
      shape_slider,
      model.speed_percent,
      model.paused,
      model.looping,
      model.mode,
      model.math_plane,
      model.math_fn,
      model.complex_fn,
      model.polar_fn,
      model.complex_theta_input,
      model.complex_theta,
      model.math_amp,
      model.math_omega,
      model.math_shift,
      model.math_slope,
    );
    let $ = run_source(shape_slider, model$1.source);
    if ($ instanceof Ok) {
      let paths = $[0];
      return [
        new Model(
          model$1.library,
          model$1.source,
          model$1.code_open,
          Option$None$const,
          model$1.shape_slider,
          model$1.speed_percent,
          model$1.paused,
          model$1.looping,
          model$1.mode,
          model$1.math_plane,
          model$1.math_fn,
          model$1.complex_fn,
          model$1.polar_fn,
          model$1.complex_theta_input,
          model$1.complex_theta,
          model$1.math_amp,
          model$1.math_omega,
          model$1.math_shift,
          model$1.math_slope,
        ),
        update_drawing(paths),
      ];
    } else {
      let err = $[0];
      return [
        new Model(
          model$1.library,
          model$1.source,
          model$1.code_open,
          new Some(err),
          model$1.shape_slider,
          model$1.speed_percent,
          model$1.paused,
          model$1.looping,
          model$1.mode,
          model$1.math_plane,
          model$1.math_fn,
          model$1.complex_fn,
          model$1.polar_fn,
          model$1.complex_theta_input,
          model$1.complex_theta,
          model$1.math_amp,
          model$1.math_omega,
          model$1.math_shift,
          model$1.math_slope,
        ),
        clear_drawing(),
      ];
    }
  } else if (msg instanceof SetSpeed) {
    let percent = msg[0];
    let speed_percent = $int.clamp(percent, -500, 500);
    let paused = false;
    return [
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        speed_percent,
        paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      apply_speed(speed_percent, paused),
    ];
  } else if (msg instanceof PauseAnimation) {
    return [
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        true,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      apply_speed(model.speed_percent, true),
    ];
  } else if (msg instanceof PlayAnimation) {
    let _block;
    let $ = model.speed_percent;
    if ($ === 0) {
      _block = 100;
    } else {
      _block = $;
    }
    let speed_percent = _block;
    return [
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        speed_percent,
        false,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      apply_speed(speed_percent, false),
    ];
  } else if (msg instanceof RestartAnimation) {
    return [
      model,
      restart_animation(model.speed_percent, model.paused, model.looping),
    ];
  } else if (msg instanceof ToggleLoop) {
    let looping = !model.looping;
    return [
      new Model(
        model.library,
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      apply_loop(looping),
    ];
  } else {
    return [
      new Model(
        model.library,
        model.source,
        !model.code_open,
        model.error,
        model.shape_slider,
        model.speed_percent,
        model.paused,
        model.looping,
        model.mode,
        model.math_plane,
        model.math_fn,
        model.complex_fn,
        model.polar_fn,
        model.complex_theta_input,
        model.complex_theta,
        model.math_amp,
        model.math_omega,
        model.math_shift,
        model.math_slope,
      ),
      $effect.none(),
    ];
  }
}

function view_error(model) {
  let $ = model.error;
  if ($ instanceof Some) {
    let kind = $[0].kind;
    let message = $[0].message;
    return $html.div(
      listPrepend(
        $attr.class$("error-popup"),
        listPrepend($attr.attribute("role", "alert"), $List$Empty$const),
      ),
      listPrepend(
        $html.span(
          listPrepend($attr.class$("error-popup-kind"), $List$Empty$const),
          listPrepend($html.text(error_kind_label(kind)), $List$Empty$const),
        ),
        listPrepend(
          $html.span(
            listPrepend($attr.class$("error-popup-msg"), $List$Empty$const),
            listPrepend($html.text(message), $List$Empty$const),
          ),
          $List$Empty$const,
        ),
      ),
    );
  } else {
    return $element.none();
  }
}

function view_controls(model) {
  return $html.div(
    listPrepend($attr.class$("anim-controls"), $List$Empty$const),
    listPrepend(
      $html.div(
        listPrepend($attr.class$("anim-controls-row"), $List$Empty$const),
        listPrepend(
          $html.label(
            listPrepend($attr.class$("slider-label"), $List$Empty$const),
            listPrepend(
              $html.span(
                $List$Empty$const,
                listPrepend(
                  $html.text(
                    ("Speed " + $float.to_string(
                      speed_rate(model.speed_percent),
                    )) + "×",
                  ),
                  $List$Empty$const,
                ),
              ),
              listPrepend(
                $html.input(
                  listPrepend(
                    $attr.type_("range"),
                    listPrepend(
                      $attr.min("-500"),
                      listPrepend(
                        $attr.max("500"),
                        listPrepend(
                          $attr.step("25"),
                          listPrepend(
                            $attr.value($int.to_string(model.speed_percent)),
                            listPrepend(
                              $attr.attribute("data-test-id", "speed-slider"),
                              listPrepend(
                                $attr.attribute(
                                  "title",
                                  "Animation speed (−5× to 5×)",
                                ),
                                listPrepend(
                                  $event.on_input(
                                    (raw) => {
                                      return new SetSpeed(
                                        $result.unwrap(
                                          $int.parse(raw),
                                          model.speed_percent,
                                        ),
                                      );
                                    },
                                  ),
                                  $List$Empty$const,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                $List$Empty$const,
              ),
            ),
          ),
          listPrepend(
            $html.div(
              listPrepend($attr.class$("playback-btns"), $List$Empty$const),
              listPrepend(
                $html.button(
                  listPrepend(
                    $attr.class$(
                      (() => {
                        let $ = model.paused;
                        if ($) {
                          return "icon-btn";
                        } else {
                          return "icon-btn icon-btn-active";
                        }
                      })(),
                    ),
                    listPrepend(
                      $attr.attribute("title", "Play"),
                      listPrepend(
                        $attr.type_("button"),
                        listPrepend(
                          $attr.disabled(
                            !model.paused && (model.speed_percent !== 0),
                          ),
                          listPrepend(
                            $event.on_click(Msg$PlayAnimation$const),
                            $List$Empty$const,
                          ),
                        ),
                      ),
                    ),
                  ),
                  listPrepend($html.text("▶"), $List$Empty$const),
                ),
                listPrepend(
                  $html.button(
                    listPrepend(
                      $attr.class$(
                        (() => {
                          let $ = model.paused;
                          if ($) {
                            return "icon-btn icon-btn-active";
                          } else {
                            return "icon-btn";
                          }
                        })(),
                      ),
                      listPrepend(
                        $attr.attribute("title", "Pause"),
                        listPrepend(
                          $attr.type_("button"),
                          listPrepend(
                            $attr.disabled(model.paused),
                            listPrepend(
                              $event.on_click(Msg$PauseAnimation$const),
                              $List$Empty$const,
                            ),
                          ),
                        ),
                      ),
                    ),
                    listPrepend($html.text("❚❚"), $List$Empty$const),
                  ),
                  listPrepend(
                    $html.button(
                      listPrepend(
                        $attr.class$("icon-btn"),
                        listPrepend(
                          $attr.attribute("title", "Restart animation"),
                          listPrepend(
                            $attr.type_("button"),
                            listPrepend(
                              $event.on_click(Msg$RestartAnimation$const),
                              $List$Empty$const,
                            ),
                          ),
                        ),
                      ),
                      listPrepend($html.text("↻"), $List$Empty$const),
                    ),
                    listPrepend(
                      $html.button(
                        listPrepend(
                          $attr.class$(
                            (() => {
                              let $ = model.looping;
                              if ($) {
                                return "icon-btn icon-btn-active";
                              } else {
                                return "icon-btn";
                              }
                            })(),
                          ),
                          listPrepend(
                            $attr.attribute(
                              "title",
                              (() => {
                                let $ = model.looping;
                                if ($) {
                                  return "Loop on — click to stop looping";
                                } else {
                                  return "Loop off — click to loop animation";
                                }
                              })(),
                            ),
                            listPrepend(
                              $attr.type_("button"),
                              listPrepend(
                                $attr.attribute("data-test-id", "loop-btn"),
                                listPrepend(
                                  $event.on_click(Msg$ToggleLoop$const),
                                  $List$Empty$const,
                                ),
                              ),
                            ),
                          ),
                        ),
                        listPrepend($html.text("⟲"), $List$Empty$const),
                      ),
                      $List$Empty$const,
                    ),
                  ),
                ),
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(
        (() => {
          let $ = model.mode;
          if ($ instanceof DrawMode) {
            return $html.label(
              listPrepend(
                $attr.class$("slider-label slider-label-full"),
                $List$Empty$const,
              ),
              listPrepend(
                $html.span(
                  $List$Empty$const,
                  listPrepend(
                    $html.text("Shape " + $int.to_string(model.shape_slider)),
                    $List$Empty$const,
                  ),
                ),
                listPrepend(
                  $html.input(
                    listPrepend(
                      $attr.type_("range"),
                      listPrepend(
                        $attr.min("0"),
                        listPrepend(
                          $attr.max("100"),
                          listPrepend(
                            $attr.step("1"),
                            listPrepend(
                              $attr.value($int.to_string(model.shape_slider)),
                              listPrepend(
                                $attr.attribute("data-test-id", "shape-slider"),
                                listPrepend(
                                  $attr.attribute(
                                    "title",
                                    "shape_slider passed to draw (not speed)",
                                  ),
                                  listPrepend(
                                    $event.on_input(
                                      (raw) => {
                                        return new SetShape(
                                          $result.unwrap(
                                            $int.parse(raw),
                                            model.shape_slider,
                                          ),
                                        );
                                      },
                                    ),
                                    $List$Empty$const,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  $List$Empty$const,
                ),
              ),
            );
          } else {
            return $element.none();
          }
        })(),
        $List$Empty$const,
      ),
    ),
  );
}

function view_reveal_code(model) {
  let $ = model.code_open;
  if ($) {
    return $element.none();
  } else {
    return $html.button(
      listPrepend(
        $attr.class$("icon-btn reveal-code"),
        listPrepend(
          $attr.attribute("title", "Show code"),
          listPrepend($event.on_click(Msg$ToggleCode$const), $List$Empty$const),
        ),
      ),
      listPrepend($html.text("⟩"), $List$Empty$const),
    );
  }
}

function view_anim(model) {
  return $html.div(
    listPrepend($attr.class$("canvas-area"), $List$Empty$const),
    listPrepend(
      view_reveal_code(model),
      listPrepend(
        view_controls(model),
        listPrepend(
          $html.canvas(
            listPrepend(
              $attr.id("animation-canvas"),
              listPrepend($attr.class$("canvas"), $List$Empty$const),
            ),
          ),
          listPrepend(view_error(model), $List$Empty$const),
        ),
      ),
    ),
  );
}

function omega_slider(model) {
  return $html.label(
    listPrepend(
      $attr.class$("slider-label slider-label-full"),
      $List$Empty$const,
    ),
    listPrepend(
      $html.span(
        $List$Empty$const,
        listPrepend(
          $html.text("ω (omega) " + $int.to_string(model.math_omega)),
          $List$Empty$const,
        ),
      ),
      listPrepend(
        $html.input(
          listPrepend(
            $attr.type_("range"),
            listPrepend(
              $attr.min("1"),
              listPrepend(
                $attr.max("10"),
                listPrepend(
                  $attr.step("1"),
                  listPrepend(
                    $attr.value($int.to_string(model.math_omega)),
                    listPrepend(
                      $attr.attribute(
                        "title",
                        "Input scale ω (1…10); default 1",
                      ),
                      listPrepend(
                        $event.on_input(
                          (raw) => {
                            return new SetMathOmega(
                              $result.unwrap($int.parse(raw), model.math_omega),
                            );
                          },
                        ),
                        $List$Empty$const,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        $List$Empty$const,
      ),
    ),
  );
}

function view_argand_param_sliders(model, f) {
  let shift = $html.label(
    listPrepend(
      $attr.class$("slider-label slider-label-full"),
      $List$Empty$const,
    ),
    listPrepend(
      $html.span(
        $List$Empty$const,
        listPrepend(
          $html.text("b (Re shift) " + $int.to_string(model.math_shift)),
          $List$Empty$const,
        ),
      ),
      listPrepend(
        $html.input(
          listPrepend(
            $attr.type_("range"),
            listPrepend(
              $attr.min("-5"),
              listPrepend(
                $attr.max("5"),
                listPrepend(
                  $attr.step("1"),
                  listPrepend(
                    $attr.value($int.to_string(model.math_shift)),
                    listPrepend(
                      $attr.attribute("title", "Real-axis shift b"),
                      listPrepend(
                        $event.on_input(
                          (raw) => {
                            return new SetMathShift(
                              $result.unwrap($int.parse(raw), model.math_shift),
                            );
                          },
                        ),
                        $List$Empty$const,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        $List$Empty$const,
      ),
    ),
  );
  let scale = $html.label(
    listPrepend(
      $attr.class$("slider-label slider-label-full"),
      $List$Empty$const,
    ),
    listPrepend(
      $html.span(
        $List$Empty$const,
        listPrepend(
          $html.text("a (scale) " + $int.to_string(model.math_amp)),
          $List$Empty$const,
        ),
      ),
      listPrepend(
        $html.input(
          listPrepend(
            $attr.type_("range"),
            listPrepend(
              $attr.min("-5"),
              listPrepend(
                $attr.max("5"),
                listPrepend(
                  $attr.step("1"),
                  listPrepend(
                    $attr.value($int.to_string(model.math_amp)),
                    listPrepend(
                      $attr.attribute("title", "Scale a; default 1"),
                      listPrepend(
                        $event.on_input(
                          (raw) => {
                            return new SetMathAmp(
                              $result.unwrap($int.parse(raw), model.math_amp),
                            );
                          },
                        ),
                        $List$Empty$const,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        $List$Empty$const,
      ),
    ),
  );
  let _block;
  let $ = $complex_math.uses_omega(f);
  if ($) {
    _block = listPrepend(omega_slider(model), $List$Empty$const);
  } else {
    _block = $List$Empty$const;
  }
  let omega = _block;
  return $html.div(
    listPrepend($attr.class$("math-wave-sliders"), $List$Empty$const),
    $list.flatten(
      listPrepend(
        listPrepend(shift, $List$Empty$const),
        listPrepend(
          listPrepend(scale, $List$Empty$const),
          listPrepend(omega, $List$Empty$const),
        ),
      ),
    ),
  );
}

function view_polar_math_controls(model) {
  let options = $list.map(
    $complex_math.all_polar_functions(),
    (f) => {
      return $html.option(
        listPrepend(
          $attr.value($complex_math.fn_id(f)),
          listPrepend(
            $attr.selected(isEqual(f, model.polar_fn)),
            $List$Empty$const,
          ),
        ),
        $complex_math.fn_label(f),
      );
    },
  );
  return $html.div(
    listPrepend($attr.class$("math-controls"), $List$Empty$const),
    listPrepend(
      $html.p(
        listPrepend($attr.class$("math-blurb"), $List$Empty$const),
        listPrepend(
          $html.text(
            "Polar curves r(θ) on the Argand plane. a scales size, ω sets petals/turns, b shifts along Re.",
          ),
          $List$Empty$const,
        ),
      ),
      listPrepend(
        $html.label(
          listPrepend($attr.class$("drawing-select-label"), $List$Empty$const),
          listPrepend(
            $html.span(
              $List$Empty$const,
              listPrepend($html.text("Curve"), $List$Empty$const),
            ),
            listPrepend(
              $html.select(
                listPrepend(
                  $attr.attribute("data-test-id", "polar-fn-select"),
                  listPrepend(
                    $attr.class$("drawing-select"),
                    listPrepend(
                      $event.on_change(
                        (id) => {
                          return new SetPolarFn($complex_math.parse_fn_id(id));
                        },
                      ),
                      $List$Empty$const,
                    ),
                  ),
                ),
                options,
              ),
              $List$Empty$const,
            ),
          ),
        ),
        listPrepend(
          $html.p(
            listPrepend($attr.class$("math-formula"), $List$Empty$const),
            listPrepend(
              $html.text($complex_math.fn_label(model.polar_fn)),
              $List$Empty$const,
            ),
          ),
          listPrepend(
            view_argand_param_sliders(model, model.polar_fn),
            $List$Empty$const,
          ),
        ),
      ),
    ),
  );
}

function view_complex_math_controls(model) {
  return $html.div(
    listPrepend($attr.class$("math-controls"), $List$Empty$const),
    listPrepend(
      $html.p(
        listPrepend($attr.class$("math-formula"), $List$Empty$const),
        listPrepend(
          $html.text(
            $complex_math.fn_label($complex_math.ComplexFn$ExpITheta$const),
          ),
          $List$Empty$const,
        ),
      ),
      listPrepend(
        $html.p(
          listPrepend($attr.class$("math-blurb"), $List$Empty$const),
          listPrepend(
            $html.text(
              "Tangent arrow for e^iθ. θ ∈ [0, 2π] sets where the trace starts; empty starts at 0. Restart/loop replay from that θ.",
            ),
            $List$Empty$const,
          ),
        ),
        listPrepend(
          $html.label(
            listPrepend($attr.class$("drawing-select-label"), $List$Empty$const),
            listPrepend(
              $html.span(
                $List$Empty$const,
                listPrepend($html.text("θ  (0 … 2π)"), $List$Empty$const),
              ),
              listPrepend(
                $html.input(
                  listPrepend(
                    $attr.type_("text"),
                    listPrepend(
                      $attr.class$("drawing-select"),
                      listPrepend(
                        $attr.attribute("data-test-id", "complex-theta-input"),
                        listPrepend(
                          $attr.value(model.complex_theta_input),
                          listPrepend(
                            $attr.placeholder("pi/2"),
                            listPrepend(
                              $attr.attribute(
                                "title",
                                "θ in [0, 2π]: 0, pi/2, pi, 3*pi/2, 2*pi, …",
                              ),
                              listPrepend(
                                $event.on_input(
                                  (var0) => { return new SetComplexTheta(var0); },
                                ),
                                $List$Empty$const,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                $List$Empty$const,
              ),
            ),
          ),
          listPrepend(
            view_argand_param_sliders(
              model,
              $complex_math.ComplexFn$ExpITheta$const,
            ),
            $List$Empty$const,
          ),
        ),
      ),
    ),
  );
}

function view_real_param_sliders(model) {
  let shift = $html.label(
    listPrepend(
      $attr.class$("slider-label slider-label-full"),
      $List$Empty$const,
    ),
    listPrepend(
      $html.span(
        $List$Empty$const,
        listPrepend(
          $html.text("b (shift) " + $int.to_string(model.math_shift)),
          $List$Empty$const,
        ),
      ),
      listPrepend(
        $html.input(
          listPrepend(
            $attr.type_("range"),
            listPrepend(
              $attr.min("-5"),
              listPrepend(
                $attr.max("5"),
                listPrepend(
                  $attr.step("1"),
                  listPrepend(
                    $attr.value($int.to_string(model.math_shift)),
                    listPrepend(
                      $attr.attribute("title", "Horizontal shift b in f(x − b)"),
                      listPrepend(
                        $event.on_input(
                          (raw) => {
                            return new SetMathShift(
                              $result.unwrap($int.parse(raw), model.math_shift),
                            );
                          },
                        ),
                        $List$Empty$const,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        $List$Empty$const,
      ),
    ),
  );
  let _block;
  let $ = $math.uses_slope(model.math_fn);
  if ($) {
    _block = listPrepend(
      $html.label(
        listPrepend(
          $attr.class$("slider-label slider-label-full"),
          $List$Empty$const,
        ),
        listPrepend(
          $html.span(
            $List$Empty$const,
            listPrepend(
              $html.text("m (slope) " + $int.to_string(model.math_slope)),
              $List$Empty$const,
            ),
          ),
          listPrepend(
            $html.input(
              listPrepend(
                $attr.type_("range"),
                listPrepend(
                  $attr.min("-5"),
                  listPrepend(
                    $attr.max("5"),
                    listPrepend(
                      $attr.step("1"),
                      listPrepend(
                        $attr.value($int.to_string(model.math_slope)),
                        listPrepend(
                          $attr.attribute(
                            "title",
                            "Slope m for y = m(x − b) (−5…5)",
                          ),
                          listPrepend(
                            $event.on_input(
                              (raw) => {
                                return new SetMathSlope(
                                  $result.unwrap(
                                    $int.parse(raw),
                                    model.math_slope,
                                  ),
                                );
                              },
                            ),
                            $List$Empty$const,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
      $List$Empty$const,
    );
  } else {
    _block = $List$Empty$const;
  }
  let slope = _block;
  let _block$1;
  let $1 = $math.uses_wave_params(model.math_fn);
  if ($1) {
    _block$1 = listPrepend(
      $html.label(
        listPrepend(
          $attr.class$("slider-label slider-label-full"),
          $List$Empty$const,
        ),
        listPrepend(
          $html.span(
            $List$Empty$const,
            listPrepend(
              $html.text("a (amplitude) " + $int.to_string(model.math_amp)),
              $List$Empty$const,
            ),
          ),
          listPrepend(
            $html.input(
              listPrepend(
                $attr.type_("range"),
                listPrepend(
                  $attr.min("-5"),
                  listPrepend(
                    $attr.max("5"),
                    listPrepend(
                      $attr.step("1"),
                      listPrepend(
                        $attr.value($int.to_string(model.math_amp)),
                        listPrepend(
                          $attr.attribute(
                            "title",
                            "Amplitude a (−5…5); default 1",
                          ),
                          listPrepend(
                            $event.on_input(
                              (raw) => {
                                return new SetMathAmp(
                                  $result.unwrap(
                                    $int.parse(raw),
                                    model.math_amp,
                                  ),
                                );
                              },
                            ),
                            $List$Empty$const,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(omega_slider(model), $List$Empty$const),
    );
  } else {
    _block$1 = $List$Empty$const;
  }
  let wave = _block$1;
  let _block$2;
  let $2 = $math.uses_base_param(model.math_fn);
  if ($2) {
    let a = $int.clamp(model.math_amp, 2, 10);
    _block$2 = listPrepend(
      $html.label(
        listPrepend(
          $attr.class$("slider-label slider-label-full"),
          $List$Empty$const,
        ),
        listPrepend(
          $html.span(
            $List$Empty$const,
            listPrepend(
              $html.text("a (base) " + $int.to_string(a)),
              $List$Empty$const,
            ),
          ),
          listPrepend(
            $html.input(
              listPrepend(
                $attr.type_("range"),
                listPrepend(
                  $attr.min("2"),
                  listPrepend(
                    $attr.max("10"),
                    listPrepend(
                      $attr.step("1"),
                      listPrepend(
                        $attr.value($int.to_string(a)),
                        listPrepend(
                          $attr.attribute("title", "Base a for y = aˣ (2…10)"),
                          listPrepend(
                            $event.on_input(
                              (raw) => {
                                return new SetMathAmp(
                                  $result.unwrap($int.parse(raw), a),
                                );
                              },
                            ),
                            $List$Empty$const,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
      $List$Empty$const,
    );
  } else {
    _block$2 = $List$Empty$const;
  }
  let base = _block$2;
  return $html.div(
    listPrepend($attr.class$("math-wave-sliders"), $List$Empty$const),
    $list.flatten(
      listPrepend(
        listPrepend(shift, $List$Empty$const),
        listPrepend(
          slope,
          listPrepend(wave, listPrepend(base, $List$Empty$const)),
        ),
      ),
    ),
  );
}

function view_real_math_controls(model) {
  let options = $list.map(
    $math.all_functions(),
    (f) => {
      return $html.option(
        listPrepend(
          $attr.value($math.fn_id(f)),
          listPrepend(
            $attr.selected(isEqual(f, model.math_fn)),
            $List$Empty$const,
          ),
        ),
        $math.fn_label(f),
      );
    },
  );
  return $html.div(
    listPrepend($attr.class$("math-controls"), $List$Empty$const),
    listPrepend(
      $html.label(
        listPrepend($attr.class$("drawing-select-label"), $List$Empty$const),
        listPrepend(
          $html.span(
            $List$Empty$const,
            listPrepend($html.text("Function"), $List$Empty$const),
          ),
          listPrepend(
            $html.select(
              listPrepend(
                $attr.attribute("data-test-id", "math-fn-select"),
                listPrepend(
                  $attr.class$("drawing-select"),
                  listPrepend(
                    $event.on_change(
                      (id) => { return new SetMathFn($math.parse_fn_id(id)); },
                    ),
                    $List$Empty$const,
                  ),
                ),
              ),
              options,
            ),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(
        $html.p(
          listPrepend($attr.class$("math-formula"), $List$Empty$const),
          listPrepend(
            $html.text($math.fn_generalized(model.math_fn)),
            $List$Empty$const,
          ),
        ),
        listPrepend(view_real_param_sliders(model), $List$Empty$const),
      ),
    ),
  );
}

function plane_tab(model, plane, label) {
  return $html.button(
    listPrepend(
      $attr.class$(
        (() => {
          let $ = isEqual(model.math_plane, plane);
          if ($) {
            return "mode-btn mode-btn-active";
          } else {
            return "mode-btn";
          }
        })(),
      ),
      listPrepend(
        $attr.type_("button"),
        listPrepend($event.on_click(new SetMathPlane(plane)), $List$Empty$const),
      ),
    ),
    listPrepend($html.text(label), $List$Empty$const),
  );
}

function view_plane_toggle(model) {
  return $html.div(
    listPrepend($attr.class$("plane-toggle"), $List$Empty$const),
    listPrepend(
      plane_tab(model, MathPlane$RealPlane$const, "Real"),
      listPrepend(
        plane_tab(model, MathPlane$ComplexPlane$const, "Complex"),
        listPrepend(
          plane_tab(model, MathPlane$PolarPlane$const, "Polar"),
          $List$Empty$const,
        ),
      ),
    ),
  );
}

function view_math_panel(model) {
  return $html.div(
    listPrepend($attr.class$("math-panel"), $List$Empty$const),
    listPrepend(
      $html.h2(
        listPrepend($attr.class$("math-title"), $List$Empty$const),
        listPrepend($html.text("Math mode"), $List$Empty$const),
      ),
      listPrepend(
        view_plane_toggle(model),
        listPrepend(
          (() => {
            let $ = model.math_plane;
            if ($ instanceof RealPlane) {
              return view_real_math_controls(model);
            } else if ($ instanceof ComplexPlane) {
              return view_complex_math_controls(model);
            } else {
              return view_polar_math_controls(model);
            }
          })(),
          $List$Empty$const,
        ),
      ),
    ),
  );
}

function view_drawing_select(model) {
  let options = $list.map(
    $data.names(model.library),
    (name) => {
      return $html.option(
        listPrepend(
          $attr.value(name),
          listPrepend(
            $attr.selected(name === model.library.current),
            $List$Empty$const,
          ),
        ),
        name,
      );
    },
  );
  return $html.div(
    listPrepend($attr.class$("drawing-select-bar"), $List$Empty$const),
    listPrepend(
      $html.label(
        listPrepend($attr.class$("drawing-select-label"), $List$Empty$const),
        listPrepend(
          $html.span(
            $List$Empty$const,
            listPrepend($html.text("Drawing"), $List$Empty$const),
          ),
          listPrepend(
            $html.select(
              listPrepend(
                $attr.attribute("data-test-id", "drawing-select"),
                listPrepend(
                  $attr.class$("drawing-select"),
                  listPrepend(
                    $event.on_change(
                      (var0) => { return new SelectDrawing(var0); },
                    ),
                    $List$Empty$const,
                  ),
                ),
              ),
              $list.append(
                options,
                listPrepend(
                  $html.option(
                    listPrepend(
                      $attr.value($data.new_drawing_option),
                      $List$Empty$const,
                    ),
                    "+ New drawing…",
                  ),
                  $List$Empty$const,
                ),
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
      $List$Empty$const,
    ),
  );
}

function view_mode_bar(model) {
  return $html.div(
    listPrepend($attr.class$("mode-bar"), $List$Empty$const),
    listPrepend(
      $html.button(
        listPrepend(
          $attr.class$(
            (() => {
              let $ = model.mode;
              if ($ instanceof DrawMode) {
                return "mode-btn mode-btn-active";
              } else {
                return "mode-btn";
              }
            })(),
          ),
          listPrepend(
            $attr.type_("button"),
            listPrepend(
              $event.on_click(new SetMode(AppMode$DrawMode$const)),
              $List$Empty$const,
            ),
          ),
        ),
        listPrepend($html.text("Draw"), $List$Empty$const),
      ),
      listPrepend(
        $html.button(
          listPrepend(
            $attr.class$(
              (() => {
                let $ = model.mode;
                if ($ instanceof DrawMode) {
                  return "mode-btn";
                } else {
                  return "mode-btn mode-btn-active";
                }
              })(),
            ),
            listPrepend(
              $attr.type_("button"),
              listPrepend(
                $event.on_click(new SetMode(AppMode$MathMode$const)),
                $List$Empty$const,
              ),
            ),
          ),
          listPrepend($html.text("Math"), $List$Empty$const),
        ),
        $List$Empty$const,
      ),
    ),
  );
}

export function view(model) {
  let _block;
  let $ = model.code_open;
  if ($) {
    _block = "app";
  } else {
    _block = "app code-hidden";
  }
  let app_class = _block;
  return $html.div(
    listPrepend($attr.class$(app_class), $List$Empty$const),
    listPrepend(
      $html.div(
        listPrepend($attr.class$("code-col"), $List$Empty$const),
        listPrepend(
          view_mode_bar(model),
          listPrepend(
            (() => {
              let $1 = model.mode;
              if ($1 instanceof DrawMode) {
                return $html.div(
                  listPrepend($attr.class$("code-col-body"), $List$Empty$const),
                  listPrepend(
                    view_drawing_select(model),
                    listPrepend(
                      $editor.view_panel(Msg$ToggleCode$const),
                      $List$Empty$const,
                    ),
                  ),
                );
              } else {
                return view_math_panel(model);
              }
            })(),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(view_anim(model), $List$Empty$const),
    ),
  );
}

export function main() {
  let app = $lustre.application(init, update, view);
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "app",
      1147,
      "main",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 33436,
        end: 33485,
        pattern_start: 33447,
        pattern_end: 33452
      }
    )
  }
  return undefined;
}
