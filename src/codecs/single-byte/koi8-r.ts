import koi8_r from "../../../encodings/koi8-r.json" with { type: "json" };
import type { Encoder, Decoder } from "../../interfaces.js";
import { createIndexMap } from "../../utils/createIndexMap.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const koi8_r_index = createIndexMap(koi8_r);

const encode: Encoder = (input) => {
  return encodeSingleByteEncoding(input, koi8_r_index);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("koi8-r", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
