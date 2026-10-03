import { expect, test } from "vitest";

import gb18030_encoding from "../encodings/gb18030.json" with { type: "json" };
import jis0208_encoding from "../encodings/jis0208.json" with { type: "json" };
import * as iconv from "./index";

const CODECS = [
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
