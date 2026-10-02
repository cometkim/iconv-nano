import windows_1254 from "../../../encodings/windows-1254.json" with { type: "json" };
import type { BufferSource, DecodeOptions } from "../../interfaces.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const encode = (input: string): Uint8Array<ArrayBuffer> => {
  return encodeSingleByteEncoding(input, windows_1254);
};

const decode = (input: BufferSource, decodeOptions?: DecodeOptions): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("windows-1254", {
    fatal: false,
    ignoreBOM: stripBOM,
  }).decode(input);
};

export { encode, decode };
