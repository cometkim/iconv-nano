import { expect, test } from "vitest";

import euc_kr_encoding from "../encodings/euc-kr.json" with { type: "json" };
import shift_jis_encoding from "../encodings/shift_jis.json" with { type: "json" };
import * as euc_kr from "./codecs/euc-kr";
import * as shift_jis from "./codecs/shift_jis.js";

const CODECS = [
  { name: "Shift_JIS", codec: shift_jis, encoding: shift_jis_encoding },
  { name: "euc-kr", codec: euc_kr, encoding: euc_kr_encoding },
];

// Temporary test while setting up codecs as a quick sanity check before actual
// tests are set up
test.for(CODECS)("%s codec survives roundtrip", () => {
  const input = Object.keys(shift_jis_encoding).join("");
  const encodedInput = shift_jis.encode(input);
  expect(shift_jis.decode(encodedInput)).toBe(input);
});
