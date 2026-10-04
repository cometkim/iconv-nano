import jis0208 from "../../encodings/jis0208.json" with { type: "json" };
import type { Encoder, Decoder } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";

// https://encoding.spec.whatwg.org/#euc-jp-encoder
const encode: Encoder = (input) => {
  const buf = new Uint8Array(input.length * 2);
  let byteOffset = 0;

  for (const char of input) {
    let codePoint = char.codePointAt(0)!;
    if (0x00 <= codePoint && codePoint <= 0x7f) {
      buf[byteOffset] = codePoint;
      byteOffset++;
    } else if (codePoint === 0x00a5 /* ¥ */) {
      buf[byteOffset] = 0x5c; // \
      byteOffset++;
    } else if (codePoint === 0x203e /* ‾ */) {
      buf[byteOffset] = 0x7e; // ~
      byteOffset++;
    } else if (/* ｡ */ 0xff61 <= codePoint && codePoint <= 0xff9f /* ﾟ */) {
      buf[byteOffset] = 0x8e;
      buf[byteOffset + 1] = codePoint - 0xff61 + 0xa1;
      byteOffset += 2;
    } else {
      if (codePoint === 0x2212 /* − */) {
        codePoint = 0xff0d; // －
      }
      const pointer = (jis0208 as Record<string, number>)[
        String.fromCodePoint(codePoint)
      ];
      if (pointer === undefined) {
        buf[byteOffset] = 0x3f; // ?
        byteOffset++;
        continue;
      }
      const leading = Math.floor(pointer / 94) + 0xa1;
      const trailing = (pointer % 94) + 0xa1;
      buf[byteOffset] = leading;
      buf[byteOffset + 1] = trailing;
      byteOffset += 2;
    }
  }
  return buf.slice(0, byteOffset);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("euc-jp", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
