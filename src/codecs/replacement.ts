import type { Encoder, Decoder } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";
import { getCachedTextEncoder } from "../utils/getCachedTextEncoder.js";

/**
 * Per the current spec, "replacement" has no encoder (and truthfully, it really
 * doesn't make sense to have one). However, in the past, it claimed that UTF-8
 * was the encoder for replacement, so that is what will be used
 *
 * @see {@link https://encoding.spec.whatwg.org/#replacement}
 * @see {@link https://www.w3.org/International/docs/encoding/#replacement-encoder}
 */
const encode: Encoder = (input) => {
  return getCachedTextEncoder().encode(input);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("replacement", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
