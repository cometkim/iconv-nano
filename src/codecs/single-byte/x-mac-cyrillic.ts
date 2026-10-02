import x_mac_cyrillic from "../../../encodings/x-mac-cyrillic.json" with { type: "json" };
import type { BufferSource, DecodeOptions } from "../../interfaces.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const encode = (input: string): Uint8Array<ArrayBuffer> => {
  return encodeSingleByteEncoding(input, x_mac_cyrillic);
};

const decode = (input: BufferSource, decodeOptions?: DecodeOptions): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("x-mac-cyrillic", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
