import iso_8859_10 from "../../../encodings/iso-8859-10.json" with { type: "json" };
import type { Encoder, Decoder } from "../../interfaces.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const encode: Encoder = (input) => {
  return encodeSingleByteEncoding(input, iso_8859_10);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("iso-8859-10", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
