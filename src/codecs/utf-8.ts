import type { Encoder, Decoder } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";
import { getCachedTextEncoder } from "../utils/getCachedTextEncoder.js";

/**
 * {@link EncodeOptions.addBOM} is ignored. If you want it to be output, append
 * "\ufeff" to your string
 */
const encode: Encoder = (input) => {
  return getCachedTextEncoder().encode(input);
};

/**
 * {@link DecodeOptions.stripBOM} will strip BOM if it is found at the beginning
 * of input
 */
const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  const bytes = ArrayBuffer.isView(input)
    ? new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
    : new Uint8Array(input);

  if (
    stripBOM &&
    bytes.byteLength >= 3 &&
    // BOM (0xfeff) in UTF-8 bytes
    bytes[0] === 0xef &&
    bytes[1] === 0xbb &&
    bytes[2] === 0xbf
  ) {
    return getCachedTextDecoder("utf-8", {
      fatal: false,
      ignoreBOM: !stripBOM,
    }).decode(input);
  }

  return getCachedTextDecoder("utf-8", {
    fatal: false,
    // Doesn't do anything for UTF-8, do it manually below
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
