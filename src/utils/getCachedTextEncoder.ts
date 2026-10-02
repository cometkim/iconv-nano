/// <reference lib="dom" />

let cachedTextEncoder: TextEncoder | undefined;

// Only UTF-8 is supported
// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encoding
const getCachedTextEncoder = (): TextEncoder => {
  return (cachedTextEncoder ??= new TextEncoder());
};

export { getCachedTextEncoder };
