//// The drawings that a browser with no saved library starts with: each one's
//// name and source.

pub const all = [
  #(
    "fan",
    "fn draw(shape_slider: Int) -> List(Path) {
  fan(30, Point(-200, -200))
}

fn fan(n: Int, start: Point) -> List(Path) {
  case n > 0 {
    True -> [Path(Line(start, Point(n * 10, 200)), 0, 30, 3), ..fan(n - 1, start)]
    False -> []
  }
}
",
  ),
  #(
    "square_spiral",
    "fn draw(shape_slider: Int) -> List(Path) {
  let turns = 20 + shape_slider / 4
  spiral(Point(0, 0), Point(1, 0), 0, turns)
}

fn spiral(p: Point, d: Point, i: Int, n: Int) -> List(Path) {
  case i == n {
    True -> []
    False -> {
      let len = { i / 2 + 1 } * 24
      let q = Point(p.x + d.x * len, p.y + d.y * len)
      [
        Path(Line(p, q), i * 3, i * 3 + 3, 3),
        ..spiral(q, Point(0 - d.y, d.x), i + 1, n)
      ]
    }
  }
}
",
  ),
  #(
    "string_art",
    "fn draw(shape_slider: Int) -> List(Path) {
  let n = 8 + shape_slider / 10
  list.flatten([
    quadrant(1, 1, n, 0),
    quadrant(-1, 1, n, n + 1),
    quadrant(-1, -1, n, { n + 1 } * 2),
    quadrant(1, -1, n, { n + 1 } * 3),
  ])
}

fn quadrant(sx: Int, sy: Int, n: Int, base: Int) -> List(Path) {
  strings(0, sx, sy, n, base)
}

fn strings(i: Int, sx: Int, sy: Int, n: Int, base: Int) -> List(Path) {
  case i > n {
    True -> []
    False -> {
      let a = Point(sx * 420 * i / n, 0)
      let b = Point(0, sy * 420 * { n - i } / n)
      let t = { base + i } * 2
      [Path(Line(a, b), t, t + 8, 2), ..strings(i + 1, sx, sy, n, base)]
    }
  }
}
",
  ),
  #(
    "tree",
    "fn draw(shape_slider: Int) -> List(Path) {
  let depth = 4 + shape_slider / 20
  branch(Point(0, 420), Point(0, -220), 0, depth)
}

fn branch(p: Point, d: Point, level: Int, depth: Int) -> List(Path) {
  case level == depth {
    True -> []
    False -> {
      let q = Point(p.x + d.x, p.y + d.y)
      let left = Point({ d.x - d.y } / 2, { d.y + d.x } / 2)
      let right = Point({ d.x + d.y } / 2, { d.y - d.x } / 2)
      [
        Path(Line(p, q), level * 4, level * 4 + 4, depth - level),
        ..list.append(
          branch(q, left, level + 1, depth),
          branch(q, right, level + 1, depth),
        )
      ]
    }
  }
}
",
  ),
  #(
    "sierpinski",
    "fn draw(shape_slider: Int) -> List(Path) {
  // Depth 1…5 via the shape slider (keeps path count under the limit).
  let depth = 1 + shape_slider / 25
  sierpinski(Point(0, -360), Point(-400, 340), Point(400, 340), depth, 0)
}

fn mid(a: Point, b: Point) -> Point {
  Point({ a.x + b.x } / 2, { a.y + b.y } / 2)
}

fn pow3(n: Int) -> Int {
  case n <= 0 {
    True -> 1
    False -> 3 * pow3(n - 1)
  }
}

fn triangle(a: Point, b: Point, c: Point, t: Int) -> List(Path) {
  [
    Path(Line(a, b), t, t + 2, 2),
    Path(Line(b, c), t + 2, t + 4, 2),
    Path(Line(c, a), t + 4, t + 6, 2),
  ]
}

fn sierpinski(a: Point, b: Point, c: Point, depth: Int, t: Int) -> List(Path) {
  case depth == 0 {
    True -> triangle(a, b, c, t)
    False -> {
      let ab = mid(a, b)
      let bc = mid(b, c)
      let ca = mid(c, a)
      let step = pow3(depth - 1) * 6
      list.append(
        sierpinski(a, ab, ca, depth - 1, t),
        list.append(
          sierpinski(ab, b, bc, depth - 1, t + step),
          sierpinski(ca, bc, c, depth - 1, t + step * 2),
        ),
      )
    }
  }
}
",
  ),
]
