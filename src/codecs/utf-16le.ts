import type { Encoder, Decoder } from "../interfaces.js";
import { encode as utf_16_encode, decode as utf_16_decode } from "./utf-16.js";

const encode: Encoder = (input, options) =>
  utf_16_encode(input, { ...options, endianness: "little-endian" });

const decode: Decoder = (input, options) =>
  utf_16_decode(input, { ...options, endianness: "little-endian" });

export { encode, decode };
