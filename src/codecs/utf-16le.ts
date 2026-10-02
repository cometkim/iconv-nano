import type {
  DecodeOptions,
  EncodeOptions,
  BufferSource,
} from "../interfaces.js";
import { encode as utf_16_encode, decode as utf_16_decode } from "./utf-16.js";

const encode = (
  input: string,
  options?: EncodeOptions,
): Uint8Array<ArrayBuffer> =>
  utf_16_encode(input, { ...options, endianness: "little-endian" });

const decode = (input: BufferSource, options?: DecodeOptions): string =>
  utf_16_decode(input, { ...options, endianness: "little-endian" });

export { encode, decode };
