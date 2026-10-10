import macintosh from "../../../encodings/macintosh.json" with { type: "json" };
import type { Encoder, Decoder } from "../../interfaces.js";
import { createIndexMap } from "../../utils/createIndexMap.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const macintosh_index = createIndexMap(macintosh);

const encode: Encoder = (input) => {
  return encodeSingleByteEncoding(input, macintosh_index);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("macintosh", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
