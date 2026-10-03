import type {
  DecodeOptions,
  Decoder,
  EncodeOptions,
  Encoder,
  Endianness,
} from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";

const encode: Encoder<EncodeOptions & { endianness?: Endianness }> = (
  input,
  options,
): Uint8Array<ArrayBuffer> => {
  const addBOM = options?.addBOM ?? false;
  const endianness = options?.endianness ?? "little-endian";
  const isLittleEndian = endianness === "little-endian";

  const arrayBuffer = new ArrayBuffer(input.length * 2 + (addBOM ? 2 : 0));
  const dataView = new DataView(arrayBuffer);
  let byteOffset = 0;

  if (addBOM) {
    // BOM is 0xFEFF
    dataView.setUint16(byteOffset, 0xfeff, isLittleEndian);
    byteOffset += 2;
  }

  for (let index = 0; index < input.length; index++) {
    const codeUnit = input.charCodeAt(index);
    dataView.setUint16(byteOffset, codeUnit, isLittleEndian);
    byteOffset += 2;
  }

  return new Uint8Array(arrayBuffer);
};

const decode: Decoder<DecodeOptions & { endianness?: Endianness }> = (
  input,
  decodeOptions,
): string => {
  const stripBOM = decodeOptions?.stripBOM ?? true;
  const endianness = decodeOptions?.endianness ?? "little-endian";

  return getCachedTextDecoder(
    endianness === "little-endian" ? "utf-16le" : "utf-16be",
    { fatal: false, ignoreBOM: !stripBOM },
  ).decode(input);
};

export { encode, decode };
