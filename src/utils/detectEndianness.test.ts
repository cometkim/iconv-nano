import { describe, expect, it } from "vitest";

import { detectEndianness } from "./detectEndianness.js";

const textEncoder = new TextEncoder();

describe("detectEndianness", () => {
  it.for([
    ["Uint8Array", new Uint8Array([0xfe, 0xff]), "big-endian"],
    ["Uint16Array", new Uint16Array([0xfeff]), "little-endian"],
    [
      "Uint32Array",
      new Uint32Array(new Uint8Array([0xfe, 0xff, 0x00, 0x00]).buffer),
      "big-endian",
    ],
    ["ArrayBuffer", new Uint8Array([0xfe, 0xff]).buffer, "big-endian"],
  ] as const)("handles %s input", ([, data, expectedOutput]) => {
    expect(detectEndianness(data)).toBe(expectedOutput);
  });

  it("returns undefined on empty input", () => {
    expect(detectEndianness(new Uint8Array())).toBe(undefined);
  });

  it("returns undefined on input without byte order mark", () => {
    expect(detectEndianness(textEncoder.encode("Hello world!"))).toBe(
      undefined,
    );
  });
});
