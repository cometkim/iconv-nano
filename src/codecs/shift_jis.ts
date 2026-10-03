import shift_jis from "../../encodings/shift_jis.json" with { type: "json" };
import type { DecodeOptions, BufferSource } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";

// https://encoding.spec.whatwg.org/#shift_jis-encoder
const encode = (input: string): Uint8Array<ArrayBuffer> => {
  const arrayBuffer = new ArrayBuffer(input.length * 2);
  let byteOffset = 0;
  const buf = new Uint8Array(arrayBuffer);

  for (let index = 0; index < input.length; index++) {
    let codePoint = input.codePointAt(index)!;
    if ((0x00 <= codePoint && codePoint <= 0x7f) || codePoint === 0x80) {
      buf[byteOffset] = codePoint;
      byteOffset++;
    } else if (codePoint === 0xa5) {
      buf[byteOffset] = 0x5c;
      byteOffset++;
    } else if (codePoint === 0x203e) {
      buf[byteOffset] = 0x7e;
      byteOffset++;
    } else if (0xff61 <= codePoint && codePoint <= 0xff9f) {
      buf[byteOffset] = codePoint - 0xff61 + 0xa1;
      byteOffset++;
    } else {
      if (codePoint === 0x2212) {
        codePoint = 0xff0d;
      }
      const pointer = (shift_jis as Record<string, number>)[
        String.fromCodePoint(codePoint)
      ]!;
      const leading = Math.floor(pointer / 188);
      const leadingOffset = leading < 0x1f ? 0x81 : 0xc1;
      const trailing = pointer % 188;
      const offset = trailing < 0x3f ? 0x40 : 0x41;
      buf[byteOffset] = leading + leadingOffset;
      buf[byteOffset + 1] = trailing + offset;
      byteOffset += 2;
    }
  }
  return buf.subarray(0, byteOffset);
};

const decode = (input: BufferSource, decodeOptions?: DecodeOptions): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("shift_jis", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
