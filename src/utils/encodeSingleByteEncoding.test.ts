import { describe, expect, it } from "vitest";

import { encodeSingleByteEncoding } from "./encodeSingleByteEncoding.js";

const encodingIndex = { "€": 0, é: 0x69, я: 0x7f };

// UTF-8 is compatible with ASCII
const textEncoder = new TextEncoder();

describe("encodeSingleByteEncoding", () => {
  it("returns an empty array for an empty string", () => {
    expect(encodeSingleByteEncoding("", encodingIndex)).toEqual(
      new Uint8Array(0),
    );
  });

  it("returns ASCII unchanged", () => {
    const input = "Hello, World!\u0000\u007f";
    expect(encodeSingleByteEncoding(input, encodingIndex)).toEqual(
      textEncoder.encode(input),
    );
  });

  it("returns non-ASCII characters as 0x80 + their index value", () => {
    expect(encodeSingleByteEncoding("€", encodingIndex)).toEqual(
      Uint8Array.of(0x80),
    );
    expect(encodeSingleByteEncoding("é", encodingIndex)).toEqual(
      Uint8Array.of(0x80 + encodingIndex["é"]),
    );
    expect(encodeSingleByteEncoding("я", encodingIndex)).toEqual(
      Uint8Array.of(0x80 + encodingIndex["я"]),
    );
  });

  it("returns ASCII and mapped characters", () => {
    expect(encodeSingleByteEncoding("a€b", encodingIndex)).toEqual(
      Uint8Array.of(0x61, 0x80, 0x62),
    );
    expect(encodeSingleByteEncoding("a€b", encodingIndex).toHex()).toBe(
      "618062",
    );
  });

  it("replaces unmappable characters with '?' (0x3f)", () => {
    expect(encodeSingleByteEncoding("日", encodingIndex)).toEqual(
      Uint8Array.of(0x3f),
    );
    expect(encodeSingleByteEncoding("a日b", encodingIndex)).toEqual(
      Uint8Array.of(0x61, 0x3f, 0x62),
    );
  });

  // https://eev.ee/blog/2015/09/12/dark-corners-of-unicode/#javascript-has-no-string-type
  it("returns one '?' for astral characters with multiple UTF-16 code units", () => {
    expect("😅").toHaveLength(2);
    expect(encodeSingleByteEncoding("😅", encodingIndex)).toEqual(
      textEncoder.encode("?"),
    );
  });

  it("replaces lone surrogates with '?'", () => {
    expect(encodeSingleByteEncoding("\ud83d", encodingIndex)).toEqual(
      textEncoder.encode("?"),
    );
  });

  it("returns a Uint8Array with a different length from input with lone surrogates", () => {
    const input = "a€😅";
    const result = encodeSingleByteEncoding(input, encodingIndex);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).not.toHaveLength(input.length);
  });

  // ASCII should not be mapped incorrectly
  it("does not look up ASCII characters in the index", () => {
    expect(encodeSingleByteEncoding("a", { a: 5 })).toEqual(
      textEncoder.encode("a"),
    );
  });

  it("does not treat Object.prototype property names as encoding key", () => {
    expect(encodeSingleByteEncoding("toString", {})).toEqual(
      encodeSingleByteEncoding("toString", Object.create(null)),
    );
  });
});
