import windows_1256 from "../../../encodings/windows-1256.json" with { type: "json" };
import type { Encoder, Decoder } from "../../interfaces.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const encode: Encoder = (input) => {
  return encodeSingleByteEncoding(input, windows_1256);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("windows-1256", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
