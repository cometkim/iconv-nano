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
) => {
  const addBOM = options?.addBOM ?? false;
  const endianness = options?.endianness ?? "little-endian";
  const isLittleEndian = endianness === "little-endian";

  const data = new Uint8Array(input.length * 2 + (addBOM ? 2 : 0));
  // According to benchmarking on both the DOM and WebWorker, using a DataView
  // is about as fast as using a Uint16Array, even on the native platform's
  // endianness. Hence, handle both cases with DataView for simplicity.
  // https://jsbm.dev/ATDUeL7y9nnz8
  const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let byteOffset = 0;

  if (addBOM) {
    dataView.setUint16(byteOffset, BYTE_ORDER_MARK, isLittleEndian);
    byteOffset += 2;
  }

  for (let index = 0; index < input.length; index++) {
    // Using charCodeAt here instead of codePointAt is intentional
    const charCode = input.charCodeAt(index);
    dataView.setUint16(byteOffset, charCode, isLittleEndian);
    byteOffset += 2;
  }

  return data;
};

const decode: Decoder<DecodeOptions & { endianness?: Endianness }> = (
  input,
  decodeOptions,
) => {
  const stripBOM = decodeOptions?.stripBOM ?? true;
  const endianness = decodeOptions?.endianness ?? "little-endian";

  return getCachedTextDecoder(
    endianness === "little-endian" ? "utf-16le" : "utf-16be",
    { fatal: false, ignoreBOM: !stripBOM },
  ).decode(input);
};

export { encode, decode };
