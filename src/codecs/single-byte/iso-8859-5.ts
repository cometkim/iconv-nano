import iso_8859_5 from "../../../encodings/iso-8859-5.json" with { type: "json" };
import type { Encoder, Decoder } from "../../interfaces.js";
import { createIndexMap } from "../../utils/createIndexMap.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const iso_8859_5_index = createIndexMap(iso_8859_5);

const encode: Encoder = (input) => {
  return encodeSingleByteEncoding(input, iso_8859_5_index);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("iso-8859-5", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
