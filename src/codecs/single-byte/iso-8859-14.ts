import iso_8859_14 from "../../../encodings/iso-8859-14.json" with { type: "json" };
import type { Encoder, Decoder } from "../../interfaces.js";
import { createIndexMap } from "../../utils/createIndexMap.js";
import { encodeSingleByteEncoding } from "../../utils/encodeSingleByteEncoding.js";
import { getCachedTextDecoder } from "../../utils/getCachedTextDecoder.js";

const iso_8859_14_index = createIndexMap(iso_8859_14);

const encode: Encoder = (input) => {
  return encodeSingleByteEncoding(input, iso_8859_14_index);
};

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("iso-8859-14", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
