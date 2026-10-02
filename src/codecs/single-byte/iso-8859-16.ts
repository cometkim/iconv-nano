import iso_8859_16 from "../../../encodings/iso-8859-16.json" with { type: "json" };
import type { BufferSource, DecodeOptions } from "../../interfaces.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const encode = (input: string): Uint8Array<ArrayBuffer> => {
  return encodeSingleByteEncoding(input, iso_8859_16);
};

const decode = (input: BufferSource, decodeOptions?: DecodeOptions): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("iso-8859-16", {
    fatal: false,
    ignoreBOM: stripBOM,
  }).decode(input);
};

export { encode, decode };
