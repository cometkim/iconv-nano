import type {
  BufferSource,
  DecodeOptions,
  EncodeOptions,
  Endianness,
} from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";

const encode = (
  input: string,
  options?: EncodeOptions & { endianness?: Endianness },
): Uint8Array<ArrayBuffer> => {
  const addBOM = options?.addBOM ?? false;
  const endianness = options?.endianness ?? "little-endian";
  const isLittleEndian = endianness === "little-endian";

  const arrayBuffer = new ArrayBuffer(input.length * 2 + (addBOM ? 2 : 0));
  const view = new DataView(arrayBuffer);
  let offset = 0;

  if (addBOM) {
    // BOM is 0xFEFF
    view.setUint16(offset, 0xfeff, isLittleEndian);
    offset += 2;
  }

  for (let index = 0; index < input.length; index++) {
    const codeUnit = input.charCodeAt(index);
    view.setUint16(offset, codeUnit, isLittleEndian);
    offset += 2;
  }

  return new Uint8Array(arrayBuffer);
};

const decode = (
  input: BufferSource,
  decodeOptions?: DecodeOptions & { endianness?: Endianness },
): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;
  const endianness = decodeOptions?.endianness ?? "little-endian";

  return getCachedTextDecoder(
    endianness === "little-endian" ? "utf-16le" : "utf-16be",
    { fatal: false, ignoreBOM: !stripBOM },
  ).decode(input);
};

export { encode, decode };
