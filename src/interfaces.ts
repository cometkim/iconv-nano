type DecodeOptions = {
  /**
   * Skip the byte order mark when decoding the input
   * @default true
   */
  stripBOM?: boolean;
};

type BufferSource = ArrayBufferLike | ArrayBufferView;

export type { DecodeOptions, BufferSource };
