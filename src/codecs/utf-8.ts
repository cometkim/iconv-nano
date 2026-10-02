import type { DecodeOptions, BufferSource } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";
import { getCachedTextEncoder } from "../utils/getCachedTextEncoder.js";

const encode = (input: string): Uint8Array<ArrayBuffer> => {
  return getCachedTextEncoder().encode(input);
};

const decode = (input: BufferSource, decodeOptions?: DecodeOptions): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("utf-8", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
