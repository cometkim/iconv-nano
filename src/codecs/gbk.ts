import type { Decoder, Encoder } from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";
import * as gb18030 from "./gb18030.js";

const encode: Encoder = (input, encodeOptions) =>
  gb18030.encode(input, { ...encodeOptions, isGBK: true });

const decode: Decoder = (input, decodeOptions) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;

  return getCachedTextDecoder("gbk", {
    fatal: false,
    ignoreBOM: !stripBOM,
  }).decode(input);
};

export { encode, decode };
