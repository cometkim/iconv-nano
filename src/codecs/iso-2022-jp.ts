import iso_2022_jp_katakana from "../../encodings/iso-2022-jp-katakana.json" with { type: "json" };
import jis0208 from "../../encodings/jis0208.json" with { type: "json" };
import type { Encoder, Decoder } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";
import { isAsciiCodePoint } from "../utils/isAsciiCodePoint.js";

type EncoderState = "ascii" | "roman" | "jis0208";

let katakanaByIndex: string[] | undefined;

const getKatakanaByIndex = (): Exclude<typeof katakanaByIndex, undefined> => {
  if (katakanaByIndex === undefined) {
    katakanaByIndex = [];
    for (const [char, index] of Object.entries(iso_2022_jp_katakana)) {
      katakanaByIndex[index] = char;
    }
  }
  return katakanaByIndex;
};

const YEN_CODE_POINT = 0xa5; // ¥
const OVERLINE_CODE_POINT = 0x203e; // ‾

// Steps from the specification will have commment "STEP_X"
// https://encoding.spec.whatwg.org/#iso-2022-jp-encoder
const encode: Encoder = (input) => {
  // Worst case for a single code point is a 3 byte escape sequence followed by
  // 2 bytes for the character plus 3 bytes for the trailing escape sequence
  // returning to ASCII
  const buf = new Uint8Array(input.length * 5 + 3);
  let byteOffset = 0;
  let encoderState: EncoderState = "ascii";

  let i = 0;
  while (i < input.length) {
    let codePoint = input.codePointAt(i)!;
    const codePointWidth = codePoint > 0xffff ? 2 /* surrogate pair */ : 1;
    i += codePointWidth;

    // STEP_3
    if (
      (encoderState === "ascii" || encoderState === "roman") &&
      (codePoint === 0x0e /* Shift Out (SO) */ ||
        codePoint === 0x0f /* Shift In (SI) */ ||
        codePoint === 0x1b) /* ESCAPE (ESC) */
    ) {
      buf[byteOffset] = 0x3f; // ?
      byteOffset++;
      continue;
    }

    // STEP_4
    if (encoderState === "ascii" && isAsciiCodePoint(codePoint)) {
      buf[byteOffset] = codePoint;
      byteOffset++;
      continue;
    }

    // STEP_5
    if (
      encoderState === "roman" &&
      ((isAsciiCodePoint(codePoint) &&
        codePoint !== 0x5c /* \ */ &&
        codePoint !== 0x7e) /* ~ */ ||
        codePoint === YEN_CODE_POINT ||
        codePoint === OVERLINE_CODE_POINT)
    ) {
      buf[byteOffset] =
        codePoint === YEN_CODE_POINT
          ? 0x5c
          : codePoint === OVERLINE_CODE_POINT
            ? 0x7e
            : codePoint;
      byteOffset++;
      continue;
    }

    // STEP_6
    if (isAsciiCodePoint(codePoint) && encoderState !== "ascii") {
      i -= codePointWidth;
      encoderState = "ascii";
      buf.set([0x1b, 0x28, 0x42], byteOffset);
      byteOffset += 3;
      continue;
    }

    // STEP_7
    if (
      (codePoint === YEN_CODE_POINT || codePoint === OVERLINE_CODE_POINT) &&
      encoderState !== "roman"
    ) {
      i -= codePointWidth;
      encoderState = "roman";
      buf.set([0x1b, 0x28, 0x4a], byteOffset);
      byteOffset += 3;
      continue;
    }

    // STEP_8
    if (codePoint === 0x2212 /* − */) {
      codePoint = 0xff0d; // －
    }

    // STEP_9
    if (/* ｡ */ 0xff61 <= codePoint && codePoint <= 0xff9f /* ﾟ */) {
      codePoint = getKatakanaByIndex()[codePoint - 0xff61]!.codePointAt(0)!;
    }

    // STEP_10
    const pointer = (jis0208 as Record<string, number>)[
      String.fromCodePoint(codePoint)
    ];

    // STEP_11
    if (pointer === undefined) {
      if (encoderState === "jis0208") {
        i -= codePointWidth;
        encoderState = "ascii";
        buf.set([0x1b, 0x28, 0x42], byteOffset);
        byteOffset += 3;
        continue;
      }
      buf[byteOffset] = 0x3f; // ?
      byteOffset++;
      continue;
    }

    // STEP_12
    if (encoderState !== "jis0208") {
      i -= codePointWidth;
      encoderState = "jis0208";
      buf.set([0x1b, 0x24, 0x42], byteOffset);
      byteOffset += 3;
      continue;
    }

    buf[byteOffset] = Math.floor(pointer / 94) + 0x21; // STEP_13
    buf[byteOffset + 1] = (pointer % 94) + 0x21; // STEP_14
    byteOffset += 2; // STEP_15
  }

  // STEP_1
  if (encoderState !== "ascii") {
    encoderState = "ascii";
    buf.set([0x1b, 0x28, 0x42], byteOffset);
    byteOffset += 3;
  }

  return buf.slice(0, byteOffset);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("iso-2022-jp", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
