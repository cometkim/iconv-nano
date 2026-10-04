// https://encoding.spec.whatwg.org/#single-byte-encoder
// https://encoding.spec.whatwg.org/#legacy-single-byte-encodings
const encodeSingleByteEncoding = (
  input: string,
  encodingIndex: Record<string, number>,
): Uint8Array<ArrayBuffer> => {
  const buf = new Uint8Array(input.length);
  let byteOffset = 0;
  // for...of loop is faster
  // https://jsbm.dev/YK2fFDSwJPc6E
  // https://github.com/jeremy-code/iconv-nano/issues/3
  for (const char of input) {
    // non-null, 0 is never larger than input.length
    const codePoint = char.codePointAt(0)!;
    if (0x00 <= codePoint && codePoint <= 0x7f) {
      buf[byteOffset] = codePoint;
    } else if (String.fromCodePoint(codePoint) in encodingIndex) {
      buf[byteOffset] = 0x80 + encodingIndex[String.fromCodePoint(codePoint)]!;
    } else {
      buf[byteOffset] = 0x3f; // ?
    }
    byteOffset++;
  }
  return buf.slice(0, byteOffset);
};

export { encodeSingleByteEncoding };
