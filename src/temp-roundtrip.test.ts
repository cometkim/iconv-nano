import { expect, test } from "vitest";

import big5_encoding from "../encodings/big5.json" with { type: "json" };
import euc_kr_encoding from "../encodings/euc-kr.json" with { type: "json" };
import shift_jis_encoding from "../encodings/shift_jis.json" with { type: "json" };
import * as big5 from "./codecs/big5.js";
import * as euc_kr from "./codecs/euc-kr";
import * as shift_jis from "./codecs/shift_jis.js";

const CODECS = [
  { name: "Shift_JIS", codec: shift_jis, encoding: shift_jis_encoding },
  { name: "euc-kr", codec: euc_kr, encoding: euc_kr_encoding },
  { name: "big5", codec: big5, encoding: big5_encoding },
];

// Temporary test while setting up codecs as a quick sanity check before actual
// tests are set up
test.for(CODECS)("%s codec survives roundtrip", () => {
  const input = Object.keys(shift_jis_encoding).join("");
  const encodedInput = shift_jis.encode(input);
  expect(shift_jis.decode(encodedInput)).toBe(input);
});
