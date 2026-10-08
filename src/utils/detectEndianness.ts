import type { Endianness, BufferSource } from "../interfaces.js";

/**
 * @param bytesPerElement - Number of bytes per element (e.g. UTF-16 = 2, UTF-32
 *                          = 4)
 */
const detectEndianness = (
  input: BufferSource,
  bytesPerElement = 2,
): Endianness | undefined => {
  const buf = ArrayBuffer.isView(input)
    ? new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
    : new Uint8Array(input);

  if (buf.length < bytesPerElement) {
    return undefined;
  }

  // Little-endian BOM: FF FE [00 ...]
  if (buf[0] === 0xff && buf[1] === 0xfe) {
    for (let index = 2; index < bytesPerElement; index++) {
      if (buf[index] !== 0) {
        return undefined;
      }
    }
    return "little-endian";
  }

  // Big-endian BOM: [00 ...] FE FF
  if (buf[bytesPerElement - 2] === 0xfe && buf[bytesPerElement - 1] === 0xff) {
    for (let index = 0; index < bytesPerElement - 2; index++) {
      if (buf[index] !== 0) {
        return undefined;
      }
    }
    return "big-endian";
  }

  return undefined;
};

export { detectEndianness };
