import type {
  DecodeOptions,
  Decoder,
  EncodeOptions,
  Encoder,
  Endianness,
} from "../interfaces.js";
import { getCachedTextDecoder } from "../utils/getCachedTextDecoder.js";

const BYTE_ORDER_MARK = 0xfeff; // BOM in UTF-16

const encode: Encoder<EncodeOptions & { endianness?: Endianness }> = (
  input,
  options,
): Uint8Array<ArrayBuffer> => {
  const addBOM = options?.addBOM ?? false;
  const endianness = options?.endianness ?? "little-endian";
  const isLittleEndian = endianness === "little-endian";

  const dataView = new DataView(
    new ArrayBuffer(input.length * 2 + (addBOM ? 2 : 0)),
  );
  let byteOffset = 0;

  if (addBOM) {
    dataView.setUint16(byteOffset, BYTE_ORDER_MARK, isLittleEndian);
    byteOffset += 2;
  }

  for (let index = 0; index < input.length; index++) {
    // Using charCodeAt here instead of codePointAt is intentional
    const codeUnit = input.charCodeAt(index);
    dataView.setUint16(byteOffset, codeUnit, isLittleEndian);
    byteOffset += 2;
  }

  return new Uint8Array(dataView.buffer);
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
