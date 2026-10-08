import type {
  DecodeOptions,
  Decoder,
  EncodeOptions,
  Encoder,
  Endianness,
} from "../interfaces.js";
import { detectEndianness } from "../utils/detectEndianness.js";

const BYTE_ORDER_MARK = 0xfeff; // BOM

const encode: Encoder<EncodeOptions & { endianness?: Endianness }> = (
  input,
  options,
) => {
  const addBOM = options?.addBOM ?? false;
  const endianness = options?.endianness ?? "little-endian";
  const isLittleEndian = endianness === "little-endian";

  const buf = new Uint8Array(input.length * 4 + (addBOM ? 4 : 0));
  const dataView = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let byteOffset = 0;

  if (addBOM) {
    dataView.setUint32(byteOffset, BYTE_ORDER_MARK, isLittleEndian);
    byteOffset += 4;
  }

  for (const char of input) {
    const codePoint = char.codePointAt(0)!;
    dataView.setUint32(byteOffset, codePoint, isLittleEndian);
    byteOffset += 4;
  }

  return buf.slice(0, byteOffset);
};

const decode: Decoder<
  DecodeOptions & { endianness?: Endianness; detectEndianness?: boolean }
> = (input, decodeOptions) => {
  const detectedEndianness = decodeOptions?.detectEndianness
    ? detectEndianness(input, 4)
    : undefined;
  const stripBOM = decodeOptions?.stripBOM ?? true;
  const endianness =
    detectedEndianness ?? decodeOptions?.endianness ?? "little-endian";

  const dataView = ArrayBuffer.isView(input)
    ? new DataView(input.buffer, input.byteOffset, input.byteLength)
    : new DataView(input);

  let decodedInput = "";
  for (let index = 0; index < dataView.byteLength; index += 4) {
    const codePoint = dataView.getUint32(index, endianness === "little-endian");
    if (codePoint > 0x110000) {
      decodedInput += "�";
      continue;
    }
    if (stripBOM && index === 0 && codePoint === BYTE_ORDER_MARK) {
      continue;
    }
    decodedInput += String.fromCodePoint(codePoint);
  }
  return decodedInput;
};

export { encode, decode };
