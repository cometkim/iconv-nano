import type { Encoder, Decoder } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";
import { isAsciiCodePoint } from "../utils/isAsciiCodePoint.js";

const encode: Encoder = (input) => {
  const buf = new Uint8Array(input.length);
  let byteOffset = 0;

  for (const char of input) {
    const codePoint = char.codePointAt(0)!;
    if (isAsciiCodePoint(codePoint)) {
      buf[byteOffset] = codePoint;
    } else if (0xf780 <= codePoint && codePoint <= 0xf7ff) {
      buf[byteOffset] = codePoint - 0xf780 + 0x80;
    } else {
      buf[byteOffset] = 0x3f; // ?
    }
    byteOffset++;
  }
  return buf.slice(0, byteOffset);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("replacement", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
