//// Animator -- an application for program-generated drawings.

import builtins
import data.{type Library}
import drawing
import editor
import errors.{type EvalError}
import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import lustre
import lustre/attribute as attr
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import complex_math.{type ComplexFn}
import math.{type MathFn}
import parser
import render.{type SweepArrow}
import shape.{type Path}

/// Your app's public address, once you've deployed it in Problem 13, such as
/// "https://your-username.github.io/animator/".
pub const public_url = "https://henrydang0911.github.io/CS61A-Animator-Project-HD/"

/// Set to True if you would like your app's URL included in the course gallery.
pub const include_app_in_gallery = False

/// A link to your video from Problem 14, which anyone with the link can watch.
pub const video_url = ""

/// Set to True if you would like your video included in the course gallery.
pub const include_video_in_gallery = False

/// 3Blue1Brown / Manim-style stroke palette: saturated colors on a dark stage.
const manim_palette = [
  "#58C4DD", "#83C167", "#FFFF00", "#FC6255", "#9A72AC", "#FF862F", "#FFFFFF",
]

// ── Model ──────────────────────────────────────────────────────────────────────

/// What kind of problem the red popup is reporting.
pub type ErrorKind {
  SyntaxError
  TypeError
  RuntimeError
  DrawingError
  MathError
}

pub type AppError {
  AppError(kind: ErrorKind, message: String)
}

pub type AppMode {
  DrawMode
  MathMode
}

/// Real y = f(x), complex maps, or polar r(θ) curves under Math mode.
pub type MathPlane {
  RealPlane
  ComplexPlane
  PolarPlane
}

pub type Model {
  Model(
    // Named drawings restored from / saved to localStorage.
    library: Library,
    // The code in the editor.
    source: String,
    // Whether the code editor is shown.
    code_open: Bool,
    // Shown as a small red popup while the drawing cannot run.
    error: Option(AppError),
    // Passed into draw(shape_slider); changes geometry only, never speed.
    shape_slider: Int,
    // Animation speed as a percent of normal: 100 = 1×,
    // negatives play backward (−500 = −5× … 500 = 5×).
    speed_percent: Int,
    // When True, the clock is frozen (rate 0) until Play.
    paused: Bool,
    // When True, the animation restarts when it reaches the end (or start if reverse).
    looping: Bool,
    // Draw = user Gleam draw(); Math = preset y = f(x) / complex maps.
    mode: AppMode,
    math_plane: MathPlane,
    math_fn: MathFn,
    complex_fn: ComplexFn,
    polar_fn: ComplexFn,
    // Raw θ text for Complex e^iθ (e.g. "pi/2"); empty = clock sweep.
    complex_theta_input: String,
    // Parsed θ in radians when the input is valid.
    complex_theta: Option(Float),
    // Amplitude / complex scale a (−5…5, default 1).
    math_amp: Int,
    // Angular frequency ω for waves / polar / e^iθ sweep speed (1…10).
    math_omega: Int,
    // Horizontal / Re-axis shift b (−5…5).
    math_shift: Int,
    // Slope m for the line y = m(x − b) (−5…5, default 1).
    math_slope: Int,
  )
}

pub type Msg {
  SetCode(String)
  SelectDrawing(String)
  SetMode(AppMode)
  SetMathPlane(MathPlane)
  SetMathFn(MathFn)
  SetComplexFn(ComplexFn)
  SetPolarFn(ComplexFn)
  SetComplexTheta(String)
  SetMathAmp(Int)
  SetMathOmega(Int)
  SetMathShift(Int)
  SetMathSlope(Int)
  SetShape(Int)
  SetSpeed(Int)
  PauseAnimation
  PlayAnimation
  RestartAnimation
  ToggleLoop

  // Layout controls
  ToggleCode
}

// ── Init ───────────────────────────────────────────────────────────────────────

pub fn init(_flags: Nil) -> #(Model, Effect(Msg)) {
  let library = data.load()
  let source = data.current_source(library)
  let model =
    Model(
      library: library,
      source: source,
      code_open: True,
      error: None,
      shape_slider: 10,
      speed_percent: 100,
      paused: False,
      looping: False,
      mode: DrawMode,
      math_plane: RealPlane,
      math_fn: math.ScaledSine,
      complex_fn: complex_math.ExpITheta,
      polar_fn: complex_math.Circle,
      complex_theta_input: "",
      complex_theta: None,
      math_amp: 1,
      math_omega: 1,
      math_shift: 0,
      math_slope: 1,
    )
  // Mount the restored drawing, then evaluate it (may be broken).
  #(
    model,
    effect.batch([
      editor.mount(source, SetCode),
      effect.from(fn(dispatch) { dispatch(SetCode(source)) }),
    ]),
  )
}

// Parse and evaluate a draw function at the given shape-slider value, returning
// the paths on success, or a typed error for the popup.
fn run_source(
  shape_slider: Int,
  source: String,
) -> Result(List(Path), AppError) {
  case parser.parse_program(source, builtins.global_frame()) {
    Error(msg) -> Error(AppError(SyntaxError, msg))
    Ok(program) ->
      case drawing.try_draw(shape_slider, program) {
        Ok(paths) -> Ok(paths)
        Error(err) -> Error(classify_eval_error(err))
      }
  }
}

fn classify_eval_error(error: EvalError) -> AppError {
  let message = errors.error_message(error)
  case unwrap_line(error) {
    errors.TypeError(_) -> AppError(TypeError, message)
    errors.BadDrawing(_) | errors.PathLimit -> AppError(DrawingError, message)
    _ -> AppError(RuntimeError, message)
  }
}

fn unwrap_line(error: EvalError) -> EvalError {
  case error {
    errors.OnLine(inner, _) -> unwrap_line(inner)
    other -> other
  }
}

fn error_kind_label(kind: ErrorKind) -> String {
  case kind {
    SyntaxError -> "Syntax"
    TypeError -> "Type"
    RuntimeError -> "Runtime"
    DrawingError -> "Drawing"
    MathError -> "Math"
  }
}

fn to_render_paths(paths: List(Path)) -> List(render.RenderPath) {
  list.index_map(paths, fn(path, i) {
    render.render_path(path, manim_color(i))
  })
}

/// Axes + ticks muted; curve in Manim teal. First 18 paths are decorations
/// (2 axes + 8 x-ticks + 8 y-ticks) from math.axis_decorations.
const math_decoration_count = 18

/// How to color math paths; optional clock-driven tangent arrow for e^{iθ}.
pub type MathStyle {
  RealStyle
  ComplexStyle(horizontal_count: Int, sweep: Option(SweepArrow))
}

fn math_render_paths(
  paths: List(Path),
  style: MathStyle,
) -> List(render.RenderPath) {
  list.index_map(paths, fn(path, i) {
    let color = case style {
      RealStyle ->
        case i < math_decoration_count {
          True -> "#8a8aaa"
          False -> "#58C4DD"
        }
      ComplexStyle(h, _) -> complex_math.path_color(i, h)
    }
    render.render_path(path, color)
  })
}

fn run_math(model: Model) -> Result(#(math.Plot, MathStyle), AppError) {
  case model.math_plane {
    RealPlane ->
      case
        math.plot(
          model.math_fn,
          model.math_amp,
          model.math_omega,
          model.math_shift,
          model.math_slope,
        )
      {
        Ok(plot) -> Ok(#(plot, RealStyle))
        Error(err) -> Error(AppError(MathError, math.error_message(err)))
      }
    ComplexPlane -> {
      let #(plot, horiz, sweep) =
        complex_math.plot(
          complex_math.ExpITheta,
          model.math_amp,
          model.math_omega,
          model.math_shift,
          model.complex_theta,
        )
      Ok(#(plot, ComplexStyle(horiz, sweep)))
    }
    PolarPlane -> {
      let #(plot, horiz, sweep) =
        complex_math.plot(
          model.polar_fn,
          model.math_amp,
          model.math_omega,
          model.math_shift,
          None,
        )
      Ok(#(plot, ComplexStyle(horiz, sweep)))
    }
  }
}

fn apply_sweep(style: MathStyle) -> Nil {
  case style {
    ComplexStyle(_, Some(arrow)) -> render.set_sweep(arrow)
    _ -> render.clear_sweep()
  }
}

fn animate_math(
  plot: math.Plot,
  style: MathStyle,
  speed_percent: Int,
  paused: Bool,
  looping: Bool,
) -> Effect(Msg) {
  let rendered = math_render_paths(plot.paths, style)
  let rate = effective_rate(speed_percent, paused)
  effect.from(fn(_) {
    render.reset_clock()
    render.set_speed(rate)
    render.set_loop(looping)
    render.set_labels(plot.labels)
    render.set_dots(plot.dots)
    apply_sweep(style)
    render.set_drawing(rendered)
  })
}

fn update_math_drawing(plot: math.Plot, style: MathStyle) -> Effect(Msg) {
  let rendered = math_render_paths(plot.paths, style)
  effect.from(fn(_) {
    render.set_labels(plot.labels)
    render.set_dots(plot.dots)
    apply_sweep(style)
    render.set_drawing(rendered)
  })
}

fn refresh_math(model: Model, restart: Bool) -> #(Model, Effect(Msg)) {
  case run_math(model) {
    Ok(#(plot, style)) -> {
      let effect = case restart {
        True ->
          animate_math(
            plot,
            style,
            model.speed_percent,
            model.paused,
            model.looping,
          )
        False -> update_math_drawing(plot, style)
      }
      #(Model(..model, error: None), effect)
    }
    Error(err) -> #(Model(..model, error: Some(err)), clear_drawing())
  }
}

/// Turn Paths into RenderPaths with cycling Manim colours, then push them to
/// the canvas and restart the clock so each edit plays like a fresh construction.
fn animate(
  paths: List(Path),
  speed_percent: Int,
  paused: Bool,
  looping: Bool,
) -> Effect(Msg) {
  let rendered = to_render_paths(paths)
  let rate = effective_rate(speed_percent, paused)
  effect.from(fn(_) {
    render.reset_clock()
    render.set_speed(rate)
    render.set_loop(looping)
    render.set_labels([])
    render.set_dots([])
    render.clear_sweep()
    render.set_drawing(rendered)
  })
}

/// Swap geometry for a new shape_slider value without touching speed or clock.
fn update_drawing(paths: List(Path)) -> Effect(Msg) {
  let rendered = to_render_paths(paths)
  effect.from(fn(_) {
    render.set_labels([])
    render.set_dots([])
    render.clear_sweep()
    render.set_drawing(rendered)
  })
}

fn clear_drawing() -> Effect(Msg) {
  effect.from(fn(_) {
    render.reset_clock()
    render.set_labels([])
    render.set_dots([])
    render.clear_sweep()
    render.set_drawing([])
  })
}

fn apply_speed(speed_percent: Int, paused: Bool) -> Effect(Msg) {
  let rate = effective_rate(speed_percent, paused)
  effect.from(fn(_) { render.set_speed(rate) })
}

fn apply_loop(looping: Bool) -> Effect(Msg) {
  effect.from(fn(_) { render.set_loop(looping) })
}

fn restart_animation(
  speed_percent: Int,
  paused: Bool,
  looping: Bool,
) -> Effect(Msg) {
  let rate = effective_rate(speed_percent, paused)
  effect.from(fn(_) {
    render.reset_clock()
    render.set_speed(rate)
    render.set_loop(looping)
  })
}

/// Slider percent → canvas clock multiplier (100 → 1.0×).
fn speed_rate(speed_percent: Int) -> Float {
  int.to_float(speed_percent) /. 100.0
}

fn effective_rate(speed_percent: Int, paused: Bool) -> Float {
  case paused {
    True -> 0.0
    False -> speed_rate(speed_percent)
  }
}

fn manim_color(index: Int) -> String {
  let assert Ok(color) =
    list.drop(manim_palette, index % list.length(manim_palette))
    |> list.first
  color
}

/// Open `library`'s current drawing in the editor and on the canvas.
fn open_current(model: Model, library: Library) -> #(Model, Effect(Msg)) {
  let source = data.current_source(library)
  data.save(library)
  let model = Model(..model, library: library, source: source)
  let mount = editor.mount(source, SetCode)
  case run_source(model.shape_slider, source) {
    Ok(paths) -> #(
      Model(..model, error: None),
      effect.batch([
        mount,
        animate(paths, model.speed_percent, model.paused, model.looping),
      ]),
    )
    // Broken saved code: still show it, with the error, and draw nothing.
    Error(err) -> #(
      Model(..model, error: Some(err)),
      effect.batch([mount, clear_drawing()]),
    )
  }
}

// ── Update ─────────────────────────────────────────────────────────────────────

pub fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    ToggleCode -> #(Model(..model, code_open: !model.code_open), effect.none())

    SetMode(mode) -> {
      let model = Model(..model, mode: mode, error: None)
      case mode {
        MathMode -> refresh_math(model, True)
        DrawMode ->
          case run_source(model.shape_slider, model.source) {
            Ok(paths) -> #(
              model,
              effect.batch([
                editor.mount(model.source, SetCode),
                animate(paths, model.speed_percent, model.paused, model.looping),
              ]),
            )
            Error(err) -> #(
              Model(..model, error: Some(err)),
              effect.batch([
                editor.mount(model.source, SetCode),
                clear_drawing(),
              ]),
            )
          }
      }
    }

    SetMathPlane(plane) ->
      refresh_math(Model(..model, math_plane: plane), True)

    SetMathFn(math_fn) -> refresh_math(Model(..model, math_fn: math_fn), True)

    SetComplexFn(complex_fn) ->
      refresh_math(Model(..model, complex_fn: complex_fn), True)

    SetPolarFn(polar_fn) ->
      refresh_math(Model(..model, polar_fn: polar_fn), True)

    SetComplexTheta(raw) -> {
      let previous = model.complex_theta
      let pinned = case string.trim(raw) {
        "" -> None
        _ ->
          case complex_math.parse_theta(raw) {
            Ok(theta) -> Some(theta)
            // Keep the last valid pin while the user is mid-typing.
            Error(Nil) -> model.complex_theta
          }
      }
      // Restart whenever the start angle changes so the trace begins there.
      let restart = pinned != previous
      refresh_math(
        Model(..model, complex_theta_input: raw, complex_theta: pinned),
        restart,
      )
    }

    SetMathAmp(a) ->
      refresh_math(Model(..model, math_amp: int.clamp(a, -5, 5)), False)

    SetMathOmega(w) ->
      refresh_math(Model(..model, math_omega: int.clamp(w, 1, 10)), False)

    SetMathShift(b) ->
      refresh_math(Model(..model, math_shift: int.clamp(b, -5, 5)), False)

    SetMathSlope(m) ->
      refresh_math(Model(..model, math_slope: int.clamp(m, -5, 5)), False)

    SelectDrawing(choice) -> {
      // Picking a drawing always returns to Draw mode.
      let model = Model(..model, mode: DrawMode)
      case choice == data.new_drawing_option {
        True -> {
          let name = string.trim(data.prompt_drawing_name())
          case name {
            "" -> #(model, effect.none())
            name -> {
              let library = data.add(model.library, name, data.blank_source)
              open_current(model, library)
            }
          }
        }
        False -> open_current(model, data.select(model.library, choice))
      }
    }

    SetShape(value) -> {
      let shape_slider = int.clamp(value, 0, 100)
      let model = Model(..model, shape_slider: shape_slider)
      case run_source(shape_slider, model.source) {
        Ok(paths) -> #(
          Model(..model, error: None),
          // Geometry only — do not call set_speed or reset_clock.
          update_drawing(paths),
        )
        Error(err) -> #(
          Model(..model, error: Some(err)),
          clear_drawing(),
        )
      }
    }

    SetSpeed(percent) -> {
      let speed_percent = int.clamp(percent, -500, 500)
      // Dragging the slider resumes playback at the new rate.
      let paused = False
      #(
        Model(..model, speed_percent: speed_percent, paused: paused),
        apply_speed(speed_percent, paused),
      )
    }

    PauseAnimation -> #(
      Model(..model, paused: True),
      apply_speed(model.speed_percent, True),
    )

    PlayAnimation -> {
      // If the slider is at 0×, bump to 1× so Play actually moves.
      let speed_percent = case model.speed_percent {
        0 -> 100
        n -> n
      }
      #(
        Model(..model, paused: False, speed_percent: speed_percent),
        apply_speed(speed_percent, False),
      )
    }

    RestartAnimation -> #(
      model,
      restart_animation(model.speed_percent, model.paused, model.looping),
    )

    ToggleLoop -> {
      let looping = !model.looping
      #(Model(..model, looping: looping), apply_loop(looping))
    }

    // After each keystroke in the editor, save, evaluate, and animate (or
    // report an error). Ignored while Math mode owns the canvas.
    SetCode(text) -> {
      let library = data.set_current_source(model.library, text)
      data.save(library)
      case model.mode {
        MathMode -> #(
          Model(..model, library: library, source: text),
          effect.none(),
        )
        DrawMode ->
          case run_source(model.shape_slider, text) {
            Ok(paths) -> #(
              Model(..model, library: library, error: None, source: text),
              animate(paths, model.speed_percent, model.paused, model.looping),
            )
            Error(err) -> #(
              Model(..model, library: library, error: Some(err), source: text),
              clear_drawing(),
            )
          }
      }
    }
  }
}

// ── View ──────────────────────────────────────────────────────────────────
//
// Two side-by-side panes: the code editor on the left and its rendered output on
// the right. The code column can be hidden to expand the right pane.

pub fn view(model: Model) -> Element(Msg) {
  let app_class = case model.code_open {
    True -> "app"
    False -> "app code-hidden"
  }
  // The code column still exists even when hidden (CSS collapses it) so the
  // mounted CodeMirror editor keeps its state across show/hide.
  html.div([attr.class(app_class)], [
    html.div([attr.class("code-col")], [
      view_mode_bar(model),
      case model.mode {
        DrawMode ->
          html.div([attr.class("code-col-body")], [
            view_drawing_select(model),
            editor.view_panel(ToggleCode),
          ])
        MathMode -> view_math_panel(model)
      },
    ]),
    view_anim(model),
  ])
}

fn view_mode_bar(model: Model) -> Element(Msg) {
  html.div([attr.class("mode-bar")], [
    html.button(
      [
        attr.class(case model.mode {
          DrawMode -> "mode-btn mode-btn-active"
          MathMode -> "mode-btn"
        }),
        attr.type_("button"),
        event.on_click(SetMode(DrawMode)),
      ],
      [html.text("Draw")],
    ),
    html.button(
      [
        attr.class(case model.mode {
          MathMode -> "mode-btn mode-btn-active"
          DrawMode -> "mode-btn"
        }),
        attr.type_("button"),
        event.on_click(SetMode(MathMode)),
      ],
      [html.text("Math")],
    ),
  ])
}

fn view_math_panel(model: Model) -> Element(Msg) {
  html.div([attr.class("math-panel")], [
    html.h2([attr.class("math-title")], [html.text("Math mode")]),
    view_plane_toggle(model),
    case model.math_plane {
      RealPlane -> view_real_math_controls(model)
      ComplexPlane -> view_complex_math_controls(model)
      PolarPlane -> view_polar_math_controls(model)
    },
  ])
}

fn view_plane_toggle(model: Model) -> Element(Msg) {
  html.div([attr.class("plane-toggle")], [
    plane_tab(model, RealPlane, "Real"),
    plane_tab(model, ComplexPlane, "Complex"),
    plane_tab(model, PolarPlane, "Polar"),
  ])
}

fn plane_tab(model: Model, plane: MathPlane, label: String) -> Element(Msg) {
  html.button(
    [
      attr.class(case model.math_plane == plane {
        True -> "mode-btn mode-btn-active"
        False -> "mode-btn"
      }),
      attr.type_("button"),
      event.on_click(SetMathPlane(plane)),
    ],
    [html.text(label)],
  )
}

fn view_real_math_controls(model: Model) -> Element(Msg) {
  let options =
    list.map(math.all_functions(), fn(f) {
      html.option(
        [
          attr.value(math.fn_id(f)),
          attr.selected(f == model.math_fn),
        ],
        math.fn_label(f),
      )
    })
  html.div([attr.class("math-controls")], [
    html.label([attr.class("drawing-select-label")], [
      html.span([], [html.text("Function")]),
      html.select(
        [
          attr.attribute("data-test-id", "math-fn-select"),
          attr.class("drawing-select"),
          event.on_change(fn(id) { SetMathFn(math.parse_fn_id(id)) }),
        ],
        options,
      ),
    ]),
    html.p([attr.class("math-formula")], [
      html.text(math.fn_generalized(model.math_fn)),
    ]),
    view_real_param_sliders(model),
  ])
}

fn view_complex_math_controls(model: Model) -> Element(Msg) {
  html.div([attr.class("math-controls")], [
    html.p([attr.class("math-formula")], [
      html.text(complex_math.fn_label(complex_math.ExpITheta)),
    ]),
    html.p([attr.class("math-blurb")], [
      html.text(
        "Tangent arrow for e^iθ. θ ∈ [0, 2π] sets where the trace starts; empty starts at 0. Restart/loop replay from that θ.",
      ),
    ]),
    html.label([attr.class("drawing-select-label")], [
      html.span([], [html.text("θ  (0 … 2π)")]),
      html.input([
        attr.type_("text"),
        attr.class("drawing-select"),
        attr.attribute("data-test-id", "complex-theta-input"),
        attr.value(model.complex_theta_input),
        attr.placeholder("pi/2"),
        attr.attribute(
          "title",
          "θ in [0, 2π]: 0, pi/2, pi, 3*pi/2, 2*pi, …",
        ),
        event.on_input(SetComplexTheta),
      ]),
    ]),
    view_argand_param_sliders(model, complex_math.ExpITheta),
  ])
}

fn view_polar_math_controls(model: Model) -> Element(Msg) {
  let options =
    list.map(complex_math.all_polar_functions(), fn(f) {
      html.option(
        [
          attr.value(complex_math.fn_id(f)),
          attr.selected(f == model.polar_fn),
        ],
        complex_math.fn_label(f),
      )
    })
  html.div([attr.class("math-controls")], [
    html.p([attr.class("math-blurb")], [
      html.text(
        "Polar curves r(θ) on the Argand plane. a scales size, ω sets petals/turns, b shifts along Re.",
      ),
    ]),
    html.label([attr.class("drawing-select-label")], [
      html.span([], [html.text("Curve")]),
      html.select(
        [
          attr.attribute("data-test-id", "polar-fn-select"),
          attr.class("drawing-select"),
          event.on_change(fn(id) {
            SetPolarFn(complex_math.parse_fn_id(id))
          }),
        ],
        options,
      ),
    ]),
    html.p([attr.class("math-formula")], [
      html.text(complex_math.fn_label(model.polar_fn)),
    ]),
    view_argand_param_sliders(model, model.polar_fn),
  ])
}

fn view_real_param_sliders(model: Model) -> Element(Msg) {
  let shift =
    html.label([attr.class("slider-label slider-label-full")], [
      html.span([], [
        html.text("b (shift) " <> int.to_string(model.math_shift)),
      ]),
      html.input([
        attr.type_("range"),
        attr.min("-5"),
        attr.max("5"),
        attr.step("1"),
        attr.value(int.to_string(model.math_shift)),
        attr.attribute("title", "Horizontal shift b in f(x − b)"),
        event.on_input(fn(raw) {
          SetMathShift(result.unwrap(int.parse(raw), model.math_shift))
        }),
      ]),
    ])

  let slope = case math.uses_slope(model.math_fn) {
    False -> []
    True -> [
      html.label([attr.class("slider-label slider-label-full")], [
        html.span([], [
          html.text("m (slope) " <> int.to_string(model.math_slope)),
        ]),
        html.input([
          attr.type_("range"),
          attr.min("-5"),
          attr.max("5"),
          attr.step("1"),
          attr.value(int.to_string(model.math_slope)),
          attr.attribute("title", "Slope m for y = m(x − b) (−5…5)"),
          event.on_input(fn(raw) {
            SetMathSlope(result.unwrap(int.parse(raw), model.math_slope))
          }),
        ]),
      ]),
    ]
  }

  let wave = case math.uses_wave_params(model.math_fn) {
    False -> []
    True -> [
      html.label([attr.class("slider-label slider-label-full")], [
        html.span([], [
          html.text("a (amplitude) " <> int.to_string(model.math_amp)),
        ]),
        html.input([
          attr.type_("range"),
          attr.min("-5"),
          attr.max("5"),
          attr.step("1"),
          attr.value(int.to_string(model.math_amp)),
          attr.attribute("title", "Amplitude a (−5…5); default 1"),
          event.on_input(fn(raw) {
            SetMathAmp(result.unwrap(int.parse(raw), model.math_amp))
          }),
        ]),
      ]),
      omega_slider(model),
    ]
  }

  let base = case math.uses_base_param(model.math_fn) {
    False -> []
    True -> {
      let a = int.clamp(model.math_amp, 2, 10)
      [
        html.label([attr.class("slider-label slider-label-full")], [
          html.span([], [html.text("a (base) " <> int.to_string(a))]),
          html.input([
            attr.type_("range"),
            attr.min("2"),
            attr.max("10"),
            attr.step("1"),
            attr.value(int.to_string(a)),
            attr.attribute("title", "Base a for y = aˣ (2…10)"),
            event.on_input(fn(raw) {
              SetMathAmp(result.unwrap(int.parse(raw), a))
            }),
          ]),
        ]),
      ]
    }
  }

  html.div(
    [attr.class("math-wave-sliders")],
    list.flatten([[shift], slope, wave, base]),
  )
}

fn view_argand_param_sliders(
  model: Model,
  f: ComplexFn,
) -> Element(Msg) {
  let shift =
    html.label([attr.class("slider-label slider-label-full")], [
      html.span([], [
        html.text("b (Re shift) " <> int.to_string(model.math_shift)),
      ]),
      html.input([
        attr.type_("range"),
        attr.min("-5"),
        attr.max("5"),
        attr.step("1"),
        attr.value(int.to_string(model.math_shift)),
        attr.attribute("title", "Real-axis shift b"),
        event.on_input(fn(raw) {
          SetMathShift(result.unwrap(int.parse(raw), model.math_shift))
        }),
      ]),
    ])

  let scale =
    html.label([attr.class("slider-label slider-label-full")], [
      html.span([], [
        html.text("a (scale) " <> int.to_string(model.math_amp)),
      ]),
      html.input([
        attr.type_("range"),
        attr.min("-5"),
        attr.max("5"),
        attr.step("1"),
        attr.value(int.to_string(model.math_amp)),
        attr.attribute("title", "Scale a; default 1"),
        event.on_input(fn(raw) {
          SetMathAmp(result.unwrap(int.parse(raw), model.math_amp))
        }),
      ]),
    ])

  let omega = case complex_math.uses_omega(f) {
    False -> []
    True -> [omega_slider(model)]
  }

  html.div(
    [attr.class("math-wave-sliders")],
    list.flatten([[shift], [scale], omega]),
  )
}

fn omega_slider(model: Model) -> Element(Msg) {
  html.label([attr.class("slider-label slider-label-full")], [
    html.span([], [
      html.text("ω (omega) " <> int.to_string(model.math_omega)),
    ]),
    html.input([
      attr.type_("range"),
      attr.min("1"),
      attr.max("10"),
      attr.step("1"),
      attr.value(int.to_string(model.math_omega)),
      attr.attribute("title", "Input scale ω (1…10); default 1"),
      event.on_input(fn(raw) {
        SetMathOmega(result.unwrap(int.parse(raw), model.math_omega))
      }),
    ]),
  ])
}

fn view_drawing_select(model: Model) -> Element(Msg) {
  let options =
    list.map(data.names(model.library), fn(name) {
      html.option(
        [
          attr.value(name),
          attr.selected(name == model.library.current),
        ],
        name,
      )
    })
  html.div([attr.class("drawing-select-bar")], [
    html.label([attr.class("drawing-select-label")], [
      html.span([], [html.text("Drawing")]),
      html.select(
        [
          attr.attribute("data-test-id", "drawing-select"),
          attr.class("drawing-select"),
          event.on_change(SelectDrawing),
        ],
        list.append(options, [
          html.option([attr.value(data.new_drawing_option)], "+ New drawing…"),
        ]),
      ),
    ]),
  ])
}

fn view_anim(model: Model) -> Element(Msg) {
  html.div([attr.class("canvas-area")], [
    view_reveal_code(model),
    view_controls(model),
    html.canvas([attr.id("animation-canvas"), attr.class("canvas")]),
    view_error(model),
  ])
}

fn view_controls(model: Model) -> Element(Msg) {
  html.div([attr.class("anim-controls")], [
    html.div([attr.class("anim-controls-row")], [
      html.label([attr.class("slider-label")], [
        html.span([], [
          html.text(
            "Speed " <> float.to_string(speed_rate(model.speed_percent)) <> "×",
          ),
        ]),
        html.input([
          attr.type_("range"),
          attr.min("-500"),
          attr.max("500"),
          attr.step("25"),
          attr.value(int.to_string(model.speed_percent)),
          attr.attribute("data-test-id", "speed-slider"),
          attr.attribute("title", "Animation speed (−5× to 5×)"),
          event.on_input(fn(raw) {
            SetSpeed(result.unwrap(int.parse(raw), model.speed_percent))
          }),
        ]),
      ]),
      html.div([attr.class("playback-btns")], [
        html.button(
          [
            attr.class(case model.paused {
              False -> "icon-btn icon-btn-active"
              True -> "icon-btn"
            }),
            attr.attribute("title", "Play"),
            attr.type_("button"),
            attr.disabled(!model.paused && model.speed_percent != 0),
            event.on_click(PlayAnimation),
          ],
          [html.text("▶")],
        ),
        html.button(
          [
            attr.class(case model.paused {
              True -> "icon-btn icon-btn-active"
              False -> "icon-btn"
            }),
            attr.attribute("title", "Pause"),
            attr.type_("button"),
            attr.disabled(model.paused),
            event.on_click(PauseAnimation),
          ],
          [html.text("❚❚")],
        ),
        html.button(
          [
            attr.class("icon-btn"),
            attr.attribute("title", "Restart animation"),
            attr.type_("button"),
            event.on_click(RestartAnimation),
          ],
          [html.text("↻")],
        ),
        html.button(
          [
            attr.class(case model.looping {
              True -> "icon-btn icon-btn-active"
              False -> "icon-btn"
            }),
            attr.attribute(
              "title",
              case model.looping {
                True -> "Loop on — click to stop looping"
                False -> "Loop off — click to loop animation"
              },
            ),
            attr.type_("button"),
            attr.attribute("data-test-id", "loop-btn"),
            event.on_click(ToggleLoop),
          ],
          [html.text("⟲")],
        ),
      ]),
    ]),
    case model.mode {
      MathMode -> element.none()
      DrawMode ->
        html.label([attr.class("slider-label slider-label-full")], [
          html.span([], [
            html.text("Shape " <> int.to_string(model.shape_slider)),
          ]),
          html.input([
            attr.type_("range"),
            attr.min("0"),
            attr.max("100"),
            attr.step("1"),
            attr.value(int.to_string(model.shape_slider)),
            attr.attribute("data-test-id", "shape-slider"),
            attr.attribute("title", "shape_slider passed to draw (not speed)"),
            event.on_input(fn(raw) {
              SetShape(result.unwrap(int.parse(raw), model.shape_slider))
            }),
          ]),
        ])
    },
  ])
}

fn view_error(model: Model) -> Element(Msg) {
  case model.error {
    None -> element.none()
    Some(AppError(kind, message)) ->
      html.div(
        [
          attr.class("error-popup"),
          attr.attribute("role", "alert"),
        ],
        [
          html.span([attr.class("error-popup-kind")], [
            html.text(error_kind_label(kind)),
          ]),
          html.span([attr.class("error-popup-msg")], [html.text(message)]),
        ],
      )
  }
}

// The button that brings the code column back, overlaid on the top-left of the
// right pane. Nothing is rendered while the column is already showing (its own
// header holds the button that hides it).
fn view_reveal_code(model: Model) -> Element(Msg) {
  case model.code_open {
    True -> element.none()
    False ->
      html.button(
        [
          attr.class("icon-btn reveal-code"),
          attr.attribute("title", "Show code"),
          event.on_click(ToggleCode),
        ],
        [html.text("⟩")],
      )
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────

pub fn main() -> Nil {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}
