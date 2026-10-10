import iso_8859_3 from "../../../encodings/iso-8859-3.json" with { type: "json" };
import type { Encoder, Decoder } from "../../interfaces.js";
import { createIndexMap } from "../../utils/createIndexMap.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const iso_8859_3_index = createIndexMap(iso_8859_3);

const encode: Encoder = (input) => {
  return encodeSingleByteEncoding(input, iso_8859_3_index);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("iso-8859-3", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
