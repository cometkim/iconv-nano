import macintosh from "../../../encodings/macintosh.json" with { type: "json" };
import type { BufferSource, DecodeOptions } from "../../interfaces.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const encode = (input: string): Uint8Array<ArrayBuffer> => {
  return encodeSingleByteEncoding(input, macintosh);
};

const decode = (input: BufferSource, decodeOptions?: DecodeOptions): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("macintosh", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
