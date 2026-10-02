type DecodeOptions = {
  /**
   * Skip the byte order mark when decoding the input
   * @default true
   */
  stripBOM?: boolean;
};

/**
 * For UTF-8 and single-byte encodings, there are no encode options because both
 * options are both meaningless when encoding. It is kept in
 * {@link DecodeOptions} because it has meaning when decoding
 *
 * @see {@link https://www.w3.org/International/questions/qa-byte-order-mark}
 */
type EncodeOptions = {
  /**
   * Add the byte order mark when encoding the input
   * @default false
   */
  addBOM?: boolean;
};

type BufferSource = ArrayBufferLike | ArrayBufferView;

type Endianness = "big-endian" | "little-endian";

export type { EncodeOptions, DecodeOptions, BufferSource, Endianness };
