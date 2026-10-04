// https://infra.spec.whatwg.org/#ascii-code-point
const isAsciiCodePoint = (codePoint: number): boolean => {
  return 0x00 <= codePoint && codePoint <= 0x7f;
};

export { isAsciiCodePoint };
