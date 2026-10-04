import { describe, expect, it } from "vitest";

import gb18030_encoding from "../encodings/gb18030.json" with { type: "json" };
import iso_2022_jp_katakana from "../encodings/iso-2022-jp-katakana.json" with { type: "json" };
import jis0208_encoding from "../encodings/jis0208.json" with { type: "json" };
import * as iconv from "./index";

const CODECS = [
  { name: "GBK", codec: iconv.gbk, encoding: gb18030_encoding },
  { name: "gb18030", codec: iconv.gb18030, encoding: gb18030_encoding },
  {
    name: "iso-2022-jp",
    codec: iconv.iso_2022_jp,
    encoding: { ...iso_2022_jp_katakana, ...jis0208_encoding },
  },
];

// Temporary test while setting up codecs as a quick sanity check before actual
// tests are set up
describe.for(CODECS)("$name", ({ encoding, codec }) => {
  it("survives roundtrip conversion", () => {
    const input = Object.keys(encoding).join("");
    const encodedInput = codec.encode(input);
    expect(codec.decode(encodedInput)).toBe(input);
  });
});
