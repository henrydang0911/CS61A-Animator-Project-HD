//# sourceMappingURL=data.mjs.map
import * as $json from "../gleam_json/gleam/json.mjs";
import * as $decode from "../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import {
  storageGet as storage_get,
  storageSet as storage_set,
  promptDrawingName as prompt_drawing_name,
} from "./data_ffi.mjs";
import * as $examples from "./examples.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "./gleam.mjs";

export { prompt_drawing_name, storage_get, storage_set };

const FILEPATH = "src\\data.gleam";

export class Library extends $CustomType {
  constructor(current, drawings) {
    super();
    this.current = current;
    this.drawings = drawings;
  }
}
export const Library$Library = (current, drawings) =>
  new Library(current, drawings);
export const Library$isLibrary = (value) => value instanceof Library;
export const Library$Library$current = (value) => value.current;
export const Library$Library$0 = (value) => value.current;
export const Library$Library$drawings = (value) => value.drawings;
export const Library$Library$1 = (value) => value.drawings;

const storage_key = "animator-library";

/**
 * Starter source for a brand-new drawing.
 */
export const blank_source = "fn draw(shape_slider: Int) -> List(Path) {\n  [Path(Line(Point(0, 0), Point(100, 100)), 0, 10, 2)]\n}\n";

/**
 * Sentinel value used by the drawing <select> for "create a new drawing".
 */
export const new_drawing_option = "__new__";

function encode_library(library) {
  let _pipe = $json.object(
    listPrepend(
      ["current", $json.string(library.current)],
      listPrepend(
        [
          "drawings",
          $json.array(
            library.drawings,
            (drawing) => {
              let name = drawing[0];
              let source = drawing[1];
              return $json.object(
                listPrepend(
                  ["name", $json.string(name)],
                  listPrepend(
                    ["source", $json.string(source)],
                    $List$Empty$const,
                  ),
                ),
              );
            },
          ),
        ],
        $List$Empty$const,
      ),
    ),
  );
  return $json.to_string(_pipe);
}

/**
 * Persist the whole library (names + full source text) under one key.
 */
export function save(library) {
  return storage_set(storage_key, encode_library(library));
}

function from_examples() {
  let drawings = $examples.all;
  let _block;
  if (drawings instanceof $Empty) {
    _block = "untitled";
  } else {
    let name = drawings.head[0];
    _block = name;
  }
  let current = _block;
  let _block$1;
  if (drawings instanceof $Empty) {
    _block$1 = new Library(
      current,
      listPrepend([current, blank_source], $List$Empty$const),
    );
  } else {
    _block$1 = new Library(current, drawings);
  }
  let library = _block$1;
  save(library);
  return library;
}

function normalize(library) {
  let $ = library.drawings;
  if ($ instanceof $Empty) {
    return from_examples();
  } else {
    let drawings = $;
    let $1 = $list.key_find(drawings, library.current);
    if ($1 instanceof Ok) {
      return library;
    } else {
      let name;
      if (drawings instanceof $Empty) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "data",
          143,
          "normalize",
          "Pattern match failed, no pattern matched the value.",
          {
            value: drawings,
            start: 4592,
            end: 4630,
            pattern_start: 4603,
            pattern_end: 4619
          }
        )
      } else {
        name = drawings.head[0];
      }
      return new Library(name, library.drawings);
    }
  }
}

function library_decoder() {
  return $decode.field(
    "current",
    $decode.string,
    (current) => {
      return $decode.field(
        "drawings",
        $decode.list(
          $decode.field(
            "name",
            $decode.string,
            (name) => {
              return $decode.field(
                "source",
                $decode.string,
                (source) => { return $decode.success([name, source]); },
              );
            },
          ),
        ),
        (drawings) => { return $decode.success(new Library(current, drawings)); },
      );
    },
  );
}

/**
 * Load the library from localStorage, or start from examples.all when empty/broken.
 */
export function load() {
  let $ = storage_get(storage_key);
  if ($ instanceof Ok) {
    let raw = $[0];
    let $1 = $json.parse(raw, library_decoder());
    if ($1 instanceof Ok) {
      let library = $1[0];
      return normalize(library);
    } else {
      return from_examples();
    }
  } else {
    return from_examples();
  }
}

/**
 * The source of the currently open drawing, or a blank template if missing.
 */
export function current_source(library) {
  let $ = $list.key_find(library.drawings, library.current);
  if ($ instanceof Ok) {
    let source = $[0];
    return source;
  } else {
    return blank_source;
  }
}

/**
 * Names in menu order (for the <select>).
 */
export function names(library) {
  return $list.map(library.drawings, (d) => { return d[0]; });
}

/**
 * Open an existing drawing by name.
 */
export function select(library, name) {
  let $ = $list.key_find(library.drawings, name);
  if ($ instanceof Ok) {
    return new Library(name, library.drawings);
  } else {
    return library;
  }
}

/**
 * Replace the current drawing's source (keeps the typed text for Gradescope).
 */
export function set_current_source(library, source) {
  let drawings = $list.map(
    library.drawings,
    (drawing) => {
      let name = drawing[0];
      let $ = name === library.current;
      if ($) {
        return [name, source];
      } else {
        return drawing;
      }
    },
  );
  return new Library(library.current, drawings);
}

/**
 * Add a new named drawing and make it current. If the name already exists,
 * overwrite its source.
 */
export function add(library, name, source) {
  let name$1 = $string.trim(name);
  if (name$1 === "") {
    return library;
  } else {
    let name$2 = name$1;
    let _block;
    let $ = $list.key_find(library.drawings, name$2);
    if ($ instanceof Ok) {
      _block = $list.map(
        library.drawings,
        (drawing) => {
          let n = drawing[0];
          let $1 = n === name$2;
          if ($1) {
            return [n, source];
          } else {
            return drawing;
          }
        },
      );
    } else {
      _block = $list.append(
        library.drawings,
        listPrepend([name$2, source], $List$Empty$const),
      );
    }
    let drawings = _block;
    return new Library(name$2, drawings);
  }
}
