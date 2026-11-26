//// The library of saved drawings. A drawing is a name and the source of its draw
//// function.

import examples
import gleam/dynamic/decode
import gleam/json
import gleam/list
import gleam/string

// ── localStorage (data_ffi.mjs) ───────────────────────────────────────────────

/// The string stored in localStorage under key, or an Error if there isn't one.
@external(javascript, "./data_ffi.mjs", "storageGet")
pub fn storage_get(key: String) -> Result(String, Nil)

/// Store value in localStorage under key, replacing anything already there. If that
/// isn't possible, this logs the reason to the browser console.
@external(javascript, "./data_ffi.mjs", "storageSet")
pub fn storage_set(key: String, value: String) -> Nil

// ── The new-drawing prompt (data_ffi.mjs) ─────────────────────────────────────

/// Prompt the user to name a new drawing; "" (empty string) means they
/// cancelled or left it blank.
@external(javascript, "./data_ffi.mjs", "promptDrawingName")
pub fn prompt_drawing_name() -> String

// ── Library ───────────────────────────────────────────────────────────────────

const storage_key = "animator-library"

/// Sentinel value used by the drawing <select> for "create a new drawing".
pub const new_drawing_option = "__new__"

/// Starter source for a brand-new drawing.
pub const blank_source = "fn draw(shape_slider: Int) -> List(Path) {
  [Path(Line(Point(0, 0), Point(100, 100)), 0, 10, 2)]
}
"

pub type Drawing =
  #(String, String)

pub type Library {
  Library(current: String, drawings: List(Drawing))
}

/// Load the library from localStorage, or start from examples.all when empty/broken.
pub fn load() -> Library {
  case storage_get(storage_key) {
    Error(Nil) -> from_examples()
    Ok(raw) ->
      case json.parse(raw, library_decoder()) {
        Ok(library) -> normalize(library)
        Error(_) -> from_examples()
      }
  }
}

/// Persist the whole library (names + full source text) under one key.
pub fn save(library: Library) -> Nil {
  storage_set(storage_key, encode_library(library))
}

/// The source of the currently open drawing, or a blank template if missing.
pub fn current_source(library: Library) -> String {
  case list.key_find(library.drawings, library.current) {
    Ok(source) -> source
    Error(Nil) -> blank_source
  }
}

/// Names in menu order (for the <select>).
pub fn names(library: Library) -> List(String) {
  list.map(library.drawings, fn(d) { d.0 })
}

/// Open an existing drawing by name.
pub fn select(library: Library, name: String) -> Library {
  case list.key_find(library.drawings, name) {
    Ok(_) -> Library(..library, current: name)
    Error(Nil) -> library
  }
}

/// Replace the current drawing's source (keeps the typed text for Gradescope).
pub fn set_current_source(library: Library, source: String) -> Library {
  let drawings =
    list.map(library.drawings, fn(drawing) {
      let #(name, _) = drawing
      case name == library.current {
        True -> #(name, source)
        False -> drawing
      }
    })
  Library(..library, drawings: drawings)
}

/// Add a new named drawing and make it current. If the name already exists,
/// overwrite its source.
pub fn add(library: Library, name: String, source: String) -> Library {
  let name = string.trim(name)
  case name {
    "" -> library
    name -> {
      let drawings = case list.key_find(library.drawings, name) {
        Ok(_) ->
          list.map(library.drawings, fn(drawing) {
            let #(n, _) = drawing
            case n == name {
              True -> #(n, source)
              False -> drawing
            }
          })
        Error(Nil) -> list.append(library.drawings, [#(name, source)])
      }
      Library(current: name, drawings: drawings)
    }
  }
}

fn from_examples() -> Library {
  let drawings = examples.all
  let current = case drawings {
    [#(name, _), ..] -> name
    [] -> "untitled"
  }
  let library = case drawings {
    [] -> Library(current, [#(current, blank_source)])
    _ -> Library(current, drawings)
  }
  save(library)
  library
}

fn normalize(library: Library) -> Library {
  case library.drawings {
    [] -> from_examples()
    drawings -> {
      // Merge in any starter examples that aren't in the saved library yet.
      let drawings =
        list.fold(examples.all, drawings, fn(acc, example) {
          let #(name, source) = example
          case list.key_find(acc, name) {
            Ok(_) -> acc
            Error(Nil) -> list.append(acc, [#(name, source)])
          }
        })
      case list.key_find(drawings, library.current) {
        Ok(_) -> Library(..library, drawings: drawings)
        Error(Nil) -> {
          let assert [#(name, _), ..] = drawings
          Library(current: name, drawings: drawings)
        }
      }
    }
  }
}

fn encode_library(library: Library) -> String {
  json.object([
    #("current", json.string(library.current)),
    #(
      "drawings",
      json.array(library.drawings, fn(drawing) {
        let #(name, source) = drawing
        json.object([
          #("name", json.string(name)),
          #("source", json.string(source)),
        ])
      }),
    ),
  ])
  |> json.to_string
}

fn library_decoder() -> decode.Decoder(Library) {
  {
    use current <- decode.field("current", decode.string)
    use drawings <- decode.field(
      "drawings",
      decode.list({
        use name <- decode.field("name", decode.string)
        use source <- decode.field("source", decode.string)
        decode.success(#(name, source))
      }),
    )
    decode.success(Library(current, drawings))
  }
}
