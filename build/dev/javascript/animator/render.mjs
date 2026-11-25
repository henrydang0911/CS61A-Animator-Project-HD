//# sourceMappingURL=render.mjs.map
import {
  setDrawing as set_drawing,
  setLabels as set_labels,
  setDots as set_dots,
  setSweep as set_sweep,
  clearSweep as clear_sweep,
  setSpeed as set_speed,
  setLoop as set_loop,
  resetClock as reset_clock,
} from "./canvas.mjs";
import {
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "./gleam.mjs";
import * as $shape from "./shape.mjs";
import { Line } from "./shape.mjs";

export {
  clear_sweep,
  reset_clock,
  set_dots,
  set_drawing,
  set_labels,
  set_loop,
  set_speed,
  set_sweep,
};

export class RenderPath extends $CustomType {
  constructor(points, thickness, color, start, end) {
    super();
    this.points = points;
    this.thickness = thickness;
    this.color = color;
    this.start = start;
    this.end = end;
  }
}
export const RenderPath$RenderPath = (points, thickness, color, start, end) =>
  new RenderPath(points, thickness, color, start, end);
export const RenderPath$isRenderPath = (value) => value instanceof RenderPath;
export const RenderPath$RenderPath$points = (value) => value.points;
export const RenderPath$RenderPath$0 = (value) => value.points;
export const RenderPath$RenderPath$thickness = (value) => value.thickness;
export const RenderPath$RenderPath$1 = (value) => value.thickness;
export const RenderPath$RenderPath$color = (value) => value.color;
export const RenderPath$RenderPath$2 = (value) => value.color;
export const RenderPath$RenderPath$start = (value) => value.start;
export const RenderPath$RenderPath$3 = (value) => value.start;
export const RenderPath$RenderPath$end = (value) => value.end;
export const RenderPath$RenderPath$4 = (value) => value.end;

export class SweepArrow extends $CustomType {
  constructor(center_x, center_y, radius, start, end, color, thickness, pinned, fixed_theta) {
    super();
    this.center_x = center_x;
    this.center_y = center_y;
    this.radius = radius;
    this.start = start;
    this.end = end;
    this.color = color;
    this.thickness = thickness;
    this.pinned = pinned;
    this.fixed_theta = fixed_theta;
  }
}
export const SweepArrow$SweepArrow = (center_x, center_y, radius, start, end, color, thickness, pinned, fixed_theta) =>
  new SweepArrow(center_x,
  center_y,
  radius,
  start,
  end,
  color,
  thickness,
  pinned,
  fixed_theta);
export const SweepArrow$isSweepArrow = (value) => value instanceof SweepArrow;
export const SweepArrow$SweepArrow$center_x = (value) => value.center_x;
export const SweepArrow$SweepArrow$0 = (value) => value.center_x;
export const SweepArrow$SweepArrow$center_y = (value) => value.center_y;
export const SweepArrow$SweepArrow$1 = (value) => value.center_y;
export const SweepArrow$SweepArrow$radius = (value) => value.radius;
export const SweepArrow$SweepArrow$2 = (value) => value.radius;
export const SweepArrow$SweepArrow$start = (value) => value.start;
export const SweepArrow$SweepArrow$3 = (value) => value.start;
export const SweepArrow$SweepArrow$end = (value) => value.end;
export const SweepArrow$SweepArrow$4 = (value) => value.end;
export const SweepArrow$SweepArrow$color = (value) => value.color;
export const SweepArrow$SweepArrow$5 = (value) => value.color;
export const SweepArrow$SweepArrow$thickness = (value) => value.thickness;
export const SweepArrow$SweepArrow$6 = (value) => value.thickness;
export const SweepArrow$SweepArrow$pinned = (value) => value.pinned;
export const SweepArrow$SweepArrow$7 = (value) => value.pinned;
export const SweepArrow$SweepArrow$fixed_theta = (value) => value.fixed_theta;
export const SweepArrow$SweepArrow$8 = (value) => value.fixed_theta;

export class RenderLabel extends $CustomType {
  constructor(x, y, text, color, size, start, end) {
    super();
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.size = size;
    this.start = start;
    this.end = end;
  }
}
export const RenderLabel$RenderLabel = (x, y, text, color, size, start, end) =>
  new RenderLabel(x, y, text, color, size, start, end);
export const RenderLabel$isRenderLabel = (value) =>
  value instanceof RenderLabel;
export const RenderLabel$RenderLabel$x = (value) => value.x;
export const RenderLabel$RenderLabel$0 = (value) => value.x;
export const RenderLabel$RenderLabel$y = (value) => value.y;
export const RenderLabel$RenderLabel$1 = (value) => value.y;
export const RenderLabel$RenderLabel$text = (value) => value.text;
export const RenderLabel$RenderLabel$2 = (value) => value.text;
export const RenderLabel$RenderLabel$color = (value) => value.color;
export const RenderLabel$RenderLabel$3 = (value) => value.color;
export const RenderLabel$RenderLabel$size = (value) => value.size;
export const RenderLabel$RenderLabel$4 = (value) => value.size;
export const RenderLabel$RenderLabel$start = (value) => value.start;
export const RenderLabel$RenderLabel$5 = (value) => value.start;
export const RenderLabel$RenderLabel$end = (value) => value.end;
export const RenderLabel$RenderLabel$6 = (value) => value.end;

export class RenderDot extends $CustomType {
  constructor(x, y, radius, color, filled, start, end) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.filled = filled;
    this.start = start;
    this.end = end;
  }
}
export const RenderDot$RenderDot = (x, y, radius, color, filled, start, end) =>
  new RenderDot(x, y, radius, color, filled, start, end);
export const RenderDot$isRenderDot = (value) => value instanceof RenderDot;
export const RenderDot$RenderDot$x = (value) => value.x;
export const RenderDot$RenderDot$0 = (value) => value.x;
export const RenderDot$RenderDot$y = (value) => value.y;
export const RenderDot$RenderDot$1 = (value) => value.y;
export const RenderDot$RenderDot$radius = (value) => value.radius;
export const RenderDot$RenderDot$2 = (value) => value.radius;
export const RenderDot$RenderDot$color = (value) => value.color;
export const RenderDot$RenderDot$3 = (value) => value.color;
export const RenderDot$RenderDot$filled = (value) => value.filled;
export const RenderDot$RenderDot$4 = (value) => value.filled;
export const RenderDot$RenderDot$start = (value) => value.start;
export const RenderDot$RenderDot$5 = (value) => value.start;
export const RenderDot$RenderDot$end = (value) => value.end;
export const RenderDot$RenderDot$6 = (value) => value.end;

export function render_path(path, color) {
  let $ = path.shape;
  let a = $.start;
  let b = $.end;
  return new RenderPath(
    listPrepend(a, listPrepend(b, $List$Empty$const)),
    path.thickness,
    color,
    path.start,
    path.end,
  );
}
