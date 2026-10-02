import windows_1258 from "../../../encodings/windows-1258.json" with { type: "json" };
import type { BufferSource, DecodeOptions } from "../../interfaces.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const encode = (input: string): Uint8Array<ArrayBuffer> => {
  return encodeSingleByteEncoding(input, windows_1258);
};

const decode = (input: BufferSource, decodeOptions?: DecodeOptions): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("windows-1258", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
