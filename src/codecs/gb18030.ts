import gb18030_ranges from "../../encodings/gb18030-ranges.json" with { type: "json" };
import gb18030 from "../../encodings/gb18030.json" with { type: "json" };
import type { Encoder, Decoder, EncodeOptions } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";

const TABLE: Record<number, [number, number]> = {
  0xe78d: [0xa6, 0xd9],
  0xe78e: [0xa6, 0xda],
  0xe78f: [0xa6, 0xdb],
  0xe790: [0xa6, 0xdc],
  0xe791: [0xa6, 0xdd],
  0xe792: [0xa6, 0xde],
  0xe793: [0xa6, 0xdf],
  0xe794: [0xa6, 0xec],
  0xe795: [0xa6, 0xed],
  0xe796: [0xa6, 0xf3],
  0xe81e: [0xfe, 0x59],
  0xe826: [0xfe, 0x61],
  0xe82b: [0xfe, 0x66],
  0xe82c: [0xfe, 0x67],
  0xe832: [0xfe, 0x6d],
  0xe843: [0xfe, 0x7e],
  0xe854: [0xfe, 0x90],
  0xe864: [0xfe, 0xa0],
};

// https://encoding.spec.whatwg.org/#indexes
const getGb18030RangesPointer = (codePoint: number) => {
  if (codePoint === 0xe7c7) {
    return 7457;
  }

  let rangeIndex: number | undefined = undefined;
  let [left, right] = [0, gb18030_ranges.length - 1];
  while (left <= right) {
    const mid = (left + right) >> 1;
    const currRange = gb18030_ranges[mid]!;

    if (currRange[1]! <= codePoint) {
      rangeIndex = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (rangeIndex === undefined) {
    throw new Error("dfsifkj");
  }

  const [pointerOffset, codePointOffset] = gb18030_ranges[rangeIndex]!;
  return pointerOffset! + codePoint - codePointOffset!;
};

// https://encoding.spec.whatwg.org/#gb18030-encoder
const encode: Encoder<EncodeOptions & { isGBK?: boolean }> = (
  input,
  encodeOptions,
) => {
  let isGBK = encodeOptions?.isGBK ?? false;
  const buf = new Uint8Array(input.length * 2);
  let byteOffset = 0;

  for (const char of input) {
    let codePoint = char.codePointAt(0)!;
    if (0x00 <= codePoint && codePoint <= 0x7f) {
      buf[byteOffset] = codePoint;
      byteOffset++;
    } else if (codePoint === 0xe5e5) {
      continue;
    } else if (isGBK && codePoint === 0x20ac) {
      buf[byteOffset] = 0x80;
      byteOffset++;
    } else if (codePoint in TABLE) {
      buf.set(TABLE[codePoint]!, byteOffset);
      byteOffset += 2;
    } else {
      let pointer = (gb18030 as Record<string, number>)[
        String.fromCodePoint(codePoint)
      ];

      if (pointer !== undefined) {
        const leading = Math.floor(pointer / 190) + 0x81;
        const trailing = pointer % 190;
        const offset = trailing < 0x3f ? 0x40 : 0x41;
        buf[byteOffset] = leading;
        buf[byteOffset + 1] = trailing + offset;
        byteOffset += 2;
      }

      if (isGBK) {
        continue;
      }

      pointer = getGb18030RangesPointer(codePoint);
      const byte1 = Math.floor(pointer / (10 * 126 * 10));
      pointer = pointer % (10 * 126 * 10);
      const byte2 = Math.floor(pointer / (10 * 126));
      pointer = pointer % (10 * 126);
      const byte3 = pointer / 10;
      const byte4 = pointer % 10;
      buf[byteOffset] = byte1 + 0x81;
      buf[byteOffset + 1] = byte2 + 0x30;
      buf[byteOffset + 2] = byte3 + 0x81;
      buf[byteOffset + 3] = byte4 + 0x30;
    }
  }
  return buf.subarray(0, byteOffset);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("gb18030", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
