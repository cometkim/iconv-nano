// https://encoding.spec.whatwg.org/#single-byte-encoder
// https://encoding.spec.whatwg.org/#legacy-single-byte-encodings
const encodeSingleByteEncoding = (
  input: string,
  encodingIndex: Record<string, number>,
): Uint8Array<ArrayBuffer> => {
  const buf = new Uint8Array(input.length);
  for (let index = 0; index < input.length; index++) {
    // non-null, index is never larger than input.length
    const codePoint = input.codePointAt(index)!;
    if (0x00 <= codePoint && codePoint <= 0x7f) {
      buf[index] = codePoint;
    } else if (String.fromCodePoint(codePoint) in encodingIndex) {
      buf[index] = 0x80 + encodingIndex[String.fromCodePoint(codePoint)]!;
    } else {
      buf[index] = 0x3f; // ?
    }
  }
  return buf;
};

export { encodeSingleByteEncoding };
