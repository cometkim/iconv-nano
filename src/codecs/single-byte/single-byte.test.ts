import { describe, expect, it } from "vitest";

import * as ibm866 from "./ibm866.js";
import * as iso_8859_2 from "./iso-8859-2.js";
import * as iso_8859_3 from "./iso-8859-3.js";
import * as iso_8859_4 from "./iso-8859-4.js";
import * as iso_8859_5 from "./iso-8859-5.js";
import * as iso_8859_6 from "./iso-8859-6.js";
import * as iso_8859_7 from "./iso-8859-7.js";
import * as iso_8859_8_i from "./iso-8859-8-i.js";
import * as iso_8859_8 from "./iso-8859-8.js";
import * as iso_8859_10 from "./iso-8859-10.js";
import * as iso_8859_13 from "./iso-8859-13.js";
import * as iso_8859_14 from "./iso-8859-14.js";
import * as iso_8859_15 from "./iso-8859-15.js";
import * as iso_8859_16 from "./iso-8859-16.js";
import * as koi8_r from "./koi8-r.js";
import * as koi8_u from "./koi8-u.js";
import * as macintosh from "./macintosh.js";
import * as windows_874 from "./windows-874.js";
import * as windows_1250 from "./windows-1250.js";
import * as windows_1251 from "./windows-1251.js";
import * as windows_1252 from "./windows-1252.js";
import * as windows_1253 from "./windows-1253.js";
import * as windows_1254 from "./windows-1254.js";
import * as windows_1255 from "./windows-1255.js";
import * as windows_1256 from "./windows-1256.js";
import * as windows_1257 from "./windows-1257.js";
import * as windows_1258 from "./windows-1258.js";
import * as x_mac_cyrillic from "./x-mac-cyrillic.js";

const CODECS = {
  ibm866,
  iso_8859_2,
  iso_8859_3,
  iso_8859_4,
  iso_8859_5,
  iso_8859_6,
  iso_8859_7,
  iso_8859_8_i,
  iso_8859_8,
  iso_8859_10,
  iso_8859_13,
  iso_8859_14,
  iso_8859_15,
  iso_8859_16,
  koi8_r,
  koi8_u,
  macintosh,
  windows_874,
  windows_1250,
  windows_1251,
  windows_1252,
  windows_1253,
  windows_1254,
  windows_1255,
  windows_1256,
  windows_1257,
  windows_1258,
  x_mac_cyrillic,
};

describe("Legacy single-byte encodings", () => {
  /**
   * Since single-byte encodings are by definition, a single byte, we can use
   * the TextDecoder API to build a string that has every possible input from a
   * Uint8Array with values 0-255. For all of these codecs, the main encoder
   * logic is in {@link encodeSingleByteEncoding}, so this is effectively a
   * sanity check that verifies these codec indexes are correct.
   */
  it.for(Object.entries(CODECS))(
    "%s codec survives roundtrip conversion",
    ([, codec]) => {
      const bytes = new Uint8Array(Array.from({ length: 256 }, (_, i) => i));
      // TextDecoder replaces invalid characters with the unicode replacement
      // character. Since these are all ASCII-compatible single-byte encodings,
      // replace that character with a question mark. This is the same behavior
      // Python uses in its codecs library
      // https://docs.python.org/3/library/codecs.html#error-handlers
      const input = codec.decode(bytes).replaceAll("\uFFFD", "?");
      const encodedInput = codec.encode(input);
      expect(codec.decode(encodedInput)).toBe(input);
    },
  );
});
