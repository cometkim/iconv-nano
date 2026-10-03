import { expect, test } from "vitest";

import big5_encoding from "../encodings/big5.json" with { type: "json" };
import euc_kr_encoding from "../encodings/euc-kr.json" with { type: "json" };
import gb18030_encoding from "../encodings/gb18030.json" with { type: "json" };
import jis0208_encoding from "../encodings/jis0208.json" with { type: "json" };
import shift_jis_encoding from "../encodings/shift_jis.json" with { type: "json" };
import * as iconv from "./index";

const CODECS = [
  { name: "Shift_JIS", codec: iconv.shift_jis, encoding: shift_jis_encoding },
  { name: "euc-kr", codec: iconv.euc_kr, encoding: euc_kr_encoding },
  { name: "big5", codec: iconv.big5, encoding: big5_encoding },
  { name: "gb18030", codec: iconv.gb18030, encoding: gb18030_encoding },
  { name: "euc-jp", codec: iconv.euc_jp, encoding: jis0208_encoding },
];

// Temporary test while setting up codecs as a quick sanity check before actual
// tests are set up
test.for(CODECS)("%s codec survives roundtrip", ({ encoding, codec }) => {
  const input = Object.keys(encoding).join("");
  const encodedInput = codec.encode(input);
  expect(codec.decode(encodedInput)).toBe(input);
});
